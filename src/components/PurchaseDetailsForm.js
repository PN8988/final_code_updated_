// import React, { useState, useEffect } from 'react';
// import './PurchaseDetailsForm.css';

// const PurchaseDetailsForm = () => {
//   const [formData, setFormData] = useState({
//     dateOfPurchase: '',
//     agreementValue: '',
//     stampDuty: '',
//     registration: '',
//     totalAmount: 0,
//   });

//   useEffect(() => {
//     const { agreementValue, stampDuty, registration } = formData;
//     const total = 
//       parseFloat(agreementValue || 0) +
//       parseFloat(stampDuty || 0) +
//       parseFloat(registration || 0);
//     setFormData((prev) => ({ ...prev, totalAmount: total.toFixed(2) }));
//   }, [formData.agreementValue, formData.stampDuty, formData.registration]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     console.log('Saved Data:', formData);
//     alert('Data saved!');
//   };

//   const handleDelete = () => {
//     setFormData({
//       dateOfPurchase: '',
//       agreementValue: '',
//       stampDuty: '',
//       registration: '',
//       totalAmount: 0,
//     });
//   };

//   const handleClose = () => {
//     window.history.back(); // or navigate to another route if using react-router
//   };

//   return (
//     <div className="purchase-form-container">
//       <h2>Purchase Details</h2>
//       <div className="form-group">
//         <label>Date of Purchase:</label>
//         <input
//           type="date"
//           name="dateOfPurchase"
//           value={formData.dateOfPurchase}
//           onChange={handleChange}
//           placeholder="Enter purchase date"
//         />
//       </div>

//       <div className="form-group">
//         <label>Agreement Value:</label>
//         <input
//           type="number"
//           name="agreementValue"
//           value={formData.agreementValue}
//           onChange={handleChange}
//           placeholder="Enter agreement value"
//         />
//       </div>

//       <div className="form-group">
//         <label>Stamp Duty:</label>
//         <input
//           type="number"
//           name="stampDuty"
//           value={formData.stampDuty}
//           onChange={handleChange}
//           placeholder="Enter stamp duty"
//         />
//       </div>

//       <div className="form-group">
//         <label>Registration:</label>
//         <input
//           type="number"
//           name="registration"
//           value={formData.registration}
//           onChange={handleChange}
//           placeholder="Enter registration cost"
//         />
//       </div>

//       <div className="form-group">
//         <label>Total Amount:</label>
//         <input
//           type="text"
//           name="totalAmount"
//           value={formData.totalAmount}
//           readOnly
//         />
//       </div>

//       <div className="button-group">
//         <button className="btn save" onClick={handleSave}>Save</button>
//         <button className="btn delete" onClick={handleDelete}>Delete</button>
//         <button className="btn close" onClick={handleClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default PurchaseDetailsForm;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PurchaseDetailsForm.css';

const formatAmount = (value) => {
  const num = Number(value.replace(/,/g, ''));
  return isNaN(num) ? '' : num.toLocaleString('en-IN');
};

const unformatAmount = (value) => value.replace(/,/g, '');

const PurchaseDetailsForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    purchaseDate: '',
    purchasers: [{ purchaserName: '', percentageShare: '' }],
    baseCost: '',
    stampDuty: '',
    registrationFee: '',
    totalAmount: '0.00',
  });

  useEffect(() => {
    const base = parseFloat(unformatAmount(formData.baseCost)) || 0;
    const duty = parseFloat(unformatAmount(formData.stampDuty)) || 0;
    const reg = parseFloat(unformatAmount(formData.registrationFee)) || 0;
    const total = base + duty + reg;
    setFormData((prev) => ({ ...prev, totalAmount: total.toFixed(2) }));
  }, [formData.baseCost, formData.stampDuty, formData.registrationFee]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (['baseCost', 'stampDuty', 'registrationFee'].includes(name)) {
      const unformatted = unformatAmount(value);
      const formatted = formatAmount(unformatted);
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePurchaserChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPurchasers = [...formData.purchasers];
    updatedPurchasers[index][name] = value;
    setFormData((prev) => ({ ...prev, purchasers: updatedPurchasers }));
  };

  const addPurchaser = () => {
    setFormData((prev) => ({
      ...prev,
      purchasers: [...prev.purchasers, { purchaserName: '', percentageShare: '' }],
    }));
  };

  const removePurchaser = (index) => {
    const updatedPurchasers = formData.purchasers.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, purchasers: updatedPurchasers }));
  };

  const handleSave = () => {
    navigate('/acquisition-form', {
      state: {
        purchaseData: {
          ...formData,
          baseCost: unformatAmount(formData.baseCost),
          stampDuty: unformatAmount(formData.stampDuty),
          registrationFee: unformatAmount(formData.registrationFee),
          totalAmount: formData.totalAmount,
        },
      },
    });
  };

  const handleDelete = () => {
    setFormData({
      purchaseDate: '',
      purchasers: [{ purchaserName: '', percentageShare: '' }],
      baseCost: '',
      stampDuty: '',
      registrationFee: '',
      totalAmount: '0.00',
    });
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="purchase-form-container">
      <h2>Purchase Details</h2>
      <div className="horizontal-form-table">

        <div className="form-row">
          <label>Purchase Date</label>
          <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} />
        </div>

        {formData.purchasers.map((purchaser, index) => (
  <div className="form-row" key={index}>
    <div className="input-group">
      <label>Purchaser Name</label>
      <input
        type="text"
        name="purchaserName"
        placeholder="Enter name"
        value={purchaser.purchaserName}
        onChange={(e) => handlePurchaserChange(index, e)}
      />
    </div>
    <div className="input-group">
      <label>Percentage Share (%)</label>
      <input
        type="number"
        name="percentageShare"
        placeholder="e.g. 50"
        value={purchaser.percentageShare}
        onChange={(e) => handlePurchaserChange(index, e)}
      />
    </div>
    {formData.purchasers.length > 1 && (
      <button type="button" className="remove-btn" onClick={() => removePurchaser(index)}>−</button>
    )}
  </div>
))}


        <button type="button" className="add-btn" onClick={addPurchaser}>+ Add Purchaser</button>

        <div className="form-row">
          <label>Agreement Value</label>
          <input type="text" name="baseCost" value={formData.baseCost} onChange={handleChange} placeholder="Enter agreement value" />

          <label>Stamp Duty</label>
          <input type="text" name="stampDuty" value={formData.stampDuty} onChange={handleChange} placeholder="Enter stamp duty" />

          <label>Registration Fee</label>
          <input type="text" name="registrationFee" value={formData.registrationFee} onChange={handleChange} placeholder="Enter registration fee" />
        </div>

        <div className="form-row">
          <label>Total Amount</label>
          <input type="text" value={formatAmount(formData.totalAmount)} readOnly />
        </div>
      </div>

      <div className="action-group">
        <button className="save-btn1" onClick={handleSave}>Save</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
        <button className="close-btn" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default PurchaseDetailsForm;



