// PropertyOwnerManager.js
import React, { useState } from 'react';

const initialProperty = {
  clientPan: '',
  assetId: '',
  ledgerName: '',
  propertyType: '',
  occupancyType: '',
  govtValue: 0,
  address: '',
  financialYear: '',
  date: '',
  ownerName: '',
  panType: '',
  percentShare: 0,
  agreementValue: 0,
  stampDuty: 0,
  registrationFees: 0,
};

const PropertyOwnerManager = () => {
  const [properties, setProperties] = useState([initialProperty]);
  const [owners, setOwners] = useState([]);

  const handlePropertyChange = (index, field, value) => {
    const updatedProperties = [...properties];
    updatedProperties[index][field] = value;
    setProperties(updatedProperties);
    syncOwners(updatedProperties);
  };

  const syncOwners = (updatedProperties) => {
    const updatedOwners = updatedProperties.map((prop, index) => ({
      srNo: index + 1,
      clientPan: prop.clientPan,
      ledgerName: prop.ledgerName,
      assetId: prop.assetId,
      propType: prop.propertyType,
      govtValue: prop.govtValue,
      shareAmount: (prop.agreementValue * prop.percentShare) / 100,
      capitalGain: 0,
      saleOfAssets: '',
      incomeHolding: '',
    }));
    setOwners(updatedOwners);
  };

  const addPropertyRow = () => {
    setProperties([...properties, initialProperty]);
  };

  return (
    <div>
      <h2>Dynamic Property Table</h2>
      <button onClick={addPropertyRow}>Add Property</button>
      <table border="1" style={{ width: '100%', marginBottom: '30px' }}>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Client PAN</th>
            <th>Asset ID</th>
            <th>Ledger Name</th>
            <th>Property Type</th>
            <th>Occupancy</th>
            <th>Govt Value</th>
            <th>Address</th>
            <th>FY</th>
            <th>Date</th>
            <th>Owner Name</th>
            <th>PAN Type</th>
            <th>% Share</th>
            <th>Agreement Value</th>
            <th>Stamp Duty</th>
            <th>Registration</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((prop, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {Object.keys(initialProperty).map((key) => (
                <td key={key}>
                  <input
                    value={prop[key]}
                    onChange={(e) => handlePropertyChange(index, key, key.includes('Value') || key.includes('Duty') || key.includes('Fees') || key === 'percentShare' ? parseFloat(e.target.value) : e.target.value)}
                  />
                </td>
              ))}
              <td>
                {
                  prop.agreementValue && prop.stampDuty && prop.registrationFees
                    ? prop.agreementValue + prop.stampDuty + prop.registrationFees
                    : 0
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Auto Synced Owner Table</h2>
      <table border="1" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Client PAN</th>
            <th>Ledger Name</th>
            <th>Asset ID</th>
            <th>Prop Type</th>
            <th>Govt Value</th>
            <th>Share Amount</th>
            <th>Capital Gain</th>
            <th>Sale of Assets</th>
            <th>Income Holding</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{owner.clientPan}</td>
              <td>{owner.ledgerName}</td>
              <td>{owner.assetId}</td>
              <td>{owner.propType}</td>
              <td>{owner.govtValue}</td>
              <td>{owner.shareAmount}</td>
              <td>{owner.capitalGain}</td>
              <td>{owner.saleOfAssets}</td>
              <td>{owner.incomeHolding}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyOwnerManager;
