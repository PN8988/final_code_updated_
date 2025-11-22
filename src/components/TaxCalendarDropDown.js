import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TaxCalendarDropdown.css";   // ✅ Import CSS

const TaxCalendarDropdown = () => {
  const [taxCalendars, setTaxCalendars] = useState([]);
  const [fy, setFy] = useState("2025-26");   // ✅ match your seeder/current FY
  const [filter, setFilter] = useState("MONTH");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/tax-calendar/financialyear/${fy}`)
      .then((res) => setTaxCalendars(res.data))
      .catch((err) => console.error("Error fetching tax calendars", err));
  }, [fy]);

  // ✅ Filtering logic adapted for TaxCalendar fields
  const filtered = taxCalendars.filter((c) => {
    if (filter === "MONTH") return c.monthCode;
    if (filter === "QUARTER") return c.quarter;
    if (filter === "HALF") return c.halfYear;
    return true;
  });

  return (
    <div className="tax-calendar-container">
      <h3>Tax Calendar Master (FY {fy})</h3>

      <label>Financial Year:</label>
      <input
        type="text"
        value={fy}
        onChange={(e) => setFy(e.target.value)}
        placeholder="e.g. 2025-26"
      />

      <label>Filter:</label>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="MONTH">Months</option>
        <option value="QUARTER">Quarters</option>
        <option value="HALF">Half-Year</option>
      </select>

      <label>Select Code:</label>
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value=""> Select </option>
        {filtered.map((c) => (
          <option key={c.taxId} value={c.monthCode || c.quarter || c.halfYear}>
            {c.monthCode
              ? `${c.monthCode} - ${c.monthName}`
              : c.quarter
              ? c.quarter
              : c.halfYear}
            {c.dueDate ? ` (Due: ${c.dueDate})` : ""}
          </option>
        ))}
      </select>

      {/* ✅ Direct Calendar Display instead of separate table */}
      <div className="calendar-list">
        <h4>Calendar Entries</h4>
        {filtered.map((c) => (
          <div
            key={c.taxId}
            className={`calendar-card ${
              selected === (c.monthCode || c.quarter || c.halfYear)
                ? "highlight"
                : ""
            }`}
          >
            <p>
              <strong>
                {c.monthCode
                  ? `${c.monthCode} - ${c.monthName}`
                  : c.quarter
                  ? c.quarter
                  : c.halfYear}
              </strong>
            </p>
            {c.dueDate && <p>Due Date: {c.dueDate}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaxCalendarDropdown;
