// import React, { useState } from 'react';
// //import { Form, Button, Row, Col } from 'react-bootstrap';
//   import './EmployeeDetailsForm.css';


// const EmployeeDetailsForm = () => {
//   const [formData, setFormData] = useState({
//     employerName: '',
//     pan: '',
//     tan: '',
//     type: '',
//     designation: '',
//     addressLine1: '',
//     addressLine2: '',
//     addressLine3: '',
//     city: '',
//     state: '',
//     pinCode: '',
//     zipCode: '',
//   });

//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const newErrors = {};
//     const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
//     const tanRegex = /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/;
//     const pinCodeRegex = /^[0-9]{6}$/;
//     const zipCodeRegex = /^[0-9]{5}(?:[-\s][0-9]{4})?$/;

//     if (!formData.employerName) newErrors.employerName = 'Employer name is required';
//     if (!formData.pan || !panRegex.test(formData.pan)) newErrors.pan = 'Invalid PAN format';
//     if (!formData.tan || !tanRegex.test(formData.tan)) newErrors.tan = 'Invalid TAN format';
//     if (!formData.type) newErrors.type = 'Type is required';
//     if (!formData.designation) newErrors.designation = 'Designation is required';
//     if (!formData.addressLine1) newErrors.addressLine1 = 'Address Line 1 is required';
//     if (!formData.city) newErrors.city = 'City is required';
//     if (!formData.state) newErrors.state = 'State is required';
//     if (!formData.pinCode || !pinCodeRegex.test(formData.pinCode)) newErrors.pinCode = 'Invalid PIN code';
//     if (!formData.zipCode || !zipCodeRegex.test(formData.zipCode)) newErrors.zipCode = 'Invalid ZIP code';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       console.log('Form submitted:', formData);
//       // Submit form data to the server or perform further actions
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="employerName">
//         <Form.Label>Employer Name</Form.Label>
//         <Form.Control
//           type="text"
//           name="employerName"
//           value={formData.employerName}
//           onChange={handleChange}
//           isInvalid={!!errors.employerName}
//         />
//         <Form.Control.Feedback type="invalid">
//           {errors.employerName}
//         </Form.Control.Feedback>
//       </Form.Group>

//       <Form.Group controlId="pan">
//         <Form.Label>PAN</Form.Label>
//         <Form.Control
//           type="text"
//           name="pan"
//           value={formData.pan}
//           onChange={handleChange}
//           isInvalid={!!errors.pan}
//         />
//         <Form.Control.Feedback type="invalid">
//           {errors.pan}
//         </Form.Control.Feedback>
//       </Form.Group>

//       <Form.Group controlId="tan">
//         <Form.Label>TAN</Form.Label>
//         <Form.Control
//           type="text"
//           name="tan"
//           value={formData.tan}
//           onChange={handleChange}
//           isInvalid={!!errors.tan}
//         />
//         <Form.Control.Feedback type="invalid">
//           {errors.tan}
//         </Form.Control.Feedback>
//       </Form.Group>

//       <Form.Group controlId="type">
//         <Form.Label>Type</Form.Label>
//         <Form.Control
//           as="select"
//           name="type"
//           value={formData.type}
//           onChange={handleChange}
//           isInvalid={!!errors.type}
//         >
//           <option value="">Select Type</option>
//           <option value="Private">Private</option>
//           <option value="Public">Public</option>
//           <option value="Government">Government</option>
//         </Form.Control>
//         <Form.Control.Feedback type="invalid">
//           {errors.type}
//         </Form.Control.Feedback>
//       </Form.Group>

//       <Form.Group controlId="designation">
//         <Form.Label>Designation</Form.Label>
//         <Form.Control
//           type="text"
//           name="designation"
//           value={formData.designation}
//           onChange={handleChange}
//           isInvalid={!!errors.designation}
//         />
//         <Form.Control.Feedback type="invalid">
//           {errors.designation}
//         </Form.Control.Feedback>
//       </Form.Group>

//       <Form.Group controlId="addressLine1">
//         <Form.Label>Address Line 1</Form.Label>
//         <Form.Control
//           type="text"
//           name="addressLine1"
//           value={formData.addressLine1}
//           onChange={handleChange}
//           isInvalid={!!errors.addressLine1}
//         />
//         <Form.Control.Feedback type="invalid">
//           {errors.addressLine1}
//         </Form.Control.Feedback>
//       </Form.Group>

