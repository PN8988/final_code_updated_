import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SftMasterForm.css";
import { useNavigate } from "react-router-dom";

const SftMasterForm = () => {
  const [sftCode, setSftCode] = useState("");
  const [sftDescription, setsftDescription] = useState("");
  const [savedData, setSavedData] = useState([]);

  const navigate = useNavigate();
  // ✅ Fetch data from backend on mount
  useEffect(() => {
    fetchSftData();
  }, []);

  const fetchSftData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/sftmaster/getAll");
      setSavedData(response.data); // assuming backend returns list of SFT Masters
    } catch (error) {
      console.error("Error fetching SFT Master data:", error);
    }
  };

  // ✅ Save handler (both frontend + backend)
  const handleSave = async () => {
    if (!sftCode || !sftDescription) {
      alert("Please fill all fields");
      return;
    }

    const newEntry = { sftCode, sftDescription };

    try {
      // Save to backend
      await axios.post("http://localhost:8080/api/sft/addSftMasters", newEntry);

      // Save to frontend (local state)
      setSavedData([...savedData, newEntry]);

      setSftCode("");
      setsftDescription("");
      alert("SFT Master saved successfully!");
    } catch (error) {
      console.error("Error saving SFT Master:", error);
      alert("Failed to save SFT Master. Please try again.");
    }
  };

  const handleView = () =>{
    navigate("/sftMasterList");
  }


  return (
    <div className="sft-container">
      <h2>SFT Master</h2>

      <div className="sft-form-group">
        <label htmlFor="sftCode">SFT Code:</label>
        <input
          type="text"
          id="sftCode"
          value={sftCode}
          onChange={(e) => setSftCode(e.target.value)}
          placeholder="Enter SFT Code"
        />
      </div>

      <div className="sft-form-group">
        <label htmlFor="sftDescription">Description:</label>
        <input
          type="text"
          id="sftDescription"
          value={sftDescription}
          onChange={(e) => setsftDescription(e.target.value)}
          placeholder="Enter Description"
        />
      </div>

      {/* Button Group */}
      <div className="button-group">
        <button onClick={handleSave} className="btn save-btnss">
          Save
        </button>
        <button
          onClick={handleView}
          className="btn view-btnss" 
        >
          View
        </button>
      </div>

      {/* ✅ Show saved data in table
      {savedData.length > 0 && (
        <table className="sft-table">
          <thead>
            <tr>
              <th>SFT Code</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {savedData.map((item, index) => (
              <tr key={index}>
                <td>{item.sftCode}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )} */}
    </div>
  );
};

export default SftMasterForm;
