import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  MenuItem,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ImportForm = () => {
  const location = useLocation();
  const clientData = location.state?.clientData || {};

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [suspenseLedger, setSuspenseLedger] = useState("");
  const [ledgerList, setLedgerList] = useState([]);
  const [file, setFile] = useState(null);
  const [accountHolderName, setAccountHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // ✅ Fetch ledger names
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/ledger/getAllLedgers")
      .then((res) => setLedgerList(res.data))
      .catch((err) => console.error("Error fetching ledgers:", err));
  }, []);

  // ✅ Fetch bank details (account holder name + bank name)
  useEffect(() => {
    if (clientData.pan) {
      axios
        .get(`http://localhost:8080/api/bank/getByPan/${clientData.pan}`)
        .then((res) => {
          if (res.data) {
            setAccountHolderName(res.data.accountHolderName || "");
            setBankName(res.data.bankName || "");
          }
        })
        .catch((err) => console.error("Error fetching bank details:", err));
    }
  }, [clientData.pan]);

  // ✅ Auto-select Suspense Ledger based on fetched bank name
  useEffect(() => {
    if (bankName && ledgerList.length > 0) {
      const matchedLedger = ledgerList.find((ledger) =>
        ledger.ledgerName.toLowerCase().includes(bankName.toLowerCase())
      );
      if (matchedLedger) {
        setSuspenseLedger(matchedLedger.ledgerName);
      }
    }
  }, [bankName, ledgerList]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  // ✅ Handle Import
  const handleImport = async (e) => {
    e.preventDefault();

    if (!file || !fromDate || !toDate || !suspenseLedger) {
      showSnackbar("⚠️ Please fill all required fields!", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fromDate", fromDate);
    formData.append("toDate", toDate);
    formData.append("ledgerName", suspenseLedger);
    formData.append("clientPan", clientData.pan || "");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/import/bank-data",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      showSnackbar("✅ Import completed successfully!", "success");
      console.log("Import response:", response.data);
    } catch (error) {
      console.error("Error importing data:", error);
      showSnackbar("❌ Import failed! Please check the file or server.", "error");
    }
  };

  return (
    <Box
      className="container-fluid"
      sx={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <Card elevation={5} sx={{ borderRadius: 3 }}>
        <CardContent>
          {/* Page Header */}
          <Typography
            variant="h5"
            className="text-center mb-3"
            sx={{
              fontWeight: 700,
              color: "#1976d2",
              letterSpacing: "0.5px",
            }}
          >
            📥 Import Bank Data
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* Client & Bank Details */}
          <Box
            className="bg-light p-3 rounded-3 mb-4"
            sx={{
              borderLeft: "5px solid #1976d2",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Client Name:{" "}
                  <span style={{ color: "#1976d2" }}>
                    {clientData.clientName || "Unknown Client"}
                  </span>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  PAN: {clientData.pan || "N/A"}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Account Holder:{" "}
                  <span style={{ color: "#1976d2" }}>
                    {accountHolderName || "N/A"}
                  </span>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Bank: {bankName || "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Import Form */}
          <form onSubmit={handleImport}>
            <Grid container spacing={3}>
              {/* From Date */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="From Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  required
                />
              </Grid>

              {/* To Date */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="To Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  required
                />
              </Grid>

              {/* Suspense Ledger */}
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="Suspense Ledger Name"
                  fullWidth
                  value={suspenseLedger}
                  onChange={(e) => setSuspenseLedger(e.target.value)}
                  required
                >
                  <MenuItem value="">-- Select Ledger --</MenuItem>
                  {ledgerList.map((ledger, index) => (
                    <MenuItem key={index} value={ledger.ledgerName}>
                      {ledger.ledgerName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* File Upload */}
              <Grid item xs={12} md={6}>
                <div className="d-flex align-items-center gap-3">
                  <input
                    type="file"
                    accept=".csv, .xlsx"
                    className="form-control"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </Grid>

              {/* Buttons */}
              <Grid item xs={12} className="text-center mt-3">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    px: 4,
                    py: 1.2,
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Import
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    ml: 2,
                    px: 4,
                    py: 1.2,
                    borderRadius: 3,
                    textTransform: "none",
                  }}
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ImportForm;
