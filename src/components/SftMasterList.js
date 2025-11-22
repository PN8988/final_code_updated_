import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SftMasterList.css";

const SftMasterList = () => {
  const [sftList, setSftList] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch SFT Master list from backend
  const fetchSftList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/sft/getAllSftMaster");
      setSftList(response.data);
    } catch (error) {
      console.error("Error fetching SFT Master list:", error);
    }
  };

  useEffect(() => {
    fetchSftList();
  }, []);

  // ✅ Delete SFT entry
  const handleDelete = async (sftCode) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:8080/api/sft/sftDeletemasters/${sftCode}`);
        fetchSftList(); // refresh list after delete
      } catch (error) {
        console.error("Error deleting SFT record:", error);
      }
    }
  };

  // ✅ Navigate to Edit Form
  const handleEdit = (sft) => {
    // await.axios.put(`htttp://localhost:8080/api/sft.updateSftMaster/${sftCode}`)
    navigate("/sftmasterform", { state: { sft } });
  };

  return (
    <div className="sftmasterlist-container">
      <h2>SFT Master List</h2>
      <table className="sftmasterlist-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>SFT Code</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sftList.length > 0 ? (
            sftList.map((item, index) => (
              <tr key={item.sftCode}>
                <td>{index + 1}</td>
                <td>{item.sftCode}</td>
                <td>{item.sftDescription}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(item.sftCode)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No Records Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SftMasterList;
