import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PropertyList.css'; // optional, for styling
import { useLocation, useNavigate } from 'react-router-dom';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const client = location.state?.client;
  const panId = client?.panId;

  // ✅ Fetch property list on mount
  useEffect(() => {
    const fetchProperties = async () => {
      if (!panId) return;
      try {
        const response = await axios.get(`http://localhost:8080/api/property/pan/${panId}`);
        setProperties(response.data || []);
      } catch (error) {
        console.error('❌ Error fetching properties:', error);
        alert('Failed to fetch property data.');
      }
    };

    fetchProperties();
  }, [panId]);

  const handleBack = () => {
    navigate('/clientmenusform', { state: { client, setActiveTab: '1. Immovable_Investments' } });
  };

  return (
    <div className="property-list-wrapper">
      <div className="action" style={{ justifyContent: 'flex-start' }}>
        <button onClick={handleBack} className="back-btn1">← Back</button>
      </div>

      <h2>Residential Property List</h2>

      <table className="property-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Asset ID</th>
            <th>Unit No</th>
            <th>Building Name</th>
            <th>Street</th>
            <th>Area</th>
            <th>Pincode</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Ledger ID</th>
          </tr>
        </thead>
        <tbody>
          {properties.length === 0 ? (
            <tr>
              <td colSpan="11" style={{ textAlign: 'center' }}>No properties found.</td>
            </tr>
          ) : (
            properties.map((prop, index) => (
              <tr key={prop.assetId || index}>
                <td>{index + 1}</td>
                <td>{prop.assetId}</td>
                <td>{prop.unitNo}</td>
                <td>{prop.buildingName}</td>
                <td>{prop.street}</td>
                <td>{prop.area}</td>
                <td>{prop.pincode}</td>
                <td>{prop.country}</td>
                <td>{prop.state}</td>
                <td>{prop.city}</td>
                <td>{prop.ledgerId}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyList;
