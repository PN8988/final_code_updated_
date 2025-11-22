// import React, { useState } from "react";
// import  "./KycForm.css";
// export default function KycForm() {
//   const [kycData, setKycData] = useState({
//     name: "",
//     pan: "",
//     aadhaar: "",
//     email: "",
//     phone: "",
//     dob: "",
//     address: "",
//     photo: null,
//   });

//   const [photoPreview, setPhotoPreview] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setKycData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setKycData((prev) => ({ ...prev, photo: file }));
//       setPhotoPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     Object.entries(kycData).forEach(([key, value]) => {
//       if (value) formData.append(key, value);
//     });

//     fetch("/api/update-kyc", {
//       method: "POST",
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         alert("KYC Updated Successfully!");
//         console.log(data);
//       })
//       .catch((err) => console.error(err));
//   };
// const isValidDate = (date) => {
//   return /^\d{2}\/\d{2}\/\d{4}$/.test(date);
// };

//   return (
//     <div className="kyc-container">
//       <h2>Update Client KYC</h2>
//       <form onSubmit={handleSubmit} className="kyc-form">
//         <div className="form-group">
//           <label>Name</label>
//           <input
//             type="text"
//             name="name"
//             value={kycData.name}
//             onChange={handleChange}
//             placeholder="Full Name"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>PAN</label>
//           <input
//             type="text"
//             name="pan"
//             value={kycData.pan}
//             onChange={handleChange}
//             placeholder="PAN Number"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Aadhaar Number</label>
//           <input
//             type="text"
//             name="aadhaar"
//             value={kycData.aadhaar}
//             onChange={handleChange}
//             placeholder="12-digit Aadhaar Number"
//             maxLength={12}
//             pattern="\d{12}"
//             title="Aadhaar must be 12 digits"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={kycData.email}
//             onChange={handleChange}
//             placeholder="Email Address"
//           />
//         </div>

//         <div className="form-group">
//           <label>Phone</label>
//           <input
//             type="text"
//             name="phone"
//             value={kycData.phone}
//             onChange={handleChange}
//             placeholder="Phone Number"
//           />
//         </div>

//         <div className="form-group">
//   <label>Date of Birth</label>
//   <input
//     type="text"
//     name="dob"
//     value={kycData.dob}
//     onChange={(e) => {
//       // Optional: restrict input to digits and slashes
//       const val = e.target.value;
//       setKycData((prev) => ({ ...prev, dob: val }));
//     }}
//     placeholder="DD/MM/YYYY"
//   />
// </div>

//         <div className="form-group">
//           <label>Address</label>
//           <textarea
//             name="address"
//             value={kycData.address}
//             onChange={handleChange}
//             placeholder="Residential Address"
//           />
//         </div>

//         <div className="form-group">
//           <label>Upload Photo</label>
//           <input type="file" accept="image/*" onChange={handlePhotoChange} />
//           {kycData.photo && (
//             // <p className="file-name">Selected File: {kycData.photo.name}</p>
//              <p className="file-name"></p>
//           )}
//           {photoPreview && (
//             <div className="photo-preview">
//               <img src={photoPreview} alt="Photo Preview" />
//             </div>
//           )}
//         </div>

//         <button type="submit" className="submit-btn">
//           Update KYC
//         </button>
//       </form>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  TextField,
  Grid,
  IconButton,
  Button,
} from "@mui/material";
import DeleteOutlined from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AddressComponent from "../components/AddressComponent";

