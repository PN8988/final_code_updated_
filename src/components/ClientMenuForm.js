
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './ClientMenuForm.css';

// const ClientMenuForm = () => {
//   const location = useLocation();
//   const navigate = useNavigate();


// //const clientData = location.state?.client || {};
// const passedAsset = location.state?.asset || null;

// const matchedClients = location.state?.clients || [];
// const assetMap = location.state?.assetMap || {};
// //const { client, assetList = [] } = location.state || {};
// const { client, assetList: initialAssetList = [] } = location.state || {};

//  const [assetList, setAssetList] = useState(initialAssetList);

//  // Try getting client from state, else first matched client
// const clientData =
//   location.state?.client ||
//   (location.state?.clients && location.state.clients.length > 0
//     ? location.state.clients[0]
//     : {});

//   const defaultTab = location.state?.defaultTab || '1. Immovable_Investments';
//   const tabFromNavigation = location.state?.setActiveTab || defaultTab;
//   const updatedAsset = location.state?.updatedAsset;

//   const [activeTab, setActiveTab] = useState(tabFromNavigation);
//   const [activeSubTab, setActiveSubTab] = useState('1.1 Residential');
 
//   const [filter, setFilter] = useState({ type: '', class: '', panId: '' });
//   const [formData, setFormData] = useState({
//     clientName: '',
//     legalName: '',
//     panId: '',
//     homeState: '',
//     mobileNumber: '',
//     emailId: '',
//     contact: '',
//   });
//   const [deletingAssetIds, setDeletingAssetIds] = useState(new Set());

//   const hasFetchedAssets = useRef(false);
  
// //const { matchedClients = [] } = location.state || {};

// // After your existing useState declarations:
// const [clientList, setClientList] = useState([]);
// //const [assetList, setAssetList] = useState([]);

// // Immediately after state declarations:
// useEffect(() => {
//   if (matchedClients.length > 0) {
//     setClientList(matchedClients);
//   }
// }, [matchedClients]);

// useEffect(() => {
//   if (clientData?.panId) {
//     setFormData(clientData);
//   }
// }, [clientData]);

// useEffect(() => {
//   if (matchedClients.length > 0 && assetMap) {
//     const combinedAssets = matchedClients.flatMap(c => assetMap[c.panId] || []);
//     setAssetList(combinedAssets);
//   }
// }, [matchedClients, assetMap]);


// useEffect(() => {
//   if (formData.panId) {
//     fetchExistingAssets();
//   }
// }, [formData.panId]);




// // Merge helper to prevent duplicates
// const mergeAssets = (prev, newAssets) => {
//   const existingKeys = new Set(prev.map(a => `${a.assetId}-${a.panId}`));
//   const merged = [...prev];
//   newAssets.forEach(asset => {
//     const key = `${asset.assetId}-${asset.panId}`;
//     if (!existingKeys.has(key)) {
//       merged.push(asset);
//       existingKeys.add(key);
//     }
//   });
//   return merged;
// };

// // When matchedClients + assetMap changes → merge instead of replace
// useEffect(() => {
//   if (matchedClients.length > 0 && assetMap) {
//     const combinedAssets = matchedClients.flatMap(c => assetMap[c.panId] || []);
//     setAssetList(prev => mergeAssets(prev, combinedAssets));
//   }
// }, [matchedClients, assetMap]);

// // Fetch existing assets → merge
// const fetchExistingAssets = async () => {
//   const pan = clientData?.panId;
//   if (!pan) return;
//   try {
//     const res = await axios.get(`http://localhost:8080/api/residential/getAssets`, {
//       params: { panId: pan }
//     });
//     const backendAssets = res.data || [];
//     setAssetList(prev => mergeAssets(prev, backendAssets));
//   } catch (err) {
//     console.error('Error fetching saved asset list:', err);
//   }
// };

