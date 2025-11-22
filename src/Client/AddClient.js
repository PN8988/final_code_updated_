import React, { useState } from 'react';

const AddClientModal = ({ onClose, onAdd }) => {
  const [pan, setPan] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [contact, setContact] = useState('');
  const [financialYear, setFinancialYear] = useState('');

  const handleAdd = () => {
    if (pan && firstName && lastName && dob && contact && financialYear) {
      onAdd({ pan, firstName, lastName, dob, contact, financialYear });
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Client</h2>
        <input
          type="text"
          placeholder="PAN Number"
          value={pan}
          onChange={(e) => setPan(e.target.value)}
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <input
          type="text"
          placeholder="Financial Year"
          value={financialYear}
          onChange={(e) => setFinancialYear(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleAdd}>Add</button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClientModal;
