
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./TaxCalendarForm.css";

// export default function TaxCalendarForm() {
//   const [records, setRecords] = useState([]);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [fromDateDisplay, setFromDateDisplay] = useState("");
//   const [toDateDisplay, setToDateDisplay] = useState("");
//   const [selectedFY, setSelectedFY] = useState("");
//   const [selectedAY, setSelectedAY] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchRecords();
//   }, []);

//   const fetchRecords = () => {
//     axios
//       .get("http://localhost:8080/api/calendar/getAllCalendarDetails")
//       .then((res) => setRecords(res.data))
//       .catch((err) => console.error(err));
//   };
  
//   useEffect(() => {
//     const enrichRecords = async () => {
//       if (!fromDate || !toDate || !selectedFY) return;

//       const fromMeta = await fetchCalendarDetails(fromDate);
//       const toMeta = await fetchCalendarDetails(toDate);

//       setRecords((prev) =>
//         prev.map((rec) =>
//           rec.financialYear === selectedFY
//             ? { ...rec, fromMeta, toMeta }
//             : rec
//         )
//       );
//     };
//     enrichRecords();
//   }, [fromDate, toDate, selectedFY]);

//   // Format date as dd/mm/yy
//   const formatDate = (dateStr) => {
//     if (!dateStr) return "";
//     const date = new Date(dateStr);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = String(date.getFullYear()).slice(-2);
//     return `${day}/${month}/${year}`;
//   };

//   const handleFromDateChange = (e) => {
//     setFromDate(e.target.value);
//     setFromDateDisplay(formatDate(e.target.value));
//   };

//   const handleToDateChange = (e) => {
//     setToDate(e.target.value);
//     setToDateDisplay(formatDate(e.target.value));
//   };

//   const handleAddFY = () => {
//     if (!fromDate || !toDate) {
//       alert("⚠️ Please select From Date and To Date first.");
//       return;
//     }

//     const fyStartYear = new Date(fromDate).getFullYear();
//     const fyEndYear = new Date(toDate).getFullYear();
//     const financialYear = `FY-${fyStartYear}-${fyEndYear.toString().slice(-2)}`;

//     const ayStart = fyStartYear + 1;
//     const ayEnd = fyEndYear + 1;
//     const assessmentYear = `AY-${ayStart}-${ayEnd.toString().slice(-2)}`;

//     const newRecord = {
//       financialYear,
//       assessmentYear,
//       fromDate,
//       toDate,
//       longName: `Financial Year ${financialYear} (${fromDateDisplay} to ${toDateDisplay})`,
//     };

//     setRecords([...records, newRecord]);
//     setSelectedFY(financialYear);
//     setSelectedAY(assessmentYear);
//   };
// const handleSaveDates = async () => {
//   if (!selectedFY || !fromDate || !toDate) {
//     alert("⚠️ Please complete all fields first.");
//     return;
//   }

//   // find record just for FY/AY mapping
//   const record = records.find((r) => r.financialYear === selectedFY);
//   if (!record) {
//     alert("⚠️ Selected Financial Year record not found!");
//     return;
//   }

//   const payload = {
//     financialYear: record.financialYear,
//     assessmentYear: record.assessmentYear,

//     // ✅ always use latest selected values
//     fromDate: fromDate,
//     toDate: toDate,

//     // ✅ user-friendly label
//     longName: `Financial Year ${selectedFY} (${fromDate} to ${toDate})`,

//     // keep backend fields if required
//     startDay: record.startDay || null,
//     endDay: record.endDay || null,
//     startMonth: record.startMonth || null,
//     endMonth: record.endMonth || null,
//     quarter: record.quarter || null,
//     halfYear: record.halfYear || null,
//   };

//   try {
//     await axios.post("http://localhost:8080/api/calendar/addTaxCalendar", payload);
//     alert("✅ Dates saved successfully!");
//     navigate("/generated-report");
//   } catch (error) {
//     console.error("❌ Save error:", error.response || error.message);
//     alert("❌ Error saving dates! Check console for details.");
//   }
// };


    
//   const handleViewReport =() =>{
//         navigate("/generated-report");
//   }
//     const fetchCalendarDetails = async (date) => {
//     if (!date) return null;
//     try {
//       const res = await axios.get("http://localhost:8080/api/calendar/convert", {
//         params: { date },
//       });
//       return res.data; // { financialMonth, financialDate, quarter, halfYear }
//     } catch (err) {
//       console.error("❌ Error fetching calendar details:", err);
//       return null;
//     }
//   };

//   return (
//     <div className="tax-calendar">
//       <h2>📅 Tax Calendar</h2>