// // If passedAsset exists → merge instead of replace
// useEffect(() => {
//   if (passedAsset) {
//     setAssetList(prev => mergeAssets(prev, [passedAsset]));
//   }
// }, [passedAsset]);

// // After saving for multiple owners → merge instead of replace
// useEffect(() => {
//   if (passedAsset) {
//     const saveAssetsForAllOwners = async () => {
//       try {
//         const isValidAsset =
//           passedAsset.assetId &&
//           passedAsset.ledgerName &&
//           passedAsset.govtValue &&
//           !isNaN(parseFloat(passedAsset.shareAmount)) &&
//           passedAsset.panId;

//         if (!isValidAsset) {
//           console.warn('❗ Invalid or incomplete asset. Skipping.');
//           return;
//         }

//         const panList = Array.isArray(passedAsset.panId)
//           ? passedAsset.panId
//           : [passedAsset.panId];

//         for (const pan of panList) {
//           const assetForClient = { ...passedAsset, panId: pan };
//           await axios.post('http://localhost:8080/api/residential/addAssets', assetForClient);
//           setAssetList(prev => mergeAssets(prev, [assetForClient]));
//         }
//       } catch (err) {
//         console.error('❌ Error saving asset for multiple owners:', err);
//       }
//     };

//     saveAssetsForAllOwners();
//   }
// }, [passedAsset]);


//   useEffect(() => {
//     if (clientData?.panId && !hasFetchedAssets.current) {
//       fetchExistingAssets();
//       hasFetchedAssets.current = true;
//     }
//   }, [clientData?.panId]);

//   useEffect(() => {
//     if (updatedAsset) {
//       fetchExistingAssets();
//     }
//   }, [updatedAsset]);


//   useEffect(() => {
//   if (passedAsset) {
//     const saveAssetsForAllOwners = async () => {
//       try {
//         const isValidAsset =
//           passedAsset.assetId &&
//           passedAsset.ledgerName &&
//           passedAsset.govtValue &&
//           !isNaN(parseFloat(passedAsset.shareAmount)) &&
//           passedAsset.panId;

//         if (!isValidAsset) {
//           console.warn('❗ Invalid or incomplete asset. Skipping.');
//           return;
//         }

//         const panList = Array.isArray(passedAsset.panId)
//           ? passedAsset.panId
//           : [passedAsset.panId];

//         for (const pan of panList) {
//           const assetForClient = { ...passedAsset, panId: pan };

//           await axios.post('http://localhost:8080/api/residential/addAssets', assetForClient);

//           setAssetList((prevList) => {
//             const exists = prevList.some(
//               (a) => a.assetId === assetForClient.assetId && a.panId === pan
//             );
//             if (exists) return prevList;
//             return [...prevList, assetForClient];
//           });
//         }
//       } catch (err) {
//         console.error('❌ Error saving asset for multiple owners:', err);
//       }
//     };

//     saveAssetsForAllOwners();
//   }
// }, [passedAsset]);

  

//   const handleDeleteAsset = async (assetId) => {
//     if (!assetId) return;
//     const confirmDelete = window.confirm('Are you sure you want to delete this asset?');
//     if (!confirmDelete) return;

//     // prevent double delete
//     if (deletingAssetIds.has(assetId)) return;

//     setDeletingAssetIds((prev) => new Set(prev).add(assetId));
//     try {
//       await axios.delete('http://localhost:8080/api/residential/deleteAssets', {
//         data: { assetId },
//       });

//       alert('✅ Asset deleted successfully!');
//       setAssetList((prev) => prev.filter((asset) => asset.assetId !== assetId));
//     } catch (error) {
//       console.error('❌ Error deleting asset:', error);
//       alert('Failed to delete asset. Please try again.');
//     } finally {
//       setDeletingAssetIds((prev) => {
//         const copy = new Set(prev);
//         copy.delete(assetId);
//         return copy;
//       });
//     }
//   };

//   const renderSubTabs = () => {
//     let subtabs = [];

