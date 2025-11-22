import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MatchedClientsView.css';

const MatchedClientsView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const matchedClients = location.state?.matchedClients || [];
  const assetMap = location.state?.assetMap || {};

  const handleViewClient = (client) => {
    // 1️⃣ Get stored asset data from localStorage
    const storedData = JSON.parse(localStorage.getItem("assetLists")) || {};

    // 2️⃣ Get any existing stored assets for this PAN
    const storedAssetsForPan = storedData[client.panId] || [];

    // 3️⃣ Get any assets passed from previous pages (assetMap)
    const assetsFromState = assetMap[client.panId] || [];

    // 4️⃣ Merge without duplicates (assuming assetId is unique key)
    const mergedAssets = [
      ...storedAssetsForPan,
      ...assetsFromState.filter(
        (newAsset) =>
          !storedAssetsForPan.some((existing) => existing.assetId === newAsset.assetId)
      ),
    ];

    // 5️⃣ Save merged assets back to localStorage without removing other PANs
    const updatedData = {
      ...storedData,
      [client.panId]: mergedAssets,
    };
    localStorage.setItem("assetLists", JSON.stringify(updatedData));

    // 6️⃣ Navigate to client menu with merged asset list
    navigate('/clientmenusform', {
      state: {
        client,
        assetList: mergedAssets,
        clients: [client],
        assetMap: {
          ...assetMap,
          [client.panId]: mergedAssets,
        },
      },
    });
  };

  return (
    <div className="matched-clients-container">
      <h2>Matched Clients</h2>
      {matchedClients.length === 0 ? (
        <p>No matched clients found.</p>
      ) : (
        <table className="matched-clients-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Client Name</th>
              <th>PAN</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {matchedClients.map((client, index) => (
              <tr key={client.panId}>
                <td>{index + 1}</td>
                <td>{client.clientName}</td>
                <td>{client.panId}</td>
                <td>
                  <button
                    className="view-button"
                    onClick={() => handleViewClient(client)}
                  >
                    View Asset Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MatchedClientsView;
