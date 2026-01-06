


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
import IncomeCredentialsForm from "./IncomeCredentialsForm";
export default function KycForm({ userId, client, onNext }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSave, setIsSave] = useState(false);
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

    const handleNext = () => {
  if (!isSave) {
    setSnackbar({
      open: true,
      message: "Please save basic info before continuing",
      severity: "warning",
    });
    return;
  }

  if (onNext) {
    onNext(); // move to next step
  }
};
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

setIsSave(true);          // ✅ ADD THIS
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
//   const submitKyc = async () => {
//   try {
//     await axios.post(
//       `http://localhost:8080/api/kyc/final-submit/${userId}`
//     );

//     setSnackbar({
//       open: true,
//       message: "KYC completed successfully",
//     });

//     navigate("/kyc-table");
//   } catch (err) {
//     alert(err?.response?.data || "Error submitting KYC");
//   }
// };

/* ================= FINAL SUBMIT (NO API) ================= */
const submitKyc = () => {
  // Just show success message
  setSnackbar({
    open: true,
    message: "KYC submitted successfully",
  });

  // Optional redirect after short delay
  setTimeout(() => {
    navigate("/kyc-table"); // remove if you don't want redirect
  }, 1500);
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
            <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ mt: 1 }}
                  onClick={handleNext}
                >
                  Next
                </Button>
          </Grid>
        </Grid>
      )}

      {/* ================= STEP 1 ================= */}
      {activeStep === 1 && (
   <AddressComponent
  userId={userId}
  onSuccess={(address) => {
    setAddressPreview(address);
    setAddressCompleted(true);   // ✅ ADD
  }}
  onNext={() => setActiveStep((prev) => prev + 1)}
/>



      )}

      {/* ================= STEP 2 ================= */}
      {activeStep === 2 && (
       <IncomeCredentialsForm
  userId={userId}
  onSave={() => console.log("Income saved")}
/>

        //   <Grid item xs={6}>
        //     <TextField
        //       fullWidth
        //       type="password"
        //       label="Income Credential Password"
        //       value={income.incomeCredentialPassword}
        //       onChange={(e) =>
        //         setIncome({
        //           ...income,
        //           incomeCredentialPassword: e.target.value,
        //         })
        //       }
        //     />
        //   </Grid>
        //   <Grid item xs={12}>
        //     <Button variant="contained" onClick={saveIncomeKyc}>
        //       Save & Continue
        //     </Button>
        //   </Grid>
        // </Grid>
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
  disabled={!(basicCompleted && addressCompleted && incomeCompleted)}
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
