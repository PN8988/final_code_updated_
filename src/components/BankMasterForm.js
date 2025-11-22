// import React, { useState } from "react";
// import "./BankMasterForm.css";
// import { useNavigate } from "react-router-dom";

// const BankMasterForm = () => {
//   const [numRows, setNumRows] = useState(1); // Number of India bank entries
//   const [indiaForm, setIndiaForm] = useState([
//     { srNo: "", bankName: "", ifscCode: "", branchAddress: "", accountType: "" },
//   ]);

//   const [intlForm, setIntlForm] = useState({
//     srNo: "",
//     swiftCode: "",
//     bankName: "",
//     iban: "",
//     country: "",
//   });
// const navigate = useNavigate(); 
//   const handleIndiaChange = (e, index) => {
//     const updated = [...indiaForm];
//     updated[index][e.target.name] = e.target.value;
//     setIndiaForm(updated);
//   };

//   const handleNumRowsChange = (e) => {
//     const value = parseInt(e.target.value) || 0;
//     setNumRows(value);

//     // Adjust indiaForm array size
//     if (value > indiaForm.length) {
//       setIndiaForm([
//         ...indiaForm,
//         ...Array(value - indiaForm.length).fill({
//           srNo: "",
//           bankName: "",
//           ifscCode: "",
//           branchAddress: "",
//           accountType: "",
//         }),
//       ]);
//     } else {
//       setIndiaForm(indiaForm.slice(0, value));
//     }
//   };

//   const handleIntlChange = (e) => {
//     setIntlForm({ ...intlForm, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {

//     navigate('/bankmasterlist')
//     console.log("India Bank Details:", indiaForm);
//     console.log("International Bank Details:", intlForm);
//     alert("Bank Master saved successfully!");
//   };

//   const handleDelete = () => {
//     setIndiaForm([{ srNo: "", bankName: "", ifscCode: "", branchAddress: "", accountType: "" }]);
//     setNumRows(1);
//     setIntlForm({ srNo: "", swiftCode: "", bankName: "", iban: "", country: "" });
//   };

//   const handleClose = () => {
//     window.history.back();
//   };

//   return (
//     <div className="bank-master-container">
//       <h2>Bank Master</h2>

//       {/* Input for number of rows */}
//       <div style={{ marginBottom: "10px" }}>
//         <label>No. of Bank Entries: </label>
//         <input
//           type="number"
//           min="1"
//           value={numRows}
//           onChange={handleNumRowsChange}
//         />
//       </div>

