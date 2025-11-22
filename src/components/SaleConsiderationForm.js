// SaleConsiderationForm.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SaleConsiderationForm.css';
import axios from 'axios';

const SaleConsiderationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchPan, setSearchPan] = useState('');
  const [clientData, setClientData] = useState(location.state?.client || {});

  const [saleDate, setSaleDate] = useState('');
  const [buyerDetails, setBuyerDetails] = useState({
    buyerName: '',
    buyerEmail: '',
    buyerPhone: '',
  });

  const [saleValue, setSaleValue] = useState('');

  useEffect(() => {
    const { buyerName, buyerEmail, buyerPhone } = buyerDetails;
    setSaleValue(
      buyerName || buyerEmail || buyerPhone
        ? (buyerName.length * 1000).toString()
        : ''
    );
  }, [buyerDetails]);

  const handleSearch = async () => {
    if (!searchPan.trim()) {
      alert("Please enter a valid PAN number.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/clients/pan/${searchPan}`);
      setClientData(response.data);
    } catch (error) {
      console.error('PAN search failed:', error);
      alert('Client not found or error fetching data.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/sale-details-form', {
      state: {
        saleDate,
        ...buyerDetails,
        saleValue,
        client: clientData,
      },
    });
  };

  return (
    <div className="page-wrapper">
      <div className="sale-form-container">
        {/* Client Info Section */}
        <div className="client-menu-container">
          <div className="client-form">
            <h2>Client Menu</h2>
            <div className="search-section">
              <input
                type="text"
                placeholder="Enter PAN"
                value={searchPan}
                onChange={(e) => setSearchPan(e.target.value)}
              />
              <button className="btn-search" onClick={handleSearch}>
                Search
              </button>
            </div>

            <div className="form-fields">
              <div><label>Client Name:</label><input type="text" value={clientData.clientName || ''} readOnly /></div>
              <div><label>Legal Name:</label><input type="text" value={clientData.legalName || ''} readOnly /></div>
              <div><label>PAN Number:</label><input type="text" value={clientData.panId || ''} readOnly /></div>
              {/* <div><label>Home State:</label><input type="text" value={clientData.homeState || ''} readOnly /></div>
              <div><label>Mobile Number:</label><input type="text" value={clientData.mobileNumber || ''} readOnly /></div>
              <div><label>Email ID:</label><input type="text" value={clientData.emailId || ''} readOnly /></div>
              <div><label>Contact/POC:</label><input type="text" value={clientData.contact || ''} readOnly /></div>*/}
             </div> 
          </div>
        </div>

        {/* Sale Consideration Form */}
        <h2>Sale of Asset (Consideration)</h2>
        <form onSubmit={handleSubmit}>
          <table className="sale-table">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Particular</th>
                <th>Input</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Date of Sale</td>
                <td>
                  <input
                    type="date"
                    value={saleDate}
                    onChange={(e) => setSaleDate(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Buyer Name</td>
                <td>
                  <input
                    type="text"
                    name="buyerName"
                    value={buyerDetails.buyerName}
                    onChange={handleChange}
                    placeholder="Enter buyer name"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Buyer Email</td>
                <td>
                  <input
                    type="email"
                    name="buyerEmail"
                    value={buyerDetails.buyerEmail}
                    onChange={handleChange}
                    placeholder="Enter buyer email"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>Buyer Phone</td>
                <td>
                  <input
                    type="tel"
                    name="buyerPhone"
                    value={buyerDetails.buyerPhone}
                    onChange={handleChange}
                    placeholder="Enter buyer phone"
                    required
                  />
                </td>
              </tr>
              <tr className="readonly">
                <td>5</td>
                <td>Sale Value / Consideration</td>
                <td>
                  <input type="text" value={saleValue} readOnly />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="action">
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaleConsiderationForm;




{/* 
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './SaleConsiderationForm.css';
// import axios from 'axios';

// const ClientMenu = ({ searchPan, setSearchPan, clientData, setClientData }) => { */}
{/* //   const handleSearch = async () => { */}
{/* //     if (!searchPan.trim()) {
//       alert("Please enter a PAN.");
//       return;
//     }
//     try {
//       const res = await axios.get(`http://localhost:8080/api/clients/pan/${searchPan}`);
//       setClientData(res.data);
//     } catch (error) {
//       console.error("Error searching PAN:", error);
//       alert("Client not found or error occurred.");
//     }
//   };

//   return (
//     <div className="sale-client-form">
//       <h2>Client Menu</h2>
//       <div className="sale-search-section">
//         <input
//           type="text"
//           placeholder="Enter PAN"
//           value={searchPan}
//           onChange={(e) => setSearchPan(e.target.value)}
//         />
//         <button className="btn-search" onClick={handleSearch}>Search</button>
//       </div>
//       <div className="sale-form-fields">
//         <div><label>Client Name:</label><input type="text" value={clientData.clientName || ''} readOnly className='small-text' /></div>
//         <div><label>Legal Name:</label><input type="text" value={clientData.legalName || ''} readOnly className='small-text' /></div>
//         <div><label>PAN Number:</label><input type="text" value={clientData.panId || ''} readOnly className='small-text' /></div>
//         <div><label>Home State:</label><input type="text" value={clientData.homeState || ''} readOnly className='small-text' /></div>
//         <div><label>Mobile Number:</label><input type="text" value={clientData.mobileNumber || ''} readOnly className='small-text' /></div>
//         <div><label>Email ID:</label><input type="text" value={clientData.emailId || ''} readOnly className='small-text' /></div>
//         <div><label>Contact/POC:</label><input type="text" value={clientData.contact || ''} readOnly className='small-text' /></div>
//       </div>
//     </div>
//   );
// };

// const SaleConsiderationForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [searchPan, setSearchPan] = useState('');
//   const [clientData, setClientData] = useState(location.state?.client || {});
//   const [activeSubTab, setActiveSubTab] = useState('buyerDetails');
//   const [saleDate, setSaleDate] = useState('');
//   const [buyerDetails, setBuyerDetails] = useState({
//     buyerName: '',
//     buyerEmail: '',
//     buyerPhone: '',
//   });
//   const [saleValue, setSaleValue] = useState('');

//   useEffect(() => {
//     const { buyerName, buyerEmail, buyerPhone } = buyerDetails;
//     setSaleValue(
//       buyerName || buyerEmail || buyerPhone
//         ? (buyerName.length * 1000).toString()
//         : ''
//     );
//   }, [buyerDetails]);

//   const handleBuyerChange = (e) => {
//     const { name, value } = e.target;
//     setBuyerDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate('/sale-details-form', {
//       state: {
//         saleDate,
//         saleValue,
//         ...buyerDetails,
//         purchaseDate: '',
//         totalAmount: '',
//         client: clientData,
//       },
//     });
//   };

//   return (
//     <div className="sale-page-wrapper">
//       <div className="sale-form-container">
//         <ClientMenu
//           searchPan={searchPan}
//           setSearchPan={setSearchPan}
//           clientData={clientData}
//           setClientData={setClientData}
//         />

//         <h2>Sale of Asset (Consideration)</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="sale-form-group">
//             <label>Date of Sale</label>
//             <input
//               type="date"
//               value={saleDate}
//               onChange={(e) => setSaleDate(e.target.value)}
//               required
//             />
//           </div>

//           <div className="sale-subtab-bar">
//             <button
//               type="button"
//               className={activeSubTab === 'buyerDetails' ? 'active' : ''}
//               onClick={() => setActiveSubTab('buyerDetails')}
//             >
//               Buyer Details
//             </button>
//           </div>

//           {activeSubTab === 'buyerDetails' && (
//             <div className="sale-sub-form">
//               <div className="sale-form-group">
//                 <label>Buyer Name</label>
//                 <input
//                   type="text"
//                   name="buyerName"
//                   value={buyerDetails.buyerName}
//                   onChange={handleBuyerChange}
//                   required
//                 />
//               </div>
//               <div className="form-group-inline">
//                 <label>Buyer Email</label>
//                 <input
//                   type="email"
//                   name="buyerEmail"
//                   value={buyerDetails.buyerEmail}
//                   onChange={handleBuyerChange}
//                   required
//                 />
//               </div>
//               <div className="form-group-inline">
//                 <label>Buyer Phone</label>
//                 <input
//                   type="tel"
//                   name="buyerPhone"
//                   value={buyerDetails.buyerPhone}
//                   onChange={handleBuyerChange}
//                   required
//                 />
//               </div>
//             </div>
//           )}

//           <div className="form-group-inline sale-readonly">
//             <label>Sale Value / Consideration</label>
//             <input type="text" value={saleValue} readOnly />
//           </div>

//           <div className="action">
//             <button type="submit" className="save-btn">Save</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SaleConsiderationForm;

 */}
