import React, { useState } from "react";
import axios from "axios";
import "./ImportProcessForm.css";
import TransactionReport from "./TransactionReport";
import { useNavigate, useLocation } from "react-router-dom";

const ImportProcessForm = () => {
  const [financialYear, setFinancialYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("");
  const [selectedHalfYear, setSelectedHalfYear] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [showReport, setShowReport] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const financialYears = ["2023-2024", "2024-2025", "2025-2026", "2026-2027"];
  const halfYears = ["H1", "H2"];
  const quarters = ["Q1", "Q2", "Q3", "Q4"];
  const months = [
    { code: "M01", name: "APR", days: 30, qtr: "Q1", hf: "H1" },
    { code: "M02", name: "MAY", days: 31, qtr: "Q1", hf: "H1" },
    { code: "M03", name: "JUN", days: 30, qtr: "Q1", hf: "H1" },
    { code: "M04", name: "JUL", days: 31, qtr: "Q2", hf: "H1" },
    { code: "M05", name: "AUG", days: 31, qtr: "Q2", hf: "H1" },
    { code: "M06", name: "SEP", days: 30, qtr: "Q2", hf: "H1" },
    { code: "M07", name: "OCT", days: 31, qtr: "Q3", hf: "H2" },
    { code: "M08", name: "NOV", days: 30, qtr: "Q3", hf: "H2" },
    { code: "M09", name: "DEC", days: 31, qtr: "Q3", hf: "H2" },
    { code: "M10", name: "JAN", days: 31, qtr: "Q4", hf: "H2" },
    { code: "M11", name: "FEB", days: 28, qtr: "Q4", hf: "H2" },
    { code: "M12", name: "MAR", days: 31, qtr: "Q4", hf: "H2" },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const client = location.state?.client;

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!financialYear || !selectedMonth || !selectedDate || !selectedFile) {
      alert("Please select all fields and a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("batchId", `${financialYear}-${selectedMonth}`);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/transactions/import",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setTransactions(res.data);
      setShowReport(true);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload file. Please check backend logs.");
    }
  };

  const handleNext = () => {
    const dummyData = [
      {
        tx_year: financialYear || "2024-2025",
        tx_month: selectedMonth || "M01",
        tx_date: selectedDate || "M01.01",
        transaction_type: "Payment",
        trn_vch_id: "TXN001",
        cheque_ref_no: "CHQ123",
        narration: "Payment to Vendor",
        ledger: "Bank A/C",
        payment_amt: 5000,
        receipt_amt: 0,
        balance_amt: 45000,
        payment_ledger: "Purchase A/C",
        recpt_ledger: "",
        contra_ledger: "",
      },
    ];
    setTransactions(dummyData);
    setShowReport(true);
    navigate("/bank-Import", { state: { transactions: dummyData } });
  };

  // Utility: check leap year
  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const getDatesForMonth = (monthCode, days) => {
    let adjustedDays = days;

    // Handle February (M11) based on financial year
    if (monthCode === "M11" && financialYear) {
      const startYear = parseInt(financialYear.split("-")[0], 10);
      const febYear = startYear + 1;
      if (isLeapYear(febYear)) {
        adjustedDays = 29;
      }
    }

    return Array.from({ length: adjustedDays }, (_, i) => {
      const day = String(i + 1).padStart(2, "0");
      return `${monthCode}.${day}`;
    });
  };

  // ✅ Final selection summary
  const getFinalSelection = () => {
    if (!financialYear) return "";

    if (selectedDate) {
      return `FY ${financialYear} ${selectedDate}`;
    }
    if (selectedMonth) {
      const monthObj = months.find((m) => m.code === selectedMonth);
      return `FY ${financialYear} ${selectedMonth}.${monthObj?.name}`;
    }
    if (selectedQuarter) {
      return `FY ${financialYear} ${selectedQuarter}`;
    }
    if (selectedHalfYear) {
      return `FY ${financialYear} ${selectedHalfYear}`;
    }

    return `FY ${financialYear}`;
  };

  if (showReport) {
    return <TransactionReport transactions={transactions} />;
  }

  return (
    <div className="import-form-container">
      <h2 className="title">Import Process Form</h2>

      {client && (
        <div className="client-info-box">
          <p><strong>PAN:</strong> {client.panId}</p>
          <p><strong>Name:</strong> {client.clientName}</p>
          <p><strong>Legal Name:</strong> {client.legalName}</p>
        </div>
      )}

      {/* Step 1: Financial Year */}
      <div className="import-form-group">
        <label>Financial Year:</label>
        <select
          value={financialYear}
          onChange={(e) => {
            setFinancialYear(e.target.value);
            setSelectedHalfYear("");
            setSelectedQuarter("");
            setSelectedMonth("");
            setSelectedDate("");
          }}
        >
          <option value="">-- Select Financial Year --</option>
          {financialYears.map((fy) => (
            <option key={fy} value={fy}>
              {fy}
            </option>
          ))}
        </select>
      </div>

      {/* Step 2: Half-Year */}
      {financialYear && (
        <div className="import-form-group">
          <label>Tax Half-Year:</label>
          <div className="options-grid">
            {halfYears.map((hf) => (
              <label key={hf} className="option-label">
                <input
                  type="radio"
                  name="halfyear"
                  value={hf}
                  checked={selectedHalfYear === hf}
                  onChange={(e) => {
                    setSelectedHalfYear(e.target.value);
                    setSelectedQuarter("");
                    setSelectedMonth("");
                    setSelectedDate("");
                  }}
                />
                {hf}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Quarter */}
      {selectedHalfYear && (
        <div className="import-form-group">
          <label>Tax Quarter:</label>
          <div className="options-grid">
            {quarters.map((q) => (
              <label key={q} className="option-label">
                <input
                  type="radio"
                  name="quarter"
                  value={q}
                  checked={selectedQuarter === q}
                  onChange={(e) => {
                    setSelectedQuarter(e.target.value);
                    setSelectedMonth("");
                    setSelectedDate("");
                  }}
                />
                {q}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Month */}
      {selectedQuarter && (
        <div className="import-form-group">
          <label>Select Month:</label>
          <div className="months-grid">
            {months.map((month) => (
              <label key={month.code} className="option-label vertical">
                <input
                  type="radio"
                  name="month"
                  value={month.code}
                  checked={selectedMonth === month.code}
                  onChange={(e) => {
                    setSelectedMonth(e.target.value);
                    setSelectedDate("");
                    setSelectedQuarter(month.qtr);
                    setSelectedHalfYear(month.hf);
                  }}
                />
                {`${month.code}_${month.name}`}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Date */}
      {selectedMonth && (
        <div className="import-form-group">
          <label>Select Date:</label>
          <div className="options-grid">
            {getDatesForMonth(
              months.find((m) => m.code === selectedMonth).code,
              months.find((m) => m.code === selectedMonth).days
            ).map((date) => (
              <label key={date} className="option-label">
                <input
                  type="radio"
                  name="date"
                  value={date}
                  checked={selectedDate === date}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                {date}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Selection Summary */}
      {financialYear && (
        <div className="selection-summary">
          <h4>Selected Period:</h4>
          <p>{getFinalSelection()}</p>
        </div>
      )}

      {/* File Input */}
      <div className="import-form-group">
        <label>Choose File (PDF / CSV / Excel / JSON):</label>
        <input
          id="fileInput"
          type="file"
          accept=".pdf,.csv,.xls,.xlsx,.json"
          onChange={handleFileChange}
        />
        {selectedFile && (
          <p className="file-info">Selected: {selectedFile.name}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="import-button-group">
        <button onClick={handleUpload} className="btn upload">
          Upload / Import
        </button>
        <button onClick={handleNext} className="btn next">
          Next
        </button>
      </div>
    </div>
  );
};

export default ImportProcessForm;
