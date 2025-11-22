import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AquisitionForm.css';
import axios from 'axios';

const EditAcquisitionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const assetToEdit = location.state?.assetToEdit;
  const [clientData, setClientData] = useState(location.state?.client || {});
  const [propertyData, setPropertyData] = useState({});
  const [receivedAmount, setReceivedAmount] = useState('');
  const [assets, setAssets] = useState([]);
  const [owners, setOwners] = useState([]);
  const [totalShareAmount, setTotalShareAmount] = useState(0);
  const [totalSharePercent, setTotalSharePercent] = useState(0);
  const [numOwners, setNumOwners] = useState(1);

  useEffect(() => {
    if (assetToEdit) {
      setReceivedAmount(assetToEdit.receivedAmount || '');
      setPropertyData({
        propId: assetToEdit.assetId,
        assetItemValue: assetToEdit.ledgerName,
        occupancy: assetToEdit.occupancy || '',
        unitNo: assetToEdit.unitNo || '',
      });
      setAssets([
        { date: assetToEdit.date || '', label: 'Agreement Value', amount: assetToEdit.amt || '', share: assetToEdit.share || '100' },
        { date: assetToEdit.stampDate || '', label: 'Stamp Duty', amount: assetToEdit.stampDuty || '', share: assetToEdit.share || '100' },
        { date: assetToEdit.regDate || '', label: 'Registration Fees', amount: assetToEdit.registrationFees || '', share: assetToEdit.share || '100' },
      ]);
      const initialOwners = assetToEdit.owners?.length ? assetToEdit.owners : [
        { ownerName: clientData.clientName || '', ownerPan: clientData.panId || '', share: assetToEdit.share || '100' },
      ];
      setOwners(initialOwners);
      setNumOwners(initialOwners.length);
    }
  }, [location]);

  useEffect(() => {
    const total = owners.reduce((sum, o) => sum + (parseFloat(o.share) || 0), 0);
    setTotalSharePercent(total.toFixed(2));
  }, [owners]);

  useEffect(() => {
    const total = assets.reduce((sum, a) => {
      const amount = parseFloat(a.amount) || 0;
      const share = parseFloat(a.share) || 0;
      return sum + ((amount * share) / 100);
    }, 0);
    setTotalShareAmount(total.toFixed(2));
  }, [assets]);

  useEffect(() => {
    const updatedOwners = [...owners];

    if (numOwners > owners.length) {
      for (let i = owners.length; i < numOwners; i++) {
        updatedOwners.push({
          ownerName: '',
          ownerPan: '',
          share: '',
        });
      }
    } else if (numOwners < owners.length) {
      updatedOwners.splice(numOwners);
    }

    if (numOwners > 1) {
      const equalShare = (100 / numOwners).toFixed(2);
      for (let i = 0; i < numOwners - 1; i++) {
        updatedOwners[i].share = equalShare;
      }
      const totalExceptLast = updatedOwners.slice(0, numOwners - 1).reduce((sum, o) => sum + parseFloat(o.share || 0), 0);
      updatedOwners[numOwners - 1].share = (100 - totalExceptLast).toFixed(2);
    } else if (numOwners === 1) {
      updatedOwners[0].share = '100';
    }

    setOwners(updatedOwners);
  }, [numOwners]);

  const calculateTotalAssetAmount = () => assets.reduce((sum, a) => sum + (parseFloat(a.amount) || 0), 0).toFixed(2);

  const handleAssetChange = (index, field, value) => {
    const updated = [...assets];
    updated[index][field] = value;
    if (field === 'share' && index === 0) {
      updated.forEach((row) => (row.share = value));
      const updatedOwners = [...owners];
      if (updatedOwners[0]) updatedOwners[0].share = value;
      setOwners(updatedOwners);
    }
    setAssets(updated);
  };

  const handleOwnerChange = (index, field, value) => {
    const updated = [...owners];

    if (field === 'share') {
      if (index !== owners.length - 1) {
        updated[index].share = value;

        const totalExceptLast = updated.slice(0, owners.length - 1).reduce((sum, o, i) =>
          i === index ? sum + (parseFloat(value) || 0) : sum + (parseFloat(o.share) || 0), 0);

        const lastOwnerShare = (100 - totalExceptLast).toFixed(2);
        if (lastOwnerShare < 0) {
          alert('❌ Total share percent cannot exceed 100%');
          return;
        }
        updated[owners.length - 1].share = lastOwnerShare;
      } else {
        return; // Don't allow editing last row share
      }
    } else {
      updated[index][field] = value;
    }

    setOwners(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalAmt = parseFloat(calculateTotalAssetAmount());

    const mainOwner = owners.find((o) => o.ownerPan === clientData.panId);
    const mainShare = mainOwner?.share || '100';

    const classType = (() => {
      const unitNo = propertyData.unitNo || '';
      if (unitNo.startsWith('F')) return 'Flat';
      if (unitNo.startsWith('P')) return 'Plot';
      if (unitNo.startsWith('C')) return 'Commercial';
      if (unitNo.startsWith('A')) return 'Apartment';
      if (unitNo.startsWith('B')) return 'Bungalow';
      return 'Other';
    })();

    const updatePayload = {
      panId: clientData.panId,
      ledgerName: propertyData.assetItemValue,
      assetId: propertyData.propId,
      receivedAmount,
      amt: parseFloat(((totalAmt * parseFloat(mainShare)) / 100).toFixed(2)),
      incomeHolding: null,
      capitalGain: null,
      saleOfAsset: null,
      type: 'Immovable',
      class: 'Acquisition',
      classType,
      date: assets[0]?.date || '',
      stampDate: assets[1]?.date || '',
      regDate: assets[2]?.date || '',
      stampDuty: assets[1]?.amount || '',
      registrationFees: assets[2]?.amount || '',
      share: assets[0]?.share || '',
      owners: owners,
    };

    try {
      await axios.put(`http://localhost:8080/api/assets/update/${assetToEdit.assetId}`, updatePayload);
      alert('✅ Asset updated successfully!');
      navigate('/clientmenusform', {
        state: {
          client: clientData,
          updatedAsset: updatePayload,
        },
      });
    } catch (err) {
      console.error('❌ Update error:', err);
      alert('Error occurred while updating asset.');
    }
  };

  const renderOwnerRow = (owner, index) => {
    const shareAmount = (((parseFloat(owner.share || 0)) * parseFloat(calculateTotalAssetAmount())) / 100).toFixed(2);
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td><input type="text" value={owner.ownerName} onChange={(e) => handleOwnerChange(index, 'ownerName', e.target.value)} /></td>
        <td><input type="text" value={propertyData.propId || ''} readOnly /></td>
        <td><input type="text" value={owner.ownerPan} onChange={(e) => handleOwnerChange(index, 'ownerPan', e.target.value)} /></td>
        <td><input type="number" value={owner.share} onChange={(e) => handleOwnerChange(index, 'share', e.target.value)} readOnly={index === owners.length - 1 && owners.length > 1} /></td>
        <td>₹{shareAmount}</td>
      </tr>
    );
  };

  return (
    <div className="page-wrapper">
      <div className="acquisition-form-container">
        <form onSubmit={handleSubmit}>
          <div className="section-wrapper">
            <h3>Property & Client Information</h3>
            <div className="form-fields grid-3">
              <div><label>Client Name:</label><input type="text" value={clientData.clientName || ''} readOnly /></div>
              <div><label>Client PAN:</label><input type="text" value={clientData.panId || ''} readOnly /></div>
              <div><label>Property ID:</label><input type="text" value={propertyData.propId || ''} readOnly /></div>
              <div><label>Ledger Name:</label><input type="text" value={propertyData.assetItemValue || ''} readOnly /></div>
              <div><label>Occupancy:</label><input type="text" value={propertyData.occupancy || ''} readOnly /></div>
            </div>
          </div>

          <div className="section-wrapper">
            <h3>Agreement Details</h3>
            <div className="form-fields grid-3" style={{ marginBottom: '1rem' }}>
              <div>
                <label>No. of Owners:</label>
                <input type="number" value={numOwners} min="1" onChange={(e) => setNumOwners(parseInt(e.target.value) || 1)} />
              </div>
              <div>
                <label>Govt Value:</label>
                <input type="number" value={receivedAmount} onChange={(e) => setReceivedAmount(e.target.value)} />
              </div>
            </div>
            <table className="acquisition-table">
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Date</th>
                  <th>Agreement Details</th>
                  <th>Amount</th>
                  <th>Share %</th>
                  <th>Share Amount</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td><input type="date" value={asset.date} onChange={(e) => handleAssetChange(i, 'date', e.target.value)} /></td>
                    <td><input type="text" value={asset.label} onChange={(e) => handleAssetChange(i, 'label', e.target.value)} /></td>
                    <td><input type="number" value={asset.amount} onChange={(e) => handleAssetChange(i, 'amount', e.target.value)} /></td>
                    <td><input type="number" value={asset.share} onChange={(e) => handleAssetChange(i, 'share', e.target.value)} /></td>
                    <td>₹{((parseFloat(asset.share || 0) * parseFloat(asset.amount || 0)) / 100).toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td colSpan="4"><strong>Total Agreement Amount</strong></td>
                  <td colSpan="2"><strong>₹{calculateTotalAssetAmount()}</strong></td>
                </tr>
                <tr className="total-row">
                  <td colSpan="4"><strong>Total Share Amount</strong></td>
                  <td colSpan="2"><strong>₹{totalShareAmount}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="section-wrapper">
            <h3>Owner Details</h3>
            <table className="acquisition-table">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Owner Name</th>
                  <th>Property ID</th>
                  <th>Owner PAN</th>
                  <th>Share %</th>
                  <th>Share Amount</th>
                </tr>
              </thead>
              <tbody>
                {owners.map(renderOwnerRow)}
                <tr className="total-rows1">
                  <td colSpan="4"><strong>Total % Percent Share</strong></td>
                  <td colSpan="2"><strong>{totalSharePercent}%</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="action">
            <button type="submit" className="save-btn">Update</button>
            <button type="button" className="next-btn" onClick={() => navigate('/clientmenusform', { state: { client: clientData } })}>Go To Asset List</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAcquisitionForm;
