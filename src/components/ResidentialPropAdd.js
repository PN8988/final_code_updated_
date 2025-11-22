


// import React, { useState, useEffect } from 'react'; 
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './ResidentialPropAdd.css';

// const ResidentialPropAdd = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const propertyType = location.state?.propertyType || 'Property';

//   const clientData = location.state?.client || {};
//   const clientName = clientData.clientName;
//   const panId = clientData.panId;

//   const [occupancy, setOccupancy] = useState('');
//   const [itemValue, setItemValue] = useState('');
//   const [propId, setPropId] = useState('');
//   const [propertyList, setPropertyList] = useState([]);
//   const [propertyData, setPropertyData] = useState([]);
//   const [formData, setFormData] = useState({
//     assetId: '',
//     unitNo: '',
//     buildingName: '',
//     street: '',
//     area: '',
//     pincode: '',
//     country: '',
//     state: '',
//     city: '',
//     ledgerId: ''
//   });

//   useEffect(() => {
//     const getOccupancyCode = (occ) => {
//       if (!occ) return 'UNKNOWN';
//       const val = occ.toLowerCase();
//       if (val === 'let out') return 'LO';
//       if (val === 'self occupied') return 'SO';
//       return val.toUpperCase().replace(/\s+/g, '_');
//     };

//     if (panId && occupancy) {
//       const code = getOccupancyCode(occupancy);
//       const generatedId = `${panId}_RES_${code}`;
//       setPropId(generatedId);
//     }
//   }, [panId, occupancy]);

//   useEffect(() => {
//     const { unitNo, buildingName, pincode } = formData;
//     if (occupancy && unitNo && buildingName && pincode) {
//       const generatedValue = `RES_${occupancy}_${unitNo}_${buildingName}_${pincode}`;
//       setItemValue(generatedValue);
//     }
//   }, [occupancy, formData.unitNo, formData.buildingName, formData.pincode]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => {
//       const updated = { ...prev, [name]: value };
//       if (name === 'pincode' && value.length === 6) {
//         fetchLocationFromPincode(value);
//       }
//       return updated;
//     });
//   };

//   const fetchLocationFromPincode = async (pincode) => {
//     try {
//       const res = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
//       const data = res.data[0];
//       if (data.Status === 'Success') {
//         const place = data.PostOffice[0];
//         setFormData((prev) => ({
//           ...prev,
//           city: place.District,
//           state: place.State,
//           country: 'India',
//         }));
//       } else {
//         throw new Error();
//       }
//     } catch (err) {
//       console.error('Invalid or unsupported pincode');
//       alert('Invalid or unsupported pincode');
//     }
//   };

//   const handleOccupancyChange = (e) => {
//     setOccupancy(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
     
//   !formData.pincode ||
//   !formData.unitNo ||
//   !formData.area ||
//   !formData.city ||
//   !formData.state ||
//   !formData.country ||
//   !occupancy ||
//   !propId ||
//   !itemValue
// ) {
//   alert('Please fill all mandatory fields.');
//   return;
// }

    
//     const newEntry = {
//   client: {
//     panId: panId,
//   },
//   assetId: propId,
//   occupancy: occupancy,
//   unitNo: formData.unitNo,
//   buildingName: formData.buildingName,
//   street: formData.street,
//   area: formData.area,
//   pincode: formData.pincode,
//   country: formData.country,
//   state: formData.state,
//   city: formData.city,
//   ledgerId: itemValue,
//   prop_type: '',
//   agreementValue: '',
//   stampDuty: '',
//   capitalGain: '',
//   registrationFee: '',        // ✅ Add this
//   govtValue: '',            // ✅ Add this
//   saleOfAsset: "",             // ✅ Add this
//   FY_Year: "",            // ✅ Add this
//   Date: new Date().toISOString().split("T")[0], // ✅ Add this
//   pan_Type: "",        // ✅ Add this
//   noOfOwners: '',                 // ✅ Add this
//   ownerName: clientData.clientName, // ✅ Add this
//   ownerPan: panId,               // ✅ Add this
//   percentShare: '',           // ✅ Add this
//   shareAmt: ''             // ✅ Add this
// };

//    // try {
// //   await axios.post('http://localhost:8080/api/residential/addProperty', newEntry);
// //   alert('Property saved successfully!');
// //   setPropertyList((prevList) => [...prevList, newEntry]);