//       <Form.Group controlId="addressLine2">
//         <Form.Label>Address Line 2</Form.Label>
//         <Form.Control
//           type="text"
//           name="addressLine2"
//           value={formData.addressLine2}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group controlId="addressLine3">
//         <Form.Label>Address Line 3</Form.Label>
//         <Form.Control
//           type="text"
//           name="addressLine3"
//           value={formData.addressLine3}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group controlId="city">
//         <Form.Label>City</Form.Label>
//         <Form.Control
//           type="text"
//           name="city"
//           value={formData.city}
//           onChange={handleChange}
//           isInvalid={!!errors.city}
//         />
//         <Form.Control.Feedback type="invalid">
//           {errors.city}
//         </Form.Control.Feedback>
//       </Form.Group>

//       <Form.Group controlId="state">
//         <Form.Label>State</Form.Label>
//         <Form.Control
//           type="text"
//           name="state"
//           value={formData.state}
//           onChange={handleChange}
//           isInvalid={!!errors.state}
//         />
//         <Form.Control.Feedback type="invalid">
//           {errors.state}
//         </Form.Control.Feedback>
//       </Form.Group>

//       <Form.Group controlId="pinCode">
//         <Form.Label>PIN Code</Form.Label>
//         <Form.Control
//           type="text"
//           name="pinCode"
//           value={formData.pinCode}
//           onChange={handleChange}
//           isInvalid={!!errors.pinCode}
//         />
//         <Form.Control.Feedback type="invalid">
//           {errors.pinCode}
//         </Form.Control.Feedback>
//       </Form.Group>

//       <Form.Group controlId="zipCode">
//         <Form.Label>ZIP Code</Form.Label>
//         <Form.Control
//           type="text"
//           name="zipCode"
//           value={formData.zipCode}
//           onChange={handleChange}
//           isInvalid={!!errors.zipCode}
//         />
//         <Form.Control.Feedback type="invalid">
//           {errors.zipCode}
//         </Form.Control.Feedback>
//       </Form.Group>

//       <Button variant="primary" type="submit" className="mt-3">
//         Submit
//       </Button>
//     </Form>
//   );
// };

// export default EmployeeDetailsForm;
// import React, { useState } from 'react';
// import './EmployeeDetailsForm.css';

// const EmployeeDetailsForm = () => {
//   const [formData, setFormData] = useState({
//     employerName: '',
//     panNumber: '',
//     tanNumber: '',
//     designation: '',
//     type: '',
//     state: '',
//     city: '',
//     addressLine1: '',
//     addressLine2: '',
//     addressLine3: '',
//     pinCode: '',
//     zipCode: '',
//   });

//   const [activeTab, setActiveTab] = useState('employee');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log('Form Data:', formData);
//   };

//   // Sample data for states and cities
//   const stateCityData = {
//     Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
//     Karnataka: ['Bangalore', 'Mysore', 'Hubli'],
//     Delhi: ['New Delhi', 'Dwarka', 'Rohini'],
//   };

//   const states = Object.keys(stateCityData);
//   const cities = formData.state ? stateCityData[formData.state] : [];

//   return (
//     <div className="form-wrapper">
//       <div className="top-nav">
//         <button
//           className={activeTab === 'employee' ? 'active' : ''}
//           onClick={() => handleTabClick('employee')}
//         >
//           Employee Details
//         </button>
//         <button
//           className={activeTab === 'salary' ? 'active' : ''}
//           onClick={() => handleTabClick('salary')}
//         >
//           Salary Details
//         </button>
//       </div>

//       {activeTab === 'employee' && (
//         <form className="form-container" onSubmit={handleSubmit}>
//           {/* Row 1 */}
//           <div className="form-row">
//             <input
//               type="text"
//               name="employerName"
//               placeholder="Employer Name"
//               value={formData.employerName}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="panNumber"
//               placeholder="PAN Number"
//               value={formData.panNumber}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="tanNumber"
//               placeholder="TAN Number"
//               value={formData.tanNumber}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Row 2 */}
//           <div className="form-row">
//             <input
//               type="text"
//               name="designation"
//               placeholder="Designation"
//               value={formData.designation}
//               onChange={handleChange}
//             />
//             <select
//               name="type"
//               value={formData.type}
//               onChange={handleChange}
//             >
//               <option value="">Select Type</option>
//               <option value="full-time">Full-Time</option>
//               <option value="part-time">Part-Time</option>
//               <option value="contract">Contract</option>
//             </select>
//             <select
//               name="state"
//               value={formData.state}
//               onChange={handleChange}
//             >
//               <option value="">Select State</option>
//               {states.map((state) => (
//                 <option key={state} value={state}>
//                   {state}
//                 </option>
//               ))}
//             </select>
//             <select
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               disabled={!formData.state}
//             >
//               <option value="">Select City</option>
//               {cities.map((city) => (
//                 <option key={city} value={city}>
//                   {city}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Row 3 */}
//           <div className="form-row">
//             <input
//               type="text"
//               name="addressLine1"
//               placeholder="Address Line 1"
//               value={formData.addressLine1}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="addressLine2"
//               placeholder="Address Line 2"
//               value={formData.addressLine2}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="addressLine3"
//               placeholder="Address Line 3"
//               value={formData.addressLine3}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="pinCode"
//               placeholder="Pin Code"
//               value={formData.pinCode}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="zipCode"
//               placeholder="Zip Code"
//               value={formData.zipCode}
//               onChange={handleChange}
//             />
//           </div>

