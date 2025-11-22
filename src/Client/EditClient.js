// import React, { useState } from 'react';

// const EditClient = () => {
//   const [formData, setFormData] = useState({
//     clientName: '',
//     legalName: '',
//     homeState: '',
//     mobileNumber: '',
//     contact: '',
//     emailId: '',
//     natureOfBusiness: '',
//   });

//   const [errors, setErrors] = useState({});

//   const states = ['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu']; // Sample states
//   const businessTypes = ['Retail', 'Wholesale', 'Manufacturing', 'Service']; // Sample business types

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     // Implement save logic here
//     console.log('Saved:', formData);
//   };

//   const handleCancel = () => {
//     // Implement cancel logic here
//     console.log('Cancelled');
//   };

//   const handleUpdate = () => {
//     // Implement update logic here
//     console.log('Updated:', formData);
//   };

//   return (
//     <div className="form-container">
//       <h2>Client Details</h2>
//       <table className="form-table">
//         <tbody>
//           <tr>
//             <td>
//               <label htmlFor="clientName">
//                 Client/Trade Name<span className="required">*</span>
//               </label>
//             </td>
//             <td>
//               <input
//                 type="text"
//                 id="clientName"
//                 name="clientName"
//                 value={formData.clientName}
//                 onChange={handleChange}
//               />
//               {errors.clientName && <span className="error">{errors.clientName}</span>}
//             </td>
//             <td>
//               <label htmlFor="legalName">
//                 Legal/PAN Name<span className="required">*</span>
//               </label>
//             </td>
//             <td>
//               <input
//                 type="text"
//                 id="legalName"
//                 name="legalName"
//                 value={formData.legalName}
//                 onChange={handleChange}
//               />
//               {errors.legalName && <span className="error">{errors.legalName}</span>}
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <label htmlFor="homeState">
//                 Home State<span className="required">*</span>
//               </label>
//             </td>
//             <td>
//               <select
//                 id="homeState"
//                 name="homeState"
//                 value={formData.homeState}
//                 onChange={handleChange}
//               >
//                 <option value="">Select State</option>
//                 {states.map((state) => (
//                   <option key={state} value={state}>
//                     {state}
//                   </option>
//                 ))}
//               </select>
//               {errors.homeState && <span className="error">{errors.homeState}</span>}
//             </td>
//             <td>
//               <label htmlFor="mobileNumber">
//                 Mobile Number<span className="required">*</span>
//               </label>
//             </td>
//             <td>
//               <input
//                 type="text"
//                 id="mobileNumber"
//                 name="mobileNumber"
//                 value={formData.mobileNumber}
//                 onChange={handleChange}
//               />
//               {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <label htmlFor="contact">
//                 Contact POC<span className="required">*</span>
//               </label>
//             </td>
//             <td>
//               <input
//                 type="text"
//                 id="contact"
//                 name="contact"
//                 value={formData.contact}
//                 onChange={handleChange}
//               />
//               {errors.contact && <span className="error">{errors.contact}</span>}
//             </td>
//             <td>
//               <label htmlFor="emailId">
//                 Email ID<span className="required">*</span>
//               </label>
//             </td>
//             <td>
//               <input
//                 type="email"
//                 id="emailId"
//                 name="emailId"
//                 value={formData.emailId}
//                 onChange={handleChange}
//               />
//               {errors.emailId && <span className="error">{errors.emailId}</span>}
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <label htmlFor="natureOfBusiness">
//                 Nature of Business<span className="required">*</span>
//               </label>
//             </td>
//             <td colSpan="3">
//               <select
//                 id="natureOfBusiness"
//                 name="natureOfBusiness"
//                 value={formData.natureOfBusiness}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Nature of Business</option>
//                 {businessTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//               {errors.natureOfBusiness && <span className="error">{errors.natureOfBusiness}</span>}
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <div className="button-group">
//         <button className="button-save" onClick={handleSave}>
//           Save
//         </button>
//         <button className="cancel-button" onClick={handleCancel}>
//           Cancel
//         </button>
//         <button className="back-button">Back</button>
//         <button className="back-button" onClick={handleUpdate}>
//           Edit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditClient;


//  import React, { useState } from 'react';

// const EditClient = () => {
//   const [formData, setFormData] = useState({
//     clientName: 'Client A',
//     legalName: 'Legal A',
//     homeState: 'Maharashtra',
//     mobileNumber: '1234567890',
//     contact: 'John Doe',
//     emailId: 'john.doe@example.com',
//     natureOfBusiness: 'Retail',
//   });

//   const [isEditing, setIsEditing] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = () => {
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     console.log('Saved:', formData);
//     setIsEditing(false);
//   };

