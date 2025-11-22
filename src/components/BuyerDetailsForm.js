import React, { useState, useEffect } from 'react';
import './BuyerDetailsForm.css';

const BuyerDetailsForm = () => {
  const [buyers, setBuyers] = useState([
    { name: '', pan: '', aadhar: '', percentage: '', amount: '' },
  ]);
  const [propertyDetails, setPropertyDetails] = useState({
    address: '',
    state: '',
    country: 'India',
    pincode: '',
    zipcode: '',
  });
  const [pincodeError, setPincodeError] = useState('');

  const handleBuyerChange = (index, e) => {
    const { name, value } = e.target;
    setBuyers((prev) => {
      const copy = [...prev];
      copy[index][name] = value;
      return copy;
    });
  };

  const addBuyer = () => {
    setBuyers((prev) => [...prev, { name: '', pan: '', aadhar: '', percentage: '', amount: '' }]);
  };

  const removeBuyer = (index) => {
    setBuyers((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Auto-fill state & country based on pincode
  useEffect(() => {
    const { pincode } = propertyDetails;
    if (pincode && pincode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        .then((res) => res.json())
        .then((data) => {
          if (data[0].Status === 'Success' && data[0].PostOffice.length) {
            const { Region, Country } = data[0].PostOffice[0];
            setPropertyDetails((prev) => ({
              ...prev,
              state: Region,
              country: Country,
            }));
            setPincodeError('');
          } else {
            setPropertyDetails((prev) => ({ ...prev, state: '', country: 'India' }));
            setPincodeError('Invalid Pincode');
          }
        })
        .catch(() => {
          setPincodeError('Error fetching details');
          setPropertyDetails((prev) => ({ ...prev, state: '', country: 'India' }));
        });
    }
  }, [propertyDetails.pincode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pincodeError) {
      alert('Please enter a valid pincode.');
      return;
    }
    console.log('Buyer Details:', buyers);
    console.log('Property Details:', propertyDetails);
    alert('Form Submitted!');
  };

  return (
    <div className="buyer-details-container">
      <h2>Buyer Details Form</h2>
      <form onSubmit={handleSubmit}>
        <table className="buyers-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Name</th>
              <th>PAN</th>
              <th>Aadhar</th>
              <th>% Share</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    name="name"
                    value={buyer.name}
                    onChange={(e) => handleBuyerChange(index, e)}
                    required
                  />
                </td>
                <td>
                  <input
                    name="pan"
                    value={buyer.pan}
                    onChange={(e) => handleBuyerChange(index, e)}
                    required
                  />
                </td>
                <td>
                  <input
                    name="aadhar"
                    value={buyer.aadhar}
                    onChange={(e) => handleBuyerChange(index, e)}
                    required
                  />
                </td>
                <td>
                  <input
                    name="percentage"
                    value={buyer.percentage}
                    onChange={(e) => handleBuyerChange(index, e)}
                    required
                  />
                </td>
                <td>
                  <input
                    name="amount"
                    value={buyer.amount}
                    onChange={(e) => handleBuyerChange(index, e)}
                    required
                  />
                </td>
                <td>
                  {buyers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBuyer(index)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="button" className="add-btn" onClick={addBuyer}>
          + Add Buyer
        </button>

        <div className="property-details">
          <h3>Property Address</h3>
          <input
            name="address"
            placeholder="Address"
            value={propertyDetails.address}
            onChange={handlePropertyChange}
            required
          />
          <input
            name="pincode"
            placeholder="Pincode"
            value={propertyDetails.pincode}
            onChange={handlePropertyChange}
            required
          />
          {pincodeError && <p className="error">{pincodeError}</p>}
          <input
            name="state"
            placeholder="State"
            value={propertyDetails.state}
            readOnly
            required
          />
          <input
            name="country"
            placeholder="Country"
            value={propertyDetails.country}
            readOnly
            required
          />
          <input
            name="zipcode"
            placeholder="Zipcode"
            value={propertyDetails.zipcode}
            onChange={handlePropertyChange}
            required
          />
        </div>

        <div className="action-group">
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuyerDetailsForm;