//           <button type="submit" className="submit-button">
//             Submit
//           </button>
//         </form>
//       )}

//       {activeTab === 'salary' && (
//         <div className="form-container">
//           <h2>Salary Details</h2>
//           {/* Implement salary details form here */}
//           <p>Salary details form will be implemented here.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeDetailsForm;



import React, { useState } from 'react';
//import { FaSave, FaTrash, FaArrowLeft, FaCopy, FaPaste } from 'react-icons/fa';
import './EmployeeDetailsForm.css';

const EmployeeDetailsForm = () => {
  const [formData, setFormData] = useState({
    employerName: '',
    panNumber: '',
    tanNumber: '',
    designation: '',
    type: '',
    state: '',
    city: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    pinCode: '',
    zipCode: '',
  });

  const [activeTab, setActiveTab] = useState('employee');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Data:', formData);
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log('Delete action triggered');
  };

  const handleBack = () => {
    // Handle back navigation here
    console.log('Back action triggered');
  };

  // const handleCopy = () => {
  //   // Handle copy logic here
  //   console.log('Copy action triggered');
  // };

  // const handlePaste = () => {
  //   // Handle paste logic here
  //   console.log('Paste action triggered');
  // };

  // Sample data for states and cities
  const stateCityData = {
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
    Karnataka: ['Bangalore', 'Mysore', 'Hubli'],
    Delhi: ['New Delhi', 'Dwarka', 'Rohini'],
  };

  const states = Object.keys(stateCityData);
  const cities = formData.state ? stateCityData[formData.state] : [];

  return (
    <div className='page-container'>
    <div className="form-wrapper">
      <div className="top-nav">
        <button
          className={activeTab === 'employee' ? 'active' : ''}
          onClick={() => handleTabClick('employee')}
        >
          Employer Details
        </button>
        <button
          className={activeTab === 'salary' ? 'active' : ''}
          onClick={() => handleTabClick('salary')}
        >
          Salary Details
        </button>
      </div>

      {activeTab === 'employee' && (
        <form className="form-container" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="form-row">
            <input
              type="text"
              name="employerName"
              placeholder="Employer Name"
              value={formData.employerName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="panNumber"
              placeholder="PAN Number"
              value={formData.panNumber}
              onChange={handleChange}
            />
            <input
              type="text"
              name="tanNumber"
              placeholder="TAN Number"
              value={formData.tanNumber}
              onChange={handleChange}
            />
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
            />
            <select
              name="Type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Type</option>
              <option value="central government">Central Government</option>
              <option value="pensioners-central government">Pensioners-Central Government</option>
              <option value="pensioners-state government">Pensioners-State Government</option>
              <option value="pensioners-others">Pensioners-Others</option>
              <option value="pensionsers-public-sector-underaking">Pensioners-Public Sector undertaking</option>
              <option value="psu">PSU</option>
            </select>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!formData.state}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Row 3 */}
          <div className="form-row">
            <input
              type="text"
              name="addressLine1"
              placeholder="Address Line 1"
              value={formData.addressLine1}
              onChange={handleChange}
            />
            <input
              type="text"
              name="addressLine2"
              placeholder="Address Line 2"
              value={formData.addressLine2}
              onChange={handleChange}
            />
            <input
              type="text"
              name="addressLine3"
              placeholder="Address Line 3"
              value={formData.addressLine3}
              onChange={handleChange}
            />
            <input
              type="text"
              name="pinCode"
              placeholder="Pin Code"
              value={formData.pinCode}
              onChange={handleChange}
            />
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
            />
         </div>

          {/* Button Group */}
          
          <div className="button-group">
            <button type="submit" className="btn save-btn">
               Save
            </button>
            <button type="button" className="btn delete-btn" onClick={handleDelete}>
               Delete
            </button>
            <button type="button" className="btn back-btn" onClick={handleBack}>
               Back
            </button><br /><br />
            {/* <button type="button" className="btn icon-btn" onClick={handleCopy}>
              <FaCopy />
            </button>
            <button type="button" className="btn icon-btn" onClick={handlePaste}>
              <FaPaste />
            </button> */}
          </div>
          </form>
           
       
      )}

      {activeTab === 'salary' && (
        <div className="form-container">
          <h2>Salary Details</h2>
          {/* Implement salary details form here */}
          <p>Salary details form will be implemented here.</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default EmployeeDetailsForm;
