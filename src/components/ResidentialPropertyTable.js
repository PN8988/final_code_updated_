// src/components/ResidentialPropertyTable.js
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ResidentialPropertyTable = () => {
  const [properties, setProperties] = useState([]);
  const location = useLocation();
  const panId = location.state?.panId;

  useEffect(() => {
    if (panId) {
      axios.get(`http://localhost:8080/api/residential/pan/${panId}`)
        .then(res => setProperties(res.data))
        .catch(err => console.error('Failed to fetch', err));
    }
  }, [panId]);

  return (
    <div className="container mt-5">
      <h4>Residential Property List</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Asset ID</th>
            <th>Ledger Name</th>
            <th>Unit No</th>
            <th>Building Name</th>
            <th>Street</th>
            <th>Pincode</th>
            <th>State</th>
            <th>City</th>
            <th>Country</th>
            <th>Occupancy</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p, i) => (
            <tr key={i}>
              <td>{p.assetId}</td>
              <td>{p.ledgerId}</td>
              <td>{p.unitNo}</td>
              <td>{p.buildingName}</td>
              <td>{p.street}</td>
              <td>{p.pincode}</td>
              <td>{p.state}</td>
              <td>{p.city}</td>
              <td>{p.country}</td>
              <td>{p.occupancy}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ResidentialPropertyTable;
