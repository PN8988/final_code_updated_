// import  { useMemo, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MaterialReactTable } from 'material-react-table';
// import { Button } from '@mui/material';
// import PropTypes from 'prop-types';
// import './PropertyTable.css';

// const PropertyTable = ({ clientList = [], thirdFormData = [], propertyList = [] }) => {
//   const navigate = useNavigate();

//   const handleSave = useCallback((rowData) => {
//     console.log('Saving:', rowData);
//     // Add actual save logic here
//   }, []);

//   const handleUpdate = useCallback((rowData) => {
//     navigate('/addresidentialprop', { state: { ...rowData } });
//   }, [navigate]);

//   const handleRemove = useCallback((rowData) => {
//     console.log('Removing:', rowData);
//     // Add actual remove logic here
//   }, []);

//   const combinedData = useMemo(() => {
//     if (!Array.isArray(clientList) || !Array.isArray(thirdFormData) || !Array.isArray(propertyList)) {
//       return [];
//     }

//     return clientList.map((client, index) => {
//       const thirdFormEntry = thirdFormData.find(entry => entry.clientId === client.clientId);
//       const propertyEntry = propertyList.find(entry => entry.clientId === client.clientId);

//       return {
//         srNo: index + 1,
//         clientId: client.clientId,
//         pan: client.pan,
//         dropdownType: thirdFormEntry?.dropdownType || '',
//         subDropdownType: thirdFormEntry?.dropdownMaster || '',
//         occupancy: propertyEntry?.occupancy || '',
//         unitNo: propertyEntry?.unitNo || '',
//         buildingName: propertyEntry?.buildingName || '',
//         street: propertyEntry?.street || '',
//         area: propertyEntry?.area || '',
//         city: propertyEntry?.city || '',
//         state: propertyEntry?.state || '',
//         pincode: propertyEntry?.pincode || '',
//         country: propertyEntry?.country || '',
//         assetItemValue: propertyEntry?.form3ItemValue || '',
//       };
//     });
//   }, [clientList, thirdFormData, propertyList]);

//   const columns = useMemo(() => [
//     { accessorKey: 'srNo', header: 'Sr. No' },
//     { accessorKey: 'pan', header: 'Client PAN No' },
//     { accessorKey: 'dropdownType', header: 'Dropdown Type' },
//     { accessorKey: 'subDropdownType', header: 'Sub Dropdown Type' },
//     { accessorKey: 'occupancy', header: 'Occupancy' },
//     { accessorKey: 'unitNo', header: 'Unit No' },
//     { accessorKey: 'buildingName', header: 'Building Name' },
//     { accessorKey: 'street', header: 'Street' },
//     { accessorKey: 'area', header: 'Area' },
//     { accessorKey: 'city', header: 'City' },
//     { accessorKey: 'state', header: 'State' },
//     { accessorKey: 'pincode', header: 'Pincode' },
//     { accessorKey: 'country', header: 'Country' },
//     { accessorKey: 'assetItemValue', header: 'Asset Item Value' },
//     {
//       accessorKey: 'actions',
//       header: 'Actions',
//       Cell: ({ row }) => (
//         <div className="action-buttons">
//           <Button variant="contained" color="primary" onClick={() => handleSave(row.original)}>
//             Save
//           </Button>
//           <Button variant="contained" color="warning" onClick={() => handleUpdate(row.original)}>
//             Update
//           </Button>
//           <Button variant="contained" color="error" onClick={() => handleRemove(row.original)}>
//             Remove
//           </Button>
//         </div>
//       ),
//     },
//   ], [handleSave, handleUpdate, handleRemove]);

//   return (
//     <div className="wrapper-container">
//       <div className="property-table-container property-table">
//         <h2>Property Table</h2>
//         <MaterialReactTable columns={columns} data={combinedData} />
//       </div>
//     </div>
//   );
// };

// PropertyTable.propTypes = {
//   clientList: PropTypes.array.isRequired,
//   thirdFormData: PropTypes.array.isRequired,
//   propertyList: PropTypes.array.isRequired,
// };

