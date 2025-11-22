// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./BankMasterList.css";
// import { Button } from "react-bootstrap";
// import axios from "axios";

// const BankMasterList = () => {
//   const navigate = useNavigate();
//   const [indiaBanks, setIndiaBanks] = useState([]);
//   const [internationalBanks, setInternationalBanks] = useState([]);
//   const [bankList, setBankList] = useState ([]);
//   // Load data from localStorage on mount
// useEffect(() => {
//     axios.get("http://localhost:8080/api/residential/getbankDetailsMaster")
//       .then((res) => {
//         setBankList(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching bank list:", err);
//       });
//   }, []);

//   // Delete function for India banks
//   const deleteIndiaBank = (index) => {
//     const updatedBanks = indiaBanks.filter((_, i) => i !== index);
//     setIndiaBanks(updatedBanks);
//     localStorage.setItem("indiaBanks", JSON.stringify(updatedBanks));
//   };

//   // Delete function for International banks
//   const deleteInternationalBank = (index) => {
//     const updatedBanks = internationalBanks.filter((_, i) => i !== index);
//     setInternationalBanks(updatedBanks);
//     localStorage.setItem("internationalBanks", JSON.stringify(updatedBanks));
//   };

//   return (
//     <div className="bank-master-container">
//       <h2 className="title">Bank Master List</h2>

//       {/* Back to Form Button */}
//       <div className="form-buttons" style={{ marginBottom: "20px" }}>
//         <button onClick={() => navigate("/")}>Add New Bank</button>
//       </div>

//       {/* India Banks Table */}
//       {indiaBanks.length > 0 ? (
//         <>
//           <h3>India Banks</h3>
//           <table className="styled-table">
//             <thead>
//               <tr>
//                 <th>Name of Bank</th>
//                 <th>IFSC Code</th>
//                 <th>Branch Address</th>
//                 <th>MICR Code</th>
//                 <th>Swift Code</th>
//                 <th>Manager Name</th>
//                 <th>Manager EmailId</th>
//                 <th>Manager Contact</th>
//                 <th>Website</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {indiaBanks.map((bank, index) => (
//                 <tr key={index}>
//                   <td>{bank.bankName}</td>
//                   <td>{bank.ifscCode}</td>
//                   <td>{bank.branchAddress}</td>
//                   <td>{bank.micrCode}</td>
//                   <td>{bank.swiftCode}</td>
//                   <td>{bank.managerName}</td>
//                   <td>{bank.managerEmail}</td>
//                   <td>{bank.managerContact}</td>
//                   <td>{bank.bWebsite}</td>
//                   <td>{bank.hasDematAccount}</td>
                  
//                   <td>
                    
//                     <button className="delete-btn" onClick={() => deleteIndiaBank(index)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       ) : (
//         <p>No India Bank Data Available</p>
//       )}

// {/*       
//        {internationalBanks.length > 0 ? (
//         <>
//           <h3>International Banks</h3>
//           <table className="styled-table">
//             <thead>
//               <tr>
//                 <th>Sr. No</th>
//                 <th>Swift Code</th>
//                 <th>Name of Bank</th>
//                 <th>IBAN</th>
//                 <th>Country of Location</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {internationalBanks.map((bank, index) => (
//                 <tr key={index}>
//                   <td>{bank.srNo}</td>
//                   <td>{bank.swiftCode}</td>
//                   <td>{bank.nameOfBank}</td>
//                   <td>{bank.iban}</td>
//                   <td>{bank.countryOfLocation}</td>
//                   <td>
//                     <button className="delete-btn" onClick={() => deleteInternationalBank(index)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       ) : (
//         <p>No International Bank Data Available</p>
//       )} */}
//     </div> 
//   );
// };

// export default BankMasterList;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BankMasterList.css";
import { Button } from "react-bootstrap";
import axios from "axios";

const BankMasterList = () => {
  const navigate = useNavigate();
  const [bankList, setBankList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/bank/getbankDetailsMaster")
      .then((res) => {
        setBankList(res.data);
      })
      .catch((err) => {
        console.error("Error fetching bank list:", err);
      });
  }, []);

  const deleteBank = (id) => {
    axios
      .delete(`http://localhost:8080/api/residential/deletebank/${id}`)
      .then(() => {
        setBankList(bankList.filter((bank) => bank.id !== id));
      })
      .catch((err) => {
        console.error("Error deleting bank:", err);
      });
  };

  // ✅ Navigate to edit with prefilled data
const editBank = (bank) => {
  navigate("/bank-master", { state: { bank } });
};


  return (
    <div className="bank-masterlist-container">
      <h2 className="title">Bank Master List</h2>

      {/* Back to Form Button */}
      <div className="form-buttons" style={{ marginBottom: "20px" }}>
        <button onClick={() => navigate("/bank-master")}>Add New Bank</button>
      </div>

      {/* Bank Table */}
      {bankList.length > 0 ? (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Name of Bank</th>
              <th>IFSC Code</th>
              <th>Branch Address</th>
              <th>MICR Code</th>
              <th>Swift Code</th>
              <th>PinCode</th>
              <th>State</th>
              <th>City</th>
              <th>Manager Name</th>
              <th>Manager EmailId</th>
              <th>Manager Contact</th>
              <th>Website</th>
              <th>Address</th>
              <th>Info Source Name</th>
              <th>PAN No</th>
              <th>Info Source Code</th>
              <th>Has Demat Account</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bankList.map((bank, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{bank.bankName}</td>
                <td>{bank.ifscCode}</td>
                <td>{bank.branchAddress}</td>
                <td>{bank.micrCode}</td>
                <td>{bank.swiftCode}</td>
               <td>{bank.pinCode}</td>
                <td>{bank.state}</td>
                <td>{bank.city}</td>
                <td>{bank.managerName}</td>
                <td>{bank. managerEmail}</td>
                <td>{bank.managerContact}</td>
                <td>{bank.bankWebsite}</td>
                <td>{bank.address}</td>
                <td>{bank.infoSourceName}</td>
                <td>{bank.infoSourceCode}</td>
                <td>{bank.panNo}</td>
                <td>{bank.hasDematAccount ? "Yes" : "No"}</td>
                <td>
                  <button
  className="edit-btn"
  onClick={() => editBank(bank)}
>
  Edit
</button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteBank(bank.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      ) : (
        <p>No Bank Data Available</p>
      )}
    </div>
  );
};

export default BankMasterList;

