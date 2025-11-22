// src/components/AdminDashboard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const AdminDashboard = () => {
  const [hoveredTab, setHoveredTab] = useState(null);

  const tabs = [
    {
      name: "Add",
      subtabs: [
        { label: "Add Employee", link: "/employee-master" },
        { label: "Add Client", link: "/client-master" },
      ],
    },
    {
      name: "View",
      subtabs: [
        { label: "View Employee", link: "/employee-list" },
        { label: "View Client", link: "/clientlist" },
      ],
    },
  ];

  return (
    <>
      <AdminNavbar />
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2 style={{ marginBottom: "1rem" }}>Welcome, Admin</h2>
        <p style={{ marginBottom: "2rem" }}>This is your dashboard content.</p>

        {/* Tab Section */}
        <div style={styles.tabContainer}>
          {tabs.map((tab) => (
            <div
              key={tab.name}
              style={styles.tab}
              onMouseEnter={() => setHoveredTab(tab.name)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <span style={styles.tabLabel}>{tab.name}</span>
              {hoveredTab === tab.name && (
                <div style={styles.dropdown}>
                  {tab.subtabs.map((sub) => (
                    <Link
                      key={sub.label}
                      to={sub.link}
                      style={styles.dropdownItem}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Modern inline styles
const styles = {
  tabContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "3rem",
    marginTop: "3rem",
    position: "relative",
  },
  tab: {
    position: "relative",
    fontSize: "1.2rem",
    fontWeight: 600,
    color: "#333",
    cursor: "pointer",
    transition: "color 0.3s",
  },
  tabLabel: {
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
  },
  dropdown: {
    position: "absolute",
    top: "2.8rem",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    padding: "0.5rem 0",
    minWidth: "180px",
    zIndex: 10,
    animation: "fadeIn 0.3s ease-in-out",
  },
  dropdownItem: {
    display: "block",
    padding: "0.7rem 1rem",
    textDecoration: "none",
    color: "#333",
    fontWeight: 500,
    transition: "background 0.2s, color 0.2s",
  },
};

// Smooth fade-in animation for dropdown
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  const keyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }`;
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
}

export default AdminDashboard;
