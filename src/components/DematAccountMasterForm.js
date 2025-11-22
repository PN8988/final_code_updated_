import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DematAccountMasterForm.css";

const emptyForm = {
  dpid: "", // New field
  depository: "",
  brokerName: "",
  openingDate: "",
  website: "",
  supportNumber: "",
  loginId: "",
  password: "",
  registeredMobileNo: "",
  nomineeDetails: "",
};

function DematAccountMasterForm() {
  const [form, setForm] = useState(emptyForm);
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/demat/getAllDemat`);
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId !== null) {
        await axios.put(`http://localhost:8080/api/demat/updateDematmaster/${editingId}`, form);
        setMsg("Updated successfully.");
      } else {
        await axios.post("http://localhost:8080/api/demat/adddemat", form);
        setMsg("Saved successfully.");
      }
      setForm(emptyForm);
      setEditingId(null);
      fetchData();
    } catch (err) {
      console.error("Error saving data:", err);
      setMsg("Error saving data.");
    }

    setTimeout(() => setMsg(""), 3000);
  };

  const onEdit = (item) => {
    setEditingId(item.id);
    setForm(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/demat/deletedemat/${id}`);
      setMsg("Deleted successfully.");
      fetchData();
    } catch (err) {
      console.error("Error deleting:", err);
      setMsg("Error deleting.");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  const onCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div className="demat-wrap">
      <h2>Demat Account Master</h2>

      {msg && <div className="flash">{msg}</div>}

      <form className="demat-form" onSubmit={onSubmit}>
        <div className="demat-accountmaster-form">

          {/* DPID + Depository */}
          <div className="demat-form-row">
            <div className="demat-form-group">
              <label>DPID</label>
              <input
                type="text"
                name="dpid"
                value={form.dpid}
                onChange={onChange}
                placeholder="Depository Participant ID"
                required
              />
            </div>

            <div className="demat-form-group">
              <label>Depository</label>
              <input
                type="text"
                name="depository"
                value={form.depository}
                onChange={onChange}
                placeholder="NSDL / CDSL"
              />
            </div>
          </div>

          {/* Broker Name + Opening Date */}
          <div className="demat-form-row">
            <div className="demat-form-group">
              <label>Broker Name</label>
              <input
                type="text"
                name="brokerName"
                value={form.brokerName}
                onChange={onChange}
                placeholder="Broker Name"
              />
            </div>
            <div className="demat-form-group">
              <label>Opening Date</label>
              <input
                type="date"
                name="openingDate"
                value={form.openingDate}
                onChange={onChange}
              />
            </div>
          </div>

          {/* Website + Support No */}
          <div className="demat-form-row">
            <div className="demat-form-group">
              <label>Website</label>
              <input
                type="url"
                name="website"
                value={form.website}
                onChange={onChange}
                placeholder="https://broker.example.com"
              />
            </div>
            <div className="demat-form-group">
              <label>Support No</label>
              <input
                type="text"
                name="supportNumber"
                value={form.supportNumber}
                onChange={onChange}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          {/* Login + Password */}
          <div className="demat-form-row">
            <div className="demat-form-group">
              <label>Login ID</label>
              <input
                type="text"
                name="loginId"
                value={form.loginId}
                onChange={onChange}
                placeholder="your.login.id"
                required
              />
            </div>
            <div className="demat-form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="********"
                required
              />
            </div>
          </div>

          {/* Registered Mobile No + Nominee */}
          <div className="demat-form-row">
            <div className="demat-form-group">
              <label>Reg. Mo. No</label>
              <input
                type="text"
                name="registeredMobileNo"
                value={form.registeredMobileNo}
                onChange={onChange}
                placeholder="Registered Mobile No"
              />
            </div>
            <div className="demat-form-group">
              <label>Nominee Details</label>
              <input
                type="text"
                name="nomineeDetails"
                value={form.nomineeDetails}
                onChange={onChange}
                placeholder="Nominee Details"
              />
            </div>
          </div>

        </div>

        <div className="actions">
          <button type="submit">{editingId !== null ? "Update" : "Save"}</button>

          {editingId !== null && (
            <button type="button" className="secondary" onClick={onCancel}>
              Cancel
            </button>
          )}

          <button
            type="button"
            className="display-view"
            onClick={() => navigate("/dematmaster-list")}
          >
            View
          </button>
        </div>
      </form>
    </div>
  );
}

export default DematAccountMasterForm;
