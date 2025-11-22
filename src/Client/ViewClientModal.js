import React from 'react';

const ViewClientModal = ({ client, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Client Details</h2>
        <p><strong>PAN Number:</strong> {client.pan}</p>
        <p><strong>First Name:</strong> {client.firstName}</p>
        <p><strong>Last Name:</strong> {client.lastName}</p>
        <p><strong>Date of Birth:</strong> {client.dob}</p>
        <p><strong>Contact Number:</strong> {client.contact}</p>
        <p><strong>Financial Year:</strong> {client.financialYear}</p>
        <div className="modal-actions">
          <button onClick={onClose} className="close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewClientModal;