export default function KycForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const clientData = location.state?.clientData || {};

  const [forms, setForms] = useState([
    {
      name: "",
      pan: "",
      addhar: "",
      email: "",
      dob: "",            // ⭐ Added
      mobile: "",
      address: "",
      photoFile: null,
      addharFile: null,
      panFile: null,
    },
  ]);

  // ✅ Prefill form if clientData is available
  useEffect(() => {
    if (clientData && Object.keys(clientData).length > 0) {
      setForms([
        {
          name: clientData.fullName || clientData.clientName || "",
          pan: clientData.pan || clientData.panId || "",
          addhar: "",
          email: clientData.email || clientData.emailId || "",
          dob: clientData.dob || "",        // ⭐ Added
          mobile: clientData.mobileNo || clientData.mobileNumber || "",
          address: clientData.address || "",
          photoFile: null,
          addharFile: null,
          panFile: null,
        },
      ]);
    }
  }, [clientData]);

  // ✅ Auto-fetch updated client info from backend
  useEffect(() => {
    const panId = clientData.pan || clientData.panId;
    if (panId) {
      axios
        .get(`http://localhost:8080/api/clients/${panId}`)
        .then((res) => {
          const updated = res.data;
          setForms([
            {
              name: updated.fullName || updated.clientName || "",
              pan: updated.pan || updated.panId || "",
              addhar: "",
              dob: updated.dob || "",         // ⭐ Added
              email: updated.email || updated.emailId || "",
              mobile: updated.mobileNo || updated.mobileNumber || "",
              address: updated.address || "",
              photoFile: null,
              addharFile: null,
              panFile: null,
            },
          ]);
        })
        .catch((err) =>
          console.error("Error fetching updated client info:", err)
        );
    }
  }, [clientData.pan, clientData.panId]);

  // Add form
  const handleAddForm = () => {
    setForms([
      ...forms,
      {
        name: "",
        pan: "",
        addhar: "",
        email: "",
        dob: "",        // ⭐ Added
        mobile: "",
        address: "",
        photoFile: null,
        addharFile: null,
        panFile: null,
      },
    ]);
  };

  const handleRemoveForm = (index) => {
    const updatedForms = [...forms];
    updatedForms.splice(index, 1);
    setForms(updatedForms);
  };

  // Handle text
  const handleChange = (index, field, value) => {
    const updatedForms = [...forms];
    updatedForms[index][field] = value;
    setForms(updatedForms);
  };

  // Handle file
  const handleFileChange = (index, field, file) => {
    const updatedForms = [...forms];
    updatedForms[index][field] = file;
    setForms(updatedForms);
  };

  // Submit
  const handleSubmit = () => {
    navigate("/kyc-table", { state: { kycData: forms } });
  };

  return (
    <Paper
      sx={{
        p: 3,
        mt: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box spacing={2} sx={{ mt: 4 }}>
        <h3>KYC Form (Employee Access)</h3>

        {forms.map((form, index) => (
          <Grid
            container
            spacing={2}
            sx={{ mt: 4, borderBottom: "1px solid #ccc", pb: 2 }}
            key={index}
          >
            {/* Name */}
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={form.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </Grid>

            {/* PAN */}
            <Grid item xs={12}>
              <TextField
                label="PAN"
                variant="outlined"
                fullWidth
                value={form.pan}
                onChange={(e) => handleChange(index, "pan", e.target.value)}
              />
            </Grid>

            {/* Aadhaar */}
            <Grid item xs={12}>
              <TextField
                label="AADHAR"
                variant="outlined"
                fullWidth
                value={form.addhar}
                onChange={(e) => handleChange(index, "addhar", e.target.value)}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={form.email}
                onChange={(e) => handleChange(index, "email", e.target.value)}
              />
            </Grid>

            {/* ⭐ DOB Field Added */}
            <Grid item xs={12}>
              <TextField
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                fullWidth
                value={form.dob}
                onChange={(e) => handleChange(index, "dob", e.target.value)}
              />
            </Grid>

            {/* Mobile */}
            <Grid item xs={12}>
              <TextField
                label="Mobile No"
                variant="outlined"
                fullWidth
                value={form.mobile}
                onChange={(e) => handleChange(index, "mobile", e.target.value)}
              />
            </Grid>

            {/* Update Address */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => navigate("/update-address", { state: { clientData } })}
              >
                Update Address
              </Button>
            </Grid>

            {/* Upload Aadhaar */}
            <Grid item xs={12}>
              <TextField
                type="file"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  handleFileChange(index, "addharFile", e.target.files[0])
                }
                label="Upload Aadhaar Card"
              />
            </Grid>

            {/* Upload PAN */}
            <Grid item xs={12}>
              <TextField
                type="file"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  handleFileChange(index, "panFile", e.target.files[0])
                }
                label="Upload PAN Card"
              />
            </Grid>

            {/* Add / Remove */}
            <Grid item xs={12}>
              <IconButton onClick={handleAddForm}>
                <AddIcon />
              </IconButton>
              {forms.length > 1 && (
                <IconButton
                  color="secondary"
                  onClick={() => handleRemoveForm(index)}
                >
                  <DeleteOutlined />
                </IconButton>
              )}
            </Grid>
          </Grid>
        ))}

        {/* Submit */}
        {forms.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
}
