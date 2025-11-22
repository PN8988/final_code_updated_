// import React, { useState } from "react";
// import axios from "axios";
// import "./EmployerForm.css";
// import { useNavigate } from "react-router-dom";

// const EmployerForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     panNumber: "",
//     empName: "",
//     designation: "",
//     tanNumber: "",
//     employerType: "",
//     address1: "",
//     address2: "",
//     address_3: "",
//     pincode: "",
//     state: "",
//     city: "",
//     assessmentYear: "",
//     fromDate: "",
//     toDate: "",
//   });


//   const navigate = useNavigate();
//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     // Auto-fetch State & City when pincode reaches 6 digits
//     if (name === "pincode" && value.length === 6) {
//       fetch(`https://api.postalpincode.in/pincode/${value}`)
//         .then((res) => res.json())
//         .then((data) => {
//           if (data[0].Status === "Success") {
//             setFormData((prev) => ({
//               ...prev,
//               state: data[0].PostOffice[0].State,
//               city: data[0].PostOffice[0].District,
//               pincode: value,
//             }));
//           } else {
//             alert("Invalid pincode or no data found");
//           }
//         })
//         .catch(() => alert("Error fetching pincode details"));
//     }
//   };

//   // Save employer
//  const handleSubmit = (e) => {
//   e.preventDefault();
//   axios
//     .post("http://localhost:8080/api/residential/saveEmployer", formData)
//     .then((res) => {
//       alert("Employer saved successfully!");
//       // Pass the saved employer to EmployerList via navigate state
//       navigate("/employerlist", { state: { newEmployer: res.data || formData } });
//     })
//     .catch((err) => console.error(err));
// };


//   return (
//     <div className="wrapper-employer">
//       <div className="employer-form-container" style={{ position: "relative" }}>
//         {/* Close icon */}
//         <span
//           onClick={onClose}
//           style={{
//             position: "absolute",
//             top: "10px",
//             right: "15px",
//             fontSize: "20px",
//             fontWeight: "bold",
//             cursor: "pointer",
//             color: "#666",
//           }}
//         >
//           ×
//         </span>

//         <h2>Employer Form</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Row 1 */}
//           <div className="form-row-3col">
//             <div className="form-group">
//               <label>PAN Number</label>
//               <input
//                 type="text"
//                 name="panNumber"
//                 value={formData.panNumber}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Employer Name</label>
//               <input
//                 type="text"
//                 name="empName"
//                 value={formData.empName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Employer Type</label>
//               <select
//                 name="employerType"
//                 value={formData.employerType}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Type</option>
//                 <option value="Private">Private</option>
//                 <option value="Government">Government</option>
//                 <option value="Public Sector">Public Sector</option>
//                  <option value="Pensioners">Pensioners</option>
//                 <option value="Other">Others</option>
//               </select>
//             </div>
//           </div>

//           {/* Row 2 */}
//           <div className="form-row-3col">
//             <div className="form-group">
//               <label>Designation</label>
//               <input
//                 type="text"
//                 name="designation"
//                 value={formData.designation}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>TAN Number</label>
//               <input
//                 type="text"
//                 name="tanNumber"
//                 value={formData.tanNumber}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>Assessment Year</label>
//               <input
//                 type="text"
//                 name="assessmentYear"
//                 value={formData.assessmentYear}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* Row 3 */}
//           <div className="form-row-3col">
//             <div className="form-group">
//               <label>Address 1</label>
//               <input
//                 type="text"
//                 name="address1"
//                 value={formData.address1}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>Address 2</label>
//               <input
//                 type="text"
//                 name="address2"
//                 value={formData.address2}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>Address 3</label>
//               <input
//                 type="text"
//                 name="address_3"
//                 value={formData.address_3}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* Row 4 */}
//           <div className="form-row-3col">
//             <div className="form-group">
//               <label>Pincode</label>
//               <input
//                 type="text"
//                 name="pincode"
//                 value={formData.pincode}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>State</label>
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 readOnly
//               />
//             </div>
//             <div className="form-group">
//               <label>City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 readOnly
//               />
//             </div>
//           </div>

//           {/* Row 5 */}
//           <div className="form-row-3col">
//             <div className="form-group">
//               <label>From Date</label>
//               <input
//                 type="date"
//                 name="fromDate"
//                 value={formData.fromDate}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>To Date</label>
//               <input
//                 type="date"
//                 name="toDate"
//                 value={formData.toDate}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* Buttons */}
//           <div
//             className="button-group"
//             style={{ justifyContent: "center", gap: "10px", marginTop: "20px" }}
//           >
//             <button type="submit" className="submit-btn">
//               Save Employer
//             </button>
//             <button
//               type="button"
//               className="submit-btn"
//               style={{ backgroundColor: "#dc3545" }}
//               onClick={() => alert("Delete clicked")}
//             >
//               Delete
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EmployerForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployerMasterForm.css";
import { useNavigate, useLocation } from "react-router-dom";