//     if (activeTab === '1. Immovable_Investments') {
//       subtabs = ['1.1 Residential', '1.2 Commercial', '1.3 Industrial', '1.4 Flat', '1.5 Plot'];
//     }

//     return (
//       <div className="sub-tabs">
//         {subtabs.map((sub) => (
//           <button
//             key={sub}
//             className={`subtab ${activeSubTab === sub ? 'active-subtab' : ''}`}
//             onClick={() => {
//               setActiveSubTab(sub);
//               const propertyType = sub.split(' ')[1] || 'Residential';

//               if (propertyType === 'Residential') {
//                 navigate('/residential-property-form', {
//                   state: {
//                     client: formData,
//                     from: 'ClientMenuForm',
//                     propertyType,
//                   },
//                 });
//               }
//             }}
//           >
//             {sub}
//           </button>
//         ))}
//       </div>
//     );
//   };



// const filteredAssets = assetList
//   .filter(item => item.panId === formData.panId)
//   .filter(item =>
//     (!filter.panId || item.panId?.toLowerCase().includes(filter.panId.toLowerCase())) &&
//     (!filter.type || item.type?.toLowerCase().includes(filter.type.toLowerCase())) &&
//     (!filter.class || item.class?.toLowerCase().includes(filter.class.toLowerCase()))
//   );


//   return (
//     <div className="client-menu-container">
//       <div className="client-form">
//         <h2>Client Menu</h2>
//         <div className="form-fields">
//           <div>
//             <label>Client Name:</label>
//             <input type="text" value={formData.clientName} readOnly />
//           </div>
//           <div>
//             <label>Legal Name:</label>
//             <input type="text" value={formData.legalName} readOnly />
//           </div>
//           <div>
//             <label>PAN Number:</label>
//             <input type="text" value={formData.panId} readOnly />
//           </div>
//         </div>
//       </div>

//       <div className="investment-section">
//         <h2>Investment Details</h2>
//         <div className="tabs">
//           {['1. Immovable_Investments', '2. Securities_Investments', '3. Virtual Assets_Investments'].map((tab) => (
//             <button
//               key={tab}
//               className={`tab ${activeTab === tab ? 'active' : ''}`}
//               onClick={() => {
//                 setActiveTab(tab);
//                 setActiveSubTab(tab === '1. Immovable_Investments' ? '1.1 Residential' : '');
//               }}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {renderSubTabs()}
//         {activeSubTab && (
//           <div className="tab-content">
//             <p>
//               Selected Subtype: <strong>{activeSubTab}</strong>
//             </p>
//           </div>
//         )}
//       </div>

//      {activeTab === '1. Immovable_Investments' && activeSubTab && (
//   <div className="asset-listing">
//     <h2>{formData.clientName ? `${formData.clientName}’s Asset Listing` : 'Asset Listing'}</h2>


//           <div className="filters">
//             <input placeholder="Filter by Type" onChange={(e) => setFilter({ ...filter, type: e.target.value })} />
//             <input placeholder="Filter by Class" onChange={(e) => setFilter({ ...filter, class: e.target.value })} />
//             <input placeholder="Filter by PAN" onChange={(e) => setFilter({ ...filter, panId: e.target.value })} />
//           </div>

//           <table>
//             <thead>
//               <tr>
//                 <th>Sr. No</th>
//                 <th>Client PAN</th>
//                 <th>Ledger Name</th>
//                 <th>Asset ID</th>
//                 <th>Govt Value</th>
//                 <th>Client Share Amount</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//  <tbody>
//   {filteredAssets.map((asset, index) => (
//     <tr key={index}>
//       <td>{index + 1}</td>
//       <td>{asset.panId}</td>
//       <td>{asset.ledgerName}</td>
//       <td>{asset.assetId}</td>
//       <td>{asset.govtValue}</td>
//       <td>{asset.shareAmount}</td>
//       <td>
//         <button
//           className="btn-delete"
//           onClick={() => handleDeleteAsset(asset.assetId)}
//           disabled={deletingAssetIds.has(asset.assetId)}
//         >
//           {deletingAssetIds.has(asset.assetId) ? 'Deleting...' : 'Delete'}
//         </button>
//       </td>
//     </tr>
//   ))}

