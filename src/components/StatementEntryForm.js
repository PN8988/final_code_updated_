import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const StatementEntryForm = () => {
  const location = useLocation();
  const { clientName, bankName, accountNumber } = location.state || {};

  const [financialYear, setFinancialYear] = useState("");
  const [rows, setRows] = useState([
    { id: 1, particulars: "April-Statement Opening Balance", yearly: "", monthly: "" },
    { id: 2, particulars: "Transaction Count", yearly: "", monthly: "" },
    { id: 3, particulars: "Receipt Total", yearly: "", monthly: "" },
    // { id: 4, particulars: "Payment Transaction", yearly: "", monthly: "" },
    { id: 4, particulars: "Payment Total", yearly: "", monthly: "" },
    { id: 5, particulars: "Statement Closing Balance", yearly: "", monthly: "" },
  ]);

  const [importedData, setImportedData] = useState([]);

  const handleChange = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleImport = () => {
    alert("Excel import logic here");
  };

  const handleSave = () => {
    alert("Data saved successfully!");
  };

  const handlePostToLedger = () => {
    alert("Posting data to Client Suspense Ledger...");
  };

  const financialYears = ["2022-2023", "2023-2024", "2024-2025", "2025-2026"];

  // ✅ Define all 12 tax months (pairs) for layout
  const taxMonthPairs = [
    ["01_April", "04_July"],
    ["02_May", "05_August"],
    ["03_June", "06_September"],
    ["07_October", "10_January"],
    ["08_November", "11_February"],
    ["09_December", "12_March"],
  ];

  return (
    <Box
      className="container mt-4"
      sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}
    >
      {/* ================= LEFT SIDE: MAIN CONTENT ================= */}
      <Box sx={{ flex: 1 }}>
        <Card className="shadow-lg p-3">
          <CardContent>
            <Typography variant="h5" gutterBottom className="text-center mb-4">
              Statement Data Entry
            </Typography>

            {/* 🔹 Client Details */}
            <Grid container spacing={2} className="mb-4">
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Client Name"
                  value={clientName || ""}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Bank Name"
                  value={bankName || ""}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Account Number"
                  value={accountNumber || ""}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  select
                  label="Financial Year"
                  value={financialYear}
                  onChange={(e) => setFinancialYear(e.target.value)}
                >
                  {financialYears.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            {/* 🔹 Statement Table (Particulars Form) */}
            <TableContainer component={Paper} className="mb-4">
              <Table>
                <TableHead sx={{ backgroundColor: "#1976d2" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white" }} align="center">
                      Sr. No
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="center">
                      Particulars
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="center">
                      Yearly
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="center">
                      Monthly
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell>{row.particulars}</TableCell>
                      <TableCell align="center">
                        <TextField
                          type="number"
                          size="small"
                          value={row.yearly}
                          onChange={(e) =>
                            handleChange(row.id, "yearly", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          type="number"
                          size="small"
                          value={row.monthly}
                          onChange={(e) =>
                            handleChange(row.id, "monthly", e.target.value)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* 🔹 Tax Months Section (New Layout with quarterly separator) */}
            <Box className="border p-3 rounded mb-4">
              <Typography
                variant="h6"
                gutterBottom
                className="text-center text-primary"
              >
                Tax Months and Closing Balances
              </Typography>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ backgroundColor: "#1976d2" }}>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>Tax Month</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        Closing Balance
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>Tax Month</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        Closing Balance
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {taxMonthPairs.map((pair, idx) => (
                      <React.Fragment key={idx}>
                        <TableRow>
                          <TableCell>{pair[0]}</TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              fullWidth
                              label="Closing Balance"
                            />
                          </TableCell>
                          <TableCell>{pair[1]}</TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              fullWidth
                              label="Closing Balance"
                            />
                          </TableCell>
                        </TableRow>

                        {/* 🔸 Divider line after every 3 months (April–June, July–Sept, etc.) */}
                        {(idx + 1) % 3 === 0 && idx !== taxMonthPairs.length - 1 && (
                          <TableRow>
                            <TableCell colSpan={4}>
                              <Divider sx={{ borderBottomWidth: 2, my: 1 }} />
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* 🔹 Imported Data Table */}
            <Typography
              variant="h6"
              className="text-center text-secondary mb-2"
            >
              Imported Transaction Data
            </Typography>
            <TableContainer component={Paper} className="mb-4">
              <Table>
                <TableHead sx={{ backgroundColor: "#0288d1" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>Sr. No</TableCell>
                    <TableCell sx={{ color: "white" }}>FY Year</TableCell>
                    <TableCell sx={{ color: "white" }}>Tax Month</TableCell>
                    <TableCell sx={{ color: "white" }}>Trn Date</TableCell>
                    <TableCell sx={{ color: "white" }}>Posting Date</TableCell>
                    <TableCell sx={{ color: "white" }}>Check No</TableCell>
                    <TableCell sx={{ color: "white" }}>Payment</TableCell>
                    <TableCell sx={{ color: "white" }}>Deposit</TableCell>
                    <TableCell sx={{ color: "white" }}>Bank Balance</TableCell>
                    <TableCell sx={{ color: "white" }}>
                      Posting Ledger Name
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {importedData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={11} align="center">
                        No Imported Data Available
                      </TableCell>
                    </TableRow>
                  ) : (
                    importedData.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{data.financialYear}</TableCell>
                        <TableCell>{data.taxMonth}</TableCell>
                        <TableCell>{data.trnDate}</TableCell>
                        <TableCell>{data.postingDate}</TableCell>
                        <TableCell>{data.checkNo}</TableCell>
                        <TableCell>{data.payment}</TableCell>
                        <TableCell>{data.deposit}</TableCell>
                        <TableCell>{data.bankBalance}</TableCell>
                        <TableCell>{data.ledgerName}</TableCell>
                        <TableCell>
                          <Button size="small" variant="outlined" color="primary">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* 🔹 Action Buttons */}
            <Box className="d-flex justify-content-end gap-3">
              <Button variant="contained" color="secondary" onClick={handleImport}>
                Import
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handlePostToLedger}
              >
                Post to Client Suspense Ledger
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* ================= RIGHT SIDE: FIXED SIDEBAR ================= */}
      <Box
        sx={{
          width: 280,
          position: "sticky",
          top: 100,
          backgroundColor: "#f9fafc",
          borderRadius: 2,
          boxShadow: 3,
          p: 2,
          height: "fit-content",
        }}
      >
        <Typography variant="h6" gutterBottom textAlign="center" color="primary">
          Transaction Type Invoke
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{ mb: 1 }}
          onClick={() => alert("Payment Posting Invoked")}
        >
          Payment Posting
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Receipt Posting Invoked")}
        >
          Receipt Posting
        </Button>
      </Box>
    </Box>
  );
};

export default StatementEntryForm;