// //   // ✅ Navigate to PropertyTable instead of PropertyList
// //   navigate('/property-list', {
// //   state: {
// //     client: clientData,
// //     clientName: clientData.clientName,
// //   },
// // });
// try {
//   await axios.post('http://localhost:8080/api/residential/addProperty', newEntry);
//   alert('Property saved successfully!');

// setPropertyList((prevList) => [...prevList, newEntry]);

// } catch (error) {
//   console.error('Error saving to backend:', error);
//   alert('Failed to save data to backend.');
// }






//       // navigate('/property-list', {
//       //   state: {
//       //     client: clientData,
//       //     property: {
//       //       assetId: formData.assetId,
//       //       receivedAmount: formData.receivedAmount,
//       //     },
//       //   },
//       // });

//       // setTimeout(() => {
//       //   
//       // }, 500);
// //    } catch (error) {
// //   console.error('Error saving to backend:', error);
// //   alert('Failed to save data to backend.');
// // }

//     setFormData({
//       pincode: '',
//       panNumber: panId,
//       unitNo: '',
//       buildingName: '',
//       street: '',
//       area: '',
//       country: '',
//       state: '',
//       city: '',
//     });
//     setOccupancy('');
//     setItemValue('');
//     setPropId('');
//   };

//   /*
//   const fetchExistingAssets = async () => {
//     const pan = clientData?.panId;
//     if (!pan) return;
//     try {
//       const res = await axios.get(`http://localhost:8080/api/assets/pan/${pan}`);
//       setAssetList(res.data || []);
//     } catch (err) {
//       console.error('Error fetching saved asset list:', err);
//     }
//   };

//   useEffect(() => {
//     if (clientData?.panId) {
//       fetchExistingAssets();
//     }
//   }, [clientData?.panId]);

//   useEffect(() => {
//     if (updatedAsset) {
//       fetchExistingAssets(); // Refresh after save
//     }
//   }, [updatedAsset]);
//   */

//   return (
//     <div className="client-menu-container1">
//       <div className="client-form">
//         <h2>Client Menu</h2>
//         <div className="form-fields">
//           <div><label>Client Name:</label><input type="text" value={clientData.clientName || ''} readOnly /></div>
//           <div><label>Legal Name:</label><input type="text" value={clientData.legalName || ''} readOnly /></div>
//           <div><label>PAN Number:</label><input type="text" value={clientData.panId || ''} readOnly /></div>
//         </div>
//       </div>
 
    
//       <div className="property-form-container">
       
//         <div className="occupancy-section"></div>
//         <h1>Add Property Address Details</h1>

//         {occupancy && (
//           <h2 className="client-heading">Client Name: {clientName}</h2>
//         )}
//         <h3 className="property-type-heading">Property Type: {propertyType}</h3>

//         <div className="occupancy-row">
//           <label>Occupancy:</label>
//           {['LET-OUT', 'SELF-OCCUPIED'].map((type) => (
//             <label key={type}>
//               <input
//                 type="radio"
//                 value={type}
//                 checked={occupancy === type}
//                 onChange={handleOccupancyChange}
//                 disabled={occupancy && occupancy !== type}
//               />
//               {type}
//             </label>
//           ))}
//         </div>

//         {occupancy && (
//           <form onSubmit={handleSubmit} className="property-form">
//             <div className="form-group">
//               <label>Pincode *</label>
//               <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Unit No. *</label>
//               <input type="text" name="unitNo" value={formData.unitNo} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Building Name</label>
//               <input type="text" name="buildingName" value={formData.buildingName} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Street</label>
//               <input type="text" name="street" value={formData.street} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Area *</label>
//               <input type="text" name="area" value={formData.area} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>City *</label>
//               <input type="text" name="city" value={formData.city} readOnly />
//             </div>
//             <div className="form-group">
//               <label>State *</label>
//               <input type="text" name="state" value={formData.state} readOnly />
//             </div>
//             <div className="form-group">
//               <label>Country *</label>
//               <input type="text" name="country" value={formData.country} readOnly />
//             </div>
//             <div className="form-group">
//               <label>Property ID</label>
//               <input type="text" value={propId} readOnly />
//             </div>
//             <div className="form-group">
//               <label>Ledger Name</label>
//               <input type="text" value={itemValue} readOnly />
//             </div>

