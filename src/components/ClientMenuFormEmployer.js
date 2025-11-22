import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './ClientMenuForm.css';

const ClientMenuFormEmployer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { client } = location.state || {};
  const matchedClients = location.state?.clients || [];
  const assetMap = location.state?.assetMap || {};

  const clientData =
    location.state?.client ||
    (matchedClients.length > 0 ? matchedClients[0] : {});

  const defaultTab = location.state?.defaultTab || '1. Immovable_Investments';
  const tabFromNavigation = location.state?.setActiveTab || defaultTab;

  const [activeTab, setActiveTab] = useState(tabFromNavigation);
  const [activeSubTab, setActiveSubTab] = useState('1.1 Residential');
  const [formData, setFormData] = useState({
    clientName: '',
    legalName: '',
    panId: '',
    homeState: '',
    mobileNumber: '',
    emailId: '',
    contact: '',
  });

  // ✅ Employer List state
  const [employerList, setEmployerList] = useState([]);

  // Set form data
  useEffect(() => {
    if (clientData?.panId) {
      setFormData(clientData);
    }
  }, [clientData]);

  // ✅ Fetch employer list from backend
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/employers') // update endpoint if needed
      .then((res) => setEmployerList(res.data))
      .catch((err) => console.error('Error fetching employer list', err));
  }, []);

  const renderSubTabs = () => {
    let subtabs = [];

    if (activeTab === '1. Immovable_Investments') {
      subtabs = [
        '1.1 Residential',
        '1.2 Commercial',
        '1.3 Industrial',
        '1.4 Flat',
        '1.5 Plot'
      ];
    }

    return (
      <div className="sub-tabs">
        {subtabs.map((sub) => (
          <button
            key={sub}
            className={`subtab ${activeSubTab === sub ? 'active-subtab' : ''}`}
            onClick={() => {
              setActiveSubTab(sub);
              const propertyType = sub.split(' ')[1] || 'Residential';
              if (propertyType === 'Residential') {
                navigate('/residential-property-form', {
                  state: {
                    client: formData,
                    from: 'ClientMenuFormEmployer',
                    propertyType,
                  },
                });
              }
            }}
          >
            {sub}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="client-menu-container">
      <div className="client-form">
        <h2>Client Menu - Employer</h2>
        <div className="form-fields">
          <div>
            <label>Client Name:</label>
            <input type="text" value={formData.clientName} readOnly />
          </div>
          <div>
            <label>Legal Name:</label>
            <input type="text" value={formData.legalName} readOnly />
          </div>
          <div>
            <label>PAN Number:</label>
            <input type="text" value={formData.panId} readOnly />
          </div>
        </div>
      </div>

      <div className="investment-section">
        <h2>Employer Details</h2>
        <div className="tabs">
          {[
            '1. Immovable_Investments',
            '2. Securities_Investments',
            '3. Virtual Assets_Investments'
          ].map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab);
                setActiveSubTab(
                  tab === '1. Immovable_Investments' ? '1.1 Residential' : ''
                );
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {renderSubTabs()}
        {activeSubTab && (
          <div className="tab-content">
            <p>
              Selected Subtype: <strong>{activeSubTab}</strong>
            </p>
          </div>
        )}

        {/* ✅ Employer List Table */}
        <div className="employer-list">
          <h3>Employer List</h3>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Employer Name</th>
                <th>TAN Number</th>
                <th>PAN Number</th>
                <th>Address</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {employerList.length > 0 ? (
                employerList.map((emp, index) => (
                  <tr key={emp.tanNumber || index}>
                    <td>{index + 1}</td>
                    <td>{emp.employerName}</td>
                    <td>{emp.tanNumber}</td>
                    <td>{emp.panNumber}</td>
                    <td>{emp.address}</td>
                    <td>{emp.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No employers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientMenuFormEmployer;
