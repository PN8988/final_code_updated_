//   import React, { useState, useEffect } from "react";
//   import {
//     Paper,
//     Box,
//     TextField,
//     Grid,
//     Button,
//     Step,
//     StepLabel,
//     Stepper,
//     Snackbar,
//     Alert,
//   } from "@mui/material";
//   import { useNavigate, useLocation } from "react-router-dom";
//   import axios from "axios";
//   import AddressComponent from "./AddressComponent";

//  export default function KycForm({ userId, client, onSave }) {
 
//     const navigate = useNavigate();
//     const location = useLocation();
// //    const client = location.state?.client || null;
// // const clientId = location.state?.clientId || client?.clientId || null;
// // const userId = location.state?.userId || client?.userId || null;

//     const [activeStep, setActiveStep] = useState(0);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "" });
   
// const [basicCompleted, setBasicCompleted] = useState(false);
// const [addressCompleted, setAddressCompleted] = useState(false);
// const [incomeCompleted, setIncomeCompleted] = useState(false);

//     const steps = ["Personal Information", "Address Details", "Income Credentials", "Preview"];

//     const goNext = () => setActiveStep((prev) => prev + 1);
//     const goBack = () => setActiveStep((prev) => prev - 1);
//     const [addressPreview, setAddressPreview] = useState({});
//     const [address1, setAddress1] = useState("");
// const [address2, setAddress2] = useState("");
// const [pincode, setPincode] = useState("");
// const [city, setCity] = useState("");
// const [district, setDistrict] = useState("");
// const [state, setState] = useState("");
// const [isSaved, setIsSaved] = useState(false);


//     const stepKeyMap = {
//   0: "basic",
//   1: "address",
//   2: "income",
// };

//     /* ================= FORM STATE ================= */
//    const [form, setForm] = useState({
//   name: client?.clientName || "",
//   panNumber: client?.panId || "",
//   aadhaarNumber: "",
//   dateOfBirth: "",
//   aadhaarFile: null,
//   panFile: null,
// });


//    const [income, setIncome] = useState({
//   incomeCredentialId: "",
//   incomeCredentialPassword: "",
// });

//     const [kycStatus, setKycStatus] = useState({
//       basic: false,
//       address: false,
//       income: false,
//     });

//     useEffect(() => {
//     if (userId) fetchAddress();
//   }, [userId]);

// useEffect(() => {
//   if (!userId) return; // 🔐 prevents crash on refresh

//   axios
//     .get(`http://localhost:8080/api/kyc/resume/${userId}`)
//     .then((res) => {
//       const data = res.data;

//       setBasicCompleted(data.basicCompleted);
//       setAddressCompleted(data.addressCompleted);
//       setIncomeCompleted(data.incomeCompleted);

//       // 🔁 Resume correct step
//       if (!data.basicCompleted) setActiveStep(0);
//       else if (!data.addressCompleted) setActiveStep(1);
//       else if (!data.incomeCompleted) setActiveStep(2);
//       else setActiveStep(3);
//     })
//     .catch((err) => {
//       console.error("Resume KYC failed", err);
//       setActiveStep(0);
//     });
// }, [userId]);


//     /* ================= RETURN FROM ADDRESS ================= */
//     useEffect(() => {
//       if (location.state?.resumeStep !== undefined) {
//         setActiveStep(location.state.resumeStep);
//         if (location.state.addressCompleted) {
//           setKycStatus((p) => ({ ...p, address: true }));
//         }
//       }
//     }, [location.state]);

//     /* ================= BASIC KYC ================= */
//     const saveBasicKyc = async () => {
//       if (!form.name || !form.panNumber || !form.aadhaarNumber) {
//         alert("Please fill all required fields");
//         return;
//       }

//       try {
//         const formData = new FormData();
//       formData.append("userId", userId);

//         formData.append("aadhaarNumber", form.aadhaarNumber);
//         formData.append("panNumber", form.panNumber);
//         formData.append("dateOfBirth", form.dateOfBirth);

//         if (form.aadhaarFile) formData.append("aadhaarFile", form.aadhaarFile);
//         if (form.panFile) formData.append("panFile", form.panFile);

//         await axios.post("http://localhost:8080/api/kyc/basic", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });

//        setBasicCompleted(true);
//        setKycStatus((p) => ({ ...p, basic: true }));
//        goNext();

