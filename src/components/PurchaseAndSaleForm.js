// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './PurchaseDetailsForm.css';
// import './SaleDetailsForm.css';

// const formatAmount = (value) => {
//   const num = Number(value.replace(/,/g, ''));
//   return isNaN(num) ? '' : num.toLocaleString('en-IN');
// };

// const unformatAmount = (value) => value.replace(/,/g, '');

// const PurchaseAndSaleForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // PURCHASE FORM STATE
//   const [purchaseData, setPurchaseData] = useState({
//     purchaseDate: '',
//     purchasers: [{ purchaserName: '', percentageShare: '' }],
//     baseCost: '',
//     stampDuty: '',
//     registrationFee: '',
//     totalAmount: '0.00',
//   });

//   // SALE FORM STATE
//   const [saleData, setSaleData] = useState({
//     saleDate: '',
//     salerName: '',
//     saleValue: '',
//     gainAmount: '',
//     holdingPeriod: '',
//     capitalGainType: '',
//   });

//   useEffect(() => {
//     const base = parseFloat(unformatAmount(purchaseData.baseCost)) || 0;
//     const duty = parseFloat(unformatAmount(purchaseData.stampDuty)) || 0;
//     const reg = parseFloat(unformatAmount(purchaseData.registrationFee)) || 0;
//     const total = base + duty + reg;
//     setPurchaseData((prev) => ({ ...prev, totalAmount: total.toFixed(2) }));
//   }, [purchaseData.baseCost, purchaseData.stampDuty, purchaseData.registrationFee]);

//  useEffect(() => {
//   if (saleData.saleDate && purchaseData.purchaseDate) {
//     const holdingDays = calculateHoldingPeriod(purchaseData.purchaseDate, saleData.saleDate);

//     const agreementValue = parseFloat(unformatAmount(purchaseData.baseCost)) || 0;
//     const saleValue = parseFloat(saleData.saleValue || 0);
//     const gain = saleValue - agreementValue;

//     setSaleData((prev) => ({
//       ...prev,
//       gainAmount: gain.toFixed(2),
//       holdingPeriod: holdingDays,
//       capitalGainType: holdingDays >= 365 ? 'LTCG' : 'STCG',
//     }));
//   }
// }, [saleData.saleDate, saleData.saleValue, purchaseData.baseCost, purchaseData.purchaseDate]);


//   const calculateHoldingPeriod = (start, end) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     const diffTime = endDate - startDate;
//     return Math.floor(diffTime / (1000 * 60 * 60 * 24));
//   };

//   // HANDLERS
//   const handlePurchaseChange = (e) => {
//     const { name, value } = e.target;

//     if (['baseCost', 'stampDuty', 'registrationFee'].includes(name)) {
//       const unformatted = unformatAmount(value);
//       const formatted = formatAmount(unformatted);
//       setPurchaseData((prev) => ({ ...prev, [name]: formatted }));
//     } else {
//       setPurchaseData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handlePurchaserChange = (index, e) => {
//     const { name, value } = e.target;
//     const updated = [...purchaseData.purchasers];
//     updated[index][name] = value;
//     setPurchaseData((prev) => ({ ...prev, purchasers: updated }));
//   };

//   const addPurchaser = () => {
//     setPurchaseData((prev) => ({
//       ...prev,
//       purchasers: [...prev.purchasers, { purchaserName: '', percentageShare: '' }],
//     }));
//   };

//   const removePurchaser = (index) => {
//     const updated = purchaseData.purchasers.filter((_, i) => i !== index);
//     setPurchaseData((prev) => ({ ...prev, purchasers: updated }));
//   };

//   const handleSaleChange = (e) => {
//     const { name, value } = e.target;
//     setSaleData((prev) => ({ ...prev, [name]: value }));
//   };

// //   const handleSave = () => {
// //     console.log('Purchase Data:', purchaseData);
// //     console.log('Sale Data:', saleData);
// //     navigate('/acquisition-form');
// //     // Perform your API or navigation logic here
// //   };
// const handleSave=()=>{
// navigate('/acquisition-form', {
//   state: {
//     purchaseCost: purchaseData.baseCost,
//     stampDuty: purchaseData.stampDuty,
//     registrationFee: purchaseData.registrationFee,
//     totalAgreementValue: purchaseData.totalAmount,
//   },
// });
// }
//   const handleDelete = () => {
//     setPurchaseData({
//       purchaseDate: '',
//       purchasers: [{ purchaserName: '', percentageShare: '' }],
//       baseCost: '',
//       stampDuty: '',
//       registrationFee: '',
//       totalAmount: '0.00',
//     });

