import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EmployerForm.css";

const EmployerForm = () => {
  const [tanNumber, setTanNumber] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [designation, setDesignation] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [formA, setFormA] = useState(null);
  const [formB, setFormB] = useState(null);
  const [tanNotFound, setTanNotFound] = useState(false);

  // 🔹 new state for autosuggestions
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  // 🔹 Fetch employer details when user leaves input
  const handleTanBlur = async () => {
    if (!tanNumber) return;
    try {
      const res = await axios.get(
        `http://localhost:8080/api/residential/getEmployer/${tanNumber}`
      );
      if (res.data) {
        setEmployerName(res.data.employerName || "");
        setPanNumber(res.data.panNumber || "");
        setTanNotFound(false);
      } else {
        setEmployerName("");
        setPanNumber("");
        setTanNotFound(true);
      }
    } catch (err) {
      console.error("Employer not found", err);
      setEmployerName("");
      setPanNumber("");
      setTanNotFound(true);
    }
  };

  // 🔹 Fetch autosuggestions as user types
  const handleTanChange = async (value) => {
    setTanNumber(value);
    if (value.length >= 2) {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/employer/search?tan=${value}`
        );
        setSuggestions(res.data || []);
      } catch (err) {
        console.error("Error fetching suggestions", err);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  // 🔹 When user selects a suggestion
  const handleSelectSuggestion = (tan, empName, pan) => {
    setTanNumber(tan);
    setEmployerName(empName || "");
    setPanNumber(pan || "");
    setSuggestions([]); // hide list
    setTanNotFound(false);
  };

  // 🔹 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tanNumber", tanNumber);
    formData.append("employerName", employerName);
    formData.append("panNumber", panNumber);
    formData.append("designation", designation);
    formData.append("fromDate", fromDate);
    formData.append("toDate", toDate);
    if (formA) formData.append("formA", formA);
    if (formB) formData.append("formB", formB);

    try {
      await axios.post("http://localhost:8080/api/employer/employerForm", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Form submitted successfully");
      navigate("/employerlist");
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  return (
    <div className="employer-form-container">
      <h2>Employer Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="employer-form-row">
          <div className="employer-form-group">
            <label>TAN Number</label>
            <div className="tan-input-container">
              <input
                type="text"
                placeholder="Enter TAN Number"
                value={tanNumber}
                onChange={(e) => handleTanChange(e.target.value)}
                onBlur={handleTanBlur}
                required
              />
              {tanNotFound && (
                <button
                  type="button"
                  className="btn-add"
                  onClick={() => navigate("/employermasterform")}
                >
                  +
                </button>
              )}
            </div>
            {/* 🔹 Suggestions dropdown */}
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((s, idx) => (
                  <li
                    key={idx}
                    onClick={() =>
                      handleSelectSuggestion(
                        s.tanNumber,
                        s.employerName,
                        s.panNumber
                      )
                    }
                  >
                    {s.tanNumber} - {s.employerName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="employer-form-group">
            <label>Employer Name</label>
            <input
              type="text"
              value={employerName}
              readOnly
              placeholder="Auto-filled"
            />
          </div>
        </div>

        <div className="employer-form-row">
          <div className="employer-form-group">
            <label>Employer PAN</label>
            <input
              type="text"
              value={panNumber}
              readOnly
              placeholder="Auto-filled"
            />
          </div>

          <div className="employer-form-group">
            <label>Designation</label>
            <input
              type="text"
              placeholder="Enter Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="employer-form-row">
          <div className="form-group">
            <label>From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
          </div>

          <div className="employer-form-group">
            <label>To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="employer-form-row">
          <div className="employer-form-group">
            <label>Upload Form-A</label>
            <input type="file" onChange={(e) => setFormA(e.target.files[0])} />
          </div>

          <div className="employer-form-group">
            <label>Upload Form-B</label>
            <input type="file" onChange={(e) => setFormB(e.target.files[0])} />
          </div>
        </div>
        <div className="btns-groupp2">
          <button type="submit" className="submit-btns">
            Save
          </button>
          <button
            type="button"
            className="display-btn"
            onClick={() => {
              navigate("/employerlist");
            }}
          >
            View
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployerForm;
