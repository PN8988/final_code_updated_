import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ClientDetails.css';
import axios from 'axios';

const ClientDetailsForm = ({ onSave, existingPanIds = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract client data passed via navigation (edit mode)
  const clientToEdit = location.state?.clientToEdit || null;

  const [formData, setFormData] = useState({
    panId: '',
    clientName: '',
    legalName: '',
    aadharNo: '',
    dateOfBirth: '',
    gender: '',
    contact: '',
    homeState: '',
    mobileNumber: '',
    emailId: '',
    status: true,
  });

  useEffect(() => {
    if (clientToEdit) {
      setFormData({
        ...clientToEdit,
      });
    }
  }, [clientToEdit]);

  const [errors, setErrors] = useState({});

  const states = [
    '01_Jammu And Kashmir', '02_Himachal Pradesh', '03_Punjab', '04_Chandigarh',
    '05_Uttarakhand', '06_Haryana', '07_Delhi', '08_Rajasthan', '09_Uttar Pradesh',
    '10_Bihar', '11_Sikkim', '12_Arunachal Pradesh', '13_Nagaland', '14_Manipur',
    '15_Mizoram', '16_Tripura', '17_Meghalaya', '18_Assam', '19_West Bengal',
    '20_Jharkhand', '21_Odisha', '22_Chhattisgarh', '23_Madhya Pradesh', '24_Gujarat',
    '26_Dadra And Nagar Haveli And Daman And Diu', '27_Maharashtra', '29_Karnataka',
    '30_Goa', '31_Lakshadweep', '32_Kerala', '33_Tamil Nadu', '34_Puducherry',
    '35_Andaman And Nicobar Islands', '36_Telangana', '37_Andhra Pradesh',
    '38_Ladakh', '97_Other Territory', '99_Center JURISDICTION'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validate = () => {
    const newErrors = {};
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!formData.clientName.trim()) newErrors.clientName = 'This field is required.';
    if (!formData.legalName.trim()) newErrors.legalName = 'This field is required.';
    if (!formData.panId.trim()) {
      newErrors.panId = 'This field is required.';
    } else if (!panRegex.test(formData.panId)) {
      newErrors.panId = 'Invalid PAN format.';
    } else if (!clientToEdit && existingPanIds.includes(formData.panId)) {
      newErrors.panId = 'PAN ID must be unique.';
    }

    // if (!formData.aadharNo.trim()) {
    //   newErrors.aadharNo = 'This field is required.';
    // } else if (!/^\d{12}$/.test(formData.aadharNo)) {
    //   newErrors.aadharNo = 'Aadhaar No must be 12 digits.';
    // }

    // if (!formData.dateOfBirth) {
    //   newErrors.dateOfBirth = 'This field is required.';
    // }

    // if (!formData.gender) {
    //   newErrors.gender = 'This field is required.';
    // }

    if (!formData.contact.trim()) newErrors.contact = 'This field is required.';
    if (!formData.homeState) newErrors.homeState = 'This field is required.';
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'This field is required.';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile Number must be 10 digits.';
    }
    if (!formData.emailId.trim()) {
      newErrors.emailId = 'This field is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
      newErrors.emailId = 'Email ID is invalid.';
    }
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (clientToEdit) {
        // EDIT mode - PUT
        const response = await axios.put(
          `http://localhost:8080/api/clients/update/${formData.panId}`,
          formData
        );
        console.log("Client updated:", response.data);
        alert("Client updated successfully!");
      } else {
        // ADD mode - POST
        const response = await axios.post(
          "http://localhost:8080/api/clients/addclient",
          formData
        );
        console.log("Client saved:", response.data);
        alert("Client saved successfully!");
      }

      navigate('/clientlist');
    } catch (error) {
      console.error("Error saving/updating client:", error);
      alert("Error occurred. Please try again.");
    }
  };

  const handleCancel = () => {
    setFormData({
      panId: '',
      clientName: '',
      legalName: '',
      // aadharNo: '',
      // dateOfBirth: '',
    //  gender: '',
      contact: '',
      homeState: '',
      mobileNumber: '',
      emailId: '',
      status: true,
    });
    setErrors({});
  };

  return (
    <div className='form-container-wrapper1'>
      <div className="clientform-container">
        <h2>Client Details</h2>
        <table className="client-form-table">
          <tbody>
            <tr>
              <td><label htmlFor="clientName">Client/Trade Name<span className='required'>*</span></label></td>
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
              <td><label htmlFor="legalName">Legal/PAN Name<span className='required'>*</span></label></td>
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
              <td><label htmlFor="panId">PAN ID<span className='required'>*</span></label></td>
              <td>
                <input
                  type="text"
                  id="panId"
                  name="panId"
                  value={formData.panId}
                  onChange={handleChange}
                  readOnly={!!clientToEdit}
                />
                {errors.panId && <span className="error">{errors.panId}</span>}
              </td>
              <td><label htmlFor="homeState">Home State<span className='required'>*</span></label></td>
              <td>
                <select
                  id="homeState"
                  name="homeState"
                  value={formData.homeState}
                  onChange={handleChange}
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.homeState && <span className="error">{errors.homeState}</span>}
              </td>
            </tr>
            {/* <tr>
              <td><label htmlFor="aadharNo">Aadhaar No<span className='required'>*</span></label></td>
              <td>
                <input
                  type="text"
                  id="aadharNo"
                  name="aadharNo"
                  value={formData.aadharNo}
                  onChange={handleChange}
                />
                {errors.aadharNo && <span className="error">{errors.aadharNo}</span>}
              </td>
              <td><label htmlFor="dateOfBirth">Date of Birth<span className='required'>*</span></label></td>
              <td>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
                {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
              </td>
            </tr>
            <tr>
              <td><label htmlFor="gender">Gender<span className='required'>*</span></label></td>
              <td>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <span className="error">{errors.gender}</span>}
              </td> */}
              <td><label htmlFor="mobileNumber">Mobile Number<span className='required'>*</span></label></td>
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
          
            <tr>
              <td><label htmlFor="contact">Contact POC<span className='required'>*</span></label></td>
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
              <td><label htmlFor="emailId">Email ID<span className='required'>*</span></label></td>
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
              <td><label htmlFor="status">Status</label></td>
              <td colSpan="3">
                <label>
                  <input
                    type="checkbox"
                    id="status"
                    name="status"
                    className='status-check'
                    checked={formData.status}
                    onChange={handleChange}
                  />
                  {formData.status ? 'Active' : 'Inactive'}
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="client-button-group">
          <button className='button-save' onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsForm;
