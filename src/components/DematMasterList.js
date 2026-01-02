import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DematMasterList.css"; // separate CSS for the list
import { useNavigate } from "react-router-dom";

function DematMasterList() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // Fetch Demat Master list on mount
  const fetchData = () => {
    axios
      .get("http://localhost:8080/api/demat/getAllDemat")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetching demat master list:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios
        .delete(`http://localhost:8080/api/demat/deleteDematMaster/${id}`)
        .then(() => {
          alert("Deleted successfully");
          fetchData(); // refresh list
        })
        .catch((err) => {
          console.error("Error deleting demat master:", err);
        });
    }
  };

  // Handle Edit → navigate to form with state/id
  const handleEdit = (item) => {
    navigate("/demat-form", { state: { dematData: item } });
  };

  return (
    <div className="demat-list-wrap">
      <h2>Demat Account Master List</h2>

      <div className="table-wrap">
        <table className="demat-list-table">
          <thead>
            <tr>
              <th>Sr.No</th>
               {/* <th>Demat Account No</th>
              <th>Account Holder</th> */}
              <th>DP ID</th> 
              <th>Login ID</th>
              <th>Depository</th>
              <th>Broker</th>
              <th>Opening Date</th>
              <th>Website</th>
              <th>Support No</th>
              <th>Reg. Mo. No</th>
              {/* <th>Nominee</th> */}
              <th style={{ width: 160 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="13" className="no-records">
                  No records
                </td>
              </tr>
            ) : (
              items.map((it, idx) => (
                // <tr key={it.id || idx}>
                 <tr>
  <td>{idx + 1}</td>
  <td>{it.dpid}</td>
  <td>{it.loginId}</td>
  <td>{it.depository || "-"}</td>
  <td>{it.brokerName || "-"}</td>
  <td>{it.openingDate || "-"}</td>
  <td>
    {it.website ? (
      <a href={it.website} target="_blank" rel="noreferrer" className="link">
        {it.website}
      </a>
    ) : ("-")}
  </td>
  <td>{it.supportNumber || "-"}</td>
  <td>{it.registeredMobileNo || "-"}</td>
  <td>
    <button className="btn edit-btn" onClick={() => handleEdit(it)}>
      Edit
    </button>
    <button className="btn danger-btn" onClick={() => handleDelete(it.id)}>
      Delete
    </button>
  </td>
</tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DematMasterList;