// export default PropertyTable;



// PropertyTable.js
// import React, { useContext, useMemo } from 'react';
// import { AppContext } from '../context/AppContext';
// import { MaterialReactTable } from 'material-react-table';

// const PropertyTable = () => {
//   const {
//     panId,
//     propertyType,
//     propertySubtype,
//     residentialFormData,
//   } = useContext(AppContext);

//   const data = useMemo(() => [
//     {
//       panId,
//       propertyType,
//       propertySubtype,
//       ...residentialFormData,
//     },
//   ], [panId, propertyType, propertySubtype, residentialFormData]);

//   const columns = useMemo(() => [
//     { accessorKey: 'panId', header: 'PAN ID' },
//     { accessorKey: 'propertyType', header: 'Property Type' },
//     { accessorKey: 'propertySubtype', header: 'Property Subtype' },
//     { accessorKey: 'unitNo', header: 'Unit No' },
//     { accessorKey: 'buildingName', header: 'Building Name' },
//     { accessorKey: 'street', header: 'Street' },
//     { accessorKey: 'area', header: 'Area' },
//     { accessorKey: 'city', header: 'City' },
//     { accessorKey: 'pincode', header: 'Pincode' },
//     { accessorKey: 'state', header: 'State' },
//     { accessorKey: 'country', header: 'Country' },
//     { accessorKey: 'assetItemValue', header: 'Asset Item Value' },
//   ], []);

//   return (
//     <div>
//       <h2>Property Table</h2>
//       <MaterialReactTable columns={columns} data={data} />
//     </div>
//   );
// };

// export default PropertyTable;




// import React, { useContext, useMemo, useCallback } from 'react';
// import { AppContext } from '../context/AppContext';
// import { useNavigate } from 'react-router-dom';
// import { MaterialReactTable } from 'material-react-table';
// import { Button } from '@mui/material';
// import PropTypes from 'prop-types';
// import './PropertyTable.css';

// const PropertyTable = ({ clientList = [], thirdFormData = [] }) => {
//   const { propertyList } = useContext(AppContext);
//   const navigate = useNavigate();

//   // const handleSave = useCallback((rowData) => {
//   //   console.log('Saving:', rowData);
//   //   // Add actual save logic here
//   // }, []);

//   const handleSave = useCallback((rowData) => {
//   setPropertyList((prevList) => [...prevList, rowData]);
//   console.log('saving', rowData );
// }, []);


//   const handleUpdate = useCallback((rowData) => {
//     navigate('/addresidentialprop', { state: { ...rowData } });
//   }, [navigate]);

//   const handleRemove = useCallback((rowData) => {
//     console.log('Removing:', rowData);
//     // Add actual remove logic here
//   }, []);

//   const combinedData = useMemo(() => {
//     if (!Array.isArray(clientList) || !Array.isArray(thirdFormData) || !Array.isArray(propertyList)) {
//       return [];
//     }

//     return clientList.map((client, index) => {
//       const thirdFormEntry = thirdFormData.find(entry => entry.clientId === client.clientId);
//       const propertyEntry = propertyList.find(entry => entry.clientId === client.clientId);

//       return {
//         srNo: index + 1,
//         clientId: client.clientId,
//         pan: client.pan,
//         dropdownType: thirdFormEntry?.dropdownType || '',
//         subDropdownType: thirdFormEntry?.dropdownMaster || '',
//         occupancy: propertyEntry?.occupancy || '',
//         unitNo: propertyEntry?.unitNo || '',
//         buildingName: propertyEntry?.buildingName || '',
//         street: propertyEntry?.street || '',
//         area: propertyEntry?.area || '',
//         city: propertyEntry?.city || '',
//         state: propertyEntry?.state || '',
//         pincode: propertyEntry?.pincode || '',
//         country: propertyEntry?.country || '',
//         assetItemValue: propertyEntry?.form3ItemValue || '',
//       };
//     });
//   }, [clientList, thirdFormData, propertyList]);

