// src/components/EmployerList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EmployerList.css";

const EmployerList = ({ clientPan }) => {
  const [employers, setEmployers] = useState([]);
  const [editingEmployer, setEditingEmployer] = useState(null);
  const [formData, setFormData] = useState({
    empId: "",
    tanNumber: "",
    employerName: "",
    panNumber: "",
    designation: "",
    fromDate: "",
    toDate: "",
  });

  const [selectedAddress, setSelectedAddress] = useState(null);

  // ✅ Fetch employers (optionally filtered by client PAN)
  useEffect(() => {
    let url = "http://localhost:8080/api/employer/employerForm";
    if (clientPan) {
      url = `http://localhost:8080/api/employer/employerForm/${clientPan}`;
    }
    axios
      .get(url)
      .then((res) => setEmployers(res.data))
      .catch((err) => console.error("Error fetching employers", err));
  }, [clientPan]);

  // Delete employer
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/employer/deleteEmployer/${id}`
      );
      alert(response.data);
      setEmployers(employers.filter((emp) => emp.empId !== id));
    } catch (error) {
      console.error("Error deleting employer:", error);
      alert("Failed to delete employer");
    }
  };

  // Edit employer
  const handleEdit = (emp) => {
    setEditingEmployer(emp.empId);
    setFormData(emp);
  };

  // Save updated employer
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/employer/updateEmployer/${formData.empId}`,
        formData
      );
      alert("Employer updated successfully");
      setEmployers(
        employers.map((emp) =>
          emp.empId === formData.empId ? response.data : emp
        )
      );
      setEditingEmployer(null);
    } catch (error) {
      console.error("Error updating employer:", error);
      alert("Failed to update employer");
    }
  };

  // TAN click → fetch EmployerMaster address
  const handleTanClick = async (tanNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/residential/getEmployerByTan/${tanNumber}`
      );
      setSelectedAddress(response.data);
    } catch (error) {
      console.error("Error fetching address:", error);
      alert("Failed to fetch employer address");
    }
  };

  return (
    <div className="employer-list-container">
       <h2>Employer List</h2>
      <table className="employer-table">
       
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>TAN</th>
            <th>Employer Name</th>
            <th>PAN</th>
            <th>Designation</th>
            <th>From</th>
            <th>To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employers.length > 0 ? (
            employers.map((emp, index) => (
              <tr key={emp.empId}>
                <td>{index + 1}</td>
                <td>
                  <span
                    className="tan-link"
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => handleTanClick(emp.tanNumber)}
                  >
                    {emp.tanNumber}
                  </span>
                </td>
                <td>
                  {editingEmployer === emp.empId ? (
                    <input
                      type="text"
                      value={formData.employerName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          employerName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    emp.employerName
                  )}
                </td>
                <td>{emp.panNumber}</td>
                <td>{emp.designation}</td>
                <td>{emp.fromDate}</td>
                <td>{emp.toDate}</td>
                <td>
                  <div className="btn-groups">
                    {editingEmployer === emp.empId ? (
                      <>
                        <button className="btn-save" onClick={handleUpdate}>
                          Save
                        </button>
                        <button
                          className="btn-cancel"
                          onClick={() => setEditingEmployer(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(emp)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(emp.empId)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No employers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Address Popup */}
      {selectedAddress && (
        <div className="address-popup">
          <h3>Employer Address</h3>
          <p><b>Employer Name:</b> {selectedAddress.employerName}</p>
          <p><b>Pincode:</b> {selectedAddress.pincode}</p>
          <p><b>State:</b> {selectedAddress.state}</p>
          <p><b>City:</b> {selectedAddress.city}</p>
          <p><b>Address 1:</b> {selectedAddress.address1}</p>
          <p><b>Address 2:</b> {selectedAddress.address2}</p>
          <p><b>Address 3:</b> {selectedAddress.address3}</p>
          <button onClick={() => setSelectedAddress(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default EmployerList;
