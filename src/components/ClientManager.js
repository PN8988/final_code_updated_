import React, { useState } from 'react';
import ClientList from './ClientList';
import ClientDetailsForm from './ClientDetailsForm';

function ClientManager() {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddNew = () => {
    setShowForm(true);
  };

  const handleBack = () => {
    setShowForm(false);
  };

  const handleSaveClient = (newClient) => {
    setClients((prevClients) => [...prevClients, newClient]);
    setShowForm(false);
  };

  return (
    <div>
      {showForm ? (
        <ClientDetailsForm onSave={handleSaveClient} onCancel={handleBack} />
      ) : (
        <ClientList clients={clients} onAddNew={handleAddNew} onBack={handleBack} />
      )}
    </div>
  );
}

export default ClientManager;
