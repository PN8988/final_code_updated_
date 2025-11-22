import React, { useState } from 'react';
import './DematForm.css'; // ✅ Import CSS
import { useNavigate } from 'react-router-dom';

export default function DematForm() {
  const [form, setForm] = useState({
    fullName: '',
    panId: '',
    dob: '',
    email: '',
    mobile: '',
    address: '',
    bankName: '',
    accountNumber: '',
    ifsc: '',
    nomineeName: '',
    nomineeRelation: '',
    consent: false,
  });

  const [panFile, setPanFile] = useState(null);
  const [idFile, setIdFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate ([]);
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/i;
  const ifscRegex = /^[A-Za-z]{4}0[A-Z0-9]{6}$/;
  const mobileRegex = /^[6-9][0-9]{9}$/;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleFile(e, setter) {
    const file = e.target.files[0];
    setter(file || null);
  }

  function validate() {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!panRegex.test(form.pan.trim())) errs.pan = 'PAN is invalid (example: ABCDE1234F)';
    if (!form.dob) errs.dob = 'Date of birth is required';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!mobileRegex.test(form.mobile)) errs.mobile = 'Invalid Indian mobile number';
    if (!form.address.trim()) errs.address = 'Address is required';
    if (!form.bankName.trim()) errs.bankName = 'Bank name required';
    if (!form.accountNumber.trim()) errs.accountNumber = 'Account number required';
    if (!ifscRegex.test(form.ifsc)) errs.ifsc = 'Invalid IFSC (example: ABCD0EFG123)';
    if (!form.nomineeName.trim()) errs.nomineeName = 'Nominee name required';
    if (!form.nomineeRelation.trim()) errs.nomineeRelation = 'Nominee relation required';
    if (!panFile) errs.panFile = 'Upload PAN card image/pdf';
    if (!idFile) errs.idFile = 'Upload ID proof (Aadhaar / Passport)';
    if (!signatureFile) errs.signatureFile = 'Upload scanned signature';
    if (!form.consent) errs.consent = 'You must agree to terms';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      panFileName: panFile?.name || null,
      idFileName: idFile?.name || null,
      signatureFileName: signatureFile?.name || null,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('demat_forms') || '[]');
    existing.push(payload);
    localStorage.setItem('demat_forms', JSON.stringify(existing, null, 2));

    setSubmitted(true);
  }

  return (
    <div className="demat-container">
     

      {submitted ? (
        <div className="success-box">
         <h2 className="form-title">Open Demat Account</h2>

      {/* ✅ View Button Added Here */}
      <button
        className="btn-secondary"
        style={{ marginBottom: "15px" }}
        onClick={() => navigate("/demat-list")}
      >
        View Demat List
      </button>
          <h3 className="success-heading">Form submitted successfully!</h3>
          <p className="success-text">Your details are saved locally (demo). Implement API upload to send to server.</p>
          <button
            className="btn-primary"
            onClick={() => {
              setSubmitted(false);
              setForm({
                fullName: '',
                panId: '',
                dob: '',
                email: '',
                mobile: '',
                address: '',
                bankName: '',
                accountNumber: '',
                ifsc: '',
                nomineeName: '',
                nomineeRelation: '',
                consent: false,
              });
              setPanFile(null);
              setIdFile(null);
              setSignatureFile(null);
              setErrors({});
            }}
          >
            Fill New
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="demat-form">
          <section>
            <h4 className="section-title">Personal Details</h4>
            <div className="form-grid">
              <div className="form-field">
                <label>Full name</label>
                <input name="fullName" value={form.fullName} onChange={handleChange} />
                {errors.fullName && <p className="error-text">{errors.fullName}</p>}
              </div>

              <div className="form-field">
                <label>PAN</label>
                <input name="pan" value={form.pan} onChange={handleChange} className="uppercase" />
                {errors.panId && <p className="error-text">{errors.panId}</p>}
              </div>

              <div className="form-field">
                <label>Date of Birth</label>
                <input type="date" name="dob" value={form.dob} onChange={handleChange} />
                {errors.dob && <p className="error-text">{errors.dob}</p>}
              </div>

              <div className="form-field">
                <label>Email</label>
                <input name="email" value={form.email} onChange={handleChange} />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div className="form-field">
                <label>Mobile</label>
                <input name="mobile" value={form.mobile} onChange={handleChange} />
                {errors.mobile && <p className="error-text">{errors.mobile}</p>}
              </div>

              <div className="form-field full-width">
                <label>Address</label>
                <textarea name="address" value={form.address} onChange={handleChange} rows={3} />
                {errors.address && <p className="error-text">{errors.address}</p>}
              </div>
            </div>
          </section>

          <section>
            <h4 className="section-title">Bank Details</h4>
            <div className="form-grid">
              <div className="form-field">
                <label>Bank name</label>
                <input name="bankName" value={form.bankName} onChange={handleChange} />
                {errors.bankName && <p className="error-text">{errors.bankName}</p>}
              </div>

              <div className="form-field">
                <label>Account number</label>
                <input name="accountNumber" value={form.accountNumber} onChange={handleChange} />
                {errors.accountNumber && <p className="error-text">{errors.accountNumber}</p>}
              </div>

              <div className="form-field full-width">
                <label>IFSC</label>
                <input name="ifsc" value={form.ifsc} onChange={handleChange} className="uppercase" />
                {errors.ifsc && <p className="error-text">{errors.ifsc}</p>}
              </div>
            </div>
          </section>

          <section>
            <h4 className="section-title">Nominee</h4>
            <div className="form-grid">
              <div className="form-field">
                <label>Nominee name</label>
                <input name="nomineeName" value={form.nomineeName} onChange={handleChange} />
                {errors.nomineeName && <p className="error-text">{errors.nomineeName}</p>}
              </div>

              <div className="form-field">
                <label>Relation</label>
                <input name="nomineeRelation" value={form.nomineeRelation} onChange={handleChange} />
                {errors.nomineeRelation && <p className="error-text">{errors.nomineeRelation}</p>}
              </div>
            </div>
          </section>

          <section>
            <h4 className="section-title">Uploads</h4>
            <div className="form-grid uploads-grid">
              <div className="form-field">
                <label>PAN card (image/pdf)</label>
                <input type="file" accept="image/*,.pdf" onChange={(e) => handleFile(e, setPanFile)} />
                {panFile && <p className="file-text">Selected: {panFile.name}</p>}
                {errors.panFile && <p className="error-text">{errors.panFile}</p>}
              </div>

              <div className="form-field">
                <label>ID proof (Aadhaar / Passport)</label>
                <input type="file" accept="image/*,.pdf" onChange={(e) => handleFile(e, setIdFile)} />
                {idFile && <p className="file-text">Selected: {idFile.name}</p>}
                {errors.idFile && <p className="error-text">{errors.idFile}</p>}
              </div>

              <div className="form-field">
                <label>Signature (scanned)</label>
                <input type="file" accept="image/*,.pdf" onChange={(e) => handleFile(e, setSignatureFile)} />
                {signatureFile && <p className="file-text">Selected: {signatureFile.name}</p>}
                {errors.signatureFile && <p className="error-text">{errors.signatureFile}</p>}
              </div>
            </div>
          </section>

          <div className="checkbox-row">
            <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} />
            <label>I agree to the terms and authorize electronic KYC</label>
            {errors.consent && <p className="error-text">{errors.consent}</p>}
          </div>

          <div className="button-row">
            <button type="submit" className="btn-primary">Submit</button>
            <button type="button" className="btn-secondary" onClick={() => {
              setForm({
                fullName: '',
                panId: '',
                dob: '',
                email: '',
                mobile: '',
                address: '',
                bankName: '',
                accountNumber: '',
                ifsc: '',
                nomineeName: '',
                nomineeRelation: '',
                consent: false,
              });
              setPanFile(null);
              setIdFile(null);
              setSignatureFile(null);
              setErrors({});
            }}>Reset</button>
          </div>
        </form>
      )}

      <div className="saved-count">
        <strong>Saved forms:</strong> {JSON.parse(localStorage.getItem('demat_forms') || '[]').length}
      </div>
    </div>
  );
}
