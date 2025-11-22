import React, { useState } from "react";
import MonthlyTab from "./MonthlyTab";
import EventTab from "./EventTab";
import YearlyTab from "./YearlyTab";
import TaxCompletionTab from "./TaxCompletionTab";

const DocumentDashboard = ({ userId }) => {
  const [activeTab, setActiveTab] = useState("MONTHLY");

  return (
    <div>
      <div style={{ display: "flex", marginBottom: 20 }}>
        {["MONTHLY","EVENT","YEARLY","TAX_COMPLETION"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              marginRight: 10,
              backgroundColor: activeTab === tab ? "#007bff" : "#ccc",
              color: "white",
              padding: "5px 15px",
              border: "none",
              borderRadius: 5,
              cursor: "pointer"
            }}
          >
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      <div>
        {activeTab === "MONTHLY" && <MonthlyTab userId={userId} />}
        {activeTab === "EVENT" && <EventTab userId={userId} />}
        {activeTab === "YEARLY" && <YearlyTab userId={userId} />}
        {activeTab === "TAX_COMPLETION" && <TaxCompletionTab userId={userId} />}
      </div>
    </div>
  );
};

export default DocumentDashboard;