//         setSnackbar({ open: true, message: "Basic KYC saved" });
//       } catch (err) {
//         console.error(err);
//         alert("Error saving basic KYC");
//       }
//     };

//     const fetchAddress = async () => {
//   if (!userId) return;
//   try {
//     const res = await axios.get(`http://localhost:8080/api/address/${userId}`);
//     if (res.data) {
//       setAddress1(res.data.address1 || "");
//       setAddress2(res.data.address2 || "");
//       setPincode(res.data.pincode || "");
//       setCity(res.data.city || "");
//       setDistrict(res.data.district || "");
//       setState(res.data.state || "");
//       setIsSaved(true);
//     }
//   } catch (err) {
//     console.error("Fetch address error:", err);
//     setIsSaved(false);
//   }
// };

//     /* ================= ADDRESS ================= */
//  const handleAddressSuccess = (addressData) => {
//   setAddressPreview(addressData);
//   setAddressCompleted(true);
//   setKycStatus((p) => ({ ...p, address: true }));
//   goNext();
// };



//     /* ================= INCOME KYC ================= */
// const saveIncomeKyc = async () => {
//   if (!income.incomeCredentialId || !income.incomeCredentialPassword) {
//     alert("Please fill income credentials");
//     return;
//   }

//   try {
//     await axios.put(
//       `http://localhost:8080/api/kyc/update-income-credentials/${userId}`,
//       {
//         incomeCredentialId: income.incomeCredentialId,
//         incomeCredentialPassword: income.incomeCredentialPassword,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     setIncomeCompleted(true);
//     setKycStatus((p) => ({ ...p, income: true }));
//     goNext();

//     setSnackbar({ open: true, message: "Income credentials saved" });
//   } catch (err) {
//     console.error("Income KYC save error:", err.response || err);
//     alert("Error saving income credentials");
//   }
// };



//     /* ================= FINAL SUBMIT ================= */
//     const submitKyc = async () => {
//     try {
//       await axios.post(
//     "http://localhost:8080/api/kyc/complete",
// { userId },
//    // ✅ send JSON body
//     { headers: { "Content-Type": "application/json" } }
//   );


//       setSnackbar({ open: true, message: "KYC completed successfully" });
//       navigate("/kyc-table");
//     } catch (err) {
//       console.error(err);
//       alert("Error submitting final KYC");
//     }
//   };


//   useEffect(() => {
//   if (!userId) return;

//   axios
//     .get(`http://localhost:8080/api/address/${userId}`)
//     .then((res) => {
//       if (res.data) {
//         setAddressPreview(res.data);
//         setAddressCompleted(true);
//       }
//     })
//     .catch(console.error);
// }, [userId]);


// useEffect(() => {
//   if (!form.panNumber) return;

//   axios
//     .get(`http://localhost:8080/api/address/getAddressByPan/${form.panNumber}`)
//     .then((res) => {
//       if (res.data) {
//         setAddressPreview(res.data);
//         setAddressCompleted(true);
//       }
//     })
//     .catch(() => setAddressCompleted(false));
// }, [form.panNumber]);




//     /* ================= PREVIEW DATA ================= */
//   const renderPreview = () => (
//     <Box sx={{ p: 2 }}>
//       <Grid container spacing={3}>

//         {/* ================= PERSONAL INFO ================= */}
//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//             <Box sx={{ mb: 2 }}>
//               <strong style={{ fontSize: 18 }}>Personal Information</strong>
//             </Box>

//             <Grid container spacing={2}>
//               <Grid item xs={6}><b>Name:</b> {form.name}</Grid>
//               <Grid item xs={6}><b>PAN:</b> {form.panNumber}</Grid>
//               <Grid item xs={6}><b>Aadhaar:</b> {form.aadhaarNumber}</Grid>
//               <Grid item xs={6}><b>DOB:</b> {form.dateOfBirth}</Grid>

//               <Grid item xs={6}>
//                 <b>Aadhaar File:</b> {form.aadhaarFile?.name || "Uploaded"}
//               </Grid>
//               <Grid item xs={6}>
//                 <b>PAN File:</b> {form.panFile?.name || "Uploaded"}
//               </Grid>
//             </Grid>
//           </Paper>
//         </Grid>

