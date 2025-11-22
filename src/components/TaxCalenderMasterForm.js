import React, { useState, useEffect } from "react";
import "./TaxCalendarMasterForm.css";  
import {
  getAllTaxMasters,
  createTaxMaster,
  getAllCalendarCodes,
} from "../service/TaxCalendarService";
 

export default function TaxCalendarMaster() {
  const [masters, setMasters] = useState([]);
  const [calendarCodes, setCalendarCodes] = useState([]);
  const [form, setForm] = useState({
    taxType: "",
    formName: "",
    frequency: "",
    calendarId: "",
    applicableTo: "",
    description: "",
  });

  useEffect(() => {
    fetchMasters();
    fetchCalendarCodes();
  }, []);

  const fetchMasters = async () => {
    const res = await getAllTaxMasters();
    setMasters(res.data);
  };

  const fetchCalendarCodes = async () => {
    const res = await getAllCalendarCodes();
    setCalendarCodes(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  await createTaxMaster({
    taxType: form.taxType,
    formName: form.formName,
    frequency: form.frequency,
    applicableTo: form.applicableTo,
    description: form.description,
    calendarCode: { calendarId: Number(form.calendarId) }, // ✅ FIX
  });
  setForm({
    taxType: "",
    formName: "",
    frequency: "",
    calendarId: "",
    applicableTo: "",
    description: "",
  });
  fetchMasters();
};


  return (
    <div className="tax-cal-root">
      <div className="tax-cal-card">
        <h2>📅 Tax Calendar Master</h2>

        <form className="tax-form" onSubmit={handleSubmit}>
          <input
            name="taxType"
            placeholder="Tax Type"
            value={form.taxType}
            onChange={handleChange}
            required
          />
          <input
            name="formName"
            placeholder="Form Name"
            value={form.formName}
            onChange={handleChange}
            required
          />
          <input
            name="frequency"
            placeholder="Frequency"
            value={form.frequency}
            onChange={handleChange}
          />

          {/* Dropdown */}
          <select
            name="calendarId"
            value={form.calendarId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Calendar Code --</option>
            {calendarCodes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code} ({c.description})
              </option>
            ))}
          </select>

          <input
            name="applicableTo"
            placeholder="Applicable To"
            value={form.applicableTo}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>

        <div className="table-wrap">
          <table className="tax-table">
            <thead>
              <tr>
                <th>Tax Type</th>
                <th>Form</th>
                <th>Frequency</th>
                <th>Calendar Code</th>
                <th>Applicable To</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {masters.length > 0 ? (
                masters.map((m) => (
                  <tr key={m.id}>
                    <td>{m.taxType}</td>
                    <td>{m.formName}</td>
                    <td>{m.frequency}</td>
                    <td>{m.calendarCode?.code}</td>
                    <td>{m.applicableTo}</td>
                    <td>{m.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="empty" colSpan="6">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