//   const columns = useMemo(() => [
//     { accessorKey: 'srNo', header: 'Sr. No' },
//     { accessorKey: 'pan', header: 'Client PAN No' },
//     { accessorKey: 'dropdownType', header: 'Dropdown Type' },
//     { accessorKey: 'subDropdownType', header: 'Sub Dropdown Type' },
//     { accessorKey: 'occupancy', header: 'Occupancy' },
//     { accessorKey: 'unitNo', header: 'Unit No' },
//     { accessorKey: 'buildingName', header: 'Building Name' },
//     { accessorKey: 'street', header: 'Street' },
//     { accessorKey: 'area', header: 'Area' },
//     { accessorKey: 'city', header: 'City' },
//     { accessorKey: 'state', header: 'State' },
//     { accessorKey: 'pincode', header: 'Pincode' },
//     { accessorKey: 'country', header: 'Country' },
//     { accessorKey: 'assetItemValue', header: 'Asset Item Value' },
//     {
//       accessorKey: 'actions',
//       header: 'Actions',
//       Cell: ({ row }) => (
//         <div className="action-buttons">
//           <Button variant="contained" color="primary" onClick={() => handleSave(row.original)}>
//             Save
//           </Button>
//           <Button variant="contained" color="warning" onClick={() => handleUpdate(row.original)}>
//             Update
//           </Button>
//           <Button variant="contained" color="error" onClick={() => handleRemove(row.original)}>
//             Remove
//           </Button>
//         </div>
//       ),
//     },
//   ], [handleSave, handleUpdate, handleRemove]);

//   return (
//     <div className="wrapper-container">
//       <div className="property-table-container property-table">
//         <h2>Property Table</h2>
//         <MaterialReactTable className="center-table" columns={columns} data={combinedData} />
//       </div>
//     </div>
//   );
// };

// // PropertyTable.propTypes = {
// //   clientList: PropTypes.array.isRequired,
// //   thirdFormData: PropTypes.array.isRequired,
// // };

// export default PropertyTable;



// src/components/PropertyTable.js
// PropertyTable.js
// import React, { useMemo, useCallback, useContext } from 'react';
// import { MaterialReactTable } from 'material-react-table';
// import { Button } from '@mui/material';
// import { AppContext } from '../context/AppContext';
// // ... other imports

// const PropertyTable = () => {
//   const { propertyList } = useContext(AppContext);

//   const handleSave = useCallback((rowData) => {
//     console.log('Saving:', rowData);
//     // Implement actual save logic here
//   }, []);

//   const handleUpdate = useCallback((rowData) => {
//     // Implement update logic here
//   }, []);

//   const handleRemove = useCallback((rowData) => {
//     console.log('Removing:', rowData);
//     // Implement actual remove logic here
//   }, []);

//   const combinedData = useMemo(() => {
//     return propertyList.map((property, index) => ({
//       srNo: index + 1,
//       clientId: property.clientId,
//       pan: property.panId,
//       dropdownType: property.dropdownType || '',
//       subDropdownType: property.subDropdownType || '',
//       occupancy: property.occupancy || '',
//       unitNo: property.unitNo || '',
//       buildingName: property.buildingName || '',
//       street: property.street || '',
//       area: property.area || '',
//       city: property.city || '',
//       state: property.state || '',
//       pincode: property.pincode || '',
//       country: property.country || '',
//       assetItemValue: property.assetItemValue || '',
//     }));
//   }, [propertyList]);

