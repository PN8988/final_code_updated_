import React, { useState } from "react";
import "./SecurityClassMaster.css";

const SecurityClassMaster = () => {
  const [formData, setFormData] = useState({
    classCode: "",
    className: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Security Class Data: ", formData);
  };

  return (
    <form className="security-class-form" onSubmit={handleSubmit}>
      <h2>Security Class Form</h2>

      {/* Row 1 */}
      <div className="form-row">
        <div className="form-group">
          <label>Class Code:</label>
          <input
            type="text"
            name="classCode"
            value={formData.classCode}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Class Name:</label>
          <input
            type="text"
            name="className"
            value={formData.className}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="form-row">
        <div className="form-group full-width">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      <button type="submit" className="submit-btn">
        Save Class
      </button>
    </form>
  );
};

export default SecurityClassMaster;