//   return (
//     <div className="form-container">
//       <h2>Update Client Details</h2>
//       <table className="form-table">
//         <tbody>
//           <tr>
//             <td>
//               <label htmlFor="clientName">Client/Trade Name</label>
//             </td>
//             <td>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   id="clientName"
//                   name="clientName"
//                   value={formData.clientName}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 <span>{formData.clientName}</span>
//               )}
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <label htmlFor="legalName">Legal/PAN Name</label>
//             </td>
//             <td>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   id="legalName"
//                   name="legalName"
//                   value={formData.legalName}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 <span>{formData.legalName}</span>
//               )}
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <label htmlFor="homeState">Home State</label>
//             </td>
//             <td>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   id="homeState"
//                   name="homeState"
//                   value={formData.homeState}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 <span>{formData.homeState}</span>
//               )}
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <label htmlFor="mobileNumber">Mobile Number</label>
//             </td>
//             <td>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   id="mobileNumber"
//                   name="mobileNumber"
//                   value={formData.mobileNumber}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 <span>{formData.mobileNumber}</span>
//               )}
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <label htmlFor="contact">Contact POC</label>
//             </td>
//             <td>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   id="contact"
//                   name="contact"
//                   value={formData.contact}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 <span>{formData.contact}</span>
//               )}
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <label htmlFor="emailId">Email ID</label>
//             </td>
//             <td>
//               {isEditing ? (
//                 <input
//                   type="email"
//                   id="emailId"
//                   name="emailId"
//                   value={formData.emailId}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 <span>{formData.emailId}</span>
//               )}
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <label htmlFor="natureOfBusiness">Nature of Business</label>
//             </td>
//             <td>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   id="natureOfBusiness"
//                   name="natureOfBusiness"
//                   value={formData.natureOfBusiness}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 <span>{formData.natureOfBusiness}</span>
//               )}
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <div className="button-group">
//         {isEditing ? (
//           <button className="button-save" onClick={handleSave}>
//             Save
//           </button>
//         ) : (
//           <button className="button-edit" onClick={handleUpdate}>
//             Edit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EditClient;

import React, { useState } from "react";
import './EditClient.css';

const states = ["Maharashtra", "Karnataka", "Tamil Nadu", "Delhi", "Gujarat"];
const businessTypes = ["Manufacturing", "Trading", "Services", "Consulting"];

const EditClient = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    legalName: "",
    homeState: "",
    mobileNumber: "",
    contact: "",
    emailId: "",
    natureOfBusiness: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.clientName) newErrors.clientName = "Client Name is required";
    if (!formData.legalName) newErrors.legalName = "Legal Name is required";
    if (!formData.homeState) newErrors.homeState = "Home State is required";
    if (!formData.mobileNumber) newErrors.mobileNumber = "Mobile Number is required";
    if (!formData.contact) newErrors.contact = "Contact POC is required";
    if (!formData.emailId) newErrors.emailId = "Email ID is required";
    if (!formData.natureOfBusiness) newErrors.natureOfBusiness = "Nature of Business is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      alert("Form saved successfully!");
      // Add your save logic here
    }
  };

  // const handleUpdate = () => {
  //   alert("data edited successfully");
  //   // Add your cancel logic here, e.g. reset form or navigate away
  // };

  const handleBack = () => {
    alert("Going back");
    // Add your back navigation logic here
  };

  return (
    <div className="form-container-wrap">
    <div className="form-container">
      <h2>Client Details</h2>
      <table className="form-table">
        <tbody>
          <tr>
            <td>
              <label htmlFor="clientName">
                Client/Trade Name<span className="required">*</span>
              </label>
            </td>
            <td>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
              />
              {errors.clientName && <span className="error">{errors.clientName}</span>}
            </td>
            <td>
              <label htmlFor="legalName">
                Legal/PAN Name<span className="required">*</span>
              </label>
            </td>
            <td>
              <input
                type="text"
                id="legalName"
                name="legalName"
                value={formData.legalName}
                onChange={handleChange}
              />
              {errors.legalName && <span className="error">{errors.legalName}</span>}
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="homeState">
                Home State<span className="required">*</span>
              </label>
            </td>
            <td>
              <select
                id="homeState"
                name="homeState"
                value={formData.homeState}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.homeState && <span className="error">{errors.homeState}</span>}
            </td>
            <td>
              <label htmlFor="mobileNumber">
                Mobile Number<span className="required">*</span>
              </label>
            </td>
            <td>
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
              {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="contact">
                Contact POC<span className="required">*</span>
              </label>
            </td>
            <td>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
              {errors.contact && <span className="error">{errors.contact}</span>}
            </td>
            <td>
              <label htmlFor="emailId">
                Email ID<span className="required">*</span>
              </label>
            </td>
            <td>
              <input
                type="email"
                id="emailId"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
              />
              {errors.emailId && <span className="error">{errors.emailId}</span>}
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="natureOfBusiness">
                Nature of Business<span className="required">*</span>
              </label>
            </td>
            <td colSpan="3">
              <select
                id="natureOfBusiness"
                name="natureOfBusiness"
                value={formData.natureOfBusiness}
                onChange={handleChange}
              >
                <option value="">Select Nature of Business</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.natureOfBusiness && (
                <span className="error">{errors.natureOfBusiness}</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="button-group">
        <button className="edit-button">
          Edit
        </button>
        <button className="button-save" onClick={handleSave}>
          Save
        </button>
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
    </div>
  );
};

export default EditClient;


