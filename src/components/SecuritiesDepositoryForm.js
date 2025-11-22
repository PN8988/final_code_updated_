import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SecurityDepositoryForm.css";
import { useNavigate, useLocation } from "react-router-dom";

/* ----------------- Constants ----------------- */
// ✅ Map of Depository Names → Short Names
const depositoryMap = {
  "National Securities Depository Limited": "NSDL",
  "Central Depository Services Limited": "CDSL",
  "ICICI Bank Depository": "ICICI",
  "HDFC Bank Depository": "HDFC",
  "Kotak Mahindra Depository": "KOTAK",
};

// ✅ Map of Info Source Code → Name
const infoSourceMap = {
  AB703: "Axis Bank Mumbai",
  HS123: "HDFC Securities",
  SB001: "SBI Capital",
  IC456: "ICICI Direct",
};

/* ----------------- Utility Functions ----------------- */
const getShortName = (depositoryName) => depositoryMap[depositoryName] || "";
const getInfoSourceName = (code) => infoSourceMap[code] || "";

/* ----------------- Form Component ----------------- */
const SecurityDepositoryForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const editingDepository = location.state?.depository || null;

  const [formData, setFormData] = useState({
    depositoryID: "",
    depositoryName: "",
    shortName: "",
    panNo: "",
    tanNo: "",
    infoSourceCode: "",
    infoSourceName: "",
  });

  // Prefill data if editing
  useEffect(() => {
    if (editingDepository) {
      setFormData(editingDepository);
    }
  }, [editingDepository]);

  /* ----------------- Handlers ----------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "depositoryName") {
      setFormData({
        ...formData,
        [name]: value,
        shortName: getShortName(value),
      });
    } else if (name === "infoSourceName") {
      let panPart = "";
      let codePart = "";
      let sourceName = value;

      if (value.includes(".")) {
        const [pan, code] = value.split(".");
        panPart = pan || "";
        codePart = code || "";
        sourceName = getInfoSourceName(codePart);
      }

      setFormData({
        ...formData,
        infoSourceName: value,
        panNo: panPart || formData.panNo,
        infoSourceCode: codePart,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDepository) {
        await axios.put(
          `http://localhost:8080/api/securities/updateSecurityDepo/${formData.depositoryID}`,
          formData
        );
        alert("Depository updated successfully!");
      } else {
        await axios.post(
          "http://localhost:8080/api/securities/addSecurityDepo",
          formData
        );
        alert("Depository saved successfully!");
      }
      navigate("/securitydepositorylist");
    } catch (err) {
      console.error(err);
      alert("Error saving/updating depository");
    }
  };

  const handleView = () => {
    navigate("/securitydepositorylist");
  };

  const handleGoToSft = () =>{
    navigate("/sftmaster-form");
  }
  /* ----------------- Render ----------------- */
  return (
    <div className="depository-form-container">
      <h2>
        {editingDepository
          ? "Edit Security Depository"
          : "Add Security Depository"}
      </h2>
      <form onSubmit={handleSubmit} className="depository-form">
        {/* Depository Row */}
        <div className="depository-form-row">
          <div className="depository-form-group">
            <label>Depository ID</label>
            <input
              type="text"
              name="depositoryID"
              value={formData.depositoryID}
              onChange={handleChange}
              placeholder="Enter Depository ID"
              required
              disabled={editingDepository}
            />
          </div>

          <div className="depository-form-group">
            <label>Depository Name</label>
            <select
              name="depositoryName"
              value={formData.depositoryName}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Depository --</option>
              {Object.keys(depositoryMap).map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>

          <div className="depository-form-group">
            <label>Short Name</label>
            <input
              type="text"
              name="shortName"
              value={formData.shortName}
              onChange={handleChange}
              placeholder="Auto-filled Short Name"
              readOnly
            />
          </div>
        </div>

        {/* PAN + Info Source Row */}
        <div className="depository-form-row">
          <div className="depository-form-group">
            <label>Info Source Name</label>
            <input
              type="text"
              name="infoSourceName"
              value={formData.infoSourceName}
              onChange={handleChange}
              placeholder="Enter PAN.CODE (e.g., AAACS8577K.AB703)"
            />
          </div>

          <div className="depository-form-group">
            <label>PAN No</label>
            <input
              type="text"
              name="panNo"
              value={formData.panNo}
              placeholder="Auto-filled PAN"
              readOnly
            />
          </div>

          <div className="depository-form-group">
            <label>Info Source Code</label>
            <input
              type="text"
              name="infoSourceCode"
              value={formData.infoSourceCode}
              placeholder="Auto-filled Source Code"
              readOnly
            />
          </div>
        </div>

        {/* TAN Row */}
        <div className="depository-form-row">
          <div className="depository-form-group">
            <label>TAN No</label>
            <input
              type="text"
              name="tanNo"
              value={formData.tanNo}
              onChange={handleChange}
              placeholder="Enter TAN (e.g., PNEA12345B)"
            />
          </div>
        </div>

        {/* Buttons */}
       {/* Buttons */}
      <div className="securitydepo-btns">
      <button type="submit" className="submit-btn-securityDepo">
      {editingDepository ? "Update" : "Save"}
      </button>
      <button
        type="button"
        className="view-securityDepo"
        onClick={handleView}
       >
       View
      </button>
  <button
    type="button"
    className="goto-sft-btn"
    onClick={handleGoToSft}
  >
    Go to SFT Master
  </button>


        </div>
      </form>
    </div>
  );
};

export default SecurityDepositoryForm;
