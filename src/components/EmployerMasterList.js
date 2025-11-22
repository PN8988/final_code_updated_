import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EmployerMasterList.css";
import { useLocation, useNavigate } from "react-router-dom";

const EmployerList = () => {
  const [employers, setEmployers] = useState([]);
  const [filteredEmployers, setFilteredEmployers] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch employers when component loads
  const fetchEmployers = () => {
    axios
      .get("http://localhost:8080/api/residential/getEmployers")
      .then((res) => {
        setEmployers(res.data);
        setFilteredEmployers(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchEmployers();
  }, []);

  useEffect(() => {
    if (location.state?.newEmployer) {
      setEmployers((prev) => {
        const exists = prev.some(
          (emp) => emp.panNumber === location.state.newEmployer.panNumber
        );
        return exists ? prev : [location.state.newEmployer, ...prev];
      });
    }
  }, [location.state]);

  // Apply filters (search by city & state)
  useEffect(() => {
    let filtered = employers;

    if (cityFilter) {
      filtered = filtered.filter((emp) =>
        emp.city?.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }

    if (stateFilter) {
      filtered = filtered.filter((emp) =>
        emp.state?.toLowerCase().includes(stateFilter.toLowerCase())
      );
    }

    setFilteredEmployers(filtered);
  }, [cityFilter, stateFilter, employers]);

  // Edit employer
  const handleEdit = (emp) => {
    navigate("/employer-form", { state: { employerData: emp } });
  };

  // Delete employer
  const handleDelete = (panNumber) => {
    if (window.confirm("Are you sure you want to delete this employer?")) {
      axios
        .delete(`http://localhost:8080/api/residential/delete/${panNumber}`)
        .then(() => {
          alert("Employer deleted successfully!");
          setEmployers((prev) =>
            prev.filter((emp) => emp.panNumber !== panNumber)
          );
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete employer.");
        });
    }
  };

  return (
    <div className="employermaster-list-container">
      <h2>Employer List</h2>

      {/* Search Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by City"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="filter-input"
        />
        <input
          type="text"
          placeholder="Search by State"
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          className="filter-input"
        />
      </div>

      {filteredEmployers.length === 0 ? (
        <p className="empty-message">No employers found</p>
      ) : (
        <table className="employer-table">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>PAN Number</th>
              <th>Employer Name</th>
              <th>TAN Number</th>
              <th>Employer Type</th>
              <th>HR Name</th>
              <th>HR EmailId</th>
              <th>HR Contact</th>
              <th>Company Website</th>
              <th>PinCode</th>
              <th>City</th>
              <th>State</th>
              <th>Address1</th>
              <th>Address2</th>
              <th>Address3</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployers.map((emp, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{emp.panNumber}</td>
                <td>{emp.employerName}</td>
                <td>{emp.tanNumber}</td>
                <td>{emp.employerType}</td>
                <td>{emp.hrName}</td>
                <td>{emp.hrEmailId}</td>
                <td>{emp.hrContact}</td>
                <td>{emp.companyWebsite}</td>
                <td>{emp.pincode}</td>
                <td>{emp.city}</td>
                <td>{emp.state}</td>
                <td>{emp.address1}</td>
                <td>{emp.address2}</td>
                <td>{emp.address3}</td>
                <td>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(emp)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(emp.panNumber)}
                  >
                    Delete
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

export default EmployerList;
