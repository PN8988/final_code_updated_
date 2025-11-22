import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SaleDetailsForm.css'; // You can style as needed

const SaleDetailsForm = () => {
  const location = useLocation();

  const purchaseDate = location.state?.purchaseDate || '';
  const totalPurchaseAmount = parseFloat(location.state?.totalAmount || 0);

  const [formData, setFormData] = useState({
    saleDate: '',
    salerName: '',
    saleValue: '',
    gainAmount: '',
    holdingPeriod: '',
    capitalGainType: '',
  });

  useEffect(() => {
    if (formData.saleDate && purchaseDate) {
      const holdingDays = calculateHoldingPeriod(purchaseDate, formData.saleDate);
      const gain = parseFloat(formData.saleValue || 0) - totalPurchaseAmount;

      setFormData((prev) => ({
        ...prev,
        gainAmount: gain.toFixed(2),
        holdingPeriod: holdingDays,
        capitalGainType: holdingDays >= 365 ? 'LTCG' : 'STCG',
      }));
    }
  }, [formData.saleDate, formData.saleValue]);

  const calculateHoldingPeriod = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="sale-form-container">
      <h2>Sale Details</h2>

      <div className="form-row">
        <label>Sale Date</label>
        <input
          type="date"
          name="saleDate"
          value={formData.saleDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-row1">
        <label>Saler Name</label>
        <input
          type="text"
          name="salerName"
          value={formData.salerName}
          onChange={handleChange}
          placeholder="Enter saler name"
        />
      </div>

      <div className="form-row1">
        <label>Sale Value</label>
        <input
          type="number"
          name="saleValue"
          value={formData.saleValue}
          onChange={handleChange}
          placeholder="Enter sale value"
        />
      </div>

      <div className="form-row1">
        <label>Gain Amount</label>
        <input type="text" value={formData.gainAmount} readOnly />
      </div>

      <div className="form-row1">
        <label>Net Holding Period (Days)</label>
        <input type="text" value={formData.holdingPeriod} readOnly />
      </div>

      <div className="form-row1">
        <label>Capital Gain Type</label>
        <input type="text" value={formData.capitalGainType} readOnly />
      </div>
    </div>
  );
};

export default SaleDetailsForm;
