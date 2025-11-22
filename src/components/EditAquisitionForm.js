import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditAcquisitionForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    client = {},
    property = {},
    assets = [],
    owners = [],
    numOwners = 1,
    receivedAmount = ''
  } = location.state || {};

  // Prefilled form states
  const [formClient, setFormClient] = useState({});
  const [formProperty, setFormProperty] = useState({});
  const [formAssets, setFormAssets] = useState([]);
  const [formOwners, setFormOwners] = useState([]);
  const [formNumOwners, setFormNumOwners] = useState(1);
  const [formReceivedAmount, setFormReceivedAmount] = useState('');

  // Prefill logic on mount
  useEffect(() => {
    setFormClient(client);
    setFormProperty(property);
    setFormAssets(assets);
    setFormOwners(owners);
    setFormNumOwners(numOwners);
    setFormReceivedAmount(receivedAmount);
  }, [client, property, assets, owners, numOwners, receivedAmount]);

  // Example input change handler for property fields
  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    setFormProperty((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated data
  const handleUpdate = async () => {
    try {
      const payload = {
        client: formClient,
        property: formProperty,
        assets: formAssets,
        owners: formOwners,
        numOwners: formNumOwners,
        receivedAmount: formReceivedAmount
      };

      await axios.put(`/api/acquisition/update/${formProperty.propId}`, payload);
      alert("Data updated successfully");
      navigate('/display-aquisition', { state: payload });

    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed");
    }
  };

  return (
    <div className="edit-form-container">
      <h2>Edit Acquisition Details</h2>

      <div className="form-section">
        <label>Client Name:</label>
        <input type="text" value={formClient.clientName || ''} readOnly />
      </div>

      <div className="form-section">
        <label>Property ID:</label>
        <input type="text" name="propId" value={formProperty.propId || ''} readOnly />
      </div>

      <div className="form-section">
        <label>Property Location:</label>
        <input type="text" name="location" value={formProperty.location || ''} onChange={handlePropertyChange} />
      </div>

      {/* Add other property fields, asset fields, owner fields as needed */}

      <div className="form-section">
        <label>Received Amount:</label>
        <input
          type="number"
          value={formReceivedAmount}
          onChange={(e) => setFormReceivedAmount(e.target.value)}
        />
      </div>

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditAcquisitionForm;
