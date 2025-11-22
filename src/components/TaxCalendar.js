import React, { useState } from "react";
import "./TaxCalendar.css";

const TaxCalendar = () => {
  const taxMonths = [
    { code: "M01", name: "APR", number: 3 },
    { code: "M02", name: "MAY", number: 4 },
    { code: "M03", name: "JUN", number: 5 },
    { code: "M04", name: "JUL", number: 6 },
    { code: "M05", name: "AUG", number: 7 },
    { code: "M06", name: "SEP", number: 8 },
    { code: "M07", name: "OCT", number: 9 },
    { code: "M08", name: "NOV", number: 10 },
    { code: "M09", name: "DEC", number: 11 },
    { code: "M10", name: "JAN", number: 0 },
    { code: "M11", name: "FEB", number: 1 },
    { code: "M12", name: "MAR", number: 2 },
  ];

  const quarters = [
    { code: "Q1", name: "APR–JUN" },
    { code: "Q2", name: "JUL–SEP" },
    { code: "Q3", name: "OCT–DEC" },
    { code: "Q4", name: "JAN–MAR" },
  ];

  const halfYears = [
    { code: "H1", name: "APR–SEP" },
    { code: "H2", name: "OCT–MAR" },
  ];

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Start with current FY
  const currentYear = new Date().getFullYear();
  const [fyStart, setFyStart] = useState(
    new Date().getMonth() >= 3 ? currentYear : currentYear - 1
  );
  const fyEnd = fyStart + 1;

  // Track indexes
  const [monthIndex, setMonthIndex] = useState(0);
  const [quarterIndex, setQuarterIndex] = useState(0);
  const [halfYearIndex, setHalfYearIndex] = useState(0);

  // Track selected date & day
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const prevFY = () => {
    setFyStart(fyStart - 1);
    setMonthIndex(0);
    setQuarterIndex(0);
    setHalfYearIndex(0);
  };

  const nextFY = () => {
    setFyStart(fyStart + 1);
    setMonthIndex(0);
    setQuarterIndex(0);
    setHalfYearIndex(0);
  };

  // Navigation handlers
  const prevMonth = () =>
    setMonthIndex((prev) => (prev - 1 + taxMonths.length) % taxMonths.length);
  const nextMonth = () =>
    setMonthIndex((prev) => (prev + 1) % taxMonths.length);

  const prevQuarter = () =>
    setQuarterIndex((prev) => (prev - 1 + quarters.length) % quarters.length);
  const nextQuarter = () =>
    setQuarterIndex((prev) => (prev + 1) % quarters.length);

  const prevHalfYear = () =>
    setHalfYearIndex((prev) => (prev - 1 + halfYears.length) % halfYears.length);
  const nextHalfYear = () =>
    setHalfYearIndex((prev) => (prev + 1) % halfYears.length);

  const selectedMonth = taxMonths[monthIndex];
  const selectedQuarter = quarters[quarterIndex];
  const selectedHalfYear = halfYears[halfYearIndex];

  // Build tax calendar grid (days in month)
  const getCalendarGrid = (month) => {
    if (!month) return [];

    const year =
      month.number >= 3 && month.number <= 11 ? fyStart : fyEnd;

    const firstDay = new Date(year, month.number, 1);
    const daysInMonth = new Date(year, month.number + 1, 0).getDate();

    const startDay = (firstDay.getDay() + 6) % 7; // Monday = 0
    const grid = [];

    // Empty slots before the 1st day
    for (let i = 0; i < startDay; i++) {
      grid.push("");
    }

    // Fill actual tax dates
    for (let d = 1; d <= daysInMonth; d++) {
      grid.push(`${month.code}.${String(d).padStart(2, "0")}`);
    }

    return grid;
  };

  return (
    <div className="tax-calendar">
      {/* Financial Year Header */}
      <div className="fy-header">
        <button onClick={prevFY}>&lt;</button>
        <h2>
          📅 Financial Year {fyStart}-{String(fyEnd).slice(-2)}
        </h2>
        <button onClick={nextFY}>&gt;</button>
      </div>

      {/* Month Navigation */}
      <div className="section">
        <h3>Month</h3>
        <div className="month-header">
          <button onClick={prevMonth}>&lt;</button>
          <h3>
            {selectedMonth.code}.{selectedMonth.name}
          </h3>
          <button onClick={nextMonth}>&gt;</button>
        </div>
      </div>

      {/* Quarter Navigation */}
      <div className="section">
        <h3>Quarter</h3>
        <div className="quarter-header">
          <button onClick={prevQuarter}>&lt;</button>
          <h3>
            {selectedQuarter.code} ({selectedQuarter.name})
          </h3>
          <button onClick={nextQuarter}>&gt;</button>
        </div>
      </div>

      {/* Half-Year Navigation */}
      <div className="section">
        <h3>Half Year</h3>
        <div className="halfyear-header">
          <button onClick={prevHalfYear}>&lt;</button>
          <h3>
            {selectedHalfYear.code} ({selectedHalfYear.name})
          </h3>
          <button onClick={nextHalfYear}>&gt;</button>
        </div>
      </div>

      {/* Calendar Dates */}
      {selectedMonth && (
        <div className="section">
          <h3>
            {selectedMonth.code}.{selectedMonth.name} (
            {fyStart}-{String(fyEnd).slice(-2)})
             {selectedDate && <p> {selectedDate}</p>}
        {selectedDay && <p>  {selectedDay}</p>}
          </h3>
          <div className="calendar-grid">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className={`day-header ${
                  selectedDay === day ? "selected-day" : ""
                }`}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </div>
            ))}
            {getCalendarGrid(selectedMonth).map((cell, idx) => (
              <div
                key={idx}
                className={`date-cell ${
                  cell === "" ? "empty" : ""
                } ${selectedDate === cell ? "selected-date" : ""}`}
                onClick={() => cell && setSelectedDate(cell)}
              >
                {cell}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show selection summary */}
      <div className="selection-summary">
       
      </div>
    </div>
  );
};

export default TaxCalendar;
