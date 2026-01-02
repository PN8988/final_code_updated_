import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./DematForm.css";

export default function DematForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const [client, setClient] = useState(null);

  const [form, setForm] = useState({
    panId: "",
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

  //------------------------------------
  // 🔥 Fetch Client Details by PAN ID
  //------------------------------------
  const fetchClientByPan = async (panId) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/client/getByPan/${panId}`
      );

      if (res.data) {
        setClient(res.data);

        setForm((prev) => ({
          ...prev,
          d_AccountHolderName: res.data.clientName,
          regiMobileNo: res.data.mobileNumber,
        }));
      }
    } catch (err) {
      console.log("Client not found for PAN");
      setClient(null);
    }
  };

  //------------------------------------
  // 🔥 Auto Fetch Demat Master by DPID
  //------------------------------------
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
          nomineeDetails: res.data.nomineeDetails || "",
        }));
      }
    } catch (err) {
      console.log("No matching DPID found");
    }
  };

  //------------------------------------
  // 🔥 Handle Input Change
  //------------------------------------
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "panId" && value.length === 10) {
      fetchClientByPan(value);
    }

    if (name === "dpId" && value.length >= 6) {
      fetchDematMaster(value);
    }
  }

  //------------------------------------
  // 🔥 Validation
  //------------------------------------
  function validate() {
    const errs = {};
    if (!form.panId) errs.panId = "Required";
    if (!form.dematAccountNo) errs.dematAccountNo = "Required";
    if (!form.d_AccountHolderName) errs.d_AccountHolderName = "Required";
    if (!form.dpId) errs.dpId = "Required";
    if (!form.loginId) errs.loginId = "Required";
    if (!form.password) errs.password = "Required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  //------------------------------------
  // 🔥 Submit
  //------------------------------------
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      const payload = {
        ...form,
        clientProfile: { profileId: client?.profileId },
      };

      await axios.post("http://localhost:8080/api/demat/add", payload);
      alert("Demat Saved Successfully!");
    } catch (error) {
      console.error("Error saving demat:", error);
      alert("Failed to save. Check backend.");
    }
  }

  return (
    <div className="demat-container">
      <button
        className="btn-secondary"
        onClick={() => navigate("/demat-list")}
      >
        View Demat List
      </button>

      <form onSubmit={handleSubmit} className="demat-form">
        <h3 className="form-title">Add Demat Account</h3>

        {/* 🔹 PAN INPUT */}
        <div className="form-field">
          <label>PAN ID</label>
          <input
            name="panId"
            value={form.panId}
            onChange={handleChange}
            placeholder="Enter PAN ID"
            maxLength={10}
          />
          {errors.panId && <p className="error-text">{errors.panId}</p>}
        </div>

        {/* 🔹 Show Client Info (Like BankForm) */}
        {client && (
          <div className="client-box">
            <h4>Client Information</h4>
            <p><b>Name:</b> {client.clientName}</p>
            <p><b>Email:</b> {client.emailId}</p>
            <p><b>Mobile:</b> {client.mobileNumber}</p>
            <p><b>Profile ID:</b> {client.profileId}</p>
          </div>
        )}

        <div className="form-grid">
          {/* Demat fields remain same */}
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

          <div className="form-field">
            <label>Account Holder Name</label>
            <input
              name="d_AccountHolderName"
              value={form.d_AccountHolderName}
              onChange={handleChange}
              placeholder="Enter Account Holder Name"
            />
          </div>

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

          <div className="form-field full-width">
            <label>Nominee Details</label>
            <textarea
              name="nomineeDetails"
              value={form.nomineeDetails}
              onChange={handleChange}
              placeholder="Enter nominee details"
            />
          </div>

          <div className="form-field">
            <label>Login ID</label>
            <input
              name="loginId"
              value={form.loginId}
              onChange={handleChange}
              placeholder="Enter Login ID"
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
          </div>

        </div>

        <button type="submit" className="btn-primary">Save</button>
      </form>
    </div>
  );
}
