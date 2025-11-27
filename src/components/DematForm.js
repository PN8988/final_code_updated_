import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./DematForm.css";

export default function DematForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const profileId = location.state?.profileId;

  const [form, setForm] = useState({
    dematAccountNo: "",
    d_AccountHolderName: "",
    dpId: "",
    depository: "",
    brokerName: "",
    website: "",
    loginId: "",
    password: "",
    supportNo: "",
    regiMobileNo: "",
    openingDate: "",
    nomineeDetails: "",
  });

  const [errors, setErrors] = useState({});

  // --------------------------
  // 🔥 Auto Fetch Demat Master
  // --------------------------
  const fetchDematMaster = async (dpid) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/demat/getByDpid/${dpid}`
      );

      if (res.data) {
        setForm((prev) => ({
          ...prev,
          depository: res.data.depository || "",
          brokerName: res.data.brokerName || "",
          website: res.data.website || "",
          supportNo: res.data.supportNumber || "",
          openingDate: res.data.openingDate || "",
          regiMobileNo: res.data.registeredMobileNo || "",
          nomineeDetails: res.data.nomineeDetails || "",
        }));
      }
    } catch (err) {
      console.log("No matching DPID found");
    }
  };

  // --------------------------
  // 🔥 Handle Input Change
  // --------------------------
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "dpId" && value.length >= 6) {
      fetchDematMaster(value);
    }
  }

  // --------------------------
  // 🔥 Validate Required Fields
  // --------------------------
  function validate() {
    const errs = {};
    if (!form.dematAccountNo) errs.dematAccountNo = "Required";
    if (!form.d_AccountHolderName) errs.d_AccountHolderName = "Required";
    if (!form.dpId) errs.dpId = "Required";
    if (!form.loginId) errs.loginId = "Required";
    if (!form.password) errs.password = "Required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  // --------------------------
  // 🔥 Submit Demat Form
  // --------------------------
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      const payload = {
        ...form,
        clientProfile: { profileId },
      };

      await axios.post("http://localhost:8080/api/demat/add", payload);
      alert("Demat Saved Successfully!");
    } catch (error) {
      console.error("Error saving demat:", error);
      alert("Failed to save. Check backend.");
    }
  }

  // --------------------------
  // 🔥 UI
  // --------------------------
  return (
    <div className="demat-container">
      <button
        className="btn-secondary"
        onClick={() => navigate("/demat-list", { state: { profileId } })}
      >
        View Demat List
      </button>

      <form onSubmit={handleSubmit} className="demat-form">
        <h3 className="form-title">Add Demat Account</h3>

        <div className="form-grid">

          {/* Demat Account No */}
          <div className="form-field">
            <label>Demat Account No</label>
            <input
              name="dematAccountNo"
              value={form.dematAccountNo}
              onChange={handleChange}
              placeholder="Enter Demat Account Number"
            />
            {errors.dematAccountNo && (
              <p className="error-text">{errors.dematAccountNo}</p>
            )}
          </div>

          {/* Account Holder Name */}
          <div className="form-field">
            <label>Account Holder Name</label>
            <input
              name="d_AccountHolderName"
              value={form.d_AccountHolderName}
              onChange={handleChange}
              placeholder="Enter Account Holder Name"
            />
            {errors.d_AccountHolderName && (
              <p className="error-text">{errors.d_AccountHolderName}</p>
            )}
          </div>

          {/* DP ID */}
          <div className="form-field">
            <label>DP ID</label>
            <input
              name="dpId"
              value={form.dpId}
              onChange={handleChange}
              placeholder="Enter DPID"
            />
            {errors.dpId && <p className="error-text">{errors.dpId}</p>}
          </div>

          <div className="form-field">
            <label>Broker Name</label>
            <input name="brokerName" value={form.brokerName} readOnly />
          </div>

          <div className="form-field">
            <label>Depository</label>
            <input name="depository" value={form.depository} readOnly />
          </div>

          <div className="form-field">
            <label>Website</label>
            <input name="website" value={form.website} readOnly />
          </div>

          <div className="form-field">
            <label>Support Number</label>
            <input name="supportNo" value={form.supportNo} readOnly />
          </div>

          <div className="form-field">
            <label>Opening Date</label>
            <input type="date" name="openingDate" value={form.openingDate} readOnly />
          </div>

          <div className="form-field">
            <label>Registered Mobile No</label>
            <input name="regiMobileNo" value={form.regiMobileNo} readOnly />
          </div>

          {/* ✅ Editable Nominee */}
          <div className="form-field full-width">
            <label>Nominee Details</label>
            <textarea
              name="nomineeDetails"
              value={form.nomineeDetails}
              onChange={handleChange}
              placeholder="Enter nominee details"
            />
          </div>

          {/* Login ID */}
          <div className="form-field">
            <label>Login ID</label>
            <input
              name="loginId"
              value={form.loginId}
              onChange={handleChange}
              placeholder="Enter Login ID"
            />
            {errors.loginId && <p className="error-text">{errors.loginId}</p>}
          </div>

          {/* Password */}
          <div className="form-field">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

        </div>

        <button type="submit" className="btn-primary">Save</button>
      </form>
    </div>
  );
}