//         {/* ================= ADDRESS ================= */}
//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//             <Box sx={{ mb: 2 }}>
//               <strong style={{ fontSize: 18 }}>Address Details</strong>
//             </Box>

//             <Grid container spacing={2}>
//               {/* ================= ADDRESS ================= */}
//   <Grid item xs={12}>
//     <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//       <Box sx={{ mb: 2 }}>
//         <strong style={{ fontSize: 18 }}>Address Details</strong>
//       </Box>

//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <b>Address Line 1:</b> {addressPreview.address1 || "-"}
//         </Grid>
//         <Grid item xs={12}>
//           <b>Address Line 2:</b> {addressPreview.address2 || "-"}
//         </Grid>
//         <Grid item xs={4}><b>City:</b> {addressPreview.city || "-"}</Grid>
//         <Grid item xs={4}><b>District:</b> {addressPreview.district || "-"}</Grid>
//         <Grid item xs={4}><b>State:</b> {addressPreview.state || "-"}</Grid>
//         <Grid item xs={4}><b>Pincode:</b> {addressPreview.pincode || "-"}</Grid>
//       </Grid>
//     </Paper>
//   </Grid>

//       </Grid>
//       </Paper>
//       </Grid>  

//         {/* ================= INCOME ================= */}
//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//             <Box sx={{ mb: 2 }}>
//               <strong style={{ fontSize: 18 }}>Income Credentials</strong>
//             </Box>

//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <b>Credential ID:</b> {income.incomeCredentialId}
//               </Grid>
//               <Grid item xs={6}>
//                 <b>Password:</b> ********
//               </Grid>
//             </Grid>
//           </Paper>
//         </Grid>

//       </Grid>
//     </Box>
//   );


//     return (
//       <Paper sx={{ p: 3, mt: 3 }}>
//         <h2>KYC Verification</h2>
//         <h4>Step {activeStep + 1}: {steps[activeStep]}</h4>

//       <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
//   {steps.map((label, index) => (
//     <Step
//       key={label}
//       completed={
//         index === 0 ? basicCompleted :
//         index === 1 ? addressCompleted :
//         index === 2 ? incomeCompleted :
//         false
//       }
//     >
//       <StepLabel>{label}</StepLabel>
//     </Step>
//   ))}
// </Stepper>


//         {/* STEP CONTENT */}
//         {activeStep === 0 && (
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Full Name"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="PAN"
//                 value={form.panNumber}
//                 onChange={(e) => setForm({ ...form, panNumber: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Aadhaar"
//                 value={form.aadhaarNumber}
//                 onChange={(e) => setForm({ ...form, aadhaarNumber: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 type="date"
//                 fullWidth
//                 InputLabelProps={{ shrink: true }}
//                 value={form.dateOfBirth}
//                 onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 type="file"
//                 fullWidth
//                 onChange={(e) => setForm({ ...form, aadhaarFile: e.target.files[0] })}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 type="file"
//                 fullWidth
//                 onChange={(e) => setForm({ ...form, panFile: e.target.files[0] })}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button variant="contained" onClick={saveBasicKyc}>
//                 Save & Continue
//               </Button>
//             </Grid>
//           </Grid>
//         )}
// {activeStep === 1 && (
//   <div>
//     <h3>Debug AddressComponent</h3>
//     <p>User ID: {userId}</p>
//     <AddressComponent userId={userId} onSuccess={handleAddressSuccess} />
//   </div>
// )}



//         {activeStep === 2 && (
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Income Credential ID"
//                 value={income.incomeCredentialId}
//                 onChange={(e) => setIncome({ ...income, incomeCredentialId: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 type="password"
//                 label="Income Credential Password"
//                 value={income.incomeCredentialPassword}
//                 onChange={(e) => setIncome({ ...income, incomeCredentialPassword: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button variant="contained" onClick={saveIncomeKyc}>
//                 Save & Continue
//               </Button>
//             </Grid>
//           </Grid>
//         )}

//         {activeStep === 3 && (
//           <Box>
//             {renderPreview()}
//             <Button onClick={goBack}>Back</Button>
//             <Button sx={{ ml: 2 }} variant="contained" color="success" onClick={submitKyc}>
//               Confirm & Submit KYC
//             </Button>
//           </Box>
//         )}

