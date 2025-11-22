import React, { useState, useEffect } from 'react';
import './RentalIncome.css';   // ✅ Import CSS

export default function RentalIncomeForm({ initial, onSaved }) {
  const [form, setForm] = useState(
    initial || {
      propertyName: '',
      tenantName: '',
      pan: '',
      amount: 0,
      receivedDate: '',
      frequency: 'Monthly',
    }
  );

  useEffect(() => {
    setForm(
      initial || {
        propertyName: '',
        tenantName: '',
        pan: '',
        amount: 0,
        receivedDate: '',
        frequency: 'Monthly',
      }
    );
  }, [initial]);

  const BASE = "http://localhost:8080/api/rental";

  const createRental = async (data) => {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  };

  const updateRental = async (id, data) => {
    const res = await fetch(`${BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  };

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, amount: Number(form.amount) };

    let saved;
    if (form.id) {
      saved = await updateRental(form.id, payload);
    } else {
      saved = await createRental(payload);
    }
    onSaved(saved);

    setForm({
      propertyName: '',
      tenantName: '',
      pan: '',
      amount: 0,
      receivedDate: '',
      frequency: 'Monthly',
    });
  };

  return (
    <form className="rental-form" onSubmit={submit}>
      <div className="form-grid">
        <div>
          <label>Property</label>
          <input
            name="propertyName"
            value={form.propertyName}
            onChange={handle}
            required
          />
        </div>
        <div>
          <label>Tenant</label>
          <input
            name="tenantName"
            value={form.tenantName}
            onChange={handle}
          />
        </div>
        <div>
          <label>PAN</label>
          <input
            name="pan"
            value={form.pan}
            onChange={handle}
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            name="amount"
            value={form.amount}
            onChange={handle}
            type="number"
            step="0.01"
            required
          />
        </div>
        <div>
          <label>Received Date</label>
          <input
            name="receivedDate"
            value={form.receivedDate}
            onChange={handle}
            type="date"
          />
        </div>
        <div>
          <label>Frequency</label>
          <select
            name="frequency"
            value={form.frequency}
            onChange={handle}
          >
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>
        </div>
      </div>
      <div className="form-actions">
        <button type="submit">{form.id ? 'Update' : 'Add'}</button>
      </div>
    </form>
  );
}