//             <button type="submit" className="save-button">Save</button>
// {propertyList.length > 0 && (
//   <div className="property-table-section">
//     <h2>Saved Properties</h2>
//     <table className="property-table">
//       <thead>
//         <tr>
//           <th>Sr. No</th>
//           <th>Property ID</th>
//           <th>Ledger Name</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {propertyList.map((property, index) => (
//           <tr key={index}>
//             <td>{index + 1}</td>
//             <td>{property.assetId}</td>
//             <td>{property.ledgerId}</td>
//             <td>
//               <button
//                 onClick={() => {
//                   // You can later implement edit navigation here
//                   alert(`Edit clicked for ${property.assetId}`);
//                 }}
//                 className="edit-button"
//               >
//                 Edit
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// )}

//             <div className="action-buttons" style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
//               <button
//                 type="button" className="aquisition-btn"
//                 onClick={() => navigate('/acquisition-form', {
//                   state: {
//                     client: clientData,
//                     property: {
//                       assetId: propId,
//                     },
//                   },
//                 })}
//               >
//                 Acquisition Form
//               </button>

//                {/* <button
//                 type="button" className="rental-btn"
//                 onClick={() => navigate('/rental-income-form', {
//                   state: {
//                     client: clientData,
//                     property: {
//                       assetId: propId,
//                     },
//                   },
//                 })}
//               >
//                 Rental Income
//               </button>

