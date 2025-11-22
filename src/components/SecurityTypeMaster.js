import React, { useState } from "react";
import "./SecurityTypeMaster.css";

const SecurityTypeMaster = () => {
  const [formData, setFormData] = useState({
    typeCode: "",
    typeName: "",
    riskLevel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Security Type Data: ", formData);
  };

  return (
    <form className="security-type-form" onSubmit={handleSubmit}>
      <h2>Security Type Form</h2>
      <label>Type Code:</label>
      <input type="text" name="typeCode" value={formData.typeCode} onChange={handleChange} />

      <label>Type Name:</label>
      <input type="text" name="typeName" value={formData.typeName} onChange={handleChange} />

      <label>Risk Level:</label>
      <select name="riskLevel" value={formData.riskLevel} onChange={handleChange}>
        <option value="">Select</option>
        <option value="Low">Low</option>
        <option value="Moderate">Moderate</option>
        <option value="High">High</option>
      </select>

      <button type="submit">Save Type</button>
    </form>
  );
};

export default SecurityTypeMaster;
