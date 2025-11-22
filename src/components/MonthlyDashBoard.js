import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./MonthlyDashboard.css";

export default function MonthlyDashboard() {
  const location = useLocation();
  const { pan, clientName, bank } = location.state || {};

  const financialYears = ["2024-25", "2025-26", "2026-27"];

  const months = [
    "April", "May", "June", "July", "August", "September",
    "October", "November", "December", "January", "February", "March"
  ];

  const quarters = {
    Q1: ["April", "May", "June"],
    Q2: ["July", "August", "September"],
    Q3: ["October", "November", "December"],
    Q4: ["January", "February", "March"]
  };

  //const [selectedFY, setSelectedFY] = useState(financialYears[0]);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [monthStatus, setMonthStatus] = useState(
    months.reduce((acc, month) => {
      acc[month] = "red";
      return acc;
    }, { Yearly: "red" })
  );

  const handleFileChange = (e, monthName) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFiles(prev => ({ ...prev, [monthName]: file }));
    setMonthStatus(prev => ({ ...prev, [monthName]: "yellow" }));
  };

  const handleConfirm = (monthName) => {
    setMonthStatus(prev => ({ ...prev, [monthName]: "green" }));
  };

  const handleViewFile = (monthName) => {
    const file = uploadedFiles[monthName];
    if (!file) return alert("⚠️ No file uploaded for this month.");
    window.open(URL.createObjectURL(file), "_blank");
  };

  const handleDownload = (monthName) => {
    const file = uploadedFiles[monthName];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  
  const handlePrint = (monthName) => {
    const file = uploadedFiles[monthName];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const printWindow = window.open(url, "_blank");
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  return (
    <div className="monthly-container">
      {/* ✅ Client Basic Information */}
      <div className="client-info-top">
  <h2>Client Information</h2>
  <div className="client-info-container">
    <div className="client-info-item">
      <strong>Client Name:</strong> {clientName || "N/A"}
    </div>
    <div className="client-info-item">
      <strong>PAN No:</strong> {pan || "N/A"}
    </div>
    <div className="client-info-item">
      <strong>Bank Name:</strong> {bank?.name || "N/A"}
    </div>
    <div className="client-info-item">
      <strong>IFSC Code:</strong> {bank?.ifsc || "N/A"}
    </div>
    <div className="client-info-item">
      <strong>Account No:</strong> {bank?.accountNo || "N/A"}
    </div>
  </div>
</div>


      {/* ✅ Upload Section */}
      <div className="top-header">
        <h2>Bank Statement Upload</h2>
      </div>

      <div className="upload-instructions">
        <h3>Instructions for Uploading Documents</h3>
        <ul>
          <li>🔴 Red: Pending – No file uploaded.</li>
          <li>🟡 Yellow: Uploaded – File uploaded, awaiting confirmation.</li>
          <li>🟢 Green: Confirmed – File confirmed by employee.</li>
          <li>Please upload PDF/XLSX/XLS files only.</li>
          <li>Ensure files are clear and readable before uploading.</li>
        </ul>
      </div>

      {/* <div className="financial-year-selector">
        <label>Financial Year: </label>
        <select value={selectedFY} onChange={e => setSelectedFY(e.target.value)}>
          {financialYears.map(fy => (
            <option key={fy} value={fy}>{fy}</option>
          ))}
        </select>
      </div> */}

      <div className="half-year-labels">
        <div className="h1-label">H1</div>
        <div className="h2-label">H2</div>
      </div>

      <div className="quarters-row">
        {Object.keys(quarters).map(q => (
          <div key={q} className="quarter">{q}</div>
        ))}
      </div>

      <div className="months-3x4">
        {Object.values(quarters).map((quarterMonths, colIdx) => (
          <div key={colIdx} className="month-column">
            {quarterMonths.map(monthName => (
              <div key={monthName} className="month-label">
                <div className={`status-circle ${monthStatus[monthName]}`}>
                  <span className="month-text">{monthName}</span>
                </div>

                {monthStatus[monthName] !== "green" && (
                  <label className="upload-btn">
                    Upload
                    <input type="file" onChange={e => handleFileChange(e, monthName)} hidden />
                  </label>
                )}

                {uploadedFiles[monthName] && (
                  <>
                    <button className="view-btn" onClick={() => handleViewFile(monthName)}>View</button>
                    {monthStatus[monthName] === "yellow" && (
                      <button className="confirm-btn" onClick={() => handleConfirm(monthName)}>Confirm</button>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="yearly-upload">
        <div className={`status-circle ${monthStatus["Yearly"]}`}>
          <span className="month-text">Yearly</span>
        </div>

        {monthStatus["Yearly"] !== "green" && (
          <label className="upload-btn">
            Upload
            <input type="file" onChange={e => handleFileChange(e, "Yearly")} hidden />
          </label>
        )}

        {uploadedFiles["Yearly"] && (
          <>
            <button className="view-btn" onClick={() => handleViewFile("Yearly")}>View</button>
            {monthStatus["Yearly"] === "yellow" && (
              <button className="confirm-btn" onClick={() => handleConfirm("Yearly")}>Confirm</button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
