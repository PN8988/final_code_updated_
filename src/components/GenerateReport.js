// GeneratedReport.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ for routing to form
import "./GenerateReport.css";
import * as XLSX from "xlsx";          
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function GeneratedReport() {
  const [records, setRecords] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/calendar/getAllCalendarDetails")
      .then((res) => setRecords(res.data))
      .catch((err) => console.error(err));
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year.slice(-2)}`;
  };

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const format = window.prompt("Enter file format (excel/pdf):", "excel");
    if (!format) return;

    if (format.toLowerCase() === "excel") {
      const ws = XLSX.utils.json_to_sheet(records);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Report");
      XLSX.writeFile(wb, "GeneratedReport.xlsx");
    } else if (format.toLowerCase() === "pdf") {
      const doc = new jsPDF();
      doc.text("Generated Report", 14, 10);
      doc.autoTable({
        head: [["Sr. No", "Financial Year", "Assessment Year", "From Date", "To Date", "Long Name", "Action"]],
        body: records.map((r, i) => [
          i + 1,
          r.financialYear,
          r.assessmentYear,
          formatDate(r.fromDate),
          formatDate(r.toDate),
          r.longName,
          "Edit / Delete",
        ]),
      });
      doc.save("GeneratedReport.pdf");
    } else {
      alert("❌ Invalid format! Please choose excel or pdf.");
    }
  };

  // 🔹 Edit
  const handleEdit = (record) => {
    navigate("/tax-year-form", { state: { record } });
  };

  // 🔹 Delete
  const handleDelete = (recordId) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    axios
      .delete(`http://localhost:8080/api/calendar/delete/${recordId}`)
      .then(() => setRecords(records.filter((r) => r.id !== recordId)))
      .catch((err) => console.error(err));
  };

  // 🔹 Add → Navigate to TaxCalendarForm (add mode)
  const handleAdd = () => {
    navigate("/tax-year-form", { state: { mode: "add" } });
  };

  if (!isVisible) return null;

  return (
    <div className={`report-page ${isMaximized ? "maximized" : ""}`}>
      <div className="report-window-controls">
        <button
          className="control-btn minimize"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          {isMinimized ? "🔽" : "➖"}
        </button>
        <button
          className="control-btn maximize"
          onClick={() => setIsMaximized(!isMaximized)}
        >
          {isMaximized ? "🔳" : "⬜"}
        </button>
        <button
          className="control-btn close"
          onClick={() => setIsVisible(false)}
        >
          ❌
        </button>
      </div>

      <h2>📊 Generated Report</h2>

      {/* ✅ Add Button */}
      <div className="report-header-actions">
        <button onClick={handleAdd}>➕ Add Financial Year</button>
      </div>

      {!isMinimized && (
        <table>
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Financial Year</th>
              <th>Assessment Year</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Long Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={r.id || i}>
                <td>{i + 1}</td>
                <td>{r.financialYear}</td>
                <td>{r.assessmentYear}</td>
                <td>{formatDate(r.fromDate)}</td>
                <td>{formatDate(r.toDate)}</td>
                <td>{r.longName}</td>
                <td>
                  <button onClick={() => handleEdit(r)}>✏️</button>
                  <button onClick={() => handleDelete(r.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="report-actions">
        <button onClick={handlePrint}>🖨️</button>
        <button onClick={handleDownload}>⬇️</button>
      </div>
    </div>
  );
}
