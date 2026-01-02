import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";
import {
  saveBankAccount,
  getBankMasterList,
  getBankByIfsc,
  addBankAccount,
} from "../service/BankService";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const BankForm = ({ onSave, profileId}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedClient = location.state?.selectedClient;

  const [banks, setBanks] = useState([]);
  const [selectedBankDetails, setSelectedBankDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    accountNumber: "",
    // accountHolderName: "",
    accountType: "",
    refund: "",
    nominee: "",
    client: { panId: selectedClient?.panId || "" },
    bankMaster: { ifscCode: "" },
  });


const profile = location.state?.profile;

console.log("Profile received in BankForm:", profile);

 profileId = profile?.profileId;
console.log("ProfileId => ", profileId);
  
//const profileId = location.state?.profileId;

useEffect(() => {
  console.log("Received profileId => ", profileId);
}, []);
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedClient?.panId) {
    alert("⚠️ Client PAN ID is required.");
    return;
  }
  if (!formData.bankMaster.ifscCode) {
    alert("⚠️ Please select a bank (IFSC code).");
    return;
  }
  if (!formData.accountNumber.trim()) {
    alert("⚠️ Account Number is required.");
    return;
  }
  if (!profileId) {
    alert("⚠️ Client Profile ID is missing.");
    return;
  }

  setLoading(true);

  try {
    // ✅ Extract fields from formData to use in payload
    const { accountNumber, accountType, nominee, refund, bankMaster } = formData;
    const accountHolderName = selectedClient?.clientName || ""; // or from formData if editable
    const ifscCode = bankMaster.ifscCode;

    const payload = {
      accountHolderName,
      accountNumber,
      accountType,
      nominee,
      refund,
      bankMaster: { ifscCode },
      profile: { profileId }, // REQUIRED
    };

    // Call backend APIs
    await saveBankAccount(payload);
    await addBankAccount(profileId, payload);

    alert("Bank Account added successfully!");
    navigate("/bank-list", { state: { selectedClient } });
  } catch (err) {
    alert(err.response?.data || "Error adding bank account.");
  } finally {
    setLoading(false);
  }
};


  // ✅ Fetch list of banks
  useEffect(() => {
    getBankMasterList()
      .then((res) => setBanks(res.data || []))
      .catch(() => setBanks([]));
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle IFSC change
  const handleBankChange = async (e) => {
    const ifsc = e.target.value;
    setFormData((prev) => ({
      ...prev,
      bankMaster: { ifscCode: ifsc },
    }));

    if (ifsc) {
      try {
        const res = await getBankByIfsc(ifsc);
        setSelectedBankDetails(res.data);
      } catch (err) {
        console.error("Error fetching bank details", err);
        setSelectedBankDetails(null);
      }
    } else {
      setSelectedBankDetails(null);
    }
  };

  // ✅ Submit form
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!selectedClient?.panId) {
  //     alert("⚠️ Client PAN ID is required.");
  //     return;
  //   }
  //   if (!formData.bankMaster.ifscCode) {
  //     alert("⚠️ Please select a bank (IFSC code).");
  //     return;
  //   }
  //   if (!formData.accountNumber.trim()) {
  //     alert("⚠️ Account Number is required.");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const payload = {
  //       ...formData,
  //       client: { panId: selectedClient.panId },
  //       bankMaster: { ifscCode: formData.bankMaster.ifscCode },
  //     };

  //     const res = await saveBankAccount(payload);
  //     console.log("✅ Bank Account Saved:", res.data);
  //     alert("✅ Bank Account saved successfully!");

  //     if (typeof onSave === "function") onSave();

  //     // Navigate to list after save
  //     navigate("/bank-list", { state: { selectedClient } });
  //   } catch (err) {
  //     console.error("❌ Error saving bank account:", err);
  //     alert(
  //       err.response?.data ||
  //         "An error occurred while saving the bank account."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // ✅ Navigate to Bank List
  const handleViewBanks = () => {
    navigate("/bank-list", { state: { selectedClient } });
  };

  // ✅ Navigate to Bank Import Landing Page
  

  return (
    <Box className="container my-4">
      <Card elevation={4} className="shadow-sm">
        <CardContent>
          {/* 🔹 Client Information */}
          {selectedClient && (
            <Box mb={3}>
              <Typography variant="h6" color="primary" gutterBottom>
                Client Information
              </Typography>
              <Divider />
              <Grid container spacing={2} className="mt-1">
                {[
                  { label: "Client Name", value: selectedClient.clientName },
                  { label: "Email ID", value: selectedClient.emailId },
                  { label: "PAN ID", value: selectedClient.panId },
                  { label: "Mobile", value: selectedClient.mobileNumber },
                ].map((item, i) => (
                  <Grid item xs={12} md={3} key={i}>
                    <Typography variant="body2" fontWeight="bold">
                      {item.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="border rounded p-1 bg-light"
                    >
                      {item.value || "N/A"}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* 🔹 Bank Details */}
          {selectedBankDetails && (
            <Box mb={3}>
              <Typography variant="h6" color="secondary" gutterBottom>
                Bank Details
              </Typography>
              <Divider />
              <Grid container spacing={2} className="mt-1">
                {[
                  { label: "Bank Name", value: selectedBankDetails.bankName },
                  {
                    label: "Manager Email",
                    value: selectedBankDetails.managerEmail,
                  },
                  {
                    label: "Manager Contact",
                    value: selectedBankDetails.managerContact,
                  },
                  {
                    label: "Website",
                    value: selectedBankDetails.bankWebsite,
                  },
                ].map((item, i) => (
                  <Grid item xs={12} md={3} key={i}>
                    <Typography variant="body2" fontWeight="bold">
                      {item.label}
                    </Typography>
                    <Typography className="border rounded p-1 bg-light">
                      {item.value || "N/A"}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* 🔹 Bank Account Entry Form */}
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom color="text.primary">
              Add Bank Account
            </Typography>
            <Divider className="mb-3" />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Account Number"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  size="small"
                />
              </Grid>

              {/* <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Account Holder Name"
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  size="small"
                />
              </Grid> */}

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Account Type"
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value="">Select Type</MenuItem>
                  <MenuItem value="Savings">Savings</MenuItem>
                  <MenuItem value="Current">Current</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Refund"
                  name="refund"
                  value={formData.refund}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value="">Select Option</MenuItem>
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nominee"
                  name="nominee"
                  value={formData.nominee}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Select Bank (IFSC)"
                  value={formData.bankMaster.ifscCode}
                  onChange={handleBankChange}
                  required
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value="">Select Bank</MenuItem>
                  {banks.map((b) => (
                    <MenuItem key={b.ifscCode} value={b.ifscCode}>
                      {b.bankName} ({b.ifscCode})
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            {/* 🔹 Buttons Section */}
            <Box
              mt={3}
              textAlign="center"
              display="flex"
              justifyContent="center"
              gap={2}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                className="px-4 py-2"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                size="medium"
                className="px-4 py-2"
                onClick={handleViewBanks}
              >
                View Bank List
              </Button>

              {/* ✅ New Import Button */}
              
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BankForm;
