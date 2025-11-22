// src/components/EmployerDashboard.js
import React, { useState } from "react";
import { Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./EmployerDashBoard.css";

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("updateMaster");

  const handleNavigation = (taskTitle, subtask) => {
    if (taskTitle === "Employer" && subtask === "Employer Master") {
      navigate("/employer-form");
    } else if (taskTitle === "Employer" && subtask === "Employee Details") {
      navigate("/employerform");
    } else if (taskTitle === "Banks" && subtask === "View Bank Accounts") {
      navigate("/bank-list");
    } else if (taskTitle === "Demat" && subtask === "View Demat Accounts") {
      navigate("/dematmaster-list");
    } else if (taskTitle === "House Properties" && subtask === "Add Property") {
      navigate("/addresidentialprop");
    } else if (
      taskTitle === "House Properties" &&
      subtask === "Manage Rental Income"
    ) {
      navigate("/rental-income");
    } else if (taskTitle === "Securities" && subtask === "View Securities") {
      navigate("/security-master");
    } else if (
      taskTitle === "Client Master" &&
      subtask === "Update Client Master"
    ) {
      navigate("/clientlist");
    } else {
      alert(`Navigating to ${taskTitle} - ${subtask}`);
    }
  };

  const updateMasterTasks = [
    { title: "Client Master", subtasks: ["Update Client Master"] },
    { title: "Banks", subtasks: ["View Bank Accounts", "No of Bank Accounts"] },
    { title: "Demat", subtasks: ["View Demat Accounts", "Manage Holdings"] },
    { title: "Employer", subtasks: ["Employer Master", "Employee Details"] },
    { title: "Securities", subtasks: ["View Securities", "View Investments"] },
  ];

  const incomeSourceTasks = [
    {
      title: "House Properties",
      subtasks: ["Add Property", "Manage Rental Income"],
    },
    { title: "Securities", subtasks: ["View Securities", "Investment Details"] },
    { title: "Demat", subtasks: ["Manage Holdings", "Link with PAN"] },
    {
      title: "Banks",
      subtasks: ["Bank Interest Income", "Transaction Summary"],
    },
    { title: "Employer", subtasks: ["Employer Master", "Employee Details"] },
  ];

  return (
    <div className="modern-dashboard-bg">
      <div className="modern-dashboard-container">
        {/* Header Section */}
        <header className="modern-header">
          <h1 className="modern-title">Employer Dashboard</h1>
          <p className="modern-subtitle">
            Manage all your employer, client, and financial data in one place.
          </p>
        </header>

        {/* Tabs */}
        <div className="modern-tabs">
          <button
            className={`modern-tab-btn ${
              activeTab === "updateMaster" ? "active" : ""
            }`}
            onClick={() => setActiveTab("updateMaster")}
          >
            Update Master / Client Details
          </button>
          <button
            className={`modern-tab-btn ${
              activeTab === "incomeSources" ? "active" : ""
            }`}
            onClick={() => setActiveTab("incomeSources")}
          >
            Profiling Income Sources
          </button>
        </div>

        {/* Task Grid */}
        <div className="modern-task-grid">
          {(activeTab === "updateMaster"
            ? updateMasterTasks
            : incomeSourceTasks
          ).map((task, index) => (
            <Card key={index} className="modern-task-card" elevation={6}>
              <CardContent>
                <h3 className="modern-task-title">{task.title}</h3>
                <ul className="modern-subtask-list">
                  {task.subtasks.map((sub, i) => (
                    <li
                      key={i}
                      className="modern-subtask-link"
                      onClick={() => handleNavigation(task.title, sub)}
                    >
                      {sub}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
