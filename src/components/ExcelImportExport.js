import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableSortLabel,
} from "@mui/material";
import { utils, writeFile } from "xlsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function ExcelImportExport() {
  const navigate = useNavigate();
  const [banks, setBanks] = useState([]);
  const [totals, setTotals] = useState({ deposit: 0, payment: 0, balance: 0 });
  const [pastedText, setPastedText] = useState("");

  // Header info
  const [clientName] = useState("ABC Client Pvt Ltd");
  const [bankName] = useState("HDFC Bank");
  const [accountNumber] = useState("1234 5678 9012");
  const [financialYear] = useState("2024–2025");

  // Filters
  const [taxMonth, setTaxMonth] = useState("April");
  const [fromMonth, setFromMonth] = useState("April");
  const [toMonth, setToMonth] = useState("March");
  const [openingBalance, setOpeningBalance] = useState("0");
  const [closingBalance, setClosingBalance] = useState("0");
  const [transactionType, setTransactionType] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "postingDate",
    direction: "asc",
  });

  const months = [
    "01_April", "02_May", "03_June", "04_July", "05_August", "06_September",
    "07_October", "08_November", "09_December", "10_January", "11_February", "12_March",
  ];

  // ✅ Calculate totals
  useEffect(() => {
    if (banks.length > 0) {
      const depositTotal = banks.reduce((sum, b) => sum + (parseFloat(b.deposit) || 0), 0);
      const paymentTotal = banks.reduce((sum, b) => sum + (parseFloat(b.payment) || 0), 0);
      const balanceTotal = banks.reduce((sum, b) => sum + (parseFloat(b.balance) || 0), 0);
      setTotals({ deposit: depositTotal, payment: paymentTotal, balance: balanceTotal });
    } else {
      setTotals({ deposit: 0, payment: 0, balance: 0 });
    }
  }, [banks]);

  // ✅ Import Excel
  const handleImportClick = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:8080/api/bank/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("File imported successfully!");
        axios.get("http://localhost:8080/api/bank/list").then((res) => {
          setBanks(res.data);
        });
      })
      .catch((err) => alert("Import failed: " + err.message));
  };

  // ✅ Export Excel

  //"Narration",
  const handleExport = () => {
    const headings = [
      ["ImportId", "TaxMonth", "Posting Date", "Check No",  "Deposit", "Payment", "Balance"],
    ];
    const ws = utils.json_to_sheet(banks);
    utils.sheet_add_aoa(ws, headings, { origin: "A1" });
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "Bank_Report.xlsx");
  };

  // ✅ Paste
  const handlePaste = (e) => {
    const text = e.clipboardData.getData("Text");
    setPastedText(text);
    const rows = text.trim().split("\n");
    const parsed = rows.map((row) => {
      const cols = row.split("\t");
      return {
        importId: cols[0] || "",
        taxMonth: cols[1] || "",
        postingDate: cols[2] || "",
        checkNo: cols[3] || "",
        narration: cols[4] || "",
        deposit: cols[5] || "",
        payment: cols[6] || "",
        balance: cols[7] || "",
      };
    });
    if (parsed.length > 0) {
      setBanks(parsed);
      alert("Pasted data added successfully!");
    }
  };

  // ✅ Sorting
  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const sortedBanks = [...banks].sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];
    if (sortConfig.key === "postingDate") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    } else if (sortConfig.key === "payment" || sortConfig.key === "deposit") {
      aValue = parseFloat(aValue) || 0;
      bValue = parseFloat(bValue) || 0;
    }
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // ✅ Filter by transaction type
  const filteredBanks = sortedBanks.filter((b) => {
    if (transactionType === "Payments") return parseFloat(b.payment) > 0;
    if (transactionType === "Receipts") return parseFloat(b.deposit) > 0;
    return true;
  });

  // ✅ Navigate to Statement Entry Form
  const handleNavigateToStatementEntry = () => {
    navigate("/statement-entry", {
      state: { clientName, bankName, accountNumber },
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* ===== Header Info ===== */}
      <Card sx={{ mb: 3, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1"><b>Client Name:</b> {clientName}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1"><b>Bank Name:</b> {bankName}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1"><b>Account No:</b> {accountNumber}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1"><b>Financial Year:</b> {financialYear}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* ===== Filters ===== */}
      <Card sx={{ mb: 3, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Tax Month</InputLabel>
                <Select value={taxMonth} onChange={(e) => setTaxMonth(e.target.value)}>
                  {months.map((m) => (
                    <MenuItem key={m} value={m}>{m}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>From</InputLabel>
                <Select value={fromMonth} onChange={(e) => setFromMonth(e.target.value)}>
                  {months.map((m) => (
                    <MenuItem key={m} value={m}>{m}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>To</InputLabel>
                <Select value={toMonth} onChange={(e) => setToMonth(e.target.value)}>
                  {months.map((m) => (
                    <MenuItem key={m} value={m}>{m}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Opening Balance"
                type="number"
                value={openingBalance}
                onChange={(e) => setOpeningBalance(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Closing Balance"
                type="number"
                value={closingBalance}
                onChange={(e) => setClosingBalance(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Transaction Type</InputLabel>
                <Select
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Payments">Payments</MenuItem>
                  <MenuItem value="Receipts">Receipts</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* ===== Import / Export Buttons ===== */}
      <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
        <Button variant="contained" component="label" color="primary">
          Import Excel
          <input type="file" accept=".xls,.xlsx" onChange={handleImportClick} hidden />
        </Button>
        <Button variant="outlined" color="success" onClick={handleExport}>
          Export Excel
        </Button>
        {/* 🔹 NEW Import Tab Button */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleNavigateToStatementEntry}
        >
          Import Tab ➜
        </Button>
      </Box>

      {/* ===== Paste Box ===== */}
      <Card sx={{ mb: 3, p: 2, boxShadow: 2 }}>
        <Typography variant="subtitle1" gutterBottom><b>Paste Excel Data (Ctrl + V)</b></Typography>
        <TextField
          placeholder="Copy rows from Excel and paste here..."
          fullWidth
          multiline
          rows={5}
          onPaste={handlePaste}
        />
      </Card>

      {/* ===== Table ===== */}
      <Paper sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f4f4f4" }}>
            <TableRow>
              <TableCell>Sr. No</TableCell>
              <TableCell>Import ID</TableCell>
              <TableCell>Tax Month</TableCell>
              <TableCell>Posting Date</TableCell>
              <TableCell>Check No</TableCell>
              {/* <TableCell>Narration</TableCell> */}
              <TableCell>Deposit</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Balance</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredBanks.length > 0 ? (
              <>
                {filteredBanks.map((bank, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{bank.importId}</TableCell>
                    <TableCell>{bank.taxMonth}</TableCell>
                    <TableCell>{bank.postingDate}</TableCell>
                    <TableCell>{bank.checkNo}</TableCell>
                    {/* <TableCell>{bank.narration}</TableCell> */}
                    <TableCell>{bank.deposit}</TableCell>
                    <TableCell>{bank.payment}</TableCell>
                    <TableCell>{bank.balance}</TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No Data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default ExcelImportExport;