//               <button
//                 type="button" className="sale-of-asset-btn"
//                 onClick={() => navigate('/sale-of-asset-form', {
//                   state: {
//                     client: clientData,
//                     property: {
//                       assetId: propId,
//                     },
//                   },
//                 })}
//               >
//                 Sale of Asset
//               </button> */}
//             </div> 
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResidentialPropAdd;


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const ResidentialPropAdd = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const propertyType = location.state?.propertyType || "Property";

  const clientData = location.state?.client || {};
  const clientName = clientData.clientName;
  const panId = clientData.panId;

  const [occupancy, setOccupancy] = useState("");
  const [itemValue, setItemValue] = useState("");
  const [propId, setPropId] = useState("");
  const [propertyList, setPropertyList] = useState([]);

  const [formData, setFormData] = useState({
    assetId: "",
    unitNo: "",
    buildingName: "",
    street: "",
    area: "",
    pincode: "",
    country: "",
    state: "",
    city: "",
    ledgerId: "",
  });

  // ✅ Edit Mode
  useEffect(() => {
    const property = location.state?.propertyData;
    const isEdit = location.state?.mode === "edit";

    if (isEdit && property) {
      setOccupancy(property.occupancy || "");
      setFormData({
        assetId: property.assetId || "",
        unitNo: property.unitNo || "",
        buildingName: property.buildingName || "",
        street: property.street || "",
        area: property.area || "",
        pincode: property.pincode || "",
        country: property.country || "",
        state: property.state || "",
        city: property.city || "",
        ledgerId: property.ledgerId || "",
      });
      setPropId(property.assetId || "");
      setItemValue(property.ledgerId || "");
    }
  }, [location.state]);

  // ✅ Fetch Saved Properties
  useEffect(() => {
    const fetchSavedProperties = async () => {
      if (!panId) return;
      try {
        const res = await axios.get(`http://localhost:8080/api/residential/pan/${panId}`);
        setPropertyList(res.data || []);
      } catch (err) {
        console.error("❌ Failed to load existing properties:", err);
      }
    };
    fetchSavedProperties();
  }, [panId]);

  // ✅ Generate Asset ID
  useEffect(() => {
    const getOccupancyCode = (occ) => {
      if (!occ) return "UNKNOWN";
      const val = occ.toLowerCase();
      if (val === "let out") return "LO";
      if (val === "self occupied") return "SO";
      return val.toUpperCase().replace(/\s+/g, "_");
    };

    const generateAssetIdWithCounter = () => {
      if (panId && occupancy) {
        const code = getOccupancyCode(occupancy);
        const baseId = `${panId}_RES_${code}`;
        const matchingAssets = propertyList.filter((prop) => prop.assetId?.includes(baseId));
        const nextNumber = String(matchingAssets.length + 1).padStart(2, "0");
        const newAssetId = `${nextNumber}_${baseId}`;
        setPropId(newAssetId);
      }
    };

    generateAssetIdWithCounter();
  }, [panId, occupancy, propertyList]);

  // ✅ Generate Ledger Name
  useEffect(() => {
    const { unitNo, buildingName, pincode } = formData;
    if (occupancy && unitNo && buildingName && pincode) {
      const generatedValue = `RES_${occupancy}_${unitNo}_${buildingName}_${pincode}`;
      setItemValue(generatedValue);
    }
  }, [occupancy, formData.unitNo, formData.buildingName, formData.pincode]);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "pincode" && value.length === 6) {
        fetchLocationFromPincode(value);
      }
      return updated;
    });
  };

  // ✅ Auto-fill City/State from Pincode
  const fetchLocationFromPincode = async (pincode) => {
    try {
      const res = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = res.data[0];
      if (data.Status === "Success") {
        const place = data.PostOffice[0];
        setFormData((prev) => ({
          ...prev,
          city: place.District,
          state: place.State,
          country: "India",
        }));
      } else throw new Error();
    } catch {
      toast.error("Invalid or unsupported pincode");
    }
  };

  // ✅ Handle Occupancy
  const handleOccupancyChange = (e) => setOccupancy(e.target.value);

  // ✅ Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.pincode ||
      !formData.unitNo ||
      !formData.area ||
      !formData.city ||
      !formData.state ||
      !formData.country ||
      !occupancy ||
      !propId ||
      !itemValue
    ) {
      toast.warn("Please fill all mandatory fields.");
      return;
    }

    const newEntry = {
      client: { panId },
      assetId: propId,
      occupancy,
      ...formData,
      ledgerId: itemValue,
      prop_type: "",
      registrationFee: "",
      govtValue: "",
      FY_Year: "",
      Date: new Date().toISOString().split("T")[0],
    };

    try {
      await axios.post("http://localhost:8080/api/residential/addProperty", newEntry);
      toast.success("Property saved successfully!");
      setPropertyList((prevList) => [...prevList, newEntry]);

      navigate("/display-property", {
        state: { client: clientData, propertyList: [...propertyList, newEntry] },
      });
    } catch (error) {
      console.error("Error saving to backend:", error);
      toast.error("Failed to save data.");
    }
  };

  // ✅ Delete Property
  const handleDelete = async (assetId) => {
    try {
      await axios.delete(`http://localhost:8080/api/residential/delete/${assetId}`);
      setPropertyList((prevList) => prevList.filter((p) => p.assetId !== assetId));
      toast.success("Property deleted successfully!");
    } catch {
      toast.error("Failed to delete property.");
    }
  };

  return (
    <Box className="container mt-4">
      <ToastContainer />

      {/* 🔹 Client Header Section */}
      <Paper elevation={3} className="p-4 mb-4">
        <Typography variant="h5" gutterBottom color="primary">
          Client Menu
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Client Name" value={clientData.clientName || ""} InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Legal Name" value={clientData.legalName || ""} InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="PAN Number" value={clientData.panId || ""} InputProps={{ readOnly: true }} />
          </Grid>
        </Grid>

        <Box className="mt-3 d-flex gap-3">
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              navigate("/acquisition-form", {
                state: { client: clientData, property: { ...formData, assetId: propId, ledgerId: itemValue, occupancy } },
              })
            }
          >
            Acquisition
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() =>
              navigate("/display-property", {
                state: { client: clientData, selectedProperty: { ...formData, assetId: propId, ledgerId: itemValue, occupancy } },
              })
            }
          >
            View
          </Button>
        </Box>
      </Paper>

      {/* 🔹 Property Form Section */}
      <Paper elevation={3} className="p-4">
        <Typography variant="h5" gutterBottom>
          Add Property Address Details
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Property Type: {propertyType}
        </Typography>

        <Divider className="my-3" />

        {/* Occupancy Radio Buttons */}
        <Typography variant="subtitle1">Occupancy:</Typography>
        <RadioGroup
          row
          value={occupancy}
          onChange={handleOccupancyChange}
          className="mb-3"
        >
          <FormControlLabel value="LET-OUT" control={<Radio />} label="Let Out" />
          <FormControlLabel value="SELF-OCCUPIED" control={<Radio />} label="Self Occupied" />
        </RadioGroup>

        {occupancy && (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField required fullWidth label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField required fullWidth label="Unit No." name="unitNo" value={formData.unitNo} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Building Name" name="buildingName" value={formData.buildingName} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Street" name="street" value={formData.street} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField required fullWidth label="Area" name="area" value={formData.area} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="City" name="city" value={formData.city} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="State" name="state" value={formData.state} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Country" name="country" value={formData.country} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Property ID" value={propId} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Ledger Name" value={itemValue} InputProps={{ readOnly: true }} />
              </Grid>
            </Grid>

            <Box className="mt-4 d-flex justify-content-end gap-3">
              <Button variant="contained" color="success" type="submit">
                Save Property
              </Button>
              <Button variant="outlined" color="error" onClick={() => handleDelete(propId)}>
                Delete Property
              </Button>
            </Box>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default ResidentialPropAdd;
