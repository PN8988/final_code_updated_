// import React, { useState } from 'react';
// import './AssetFormTab.css';

// const AssetFormTab = () => {
//   const [activeTab, setActiveTab] = useState('acquisition');

//   const handleTabClick = (tabName) => {
//     setActiveTab(tabName);
//   };

//   return (
//     <div className="page-wrapper">
//       <div className="asset-form-container">
//         <div className="tab-buttons">
//           <button
//             className={activeTab === 'acquisition' ? 'active' : ''}
//             onClick={() => handleTabClick('acquisition')}
//           >
//             Acquisition of Asset
//           </button>
//           <button
//             className={activeTab === 'income' ? 'active' : ''}
//             onClick={() => handleTabClick('income')}
//           >
//             Income / Occupancy Status
//           </button>
//           <button
//             className={activeTab === 'sale' ? 'active' : ''}
//             onClick={() => handleTabClick('sale')}
//           >
//             Sale of Asset (Consideration)
//           </button>
//           <button
//             className={activeTab === 'gain' ? 'active' : ''}
//             onClick={() => handleTabClick('gain')}
//           >
//             Capital Gain
//           </button>
//         </div>

//         <div className="tab-content">
//           {activeTab === 'acquisition' && (
//             <div>
//               <h2>Acquisition of Asset</h2>
//               <form>
//                 <div className="form-group">
//                   <label>Date of Acquisition</label>
//                   <input type="date" />
//                 </div>
//                 <div className="form-group">
//                   <label>Purchase Cost</label>
//                   <input type="number" placeholder="Enter cost" />
//                 </div>
//               </form>
//             </div>
//           )}

//           {activeTab === 'income' && (
//             <div>
//               <h2>Income / Occupancy Status</h2>
//               <form>
//                 <div className="form-group">
//                   <label>Occupancy Type</label>
//                   <select>
//                     <option>LET-OUT</option>
//                     <option>SELF-OCCUPIED</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Rental Income</label>
//                   <input type="number" placeholder="Enter income" />
//                 </div>
//               </form>
//             </div>
//           )}

//           {activeTab === 'sale' && (
//             <div>
//               <h2>Sale of Asset (Consideration)</h2>
//               <form>
//                 <div className="form-group">
//                   <label>Sale Date</label>
//                   <input type="date" />
//                 </div>
//                 <div className="form-group">
//                   <label>Sale Amount</label>
//                   <input type="number" placeholder="Enter amount" />
//                 </div>
//               </form>
//             </div>
//           )}

//           {activeTab === 'gain' && (
//             <div>
//               <h2>Capital Gain</h2>
//               <form>
//                 <div className="form-group">
//                   <label>Capital Gain Amount</label>
//                   <input type="number" placeholder="Auto-calculated or manual" />
//                 </div>
//               </form>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssetFormTab;


import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './AssetFormTab.css';

const AssetTab = () => {
  const [activeTab, setActiveTab] = useState('acquisition');
  const location = useLocation();
  const navigate = useNavigate();

  const [searchPan, setSearchPan] = useState('');
  const [clientData, setClientData] = useState(location.state?.client || {});

  const handleNavigateToResidentialForm = () => {
    navigate('/addresidentialprop', {
      state: { client: clientData },
    });
  };

  const handleTabClick = (tab) => {
    const routeState = { state: { client: clientData } };
    if (tab === 'acquisition') navigate('/acquisition-form', routeState);
    else if (tab === 'sale') navigate('/addresidentialprop', routeState);
    else if (tab === 'gain') navigate('/addresidentialprop', routeState);
    else setActiveTab(tab);
  };

  const handleSearchByPan = async () => {
    if (!searchPan.trim()) {
      alert('Please enter a PAN number.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/clients/${searchPan}`);
      if (response.data) {
        setClientData(response.data);
      } else {
        alert('Client not found.');
      }
    } catch (error) {
      console.error('Error fetching client:', error);
      alert('Error fetching client details.');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="asset-form-container">

        {/* Static Client Menu Form */}
        <div className="client-menu-container2">
          <div className="client-form">
            <h2>Client Menu</h2>

            {/* Search by PAN */}
            {/* <div className="search-section">
              <input
                type="text"
                placeholder="Enter PAN"
                value={searchPan}
                onChange={(e) => setSearchPan(e.target.value)}
              />
              <button className="btn-search" onClick={handleSearchByPan}>
                Search
              </button>
            </div> */}

            {/* Displayed Client Info */}
            <div className="form-fields">
              <div>
                <label>Client Name:</label>
                <input type="text" value={clientData.clientName || ''} readOnly />
              </div>
              <div>
                <label>Legal Name:</label>
                <input type="text" value={clientData.legalName || ''} readOnly />
              </div>
              <div>
                <label>PAN Number:</label>
                <input type="text" value={clientData.panId || ''} readOnly />
              </div>
              {/* <div>
                <label>Home State:</label>
                <input type="text" value={clientData.homeState || ''} readOnly />
              </div>
              <div>
                <label>Mobile Number:</label>
                <input type="text" value={clientData.mobileNumber || ''} readOnly />
              </div>
              <div>
                <label>Email ID:</label>
                <input type="text" value={clientData.emailId || ''} readOnly />
              </div>
              <div>
                <label>Contact/POC:</label>
                <input type="text" value={clientData.contact || ''} readOnly />
              </div> */}
            </div>
          </div>
        </div>

        {/* Asset Tabs */}
        
       <div className="tab-buttons">
          <button
            className={activeTab === 'acquisition' ? 'active' : ''}
            onClick={() => handleTabClick('acquisition')}
          >
            Acquisition of Asset
          </button>

          <button
            className={activeTab === 'income' ? 'active' : ''}
            onClick={() => handleNavigateToResidentialForm('income')}
          >
            Income / Occupancy Status
          </button>
          <button
            className={activeTab === 'sale' ? 'active' : ''}
            onClick={() => handleTabClick('sale')}
          >
            Sale of Asset (Consideration)
          </button>

          <button
            className={activeTab === 'gain' ? 'active' : ''}
            onClick={() => handleTabClick('gain')}
          >
            Capital Gain
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'acquisition' && <div>{/* Acquisition form */}</div>}
          {activeTab === 'sale' && (
            <div>
              <h2>Sale of Asset (Consideration)</h2>
              {/* Sale form content */}
            </div>
          )}
          {activeTab === 'gain' && (
            <div>
              <h2>Capital Gain</h2>
              {/* Capital Gain form content */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetTab;


