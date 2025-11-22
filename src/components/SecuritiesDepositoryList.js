import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SecurityDepositoryList.css";
import { useNavigate } from "react-router-dom";

const SecurityDepositoryList = () => {
  const [depositories, setDepositories] = useState([]);
  const navigate = useNavigate();

  // Fetch all depositories
  const fetchDepositories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/securities/getAllDepository"
      );
      setDepositories(res.data);
    } catch (err) {
      console.error("Error fetching depositories:", err);
    }
  };

  useEffect(() => {
    fetchDepositories();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this depository?")) {
      try {
        await axios.delete(
          `http://localhost:8080/api/securities/deleteDepository/${id}`
        );
        alert("Deleted successfully!");
        fetchDepositories();
      } catch (err) {
        console.error(err);
        alert("Error deleting depository");
      }
    }
  };

  // Handle edit → navigate to form with state
  const handleEdit = (depository) => {
    navigate("/securitydepository", { state: { depository } });
  };

  return (
    <div className="depository-list-container">
      <h2>Security Depository List</h2>
      <table className="depository-table">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Depository ID</th>
            <th>Depository Name</th>
            <th>Short Name</th>
            <th>Info Source Name</th>
            <th>PAN NO</th>
            <th>Info Source Code</th>
            <th>TAN NO</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {depositories.length > 0 ? (
            depositories.map((dep, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{dep.depositoryID}</td>
                <td>{dep.depositoryName}</td>
                <td>{dep.shortName}</td>
                <td>{dep.panNo}</td>
                <td>{dep.tanNo}</td>
                <td>{dep.infoSourceName}</td>
                <td>{dep.infoSourceCode}</td>
                <td>
                  <div className="btn-group">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(dep)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(dep.depositoryID)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No depositories found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SecurityDepositoryList;
