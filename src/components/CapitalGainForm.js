import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './CapitalGainForm.css';

const CapitalGainForm = () => {
  const location = useLocation();

  const [searchPan, setSearchPan] = useState('');
  const [clientData, setClientData] = useState(location.state?.client || {});

  const [saleDate, setSaleDate] = useState('');
  const [financialYear, setFinancialYear] = useState('');
  const [saleValue, setSaleValue] = useState('');
  const [purchaseCost, setPurchaseCost] = useState('');
  const [capitalGain, setCapitalGain] = useState(0);

  useEffect(() => {
    const sale = parseFloat(saleValue) || 0;
    const purchase = parseFloat(purchaseCost) || 0;
    setCapitalGain(sale - purchase);
  }, [saleValue, purchaseCost]);

  const handleSearch = async () => {
    if (!searchPan.trim()) {
      alert("Please enter a valid PAN number.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/clients/pan/${searchPan}`);
      setClientData(response.data);
    } catch (error) {
      console.error('PAN search failed:', error);
      alert('Client not found or error fetching data.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      saleDate,
      financialYear,
      saleValue,
      purchaseCost,
      capitalGain,
      client: clientData
    };
    console.log('Submitted:', formData);
    alert('Capital Gain form saved!');
  };

  return (
    <div className="page-wrapper">
      <div className="capital-form-container">
        {/* Static Client Menu with PAN Search */}
        <div className="client-menu-container">
          <div className="client-form">
            <h2>Client Menu</h2>
            <div className="search-section">
              <input
                type="text"
                placeholder="Enter PAN"
                value={searchPan}
                onChange={(e) => setSearchPan(e.target.value)}
              />
              <button className="btn-search" onClick={handleSearch}>Search</button>
            </div>

            <div className="form-fields">
              <div><label>Client Name:</label><input type="text" value={clientData.clientName || ''} readOnly /></div>
              <div><label>Legal Name:</label><input type="text" value={clientData.legalName || ''} readOnly /></div>
              <div><label>PAN Number:</label><input type="text" value={clientData.panId || ''} readOnly /></div>
              <div><label>Home State:</label><input type="text" value={clientData.homeState || ''} readOnly /></div>
              <div><label>Mobile Number:</label><input type="text" value={clientData.mobileNumber || ''} readOnly /></div>
              <div><label>Email ID:</label><input type="text" value={clientData.emailId || ''} readOnly /></div>
              <div><label>Contact/POC:</label><input type="text" value={clientData.contact || ''} readOnly /></div>
            </div>
          </div>
        </div>

        {/* Capital Gain Table Form */}
        <h2>Capital Gain Form</h2>
        <form onSubmit={handleSubmit}>
          <table className="sale-table">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Particular</th>
                <th>Input</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Date of Sale</td>
                <td>
                  <input
                    type="date"
                    value={saleDate}
                    onChange={(e) => setSaleDate(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Financial Year</td>
                <td>
                  <select
                    value={financialYear}
                    onChange={(e) => setFinancialYear(e.target.value)}
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="2023-24">2023–24</option>
                    <option value="2024-25">2024–25</option>
                    <option value="2025-26">2025–26</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Sale Value / Consideration</td>
                <td>
                  <input
                    type="number"
                    value={saleValue}
                    onChange={(e) => setSaleValue(e.target.value)}
                    placeholder="Enter sale value"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>Purchase Cost</td>
                <td>
                  <input
                    type="number"
                    value={purchaseCost}
                    onChange={(e) => setPurchaseCost(e.target.value)}
                    placeholder="Enter purchase cost"
                    required
                  />
                </td>
              </tr>
              <tr className="readonly">
                <td>5</td>
                <td>Capital Gain</td>
                <td>
                  <input type="number" value={capitalGain} readOnly />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="action">
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CapitalGainForm;
