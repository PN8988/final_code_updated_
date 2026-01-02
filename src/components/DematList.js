import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const DematList = () => {
  const [dematList, setDematList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Client Details received from previous page
  const selectedClientData = location.state?.clientDetails;

  useEffect(() => {
    const fetchDematList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/demat/getAllDematlist"
        );
        setDematList(response.data);
      } catch (error) {
        console.error("Error fetching Demat list:", error);
        setDematList([]); // ❌ No more static fallback
      }
    };

    fetchDematList();
  }, []);

  // Navigate to Demat Import Form
  const handleImport = (demat) => {
    navigate("/dematimport-form", {
      state: {
        clientDetails: selectedClientData,
        selectedDemat: {
          panId: demat.panId || "",
          clientName: demat.clientName || "",
          dematAccountNo: demat.dematAccountNo || "",
          dpName: demat.dpName || "",
          depository: demat.depository || "",
          dpId: demat.dpId || "",
          accountHolderName: demat.d_AccountHolderName || "",
        },
      },
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Demat Accounts List</h2>

      {dematList.length === 0 ? (
        <p style={{ color: "red" }}>No Demat Accounts Found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{ width: "100%", textAlign: "left" }}
        >
          <thead style={{ background: "#f5f5f5" }}>
            <tr>
              <th>Sr No</th>
              <th>DPID</th>
              <th>Depository ID</th>
              <th>Demat Account No</th>
              <th>Account Holder Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {dematList.map((demat, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{demat.dpId || "-"}</td>
                <td>{demat.depository || "-"}</td>
                <td>{demat.dematAccountNo || "-"}</td>
                <td>{demat.d_AccountHolderName || "-"}</td>

                <td>
                  <button
                    style={{
                      background: "green",
                      color: "white",
                      padding: "6px 10px",
                      cursor: "pointer",
                      border: "none",
                      borderRadius: "4px",
                    }}
                    onClick={() => handleImport(demat)}
                  >
                    Import (Excel)
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DematList;
