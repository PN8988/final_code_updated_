// src/components/AcquisitionList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './AcquisitionList.css'; // ✅ Link the CSS file

const AcquisitionList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const client = location.state?.client || {};
  const [acquisitions, setAcquisitions] = useState([]);

  useEffect(() => {
    const fetchAcquisitions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/residential/pan/${client.panId}`);
        setAcquisitions(response.data);
      } catch (error) {
        console.error("Error fetching acquisitions:", error);
      }
    };

    if (client.panId) {
      fetchAcquisitions();
    }
  }, [client.panId]);

  const handleEdit = (asset) => {
    navigate('/aquisitionform', {
      state: {
        client: client,
        assetToEdit: asset
      }
    });
  };

  return (
    <div className="acquisition-list-wrapper">
      <h2>Acquisition Records for {client.clientName} ({client.panId})</h2>

      <table className="acquisition-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Asset ID</th>
            <th>Ledger Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {acquisitions.map((a, index) => (
            <tr key={a.assetId}>
              <td>{index + 1}</td>
              <td>{a.assetId}</td>
              <td>{a.ledgerName}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(a)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

  {/* <thead>
    <tr>
      <th>Sr. No</th>
      <th>Asset ID</th>
      <th>Ledger Name</th>
      <th>Agreement Value</th>
      <th>Stamp Duty</th>
      <th>Registration Fees</th>
      <th>No. of Owners</th>
      <th>Total Amount</th>
      <th>Share Amount</th>
      <th>Share %</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {acquisitions.map((a, index) => (
      <tr key={a.assetId}>
        <td>{index + 1}</td>
        <td>{a.assetId}</td>
        <td>{a.ledgerName}</td>
        <td>{a.agreementValue}</td>
        <td>{a.stampDuty}</td>
        <td>{a.registrationFees}</td>
        <td>{a.noOfOwners}</td>
        <td>{a.totalAmount}</td>
        <td>{a.shareAmount}</td>
        <td>{a.sharePercent}</td>
        <td>
          <button className="edit-btn" onClick={() => handleEdit(a)}>Edit</button>
        </td>
      </tr>
    ))}
  </tbody>
</table> */}

      <button className="back-btn" onClick={() => navigate('/clientmenusform', { state: { client } })}>
        ← Back to Menu
      </button>
    </div>
  );
};

export default AcquisitionList;