const EmployerMasterForm = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingEmployer = location.state?.employerData;

  const [formData, setFormData] = useState({
    panNumber: "",
    employerName: "",
    tanNumber: "",
    employerType: "",
    hrName: "",
    hrEmailId: "",
    hrContact: "",
    pincode: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
    address3: "",
    companyWebsite: "",
  });

  useEffect(() => {
    if (editingEmployer) {
      setFormData(editingEmployer);
    }
  }, [editingEmployer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "pincode" && value.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${value}`)
        .then((res) => res.json())
        .then((data) => {
          if (data[0].Status === "Success") {
            setFormData((prev) => ({
              ...prev,
              state: data[0].PostOffice[0].State,
              city: data[0].PostOffice[0].District,
              pincode: value,
            }));
          } else {
            alert("Invalid pincode or no data found");
          }
        })
        .catch(() => alert("Error fetching pincode details"));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingEmployer) {
      axios
        .put(
          `http://localhost:8080/api/residential/updateEmployer/${formData.tanNumber}`,
          formData
        )
        .then((res) => {
          alert("Employer updated successfully!");
          navigate("employermasterlist", { state: { newEmployer: res.data } });
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post("http://localhost:8080/api/residential/saveEmployer", formData)
        .then((res) => {
          alert("Employer saved successfully!");
          navigate("employermasterlist", { state: { newEmployer: res.data } });
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="wrapper-employer">
      <div className="employermaster-form-container" style={{ position: "relative" }}>
        <span
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            color: "#666",
          }}
        >
          ×
        </span>

        <h2>{editingEmployer ? "Edit Employer" : "Add Employer"}</h2>

        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="form-row-3col">
            <div className="employermaster-form-group">
              <label>PAN Number</label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                required
                readOnly={!!editingEmployer}
              />
            </div>
            <div className="employermaster-form-group">
              <label>Employer Name</label>
              <input
                type="text"
                name="employerName"
                value={formData.employerName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="employermaster-form-group">
              <label>TAN Number</label>
              <input
                type="text"
                name="tanNumber"
                value={formData.tanNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row-3col">
            <div className="employermaster-form-group">
              <label>Employer Type</label>
              <select
                name="employerType"
                value={formData.employerType}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="Private">Private</option>
                <option value="Government">Government</option>
                <option value="Public Sector">Public Sector</option>
                <option value="Pensioners">Pensioners</option>
                <option value="Other">Others</option>
              </select>
            </div>

             <div className="employermaster-form-group">
              <label>Company Website</label>
              <input
                type="text"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleChange}
              />
            </div>
            </div>
          <div className="form-row-3col">
            <div className="employermaster-form-group">
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
            <div className="employermaster-form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="employermaster-form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                readOnly
              />
            </div>
           
            </div>
             <div className="form-row-3col">
             <div className="employermaster-form-group">
              <label>Address 1</label>
              <input
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
              />
            </div>
           
            <div className="employermaster-form-group">
              <label>Address 2</label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
              />
            </div>
            <div className="employermaster-form-group">
              <label>Address 3</label>
              <input
                type="text"
                name="address3"
                value={formData.address3}
                onChange={handleChange}
              />
            </div>
            </div>
         <div className="form-row-3col">
            <div className="employermaster-form-group">
              <label>HR Name</label>
              <input
                type="text"
                name="hrName"
                value={formData.hrName}
                onChange={handleChange}
              />
            </div>
            <div className="employermaster-form-group">
              <label>HR Email ID</label>
              <input
                type="email"
                name="hrEmailId"
                value={formData.hrEmailId}
                onChange={handleChange}
              />
            </div>
          
            <div className="employermaster-form-group">
              <label>HR Contact</label>
              <input
                type="text"
                name="hrContact"
                value={formData.hrContact}
                onChange={handleChange}
              />
            </div>
           
            </div>
         

        
          <div
  className="button-group2"
  style={{
    display: "flex",
    justifyContent: "flex-end", // Right align
    gap: "10px",
    marginTop: "20px"
  }}
>
  <button type="submit" className="submit-btn">
    {editingEmployer ? "Update Employer" : "Save"}
  </button>

  <button
    type="button"
    className="submit-btn"
    style={{ backgroundColor: "#81ec57" }}
    onClick={() => navigate("/employermasterlist")}
  >
    View
  </button>
</div>

        </form>
      </div>
    </div>
  );
};

export default EmployerMasterForm;