//   const columns = useMemo(
//     () => [
//       { accessorKey: 'srNo', header: 'Sr. No' },
//       { accessorKey: 'pan', header: 'Client PAN No' },
//       { accessorKey: 'dropdownType', header: 'Dropdown Type' },
//       { accessorKey: 'subDropdownType', header: 'Sub Dropdown Type' },
//       { accessorKey: 'occupancy', header: 'Occupancy' },
//       { accessorKey: 'unitNo', header: 'Unit No' },
//       { accessorKey: 'buildingName', header: 'Building Name' },
//       { accessorKey: 'street', header: 'Street' },
//       { accessorKey: 'area', header: 'Area' },
//       { accessorKey: 'city', header: 'City' },
//       { accessorKey: 'state', header: 'State' },
//       { accessorKey: 'pincode', header: 'Pincode' },
//       { accessorKey: 'country', header: 'Country' },
//       { accessorKey: 'assetItemValue', header: 'Asset Item Value' },
//       {
//         accessorKey: 'actions',
//         header: 'Actions',
//         Cell: ({ row }) => (
//           <div className="action-buttons">
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => handleSave(row.original)}
//             >
//               Save
//             </Button>
//             <Button
//               variant="contained"
//               color="warning"
//               onClick={() => handleUpdate(row.original)}
//             >
//               Update
//             </Button>
//             <Button
//               variant="contained"
//               color="error"
//               onClick={() => handleRemove(row.original)}
//             >
//               Remove
//             </Button>
//           </div>
//         ),
//       },
//     ],
//     [handleSave, handleUpdate, handleRemove]
//   );

//   return (
//     <div className="wrapper-container">
//       <div className="property-table-container property-table">
//         <h2>Property Table</h2>
//         <MaterialReactTable columns={columns} data={combinedData} />
//       </div>
//     </div>
//   );
// };

// export default PropertyTable;


// PropertyTable.js
// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import './PropertyTable.css';

// const PropertyTable = () => {
//   const location = useLocation();
//  const { assetId, clientName, client, savedAsset } = location.state || {};

//   const clientData = location.state?.client || {};
//   const panId = clientData.panId;
// const [assetData, setAssetData] = useState(savedAsset || null);

//   const [addressDetails, setAddressDetails] = useState(null);
//   // const [assetData, setAssetData] = useState(null);
//   const [loading, setLoading] = useState(true);
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const res = await axios.get(`http://localhost:8080/api/residential/pan/${panId}`);
//       const data = res.data || [];