//       {/* India Table - Multiple Rows */}
//       <h3>India Bank Details</h3>
//       <table className="bank-master-table">
//         <thead>
//           <tr>
//             <th>Sr. No</th>
//             <th>Name of Bank</th>
//             <th>IFSC Code</th>
//             <th>Branch Address</th>
//             <th>Account Type</th>
//           </tr>
//         </thead>
//         <tbody>
//           {indiaForm.map((row, index) => (
//             <tr key={index}>
//               <td>
//                 <input
//                   type="text"
//                   name="srNo"
//                   placeholder="Enter Sr. No"
//                   value={row.srNo}
//                   onChange={(e) => handleIndiaChange(e, index)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   name="bankName"
//                   placeholder="Enter bank name"
//                   value={row.bankName}
//                   onChange={(e) => handleIndiaChange(e, index)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   name="ifscCode"
//                   placeholder="Enter IFSC code"
//                   value={row.ifscCode}
//                   onChange={(e) => handleIndiaChange(e, index)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   name="branchAddress"
//                   placeholder="Enter branch address"
//                   value={row.branchAddress}
//                   onChange={(e) => handleIndiaChange(e, index)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   name="accountType"
//                   placeholder="Enter account type"
//                   value={row.accountType}
//                   onChange={(e) => handleIndiaChange(e, index)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* International Table */}
//       <h3>International Bank Details</h3>
//       <table className="bank-master-table">
//         <thead>
//           <tr>
//             <th>Sr. No</th>
//             <th>SWIFT Code</th>
//             <th>Name of Bank</th>
//             <th>IBAN</th>
//             <th>Country</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>
//               <input
//                 type="text"
//                 name="srNo"
//                 placeholder="Enter Sr. No"
//                 value={intlForm.srNo}
//                 onChange={handleIntlChange}
//               />
//             </td>
//             <td>
//               <input
//                 type="text"
//                 name="swiftCode"
//                 placeholder="Enter SWIFT code"
//                 value={intlForm.swiftCode}
//                 onChange={handleIntlChange}
//               />
//             </td>
//             <td>
//               <input
//                 type="text"
//                 name="bankName"
//                 placeholder="Enter bank name"
//                 value={intlForm.bankName}
//                 onChange={handleIntlChange}
//               />
//             </td>
//             <td>
//               <input
//                 type="text"
//                 name="iban"
//                 placeholder="Enter IBAN"
//                 value={intlForm.iban}
//                 onChange={handleIntlChange}
//               />
//             </td>
//             <td>
//               <input
//                 type="text"
//                 name="country"
//                 placeholder="Enter country"
//                 value={intlForm.country}
//                 onChange={handleIntlChange}
//               />
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       {/* Buttons */}
//       <div className="button-group">
//         <button className="btn save" onClick={handleSave}>Save</button>
//         <button className="btn delete" onClick={handleDelete}>Delete</button>
//         <button className="btn close" onClick={handleClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default BankMasterForm;
import React, { useState, useEffect } from "react";
import "./BankMasterForm.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const BankMasterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingBank = location.state?.bank || null;

  const [numRows, setNumRows] = useState(1);
  const [indiaForm, setIndiaForm] = useState([
    {
      srNo: "",
      bankName: "",
      ifscCode: "",
      branchAddress: "",
      micrCode: "",
      swiftCode: "",
      managerName: "",
      managerEmail: "",
      managerContact: "",
      bankWebsite: "",
      hasDematAccount: false,
      pinCode: "",
      state: "",
      city: "",
      address: "",
      infoSourceName: "",
      panNo: "",
      infoSourceCode: "",
    },
  ]);

  const [ifscSuggestions, setIfscSuggestions] = useState([]);

  useEffect(() => {
    if (editingBank) {
      setIndiaForm([
        {
          srNo: editingBank.srNo || "",
          bankName: editingBank.bankName || "",
          ifscCode: editingBank.ifscCode || "",
          branchAddress: editingBank.branchAddress || "",
          micrCode: editingBank.micrCode || "",
          swiftCode: editingBank.swiftCode || "",
          managerName: editingBank.managerName || "",
          managerEmail: editingBank.managerEmail || "",
          managerContact: editingBank.managerContact || "",
          bankWebsite: editingBank.bankWebsite || "",
          hasDematAccount: editingBank.hasDematAccount || false,
          pinCode: editingBank.pinCode || "",
          state: editingBank.state || "",
          city: editingBank.city || "",
          address: editingBank.address || "",
          infoSourceName: editingBank.infoSourceName || "",
          panNo: editingBank.panNo || "",
          infoSourceCode: editingBank.infoSourceCode || "",
        },
      ]);
    }
  }, [editingBank]);

  const handleIndiaChange = (e, index) => {
    const { name, value } = e.target;
    const updated = [...indiaForm];
    updated[index][name] = value;

    // 🔹 Auto-split PAN & InfoSourceCode when infoSourceName entered
    if (name === "infoSourceName" && value.includes(".")) {
      const [pan, code] = value.split(".");
      updated[index].panNo = pan || "";
      updated[index].infoSourceCode = code || "";
    }

    setIndiaForm(updated);

    // 🔹 Fetch State & City when Pincode entered
    if (name === "pinCode" && value.length === 6) {
      axios
        .get(`https://api.postalpincode.in/pincode/${value}`)
        .then((res) => {
          if (res.data && res.data[0].Status === "Success") {
            updated[index].state = res.data[0].PostOffice[0].State || "";
            updated[index].city = res.data[0].PostOffice[0].District || "";
            setIndiaForm([...updated]);
          }
        })
        .catch((err) => console.error("Pincode fetch error:", err));
    }

    // 🔹 Fetch IFSC suggestions
    if (name === "ifscCode" && value.length > 2) {
  axios
    .get(`http://localhost:8080/api/residential/getBankByIfsc/${value}`)
    .then((res) => setIfscSuggestions(res.data || []))
    .catch((err) => {
      console.error("Error fetching IFSC suggestions:", err);
      setIfscSuggestions([]);
    });
} else if (name === "ifscCode") {
  setIfscSuggestions([]);
}
  };

  const handleSelectIfsc = (ifsc, index) => {
    const updated = [...indiaForm];
    updated[index].ifscCode = ifsc.ifscCode;
    updated[index].bankName = ifsc.bankName;
    updated[index].managerEmail = ifsc.managerEmail;
    updated[index].managerContact = ifsc.managerContact;
    setIndiaForm(updated);
    setIfscSuggestions([]);
  };

  const handleCheckboxChange = (index) => {
    const updated = [...indiaForm];
    updated[index].hasDematAccount = !updated[index].hasDematAccount;
    setIndiaForm(updated);
  };

  const handleNumRowsChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setNumRows(value);

    if (value > indiaForm.length) {
      setIndiaForm([
        ...indiaForm,
        ...Array.from({ length: value - indiaForm.length }, () => ({
          srNo: "",
          bankName: "",
          ifscCode: "",
          branchAddress: "",
          micrCode: "",
          swiftCode: "",
          managerName: "",
          managerEmail: "",
          managerContact: "",
          bankWebsite: "",
          hasDematAccount: false,
          pinCode: "",
          state: "",
          city: "",
          address: "",
          infoSourceName: "",
          panNo: "",
          infoSourceCode: "",
        })),
      ]);
    } else {
      setIndiaForm(indiaForm.slice(0, value));
    }
  };

  const handleSave = () => {
    const payload = indiaForm[0];
    if (editingBank) {
      axios
        .put(
          `http://localhost:8080/api/residential/updatebank/${editingBank.ifscCode}`,
          payload
        )
        .then(() => {
          alert("Bank details updated successfully!");
          navigate("/bankmasterlist");
        })
        .catch((err) => {
          console.error("Error updating bank details:", err);
          alert("Error updating bank details. Check console for details.");
        });
    } else {
      axios
        .post(
          "http://localhost:8080/api/residential/bankDetailsMaster",
          payload
        )
        .then(() => {
          alert("Bank details saved successfully!");
          navigate("/bankmasterlist");
        })
        .catch((err) => {
          console.error("Error saving bank details:", err);
          alert("Error saving bank details. Check console for details.");
        });
    }
  };

  const handleDelete = () => {
    setIndiaForm([
      {
        bankName: "",
        ifscCode: "",
        branchAddress: "",
        micrCode: "",
        swiftCode: "",
        managerName: "",
        managerEmail: "",
        managerContact: "",
        bankWebsite: "",
        hasDematAccount: false,
        pinCode: "",
        state: "",
        city: "",
        address: "",
        infoSourceName: "",
        panNo: "",
        infoSourceCode: "",
      },
    ]);
  };

  const handleClose = () => navigate("/bankmasterlist");

  return (
    <div className="bank-master-container">
      <div className="bank-master-table">
        <h2 className="headingg">
          {editingBank ? "Edit Bank Master" : "Bank Master"}
        </h2>

        {/* <label>No. of Bank Entries: </label>
        <input
          type="number"
          min="1"
          value={numRows}
          onChange={handleNumRowsChange}
        /> */}
      </div>

      {indiaForm.map((row, index) => (
        <div key={index} className="bank-entry-card">
          {/* 🔹 Info Source Fields */}
          <div className="bankmaster-form-row">
            <div className="bankmaster-form-group">
              <label>Info Source Name:</label>
              <input
                type="text"
                name="infoSourceName"
                value={row.infoSourceName}
                placeholder="e.g., ABCED1234F.AZ056"
                onChange={(e) => handleIndiaChange(e, index)}
              />
            </div>
            <div className="bankmaster-form-group">
              <label>PAN No:</label>
              <input
                type="text"
                name="panNo"
                value={row.panNo}
                readOnly
              />
            </div>
            <div className="bankmaster-form-group">
              <label>Info Source Code:</label>
              <input
                type="text"
                name="infoSourceCode"
                value={row.infoSourceCode}
                readOnly
              />
            </div>
          </div>

          {/* 🔹 IFSC + MICR + Swift */}
          <div className="bankmaster-form-row">
            <div className="bankmaster-form-group" style={{ position: "relative" }}>
              <label>IFSC Code:</label>
              <input
                type="text"
                name="ifscCode"
                value={row.ifscCode}
                onChange={(e) => handleIndiaChange(e, index)}
                autoComplete="off"
              />
              {ifscSuggestions.length > 0 && (
                <ul className="suggestions-list">
                  {ifscSuggestions.map((item, i) => (
                    <li key={i} onClick={() => handleSelectIfsc(item, index)}>
                      {item.ifscCode} - {item.bankName}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bankmaster-form-group">
              <label>MICR Code:</label>
              <input
                type="text"
                name="micrCode"
                value={row.micrCode}
                onChange={(e) => handleIndiaChange(e, index)}
              />
            </div>
            <div className="bankmaster-form-group">
              <label>Swift Code:</label>
              <input
                type="text"
                name="swiftCode"
                value={row.swiftCode}
                onChange={(e) => handleIndiaChange(e, index)}
              />
            </div>
          </div>

          {/* 🔹 Bank Name, Website, Address */}
          <div className="bankmaster-form-row">
            <div className="bankmaster-form-group">
              <label>Name of Bank:</label>
              <input
                type="text"
                name="bankName"
                value={row.bankName}
                onChange={(e) => handleIndiaChange(e, index)}
              />
            </div>
            <div className="bankmaster-form-group">
              <label>Bank Website:</label>
              <input
                type="text"
                name="bankWebsite"
                value={row.bankWebsite}
                onChange={(e) => handleIndiaChange(e, index)}
              />
            </div>
            <div className="bankmaster-form-group">
              <label>Branch Address:</label>
              <input
                type="text"
                name="branchAddress"
                value={row.branchAddress}
                onChange={(e) => handleIndiaChange(e, index)}
              />
            </div>
          </div>

          {/* 🔹 Pincode, State, City */}
          <div className="bankmaster-form-row">
            <div className="bankmaster-form-group">
              <label>Pincode:</label>
              <input
                type="text"
                name="pinCode"
                value={row.pinCode}
                onChange={(e) => handleIndiaChange(e, index)}
              />
            </div>
            <div className="bankmaster-form-group">
              <label>State:</label>
              <input type="text" name="state" value={row.state} readOnly />
            </div>
            <div className="bankmaster-form-group">
              <label>City:</label>
              <input type="text" name="city" value={row.city} readOnly />
            </div>
          </div>

          {/* 🔹 Manager Details */}
          <div className="bankmaster-form-row">
            <div className="bankmaster-form-group">
              <label>Manager Name:</label>
              <input
                type="text"
                name="managerName"
                value={row.managerName}
                onChange={(e) => handleIndiaChange(e, index)}
              />
            </div>
            <div className="bankmaster-form-group">
              <label>Manager Email:</label>
              <input
                type="email"
                name="managerEmail"
                value={row.managerEmail}
                onChange={(e) => handleIndiaChange(e, index)}
              />
            </div>
            <div className="bankmaster-form-group">
              <label>Manager Contact:</label>
              <input
                type="text"
                name="managerContact"
                value={row.managerContact}
                onChange={(e) => handleIndiaChange(e, index)}
              />
            </div>
          </div>

          {/* 🔹 Demat Account Checkbox */}
          <div className="bankmaster-form-row">
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={row.hasDematAccount}
                  onChange={() => handleCheckboxChange(index)}
                />
                Has Demat Account
              </label>
            </div>
          </div>
        </div>
      ))}

      {/* 🔹 Buttons */}
      <div className="button-groupss">
        <button className="btn save" onClick={handleSave}>
          {editingBank ? "Update" : "Save"}
        </button>
        <button
          className="btn-views"
          onClick={() => navigate("/admin/masters/bankmasterlist")}
        >
          View
        </button>
        <button className="btn delete" onClick={handleDelete}>
          Clear
        </button>
        <button className="btn close" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default BankMasterForm;