//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={3000}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           <Alert severity="success">{snackbar.message}</Alert>
//         </Snackbar>
//       </Paper>
//     );
//   }


import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  TextField,
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  Alert,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AddressComponent from "./AddressComponent";

export default function KycForm({ userId, client }) {
  const navigate = useNavigate();
  const location = useLocation();

  /* ================= STEPS ================= */
  const steps = [
    "Personal Information",
    "Address Details",
    "Income Credentials",
    "Preview",
  ];

  const [activeStep, setActiveStep] = useState(0);
  const goNext = () => setActiveStep((s) => s + 1);
  const goBack = () => setActiveStep((s) => s - 1);

  /* ================= STATUS ================= */
  const [basicCompleted, setBasicCompleted] = useState(false);
  const [addressCompleted, setAddressCompleted] = useState(false);
  const [incomeCompleted, setIncomeCompleted] = useState(false);

  /* ================= UI ================= */
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  /* ================= BASIC KYC ================= */
  const [form, setForm] = useState({
    name: client?.clientName || "",
    panNumber: client?.panId || "",
    aadhaarNumber: "",
    dateOfBirth: "",
    aadhaarFile: null,
    panFile: null,
  });

  /* ================= ADDRESS PREVIEW ================= */
const [addressPreview, setAddressPreview] = useState({
  address1: "",
  address2: "",
  city: "",
  district: "",
  state: "",
  pincode: "",
});


  /* ================= INCOME ================= */
  const [income, setIncome] = useState({
    incomeCredentialId: "",
    incomeCredentialPassword: "",
  });

  /* ================= RESUME KYC ================= */
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8080/api/kyc/resume/${userId}`)
      .then((res) => {
        const d = res.data;
        setBasicCompleted(d.basicCompleted);
        setAddressCompleted(d.addressCompleted);
        setIncomeCompleted(d.incomeCompleted);

        if (!d.basicCompleted) setActiveStep(0);
        else if (!d.addressCompleted) setActiveStep(1);
        else if (!d.incomeCompleted) setActiveStep(2);
        else setActiveStep(3);
      })
      .catch(() => setActiveStep(0));
  }, [userId]);

  /* ================= LOAD ADDRESS FOR PREVIEW (ON REFRESH) ================= */
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8080/api/address/${userId}`)
      .then((res) => {
        if (res.data) {
          setAddressPreview(res.data);
          setAddressCompleted(true);
        }
      })
      .catch(() => {});
  }, [userId]);

  /* ================= BASIC SAVE ================= */
  const saveBasicKyc = async () => {
    if (!form.name || !form.panNumber || !form.aadhaarNumber) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("userId", userId);
      fd.append("aadhaarNumber", form.aadhaarNumber);
      fd.append("panNumber", form.panNumber);
      fd.append("dateOfBirth", form.dateOfBirth);
      if (form.aadhaarFile) fd.append("aadhaarFile", form.aadhaarFile);
      if (form.panFile) fd.append("panFile", form.panFile);

      await axios.post("http://localhost:8080/api/kyc/basic", fd);

      setBasicCompleted(true);
      goNext();
      setSnackbar({ open: true, message: "Basic KYC saved" });
    } catch {
      alert("Error saving basic KYC");
    }
  };


//   useEffect(() => {
//   if (!userId) return;

//   axios.get(`http://localhost:8080/api/address/${userId}`)
//     .then(res => {
//       if (res.data) setAddressPreview(res.data);
//     });
// }, [userId]);


  /* ================= ADDRESS CALLBACK ================= */
//  const handleAddressSuccess = (addressData = {}) => {
//   setAddressPreview({
//     address1: addressData.address1 || "",
//     address2: addressData.address2 || "",
//     city: addressData.city || "",
//     district: addressData.district || "",
//     state: addressData.state || "",
//     pincode: addressData.pincode || "",
//   });

//   setAddressCompleted(true);
//   goNext();
// };