//       if (data.length > 0) {
//         setAssetData(data); // Set entire list
//       } else {
//         alert("No residential properties found.");
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       alert("Failed to fetch property list.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (panId) {
//     fetchData();
//   }
// }, [panId]);




//  if (loading) return <p>Loading...</p>;
// if (!assetData || !addressDetails) return <p>Data not found or still loading...</p>;


//   return (
//     <div className="property-table-wrapper">
//       <div className="property-table-container">
//         <h2>Asset Details for {clientName || 'Client'}</h2>
//         <table className="property-table">
//           <thead>
//             <tr>
//               <th>Client ID</th>
//               <th>PAN ID</th>
//               <th>Financial Year</th>
//               <th>Prop Type</th>
//               <th>PAN Type</th>
//               <th>Occupancy Type</th>
//               <th>Govt Value</th>
//               <th>Pincode</th>
//               <th>Unit No.</th>
//               <th>Building Name</th>
//               <th>Street</th>
//               <th>Area</th>
//               <th>City</th>
//               <th>State</th>
//               <th>Country</th>
//               <th>Asset ID</th>
//               <th>Ledger Name</th>
//               <th>Date</th>
//               <th>No. of Owners</th>
//               <th>Owner Name</th>
//               <th>Owner PAN</th>
//               <th>PAN Type</th>
//               <th>% Share</th>
//               <th>Agreement Value</th>
//               <th>Stamp Duty</th>
//               <th>Registration Fee</th>
//               <th>Share Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//            {assetData?.map((property, idx) => (
//   (property.owners || []).map((owner, ownerIdx) => (
//     <tr key={`${idx}-${ownerIdx}`}>
//       <td>{property.client?.panId || '-'}</td>
//       <td>{property.client?.panId || '-'}</td>
//       <td>{property.FY_Year || '-'}</td>
//       <td>{property.prop_type || '-'}</td>
//       <td>{property.pan_Type || '-'}</td>
//       <td>{property.occupancy || '-'}</td>
//       <td>{property.govtValue || '-'}</td>
//       <td>{property.pincode || '-'}</td>
//       <td>{property.unitNo || '-'}</td>
//       <td>{property.buildingName || '-'}</td>
//       <td>{property.street || '-'}</td>
//       <td>{property.area || '-'}</td>
//       <td>{property.city || '-'}</td>
//       <td>{property.state || '-'}</td>
//       <td>{property.country || '-'}</td>
//       <td>{property.assetId || '-'}</td>
//       <td>{property.ledgerId || '-'}</td>
//       <td>{property.date || '-'}</td>
//       <td>{property.owners?.length || 0}</td>
//       <td>{owner.ownerName || '-'}</td>
//       <td>{owner.ownerPan || '-'}</td>
//       <td>{property.pan_Type || '-'}</td>
//       <td>{owner.percentShare || '-'}</td>
//       <td>{property.agreementValue || '-'}</td>
//       <td>{property.stampDuty || '-'}</td>
//       <td>{property.registrationFee || '-'}</td>
//       <td>{owner.shareAmt || '-'}</td>
//     </tr>
//   ))
// ))}

//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PropertyTable;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PropertyTable.css';

const PropertyTable = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    savedProperties = [],
    clientName,
    client = {},
  } = location.state || {};

  if (!savedProperties.length) {
    return <p>No property data available.</p>;
  }

  return (
    <div className="property-table-wrapper">
      <div className="property-table-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Asset Details for {clientName || client.clientName || 'Client'}</h2>

          <div className="action-buttons" style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="aquisition-btn"
              onClick={() =>
                navigate('/acquisition-form', {
                  state: {
                    client: client,
                    property: {
                      assetId: savedProperties[0]?.assetId,
                      ledgerName: savedProperties[0]?.ledgerId,
                      occupancy: savedProperties[0]?.occupancy,
                    },
                  },
                })
              }
            >
              Acquisition Form
            </button>

            <button
              type="button"
              className="rental-btn"
              onClick={() =>
                navigate('/rental-income-form', {
                  state: {
                    client: client,
                    property: { assetId: savedProperties[0]?.assetId },
                  },
                })
              }
            >
              Rental Income
            </button>

            <button
              type="button"
              className="sale-of-asset-btn"
              onClick={() =>
                navigate('/sale-of-asset-form', {
                  state: {
                    client: client,
                    property: { assetId: savedProperties[0]?.assetId },
                  },
                })
              }
            >
              Sale of Asset
            </button>
          </div>
        </div>

        <table className="property-table">
          <thead>
            <tr>
             
              <th>PAN ID</th>
              <th>Financial Year</th>
              <th>Prop Type</th>
              <th>PAN Type</th>
              <th>Occupancy Type</th>
              <th>Govt Value</th>
              <th>Pincode</th>
              <th>Unit No.</th>
              <th>Building Name</th>
              <th>Street</th>
              <th>Area</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Asset ID</th>
              <th>Ledger Name</th>
              <th>Date</th>
              
            </tr>
          </thead>
          <tbody>
            {savedProperties.map((asset, idx) => (
              <tr key={idx}>
                <td>{client.panId || '-'}</td>
                <td>{asset.panId || '-'}</td>
                <td>{asset.FY_Year || '-'}</td>
                <td>{asset.prop_type || '-'}</td>
                <td>{asset.pan_Type || '-'}</td>
                <td>{asset.occupancy || '-'}</td>
                <td>{asset.govtValue || '-'}</td>
                <td>{asset.pincode || '-'}</td>
                <td>{asset.unitNo || '-'}</td>
                <td>{asset.buildingName || '-'}</td>
                <td>{asset.street || '-'}</td>
                <td>{asset.area || '-'}</td>
                <td>{asset.city || '-'}</td>
                <td>{asset.state || '-'}</td>
                <td>{asset.country || '-'}</td>
                <td>{asset.assetId || '-'}</td>
                <td>{asset.ledgerId || '-'}</td>
                <td>{asset.Date || '-'}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyTable;
