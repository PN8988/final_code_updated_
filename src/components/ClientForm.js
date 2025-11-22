import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';

const ClientForm = ({ addClient, importClients }) => {
  const [formData, setFormData] = useState({
    id: '',
    pan: '',
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    mobile: '',
    financialYear: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    const fyRegex = /^\d{4}-\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    const nameRegex = /^[A-Za-z]{2,}$/;

    if (!panRegex.test(formData.pan)) newErrors.pan = 'Invalid PAN (ABCDE1234F)';
    if (!formData.dob || new Date(formData.dob) >= new Date()) newErrors.dob = 'Invalid DOB';
    if (!fyRegex.test(formData.financialYear)) {
      newErrors.financialYear = 'Format YYYY-YYYY';
    } else {
      const [start, end] = formData.financialYear.split('-').map(Number);
      if (end !== start + 1) newErrors.financialYear = 'End year must be start year + 1';
    }
    if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email';
    if (!mobileRegex.test(formData.mobile)) newErrors.mobile = 'Invalid mobile';
    if (!nameRegex.test(formData.firstName)) newErrors.firstName = 'First name must be at least 2 letters';
    if (!nameRegex.test(formData.lastName)) newErrors.lastName = 'Last name must be at least 2 letters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'pan' ? value.toUpperCase() : value });
  };

  const handleAdd = () => {
    if (validate()) {
      addClient(formData);
      navigate('/clients');
    }
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        importClients(results.data);
        alert('Clients imported!');
      },
    });
  };

  return (
    <div className="form-container">
      <h2>Client Form</h2>
      <form>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label>{key.toUpperCase()}:</label>
            <input
              type={key === 'dob' ? 'date' : 'text'}
              name={key}
              value={value}
              onChange={handleChange}
            />
            {errors[key] && <div className="error">{errors[key]}</div>}
          </div>
        ))}
        <button type="button" onClick={handleAdd}>Add</button>

        <label className="import-btn">
          <input type="file" accept=".csv" onChange={handleImport} hidden />
          Import CSV
        </label>

        <a href="/sample_client_format.csv" download className="sample-link">Download Sample CSV</a>
      </form>
    </div>
  );
};

export default ClientForm;
