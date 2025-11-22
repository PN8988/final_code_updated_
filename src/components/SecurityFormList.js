import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SecurityMasterList.css";

const SecurityFormList = () => {
  const [securities, setSecurities] = useState([]);

  // fetch securities from backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/securities/getAllSecurity") // Spring Boot endpoint
      .then((res) => setSecurities(res.data))
      .catch((err) => console.error("Error fetching securities:", err));
  }, []);

  // handle delete (frontend + backend)
  const handleDelete = (isinNo) => {
    axios
      .delete(`http://localhost:8080/api/securities/${isinNo}`)
      .then(() => {
        setSecurities(securities.filter((s) => s.isinNo !== isinNo));
      })
      .catch((err) => console.error("Error deleting security:", err));
  };

  return (
    <div className="security-list">
      <h2 className="security-list-title">Security Master List</h2>

      {securities.length === 0 ? (
        <p className="no-securities">No securities added yet.</p>
      ) : (
        <table className="security-table">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Security Name</th>
              <th>ISINO</th>
              <th>Security Class</th>
              <th>Security Type</th>
              <th>Tax Code</th>
              <th>PAN No</th>
              <th>Info Source</th>
              <th>TAN No</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {securities.map((sec, index) => (
              <tr key={sec.isinNo}>
                <td>{index + 1}</td>
                <td>{sec.securityName}</td>
                <td>{sec.isinNo}</td>
                <td>{sec.secClass}</td>
                <td>{sec.securityType}</td>
                <td>{sec.secCodeTax}</td>
                <td>{sec.panNo}</td>
                <td>{sec.infoSourceAbbr}</td>
                <td>{sec.tanNo}</td>
                <td>
                  <button
                    className="security-master-delete-btn"
                    onClick={() => handleDelete(sec.isinNo)}
                  >
                    Delete
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

export default SecurityFormList;