//       {!showForm && <button onClick={() => setShowForm(true)}>+ Add Financial Year</button>}

//       {showForm && (
//         <div className="selection-section">
//           <label>From Date:</label>
//           <input type="date" value={fromDate} onChange={handleFromDateChange} />
//           <span>({fromDateDisplay})</span>

//           <label>To Date:</label>
//           <input type="date" value={toDate} onChange={handleToDateChange} />
//           <span>({toDateDisplay})</span>

//           <button onClick={handleAddFY}>Generate FY & AY</button>
//           <button onClick={handleSaveDates}>💾 Save & Generate Report</button>

//           <label>Financial Year:</label>
//           <select
//             value={selectedFY}
//             onChange={(e) => {
//               const fyRecord = records.find((r) => r.financialYear === e.target.value);
//               setSelectedFY(e.target.value);
//               setSelectedAY(fyRecord ? fyRecord.assessmentYear : "");
//               setFromDate(fyRecord?.fromDate || "");
//               setToDate(fyRecord?.toDate || "");
//               setFromDateDisplay(formatDate(fyRecord?.fromDate || ""));
//               setToDateDisplay(formatDate(fyRecord?.toDate || ""));
//             }}
//           >
//             <option value="">-- Select FY --</option>
//             {records.map((r, i) => (
//               <option key={i} value={r.financialYear}>{r.financialYear}</option>
//             ))}
//           </select>

//           <label>Assessment Year:</label>
//           <select value={selectedAY} readOnly>
//             <option value="">-- Select AY --</option>
//             {selectedAY && <option value={selectedAY}>{selectedAY}</option>}
//           </select>
         
//                      {selectedFY && (
//             <div className="extra-details">
//               <h4>📊 Backend Tax Calendar Info</h4>
//               <p><b>From Date Month:</b> {records.find(r => r.financialYear === selectedFY)?.fromMeta?.financialMonth}</p>
//               <p><b>From Date Quarter:</b> {records.find(r => r.financialYear === selectedFY)?.fromMeta?.quarter}</p>
//               <p><b>To Date Half-Year:</b> {records.find(r => r.financialYear === selectedFY)?.toMeta?.halfYear}</p>
//             </div> 
//           )} 

//         </div>
//       )}
//        <button className="btn-views" onClick={handleViewReport}>View Report</button>
//     </div>
//   );
// }

// TaxCalendarForm.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TaxCalendarForm.css";

export default function TaxCalendarForm() {
  const [records, setRecords] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDateDisplay, setFromDateDisplay] = useState("");
  const [toDateDisplay, setToDateDisplay] = useState("");
  const [selectedFY, setSelectedFY] = useState("");
  const [selectedAY, setSelectedAY] = useState("");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = () => {
    axios
      .get("http://localhost:8080/api/calendar/getAllCalendarDetails")
      .then((res) => setRecords(res.data))
      .catch((err) => console.error(err));
  };

  // Format date as dd/mm/yyyy
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear(); // full year
    return `${day}/${month}/${year}`;
  };

  // ✅ From Date → Auto ToDate (always 31/03/yyyy)
  const handleFromDateChange = (e) => {
    const selected = new Date(e.target.value);
    if (!selected) return;

    setFromDate(e.target.value);
    setFromDateDisplay(formatDate(e.target.value));

    // FY always starts in April → if month < 4, back to previous year
    let fyStartYear =
      selected.getMonth() + 1 < 4
        ? selected.getFullYear() - 1
        : selected.getFullYear();
    const fyEndYear = fyStartYear + 1;

    // ✅ Auto ToDate = 31 March of fyEndYear
    const fyEndDate = new Date(fyEndYear, 2, 31); // 31 March
    const toDateISO = fyEndDate.toISOString().split("T")[0];
    setToDate(toDateISO);
    setToDateDisplay(formatDate(toDateISO));

    // FY & AY labels
    const financialYear = `FY-${fyStartYear}-${fyEndYear.toString().slice(-2)}`;
    const assessmentYear = `AY-${fyEndYear}-${(fyEndYear + 1)
      .toString()
      .slice(-2)}`;

    setSelectedFY(financialYear);
    setSelectedAY(assessmentYear);

    // add to records list
    const newRecord = {
      financialYear,
      assessmentYear,
      fromDate: e.target.value,
      toDate: toDateISO,
      longName: `Financial Year ${financialYear} (${formatDate(
        e.target.value
      )} to ${formatDate(toDateISO)})`,
    };

    setRecords((prev) => {
      const exists = prev.find((r) => r.financialYear === financialYear);
      return exists ? prev : [...prev, newRecord];
    });
  };

  const handleSaveDates = async () => {
    if (!selectedFY || !fromDate || !toDate) {
      alert("⚠️ Please complete all fields first.");
      return;
    }

    const record = records.find((r) => r.financialYear === selectedFY);
    if (!record) {
      alert("⚠️ Selected Financial Year record not found!");
      return;
    }

    const payload = {
      financialYear: record.financialYear,
      assessmentYear: record.assessmentYear,
      fromDate,
      toDate,
      longName: `Financial Year ${selectedFY} (${formatDate(
        fromDate
      )} to ${formatDate(toDate)})`,
    };

    try {
      await axios.post(
        "http://localhost:8080/api/calendar/addTaxCalendar",
        payload
      );
      alert("✅ Dates saved successfully!");
      navigate("/generated-report");
    } catch (error) {
      console.error("❌ Save error:", error.response || error.message);
      alert("❌ Error saving dates! Check console for details.");
    }
  };

  const handleViewReport = () => {
    navigate("/generated-report");
  };

  return (
    <div className="tax-calendar">
      <h2>📅 Tax Calendar</h2>

      {!showForm && (
        <div className="button-row">
          <button onClick={() => setShowForm(true)}>+ Add Financial Year</button>
          <button className="btn-views" onClick={handleViewReport}>
            View Report
          </button>
        </div>
      )}

      {showForm && (
        <div className="selection-section">
          <label>From Date:</label>
          <input type="date" value={fromDate} onChange={handleFromDateChange} />
          <span>({fromDateDisplay})</span>

          <label>To Date:</label>
          <input type="date" value={toDate} readOnly />
          <span>({toDateDisplay})</span>

          <button onClick={handleSaveDates}>💾 Save & Generate Report</button>
        </div>
      )}
    </div>
  );
}

