import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";   // ✅ import axios
import "./SecurityMasterForm.css";

const SecurityMasterForm = ({ setSecurities }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    securityCode: "",
    securityName: "",
    isinNo: "",
    faceValue: "",
    issueDate: "",
    maturityDate: "",
    secClass: "",
    securityType: "",
    secCodeTax: "",
    panNo: "",
    infoSourceAbbr: "",
    tanNo: "",
  });

  // ✅ Abbreviation map for Security Types
  const securityTypeMap = {
    "Listed Equity Shares": "LES",
    "Unlisted Equity Shares": "UES",
    "Bond": "BND",
    "Debenture": "DBT",
    "Mutual Fund": "MF",
    "ETF": "ETF",
    "Equity": "EQ",
    "Share": "SHR"
  };

  // ✅ updated handleChange with auto-split + auto-abbreviation logic
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field is secCodeTax, split into PAN + Abbreviation
    if (name === "secCodeTax") {
      let panNo = "";
      let infoSourceAbbr = "";

      if (value.includes(".")) {
        const parts = value.split(".");
        panNo = parts[0] || "";
        infoSourceAbbr = parts[1] || "";
      }

      setFormData({
        ...formData,
        [name]: value,
        panNo,
        infoSourceAbbr,
      });
    }
    // If the field is securityType, also update secClass using map
    else if (name === "securityType") {
      const secClassAbbr = securityTypeMap[value] || "";
      setFormData({
        ...formData,
        [name]: value,
        secClass: secClassAbbr,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/securities/addSecurityMaster",
        formData
      );

      if (setSecurities) {
        setSecurities((prev) => [...prev, res.data]);
      }

      setFormData({
        securityCode: "",
        securityName: "",
        isinNo: "",
        secClass: "",
        securityType: "",
        secCodeTax: "",
        panNo: "",
        infoSourceAbbr: "",
        tanNo: "",
      });

      navigate("/securitymasterlist");
    } catch (error) {
      console.error("Error saving Security Master:", error);
      alert("Failed to save security!");
    }
  };

  const handleView = () => {
    navigate("/securitymasterlist");
  };

  const handleNext = () => {
    navigate("/securitydepository");
  };

  return (
    <form className="security-master-form" onSubmit={handleSubmit}>
      <h2>Security Master Form</h2>

      {/* Row 1 */}
      <div className="security-master-form-row">
        <div className="security-master-form-group">
          <label>ISINO:</label>
          <input
            type="text"
            name="isinNo"
            value={formData.isinNo || ""}
            onChange={handleChange}
            placeholder="Enter ISINO"
          />
        </div>

        <div className="security-master-form-group">
          <label>Security Name:</label>
          <input
            type="text"
            name="securityName"
            value={formData.securityName || ""}
            onChange={handleChange}
            placeholder="Enter Security Name"
          />
        </div>

        <div className="security-master-form-group">
          <label>TAN No:</label>
          <input
            type="text"
            name="tanNo"
            value={formData.tanNo || ""}
            onChange={handleChange}
            placeholder="Enter TAN Number"
          />
        </div>
      </div>

      {/* Row 3 */}
      <div className="security-master-form-row">
        <div className="security-master-form-group">
          <label>Security Code Tax:</label>
          <input
            type="text"
            name="secCodeTax"
            value={formData.secCodeTax || ""}
            onChange={handleChange}
            placeholder="Enter Security Code Tax"
          />
        </div>

        <div className="security-master-form-group">
          <label>PAN No:</label>
          <input
            type="text"
            name="panNo"
            value={formData.panNo || ""}
            onChange={handleChange}
            placeholder="Enter PAN Number"
            readOnly // ✅ auto-filled
          />
        </div>

        <div className="security-master-form-group">
          <label>Info Source Abbreviation:</label>
          <input
            type="text"
            name="infoSourceAbbr"
            value={formData.infoSourceAbbr || ""}
            onChange={handleChange}
            placeholder="Enter Info Source Abbreviation"
            readOnly // ✅ auto-filled
          />
        </div>
      </div>

      <div className="security-master-form-row">
        <div className="security-master-form-group">
          <label>Security Type:</label>
          <select
            name="securityType"
            value={formData.securityType || ""}
            onChange={handleChange}
          >
            <option value="">-- Select Security Type --</option>
            <option value="Listed Equity Shares">Listed Equity Shares</option>
            <option value="Unlisted Equity Shares">Unlisted Equity Shares</option>
            <option value="Bond">Bond</option>
            <option value="Debenture">Debenture</option>
            <option value="Mutual Fund">Mutual Fund</option>
            <option value="ETF">ETF</option>
            <option value="Equity">Equity</option>
            <option value="Share">Share</option>
          </select>
        </div>
        <div className="security-master-form-group">
          <label>Security Class:</label>
          <input
            type="text"
            name="secClass"
            value={formData.secClass || ""}
            onChange={handleChange}
            placeholder="Auto-filled Security Class"
            readOnly // ✅ auto-filled from Security Type
          />
        </div>

        
      </div>

      {/* Buttons */}
      <div className="buttons-security-form">
        <button type="submit" className="security-master-submit-btn">
          Save
        </button>
        <button
          type="button"
          className="security-master-display-btn"
          onClick={handleView}
        >
          View
        </button>

        <button
          type="button"
          className="security-master-next-btn"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default SecurityMasterForm;