//   {filteredAssets.length === 0 && (
//     <tr>
//       <td colSpan="7">No assets found for this client.</td>
//     </tr>
//   )}
// </tbody>


//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClientMenuForm;

// ClientMenuForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Tabs,
  Tab,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ClientMenuForm.css';

const ClientMenuForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { client } = location.state || {};
  const passedAsset = location.state?.asset || null;
  const matchedClients = location.state?.clients || [];
  const assetMap = location.state?.assetMap || {};
  const { assetList: initialAssetList = [] } = location.state || {};

  const clientData =
    location.state?.client ||
    (matchedClients.length > 0 ? matchedClients[0] : {});

  const defaultTab = location.state?.defaultTab || '1. Immovable_Investments';
  const tabFromNavigation = location.state?.setActiveTab || defaultTab;
  const updatedAsset = location.state?.updatedAsset;

  const [activeTab, setActiveTab] = useState(tabFromNavigation);
  const [activeSubTab, setActiveSubTab] = useState('1.1 Residential');
  const [filter, setFilter] = useState({ type: '', class: '', panId: '' });
  const [formData, setFormData] = useState({
    clientName: '',
    legalName: '',
    panId: '',
    homeState: '',
    mobileNumber: '',
    emailId: '',
    contact: '',
  });
  const [assetList, setAssetList] = useState(initialAssetList);
  const [deletingAssetIds, setDeletingAssetIds] = useState(new Set());
  const [showMainTabs, setShowMainTabs] = useState(false);
  const hasFetchedAssets = useRef(false);

  // 🔹 Merge logic unchanged
  const mergeAssets = (prev, newAssets) => {
    const existingKeys = new Set(prev.map((a) => `${a.assetId}-${a.panId}`));
    const merged = [...prev];
    newAssets.forEach((asset) => {
      const key = `${asset.assetId}-${asset.panId}`;
      if (!existingKeys.has(key)) {
        merged.push(asset);
        existingKeys.add(key);
      }
    });
    return merged;
  };

  // 🔹 Load client data + assets (same logic)
  useEffect(() => {
    if (clientData?.panId) setFormData(clientData);
  }, [clientData]);

  useEffect(() => {
    if (clientData?.panId && !hasFetchedAssets.current) {
      fetchExistingAssets();
      hasFetchedAssets.current = true;
    }
  }, [clientData?.panId]);

  const fetchExistingAssets = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/residential/getAssets`, {
        params: { panId: clientData.panId },
      });
      setAssetList((prev) => mergeAssets(prev, res.data || []));
    } catch (err) {
      console.error('Error fetching saved asset list:', err);
    }
  };

  const handleDeleteAsset = async (assetId) => {
    if (!assetId) return;
    if (!window.confirm('Are you sure you want to delete this asset?')) return;
    if (deletingAssetIds.has(assetId)) return;

    setDeletingAssetIds((prev) => new Set(prev).add(assetId));
    try {
      await axios.delete('http://localhost:8080/api/residential/deleteAssets', {
        data: { assetId },
      });
      alert('✅ Asset deleted successfully!');
      setAssetList((prev) => prev.filter((asset) => asset.assetId !== assetId));
    } catch (error) {
      console.error('❌ Error deleting asset:', error);
      alert('Failed to delete asset. Please try again.');
    } finally {
      setDeletingAssetIds((prev) => {
        const copy = new Set(prev);
        copy.delete(assetId);
        return copy;
      });
    }
  };

  const filteredAssets = assetList
    .filter((item) => item.panId === clientData.panId)
    .filter(
      (item) =>
        (!filter.panId || item.panId?.toLowerCase().includes(filter.panId.toLowerCase())) &&
        (!filter.type || item.type?.toLowerCase().includes(filter.type.toLowerCase())) &&
        (!filter.class || item.class?.toLowerCase().includes(filter.class.toLowerCase()))
    );

  return (
    <Box className="container mt-4">
      {/* 🔹 Client Info Card */}
      <Paper elevation={4} className="p-4 mb-4">
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Client Menu
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Client Name" value={formData.clientName} InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Legal Name" value={formData.legalName} InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="PAN Number" value={formData.panId} InputProps={{ readOnly: true }} />
          </Grid>
        </Grid>
      </Paper>

      {/* 🔹 Investments Section */}
      <Paper elevation={3} className="p-4">
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Investment Details
        </Typography>

        {!showMainTabs && (
          <Button variant="contained" color="primary" onClick={() => setShowMainTabs(true)}>
            Show Investments
          </Button>
        )}

        {showMainTabs && (
          <Box className="mt-3">
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => {
                setActiveTab(newValue);
                setActiveSubTab('');
              }}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {[
                '1. Immovable_Investments',
                '2. Securities_Investments',
                '3. Virtual Assets_Investments',
                '4. Employer',
                '5. Bank',
                '6. Demat Account',
              ].map((tab) => (
                <Tab key={tab} label={tab} value={tab} />
              ))}
            </Tabs>

            {/* 🔹 Sub Tabs - Example for Immovable */}
            {activeTab === '1. Immovable_Investments' && (
              <Box className="mt-3 d-flex flex-wrap gap-2">
                {['1.1 Residential', '1.2 Commercial', '1.3 Industrial', '1.4 Flat', '1.5 Plot'].map((sub) => (
                  <Button
                    key={sub}
                    variant={activeSubTab === sub ? 'contained' : 'outlined'}
                    onClick={() => {
                      setActiveSubTab(sub);
                      if (sub.startsWith('1.1')) {
                        navigate('/residential-property-form', {
                          state: { client: formData, from: 'ClientMenuForm', propertyType: 'Residential' },
                        });
                      }
                    }}
                  >
                    {sub}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        )}
      </Paper>

      {/* 🔹 Asset Table */}
      {activeTab === '1. Immovable_Investments' && activeSubTab.startsWith('1.') && (
        <Paper elevation={3} className="p-4 mt-4">
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            {formData.clientName ? `${formData.clientName}’s Asset Listing` : 'Asset Listing'}
          </Typography>

          <Box className="d-flex gap-2 mb-3">
            <TextField label="Filter by Type" size="small" onChange={(e) => setFilter({ ...filter, type: e.target.value })} />
            <TextField label="Filter by Class" size="small" onChange={(e) => setFilter({ ...filter, class: e.target.value })} />
            <TextField label="Filter by PAN" size="small" onChange={(e) => setFilter({ ...filter, panId: e.target.value })} />
          </Box>

          <Table bordered responsive>
            <TableHead>
              <TableRow>
                <TableCell>Sr. No</TableCell>
                <TableCell>Client PAN</TableCell>
                <TableCell>Ledger Name</TableCell>
                <TableCell>Asset ID</TableCell>
                <TableCell>Govt Value</TableCell>
                <TableCell>Client Share Amount</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{asset.panId}</TableCell>
                    <TableCell>{asset.ledgerName}</TableCell>
                    <TableCell>{asset.assetId}</TableCell>
                    <TableCell>{asset.govtValue}</TableCell>
                    <TableCell>{asset.shareAmount}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteAsset(asset.assetId)}
                        disabled={deletingAssetIds.has(asset.assetId)}
                      >
                        {deletingAssetIds.has(asset.assetId) ? <CircularProgress size={18} /> : 'Delete'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No assets found for this client.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default ClientMenuForm;

