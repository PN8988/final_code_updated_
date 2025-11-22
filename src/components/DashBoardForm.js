import React, { useState } from "react";
import "./Dashboard.css";

/*
  FY month mapping: 1..12 -> Apr..Mar
  1 => April, 2 => May, ... 12 => March
*/
const FY_MONTHS = [
  "01.Apr", "02.May", "03.Jun", "04.Jul", "05.Aug", "06.Sep",
  "07.Oct", "08.Nov", "09.Dec", "10.Jan", "11.Feb", "12.Mar"
];

function monthLabel(index) {
  return FY_MONTHS[index - 1] || "";
}

function parseFY(fyString) {
  const parts = fyString.split("-");
  const start = parseInt(parts[0], 10);
  return { startYear: start, endYear: start + 1 };
}

export default function TaxDashboard() {
  const [clients] = useState([
    { id: 1, name: "Client A", pan: "ABCDE1234F", email: "a@example.com" },
  ]);

  const [selectedFy, setSelectedFy] = useState(getDefaultFy());
  const [selectedQuarter, setSelectedQuarter] = useState(""); // NEW: quarter selection
  const [statuses, setStatuses] = useState({});

  function getMonthSequenceForFy(selectedFy) {
    const { startYear } = parseFY(selectedFy);
    const seq = [];
    for (let i = 1; i <= 12; i++) {
      const year = i <= 9 ? startYear : startYear + 1;
      seq.push({ fyIndex: i, label: monthLabel(i), year });
    }
    return seq;
  }

  function computeColorMap(clientId) {
    const map = statuses[clientId] || {};
    let nextFound = false;
    const result = {};
    for (let i = 1; i <= 12; i++) {
      const s = map[i];
      if (s === "UPLOADED") {
        result[i] = "green";
      } else if (s === "FAILED") {
        result[i] = "red";
      } else {
        if (!nextFound) {
          result[i] = "yellow";
          nextFound = true;
        } else {
          result[i] = "red";
        }
      }
    }
    return result;
  }

  async function handleUpload(clientId, fyMonthIndex, file) {
    if (!file) return;
    const result = file.size === 0 ? "fail" : "success";
    setStatuses((prev) => {
      const clientMap = prev[clientId] || {};
      return {
        ...prev,
        [clientId]: {
          ...clientMap,
          [fyMonthIndex]: result === "success" ? "UPLOADED" : "FAILED",
        },
      };
    });
  }

  const fySequence = getMonthSequenceForFy(selectedFy);

  // ✅ Quarter ranges mapping
  const QUARTERS = {
    Q1: [1, 2, 3],   // Apr, May, Jun
    Q2: [4, 5, 6],   // Jul, Aug, Sep
    Q3: [7, 8, 9],   // Oct, Nov, Dec
    Q4: [10, 11, 12] // Jan, Feb, Mar
  };

  // ✅ Filter months based on quarter
  const displayedMonths =
    selectedQuarter && QUARTERS[selectedQuarter]
      ? fySequence.filter((m) => QUARTERS[selectedQuarter].includes(m.fyIndex))
      : [];

  return (
    <div className="dashboard-root">
      <header>
        <h2>Client Tax Dashboard</h2>
        <div className="controls">
          <label>
            Financial Year:
            <select
              value={selectedFy}
              onChange={(e) => {
                setSelectedFy(e.target.value);
                setSelectedQuarter(""); // reset quarter on FY change
              }}
            >
              {getFyOptions().map((fy) => (
                <option key={fy} value={fy}>
                  {fy}
                </option>
              ))}
            </select>
          </label>

          {/* NEW: Quarter Selection */}
          <label style={{ marginLeft: "20px" }}>
            Quarter:
            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
            >
              <option value="">--Select Quarter--</option>
              <option value="Q1">Q1 (Apr-Jun)</option>
              <option value="Q2">Q2 (Jul-Sep)</option>
              <option value="Q3">Q3 (Oct-Dec)</option>
              <option value="Q4">Q4 (Jan-Mar)</option>
            </select>
          </label>
        </div>
      </header>

      {/* Only show table after quarter selection */}
      {selectedQuarter && (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>PAN</th>
              <th>Email</th>
              {displayedMonths.map((m) => (
                <th key={m.fyIndex}>
                  {m.label}
                  <div className="sub">{m.year}</div>
                </th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => {
              const colors = computeColorMap(client.id);
              return (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.pan}</td>
                  <td>{client.email}</td>
                  {displayedMonths.map((m) => (
                    <td key={m.fyIndex}>
                      <MonthCell
                        clientId={client.id}
                        fyMonthIndex={m.fyIndex}
                        color={colors[m.fyIndex]}
                        statuses={statuses[client.id] || {}}
                        onUpload={handleUpload}
                      />
                    </td>
                  ))}
                  <td>
                    <button onClick={() => alert("Refresh clicked")}>
                      Refresh
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <Legend />
    </div>
  );
}

/* --- helper components --- */

function MonthCell({ clientId, fyMonthIndex, color, statuses, onUpload }) {
  const [file, setFile] = useState(null);
  const status = statuses[fyMonthIndex] || "NOT_STARTED";

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpload(clientId, fyMonthIndex, file);
    setFile(null);
  };

  return (
    <div className="month-cell">
      <div className={`status-dot ${color}`}>
        <span className="dot-label">{monthLabel(fyMonthIndex)}</span>
      </div>
      <div className="status-text">{status}</div>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          className="file-input"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="upload-btn" disabled={!file}>
          Upload
        </button>
      </form>
    </div>
  );
}

function Legend() {
  return (
    <div className="legend">
      <span>
        <span className="dot green"></span>Uploaded (green)
      </span>
      <span>
        <span className="dot yellow"></span>Next to upload (yellow)
      </span>
      <span>
        <span className="dot red"></span>Not Required (red)
      </span>
    </div>
  );
}

/* --- helpers --- */
function getFyOptions() {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 6 }).map((_, i) => {
    const start = currentYear - 3 + i;
    return `${start}-${(start + 1).toString().slice(-2)}`;
  }).reverse();
}

function getDefaultFy() {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const start = month >= 4 ? year : year - 1;
  return `${start}-${(start + 1).toString().slice(-2)}`;
}