const handleAddressSuccess = (data) => {
  setAddressPreview(data);
  setAddressCompleted(true);
  goNext();
};

  /* ================= INCOME SAVE ================= */
  const saveIncomeKyc = async () => {
    if (!income.incomeCredentialId || !income.incomeCredentialPassword) {
      alert("Please fill income credentials");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/kyc/update-income-credentials/${userId}`,
        income,
        { headers: { "Content-Type": "application/json" } }
      );

      setIncomeCompleted(true);
      goNext();
      setSnackbar({ open: true, message: "Income credentials saved" });
    } catch {
      alert("Error saving income credentials");
    }
  };

  /* ================= FINAL SUBMIT ================= */
  const submitKyc = async () => {
  try {
    await axios.post(
      "http://localhost:8080/api/kyc/complete",
      { userId },
      { headers: { "Content-Type": "application/json" } }
    );

    setSnackbar({
      open: true,
      message: "KYC completed successfully",
    });

    navigate("/kyc-table");
  } catch (err) {
    alert(err?.response?.data || "Error submitting KYC");
  }
};

  /* ================= PREVIEW ================= */
  const PreviewBlock = ({ title, children }) => (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Typography fontWeight={600} mb={2}>
        {title}
      </Typography>
      {children}
    </Paper>
  );

  return (
    <Paper sx={{ p: 4, mt: 3 }}>
      <Typography variant="h5" mb={1}>
        KYC Verification
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label, i) => (
          <Step
            key={label}
            completed={
              i === 0
                ? basicCompleted
                : i === 1
                ? addressCompleted
                : i === 2
                ? incomeCompleted
                : false
            }
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* ================= STEP 0 ================= */}
      {activeStep === 0 && (
        <Grid container spacing={2}>
          {[
            ["Full Name", "name"],
            ["PAN", "panNumber"],
            ["Aadhaar", "aadhaarNumber"],
          ].map(([label, key]) => (
            <Grid item xs={6} key={key}>
              <TextField
                fullWidth
                label={label}
                value={form[key]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
              />
            </Grid>
          ))}

          <Grid item xs={6}>
            <TextField
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={form.dateOfBirth}
              onChange={(e) =>
                setForm({ ...form, dateOfBirth: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              type="file"
              fullWidth
              onChange={(e) =>
                setForm({ ...form, aadhaarFile: e.target.files[0] })
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              type="file"
              fullWidth
              onChange={(e) =>
                setForm({ ...form, panFile: e.target.files[0] })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" onClick={saveBasicKyc}>
              Save & Continue
            </Button>
          </Grid>
        </Grid>
      )}

      {/* ================= STEP 1 ================= */}
      {activeStep === 1 && (
     <AddressComponent
  userId={userId}
  onSuccess={(address) => setAddressPreview(address)}
  onNext={() => setActiveStep((prev) => prev + 1)}
/>


      )}

      {/* ================= STEP 2 ================= */}
      {activeStep === 2 && (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Income Credential ID"
              value={income.incomeCredentialId}
              onChange={(e) =>
                setIncome({ ...income, incomeCredentialId: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="password"
              label="Income Credential Password"
              value={income.incomeCredentialPassword}
              onChange={(e) =>
                setIncome({
                  ...income,
                  incomeCredentialPassword: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={saveIncomeKyc}>
              Save & Continue
            </Button>
          </Grid>
        </Grid>
      )}

      {/* ================= STEP 3 ================= */}
      {activeStep === 3 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PreviewBlock title="Personal Information">
                <div>Name: {form.name}</div>
                <div>PAN: {form.panNumber}</div>
                <div>Aadhaar: {form.aadhaarNumber}</div>
                <div>DOB: {form.dateOfBirth}</div>
              </PreviewBlock>
            </Grid>

            <Grid item xs={12}>
     <PreviewBlock title="Address Details">
  <div>{addressPreview.address1 || "-"}</div>
  <div>{addressPreview.address2 || "-"}</div>
  <div>
    {addressPreview.city || "-"}, {addressPreview.district || "-"}
  </div>
  <div>
    {addressPreview.state || "-"} - {addressPreview.pincode || "-"}
  </div>
</PreviewBlock>


            </Grid>

            <Grid item xs={12}>
              <PreviewBlock title="Income Credentials">
                <div>ID: {income.incomeCredentialId}</div>
                <div>Password: ********</div>
              </PreviewBlock>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Button onClick={goBack}>Back</Button>
          <Button
            sx={{ ml: 2 }}
            variant="contained"
            color="success"
            onClick={submitKyc}
          >
            Confirm & Submit KYC
          </Button>
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: "" })}
      >
        <Alert severity="success">{snackbar.message}</Alert>
      </Snackbar>
    </Paper>
  );
}
