import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DisplayPropertyTable.css';

const DisplayAquisitionTable = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    client,
    property,
    assets = [],
    owners = [],
    numOwners,
    receivedAmount
  } = location.state || {};

  const [clientList, setClientList] = useState([]);

  // OwnerData fallback for incomplete data
  const ownerData = owners.length === numOwners
    ? owners
    : Array.from({ length: numOwners }, (_, i) => owners[i] || {});

  // Extract values from assets
  const agreementValue = parseFloat(assets.find(a => a.label === 'Agreement Value')?.amount) || 0;
  const stampDuty = parseFloat(assets.find(a => a.label === 'Stamp Duty')?.amount) || 0;
  const registrationFee = parseFloat(assets.find(a => a.label === 'Registration Fees')?.amount) || 0;
  const share = parseFloat(assets.find(a => a.label === 'Agreement Value')?.share) || 0;
  const totalAmount = (agreementValue + stampDuty + registrationFee).toFixed(2);
  const shareAmount = ((totalAmount * share) / 100).toFixed(2);
const [matchedClients, setMatchedClients] = useState([]);
const [assetMap, setAssetMap] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/api/clients/getall')
      .then((res) => setClientList(res.data))
      .catch((err) => console.error('Error fetching clients:', err));
  }, []);

const handleSaveAsset = async () => {
  try {
    const assetListForMatchedClients = [];
    const ownerAssetList = [];

    for (const owner of ownerData) {
      const ownerPan = owner.ownerPan;
      const ownerShare = parseFloat(owner.share || 0);
      const ownerShareAmount = ((totalAmount * ownerShare) / 100).toFixed(2);

      const isClient = ownerPan === client.panId || clientList.some(c => c.panId === ownerPan);

      const assetPayload = {
        client: { panId: ownerPan },
        assetId: property.propId,
        ledgerId: `${property.assetItemValue}_${property.propId}`, // optional composite
        ledgerName: property.assetItemValue,
        govtValue: receivedAmount,
        shareAmount: ownerShareAmount,
      };

      if (isClient) {
        await axios.post('http://localhost:8080/api/residential/addAssets', assetPayload);
        assetListForMatchedClients.push({ ...assetPayload, panId: ownerPan });
      } else {
        await axios.post('http://localhost:8080/api/residential/addOwnerAsset', {
          ownerPan,
          ...assetPayload,
        });
        ownerAssetList.push({ ...assetPayload, panId: ownerPan });
      }
    }

    alert('✅ Asset saved successfully for clients and unmatched owners!');

    // ✅ Move these inside the try block
    const assetMap = {};
    assetListForMatchedClients.forEach(asset => {
      if (!assetMap[asset.panId]) {
        assetMap[asset.panId] = [];
      }
      assetMap[asset.panId].push(asset);
    });

    const matchedClients = clientList.filter(c =>
      assetListForMatchedClients.some(a => a.panId === c.panId)
    );

    // ✅ Navigate to intermediate client view
    navigate('/matched-clients-view', {
      state: {
        matchedClients,
        assetMap,
      },
    });
// setMatchedClients(matchedClients);
// setAssetMap(assetMap);


  } catch (error) {
    console.error('❌ Error saving assets:', error);
    alert('❌ Failed to save asset data. Please try again.');
  }
};



  return (
    <div className="main-container">
      <div className="container">
        <div className="property-card1">
          <h2>Acquisition Details</h2>
          <table className="property-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>PAN</th>
                <th>Asset ID</th>
                <th>Ledger Name</th>
                <th>Govt Value</th>
                <th>Agreement Value</th>
                <th>Stamp Duty</th>
                <th>Registration Fee</th>
                <th>Client Share (%)</th>
                <th>No Of Owners</th>
                <th>Client Share Amount</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{client.clientName}</td>
                <td>{client.panId}</td>
                <td>{property.propId}</td>
                <td>{property.assetItemValue}</td>
                <td>{receivedAmount || ''}</td>
                <td>{agreementValue}</td>
                <td>{stampDuty}</td>
                <td>{registrationFee}</td>
                <td>{share}</td>
                <td>{numOwners || ''}</td>
                <td>{shareAmount}</td>
                <td>{totalAmount}</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginTop: '2rem' }}>Owner Details</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="property-table">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Owner Name</th>
                  <th>Owner PAN</th>
                  <th>Owner Share %</th>
                  <th>Owner Share Amount</th>
                  <th>Client Status</th>
                </tr>
              </thead>
              <tbody>
                {ownerData.map((owner, index) => {
                  const ownerShare = parseFloat(owner.share) || 0;
                  const ownerShareAmount = ((totalAmount * ownerShare) / 100).toFixed(2);
                  const isClient = owner.ownerPan === client.panId || clientList.some(c => c.panId === owner.ownerPan);

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{owner.ownerName || ''}</td>
                      <td>{owner.ownerPan || ''}</td>
                      <td>{owner.share || ''}</td>
                      <td>{ownerShareAmount}</td>
                      <td>
                        {isClient ? (
                          <span style={{ color: 'green', fontWeight: 'bold' }}>Client</span>
                        ) : (
                          <span style={{ color: 'gray' }}>Owner</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="button-containers">
            <button className="back-button" onClick={() => navigate(-1)}>Back</button>

            <button
              className="button-edits"
              onClick={() =>
                navigate('/acquisition-form', {
                  state: {
                    client,
                    property,
                    assets,
                    owners,
                    numOwners,
                    receivedAmount,
                    assetToEdit: {
                      assetId: property.propId,
                      ledgerName: property.assetItemValue,
                      unitNo: property.unitNo,
                      occupancy: property.occupancy,
                      agreementValue: assets.find(a => a.label === 'Agreement Value')?.amount || '',
                      stampDuty: assets.find(a => a.label === 'Stamp Duty')?.amount || '',
                      registrationFees: assets.find(a => a.label === 'Registration Fees')?.amount || '',
                      agreementDate: assets.find(a => a.label === 'Agreement Value')?.date || '',
                      stampDate: assets.find(a => a.label === 'Stamp Duty')?.date || '',
                      regDate: assets.find(a => a.label === 'Registration Fees')?.date || '',
                      share: assets.find(a => a.label === 'Agreement Value')?.share || '',
                      govtValue: receivedAmount,
                      owners,
                      aquisitionId: Date.now()
                    }
                  }
                })
              }
            >
              Edit
            </button>

            <button className="button-edits" onClick={handleSaveAsset}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayAquisitionTable;








// import React from 'react'; // ✅ move to top
// import { useLocation,useNavigate} from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import './DisplayPropertyTable.css';



// const DisplayAquisitionTable = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [clientList, setClientList] = useState([]);
//   const {
//     client,
//     property,
//     assets = [],
//     owners = [],
//     numOwners,
//     receivedAmount
//   } = location.state || {};



//   useEffect(() => {
//     axios.get('http://localhost:8080/api/clients/getall')
//       .then((res) => setClientList(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const agreementValue = parseFloat(assets.find(a => a.label === 'Agreement Value')?.amount) || 0;
//   const stampDuty = parseFloat(assets.find(a => a.label === 'Stamp Duty')?.amount) || 0;
//   const registrationFee = parseFloat(assets.find(a => a.label === 'Registration Fees')?.amount) || 0;
//   const share = parseFloat(assets.find(a => a.label === 'Agreement Value')?.share) || 0;
//   const totalAmount = (agreementValue + stampDuty + registrationFee).toFixed(2);
//   const shareAmount = ((totalAmount * share) / 100).toFixed(2);

//   const acquisitionDate = assets.find(a => a.label === 'Agreement Value')?.date || '';

//   const ownerData = owners.length === numOwners
//     ? owners
//     : Array.from({ length: numOwners }, (_, i) => owners[i] || {});

//   const calculateShareAmount = (amount, percent) => ((amount * percent) / 100).toFixed(2);

//   const handleSaveAsset = async () => {
//   try {
//     // Step 1: Filter only owners who are clients
//     const matchedOwners = ownerData.filter(owner =>
//       clientList.some(c => c.panId === owner.ownerPan)
//     );

//     // Step 2: Loop over matched owners and save asset
//     for (const owner of matchedOwners) {
//       const ownerShare = parseFloat(owner.share || 0);
//       const ownerShareAmount = calculateShareAmount(receivedAmount, ownerShare);

//       // Payload for saving to Residential Asset
//       // const assetPayload = {
//       //   client: { panId: owner.ownerPan },
//       //   assetId: property.propId,
//       //   ledgerName: property.assetItemValue,
//       //   govtValue: receivedAmount,
//       //   shareAmount: ownerShareAmount
//       // };

//       // // Save to backend
//       // await axios.post('http://localhost:8080/api/residential/addAssets', assetPayload);

//       // Save to Asset table
//       const assetData = {
//         pan: owner.ownerPan,
//         assetId: property.propId,
      
//         shareAmount: ownerShareAmount,
       
//       };

//       await axios.post("http://localhost:8080/api/residential/addAssets", assetData);

//       console.log(`✅ Asset saved for PAN: ${owner.ownerPan}`);
//     }

//     alert("✅ Asset saved for matched PANs!");

//     // Step 3: Navigate with matched clients and their asset data
//     const matchedClients = clientList.filter(c =>
//       matchedOwners.some(owner => owner.ownerPan === c.panId)
//     );

//     // navigate('/clientmenusform', {
//     //   state: {
//     //     matchedClients: matchedClients.map(c => {
//     //       const owner = matchedOwners.find(o => o.ownerPan === c.panId);
//     //       return {
//     //         client: c,
//     //         asset: {
//     //           panId: c.panId,
//     //           assetId: property.propId,
//     //           ledgerName: property.assetItemValue,
//     //           govtValue: receivedAmount,
//     //           shareAmount: calculateShareAmount(receivedAmount, owner?.share || 0)
//     //         }
//     //       };
//     //     })
//     //   }
//     // });
// navigate('/clientmenusform', {
//   state: {
//     client: matchedClients[0], // this is the full client object
//     legalName: matchedClients[0]?.legalName || '', // if needed separately
//     assetList: matchedOwners.map(owner => ({
//       panId: owner.ownerPan,
//       assetId: property.propId,
//       ledgerName: property.assetItemValue,
//       govtValue: receivedAmount,
//       shareAmount: shareAmount
//     }))
//   }
// });

//   } catch (error) {
//     console.error('❌ Error saving asset:', error);
//     alert('❌ Error saving asset. Please try again.');
//   }
// };


//   if (!client || !property) {
//     return (
//       <div className="main-container">
//         <div className="display-container">
//           <h2>No Acquisition Data Available</h2>
//           <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="main-container">
//       <div className="container">
//         <div className="property-card1">
//           <h2>Acquisition Details</h2>

//           <table className="property-table">
//             <thead>
//               <tr>
//                 <th>Client Name</th>
//                 <th>PAN</th>
//                 <th>Asset ID</th>
//                 <th>Ledger Name</th>
//                 <th>Govt Value</th>
//                 <th>Agreement Value</th>
//                 <th>Stamp Duty</th>
//                 <th>Registration Fee</th>
//                 <th>Client Share (%)</th>
//                 <th>No Of Owners</th>
//                 <th>Client Share Amount</th>
//                 <th>Total Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>{client.clientName}</td>
//                 <td>{client.panId}</td>
//                 <td>{property.propId}</td>
//                 <td>{property.assetItemValue}</td>
//                 <td>{receivedAmount || ''}</td>
//                 <td>{agreementValue}</td>
//                 <td>{stampDuty}</td>
//                 <td>{registrationFee}</td>
//                 <td>{share}</td>
//                 <td>{numOwners || ''}</td>
//                 <td>{shareAmount}</td>
//                 <td>{totalAmount}</td>
//               </tr>
//             </tbody>
//           </table>

//           <h3 style={{ marginTop: '2rem' }}>Owner Details</h3>
//           <div style={{ overflowX: 'auto' }}>
//             <table className="property-table">
//               <thead>
//                 <tr>
//                   <th>Sr.No</th>
//                   <th>Owner Name</th>
//                   <th>Owner PAN</th>
//                   <th>Owner Share %</th>
//                   <th>Owner Share Amount</th>
//                   <th>Client Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {ownerData.map((owner, index) => {
//                   const ownerShare = parseFloat(owner.share) || 0;
//                   const ownerShareAmount = ((totalAmount * ownerShare) / 100).toFixed(2);
//                   const isClient = owner.ownerPan === client.panId || clientList.some(c => c.panId === owner.ownerPan);

//                   return (
//                     <tr key={index}>
//                       <td>{index + 1}</td>
//                       <td>{owner.ownerName || ''}</td>
//                       <td>{owner.ownerPan || ''}</td>
//                       <td>{owner.share || ''}</td>
//                       <td>{ownerShareAmount}</td>
//                       <td>
//                         {isClient ? (
//                           <span style={{ color: 'green', fontWeight: 'bold' }}>Client</span>
//                         ) : (
//                           <span style={{ color: 'gray' }}>Owner</span>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           <div className="button-containers">
//             <button className="back-button" onClick={() => navigate(-1)}>Back</button>
//             <button
//               className="button-edits"
//               onClick={() =>
//                 navigate('/acquisition-form', {
//                   state: {
//                     client,
//                     property,
//                     assets,
//                     owners,
//                     numOwners,
//                     receivedAmount,
//                     assetToEdit: {
//                       assetId: property.propId,
//                       ledgerName: property.assetItemValue,
//                       unitNo: property.unitNo,
//                       occupancy: property.occupancy,
//                       agreementValue: assets.find(a => a.label === 'Agreement Value')?.amount || '',
//                       stampDuty: assets.find(a => a.label === 'Stamp Duty')?.amount || '',
//                       registrationFees: assets.find(a => a.label === 'Registration Fees')?.amount || '',
//                       agreementDate: assets.find(a => a.label === 'Agreement Value')?.date || '',
//                       stampDate: assets.find(a => a.label === 'Stamp Duty')?.date || '',
//                       regDate: assets.find(a => a.label === 'Registration Fees')?.date || '',
//                       share: assets.find(a => a.label === 'Agreement Value')?.share || '',
//                       govtValue: receivedAmount,
//                       owners,
//                       aquisitionId: Date.now(),
//                     },
//                   }
//                 })
//               }
//             >
//               Edit
//             </button>
//             <button className="button-edits" onClick={handleSaveAsset}>Save</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DisplayAquisitionTable;