// TaxCalendar.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./TaxCalendarForm.css"; // ✅ external CSS

// export default function TaxCalendarForm() {
//   const [years, setYears] = useState([]);
//   const [months, setMonths] = useState([]);
//   const [dates, setDates] = useState([]);
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");

//   useEffect(() => {
//     axios.get("http://localhost:8080/api/calendar/years")
//       .then((res) => setYears(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleYearClick = (year) => {
//     setSelectedYear(year);
//     setSelectedMonth("");
//     setDates([]);
//     axios.get(`http://localhost:8080/api/calendar/months/${year}`)
//       .then((res) => setMonths(res.data))
//       .catch((err) => console.error(err));
//   };

//   const getDaysInMonth = (month, year) => {
//     const monthIndex = new Date(Date.parse(month + " 1, " + year.split("-")[0])).getMonth();
//     const actualYear = parseInt(year.split("-")[0]); // use first year from "2024-25"
//     return new Date(actualYear, monthIndex + 1, 0).getDate();
//   };

//   const handleMonthClick = (month) => {
//     setSelectedMonth(month);

//     // ✅ Generate real number of days based on month + leap year check
//     const days = getDaysInMonth(month, selectedYear);

//     const generatedDates = Array.from({ length: days }, (_, i) => {
//       return {
//         date: `${i + 1} ${month} ${selectedYear}`,
//         event: `Event ${i + 1}`
//       };
//     });

//     setDates(generatedDates);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>📅 Tax Calendar</h2>

//       {/* Step 1: Years */}
//       <div>
//         <h3>Select Year</h3>
//         {years.map((year, i) => (
//           <button
//             key={i}
//             onClick={() => handleYearClick(year)}
//             className={year === selectedYear ? "selected-btn" : "normal-btn"}
//           >
//             {year}
//           </button>
//         ))}
//       </div>

//       {/* Step 2: Months */}
//       {selectedYear && (
//         <div>
//           <h3>Months in {selectedYear}</h3>
//           {months.map((month, i) => (
//             <button
//               key={i}
//               onClick={() => handleMonthClick(month)}
//               className={month === selectedMonth ? "selected-btn" : "normal-btn"}
//             >
//               {month}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Step 3: Dates in Calendar Grid */}
//       {selectedMonth && (
//         <div>
//           <h3>Important Dates in {selectedMonth} {selectedYear}</h3>
//           <div className="calendar-grid">
//             {dates.length > 0 ? (
//               dates.map((d, i) => (
//                 <div key={i} className="calendar-cell">
//                   <div className="date">{d.date.split(" ")[0]}</div>
//                   <div className="event">{d.event}</div>
//                 </div>
//               ))
//             ) : (
//               <p>No events found</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