//     setSaleData({
//       saleDate: '',
//       salerName: '',
//       saleValue: '',
//       gainAmount: '',
//       holdingPeriod: '',
//       capitalGainType: '',
//     });
//   };

//   const handleClose = () => navigate(-1);

//   return (
//     <div className="combined-form-container">
//       {/* PURCHASE FORM */}
//       <div className="purchase-form-container">
//         <h2>Purchase Details</h2>
//         <div className="horizontal-form-table">
//           <div className="form-row1">
//             <label>Purchase Date</label>
//             <input type="date" name="purchaseDate" value={purchaseData.purchaseDate} onChange={handlePurchaseChange} />
//           </div>

//           {purchaseData.purchasers.map((p, i) => (
//             <div className="form-row1" key={i}>
//               <div className="input-group">
//                 <label>Purchaser Name</label>
//                 <input
//                   type="text"
//                   name="purchaserName"
//                   value={p.purchaserName}
//                   onChange={(e) => handlePurchaserChange(i, e)}
//                 />
//               </div>
//               <div className="input-group">
//                 <label>Percentage Share</label>
//                 <input
//                   type="number"
//                   name="percentageShare"
//                   value={p.percentageShare}
//                   onChange={(e) => handlePurchaserChange(i, e)}
//                 />
//               </div>
//               {purchaseData.purchasers.length > 1 && (
//                 <button type="button" className="remove-btn" onClick={() => removePurchaser(i)}>−</button>
//               )}
//             </div>
//           ))}
//           <button type="button" className="add-btn" onClick={addPurchaser}>+ Add Purchaser</button>

//           <div className="form-row1">
//             <label>Agreement Value</label>
//             <input type="text" name="baseCost" value={purchaseData.baseCost} onChange={handlePurchaseChange} />

//             <label>Stamp Duty</label>
//             <input type="text" name="stampDuty" value={purchaseData.stampDuty} onChange={handlePurchaseChange} />

//             <label>Registration Fee</label>
//             <input type="text" name="registrationFee" value={purchaseData.registrationFee} onChange={handlePurchaseChange} />
//           </div>

//           <div className="form-row1">
//             <label>Total Amount</label>
//             <input type="text" value={formatAmount(purchaseData.totalAmount)} readOnly />
//           </div>
//         </div>
//       </div>

//       {/* SALE FORM */}
//       <div className="sale-form-container">
//         <h2>Sale Details</h2>
//         <div className="form-row1">
//           <label>Sale Date</label>
//           <input type="date" name="saleDate" value={saleData.saleDate} onChange={handleSaleChange} />
//         </div>
//         <div className="form-row1">
//           <label>Saler Name</label>
//           <input type="text" name="salerName" value={saleData.salerName} onChange={handleSaleChange} />
//         </div>
//         <div className="form-row1">
//           <label>Sale Value</label>
//           <input type="number" name="saleValue" value={saleData.saleValue} onChange={handleSaleChange} />
//         </div>
//         <div className="form-row1">
//           <label>Gain Amount</label>
//           <input type="text" value={saleData.gainAmount} readOnly />
//         </div>
//         <div className="form-row1">
//           <label>Holding Period (Days)</label>
//           <input type="text" value={saleData.holdingPeriod} readOnly />
//         </div>
//         <div className="form-row1">
//           <label>Capital Gain Type</label>
//           <input type="text" value={saleData.capitalGainType} readOnly />
//         </div>
//       </div>

//       {/* ACTION BUTTONS */}
//       <div className="action-group">
//         <button className="save-btn1" onClick={handleSave}>Save</button>
//         <button className="delete-btn" onClick={handleDelete}>Delete</button>
//         <button className="close-btn" onClick={handleClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default PurchaseAndSaleForm;


import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PurchaseDetailsForm.css';
import './SaleDetailsForm.css';

const formatAmount = (value) => {
  const num = Number(value.replace(/,/g, ''));
  return isNaN(num) ? '' : num.toLocaleString('en-IN');
};

const unformatAmount = (value) => value.replace(/,/g, '');

const PurchaseAndSaleForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // PURCHASE FORM STATE
  const [purchaseData, setPurchaseData] = useState({
    purchaseDate: '',
    purchasers: [{ purchaserName: '', percentageShare: '' }],
    baseCost: '',
    stampDuty: '',
    registrationFee: '',
    totalAmount: '0.00',
  });

  // SALE FORM STATE
  const [saleData, setSaleData] = useState({
    saleDate: '',
    salerName: '',
    saleValue: '',
    gainAmount: '',
    holdingPeriod: '',
    capitalGainType: '',
  });

  // Purchaser-wise breakdown
  const [purchaserShares, setPurchaserShares] = useState([]);

  useEffect(() => {
    const base = parseFloat(unformatAmount(purchaseData.baseCost)) || 0;
    const duty = parseFloat(unformatAmount(purchaseData.stampDuty)) || 0;
    const reg = parseFloat(unformatAmount(purchaseData.registrationFee)) || 0;
    const total = base + duty + reg;
    setPurchaseData((prev) => ({ ...prev, totalAmount: total.toFixed(2) }));
  }, [purchaseData.baseCost, purchaseData.stampDuty, purchaseData.registrationFee]);

  useEffect(() => {
    if (saleData.saleDate && purchaseData.purchaseDate) {
      const holdingDays = calculateHoldingPeriod(purchaseData.purchaseDate, saleData.saleDate);

      const agreementValue = parseFloat(unformatAmount(purchaseData.baseCost)) || 0;
      const saleValue = parseFloat(saleData.saleValue || 0);
      const gain = saleValue - agreementValue;

      setSaleData((prev) => ({
        ...prev,
        gainAmount: gain.toFixed(2),
        holdingPeriod: holdingDays,
        capitalGainType: holdingDays >= 365 ? 'LTCG' : 'STCG',
      }));
    }
  }, [saleData.saleDate, saleData.saleValue, purchaseData.baseCost, purchaseData.purchaseDate]);

  // Purchaser-wise Share Calculation
  useEffect(() => {
    const base = parseFloat(unformatAmount(purchaseData.baseCost)) || 0;
    const duty = parseFloat(unformatAmount(purchaseData.stampDuty)) || 0;
    const reg = parseFloat(unformatAmount(purchaseData.registrationFee)) || 0;

    const shares = purchaseData.purchasers.map((p) => {
      const perc = parseFloat(p.percentageShare) || 0;
      return {
        name: p.purchaserName,
        sharePercent: perc,
        baseCostShare: ((base * perc) / 100).toFixed(2),
        stampDutyShare: ((duty * perc) / 100).toFixed(2),
        registrationFeeShare: ((reg * perc) / 100).toFixed(2),
        total: ((base + duty + reg) * perc / 100).toFixed(2),
      };
    });

    setPurchaserShares(shares);
  }, [purchaseData]);

  const calculateHoldingPeriod = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  // HANDLERS
  const handlePurchaseChange = (e) => {
    const { name, value } = e.target;

    if (['baseCost', 'stampDuty', 'registrationFee'].includes(name)) {
      const unformatted = unformatAmount(value);
      const formatted = formatAmount(unformatted);
      setPurchaseData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setPurchaseData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePurchaserChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...purchaseData.purchasers];
    updated[index][name] = value;
    setPurchaseData((prev) => ({ ...prev, purchasers: updated }));
  };

  const addPurchaser = () => {
    setPurchaseData((prev) => ({
      ...prev,
      purchasers: [...prev.purchasers, { purchaserName: '', percentageShare: '' }],
    }));
  };

  const removePurchaser = (index) => {
    const updated = purchaseData.purchasers.filter((_, i) => i !== index);
    setPurchaseData((prev) => ({ ...prev, purchasers: updated }));
  };

  const handleSaleChange = (e) => {
    const { name, value } = e.target;
    setSaleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Purchase Data:', purchaseData);
    console.log('Sale Data:', saleData);
    navigate('/acquisition-form', {
      state: {
        purchaseCost: purchaseData.baseCost,
        stampDuty: purchaseData.stampDuty,
        registrationFee: purchaseData.registrationFee,
        totalAgreementValue: purchaseData.totalAmount,
      },
    });
  };

  const handleDelete = () => {
    setPurchaseData({
      purchaseDate: '',
      purchasers: [{ purchaserName: '', percentageShare: '' }],
      baseCost: '',
      stampDuty: '',
      registrationFee: '',
      totalAmount: '0.00',
    });

    setSaleData({
      saleDate: '',
      salerName: '',
      saleValue: '',
      gainAmount: '',
      holdingPeriod: '',
      capitalGainType: '',
    });
  };

  const handleClose = () => navigate(-1);

  return (
    <div className="combined-form-container">
      {/* PURCHASE FORM */}
      <div className="purchase-form-container">
        <h2>Purchase Details</h2>
        <div className="horizontal-form-table">
          <div className="form-row">
            <label>Purchase Date</label>
            <input type="date" name="purchaseDate" value={purchaseData.purchaseDate} onChange={handlePurchaseChange} />
          </div>

          {purchaseData.purchasers.map((p, i) => (
            <div className="form-row" key={i}>
              <div className="input-group">
                <label>Purchaser Name</label>
                <input
                  type="text"
                  name="purchaserName"
                  value={p.purchaserName}
                  onChange={(e) => handlePurchaserChange(i, e)}
                />
              </div>
              <div className="input-group">
                <label>Percentage Share</label>
                <input
                  type="number"
                  name="percentageShare"
                  value={p.percentageShare}
                  onChange={(e) => handlePurchaserChange(i, e)}
                />
              </div>
              {purchaseData.purchasers.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => removePurchaser(i)}>−</button>
              )}
            </div>
          ))}
          <button type="button" className="add-btn" onClick={addPurchaser}>+ Add Purchaser</button>

          <div className="form-row">
            <label>Agreement Value</label>
            <input type="text" name="baseCost" value={purchaseData.baseCost} onChange={handlePurchaseChange} />

            <label>Stamp Duty</label>
            <input type="text" name="stampDuty" value={purchaseData.stampDuty} onChange={handlePurchaseChange} />

            <label>Registration Fee</label>
            <input type="text" name="registrationFee" value={purchaseData.registrationFee} onChange={handlePurchaseChange} />
          </div>

          <div className="form-row">
            <label>Total Amount</label>
            <input type="text" value={formatAmount(purchaseData.totalAmount)} readOnly />
          </div>

          {/* Purchaser-wise breakdown table */}
          {purchaseData.purchasers.length > 1 && (
            <div className="form-row breakdown-table">
              <h4>Purchaser-wise Share</h4>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Share (%)</th>
                    <th>Agreement Value</th>
                    <th>Stamp Duty</th>
                    <th>Registration Fee</th>
                    <th>Total Share</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaserShares.map((p, i) => (
                    <tr key={i}>
                      <td>{p.name}</td>
                      <td>{p.sharePercent}%</td>
                      <td>₹{formatAmount(p.baseCostShare)}</td>
                      <td>₹{formatAmount(p.stampDutyShare)}</td>
                      <td>₹{formatAmount(p.registrationFeeShare)}</td>
                      <td>₹{formatAmount(p.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* SALE FORM */}
      <div className="sale-form-container">
        <h2>Sale Details</h2>
        <div className="form-row">
          <label>Sale Date</label>
          <input type="date" name="saleDate" value={saleData.saleDate} onChange={handleSaleChange} />
        </div>
        <div className="form-row1">
          <label>Saler Name</label>
          <input type="text" name="salerName" value={saleData.salerName} onChange={handleSaleChange} />
        </div>
        <div className="form-row1">
          <label>Sale Value</label>
          <input type="number" name="saleValue" value={saleData.saleValue} onChange={handleSaleChange} />
        </div>
        <div className="form-row1">
          <label>Gain Amount</label>
          <input type="text" value={saleData.gainAmount} readOnly />
        </div>
        <div className="form-row1">
          <label>Holding Period (Days)</label>
          <input type="text" value={saleData.holdingPeriod} readOnly />
        </div>
        <div className="form-row1">
          <label>Capital Gain Type</label>
          <input type="text" value={saleData.capitalGainType} readOnly />
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="action-group">
        <button className="save-btn1" onClick={handleSave}>Save</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
        <button className="close-btn" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default PurchaseAndSaleForm;
