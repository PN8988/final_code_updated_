import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
  Paper,
  MenuItem,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SaveIcon from "@mui/icons-material/Save";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DownloadIcon from "@mui/icons-material/Download";
import { saveAs } from "file-saver";

import axios from "axios";
import { useLocation } from "react-router-dom";

const BankImportLandingPage = () => {
  const location = useLocation();
  const selectedClient = location.state?.selectedClient || {};

  const [clientName, setClientName] = useState(selectedClient?.clientName || "");
  const [panNo, setPanNo] = useState(selectedClient?.panId || "");

  const [bankName, setBankName] = useState(selectedClient?.bankName || "");
  const [accountNumber, setAccountNumber] = useState(selectedClient?.accountNumber || "");

  const [financialYear, setFinancialYear] = useState("");
  const [financialYears, setFinancialYears] = useState([]);

  const [transactions, setTransactions] = useState([]);
  const [manualRows, setManualRows] = useState([]);

  const [activeRow, setActiveRow] = useState(null);
  const [activeField, setActiveField] = useState(null);

  const [pasteMode, setPasteMode] = useState(false);
  const [snack, setSnack] = useState({ open: false, severity: "info", message: "" });

  /** ----------------------- HELPER UTILS ------------------------ */

  const parseExcelDate = (value) => {
    if (!value) return "";
    if (typeof value === "number") return XLSX.SSF.format("yyyy-mm-dd", value);

    if (typeof value === "string") {
      const cleaned = value.trim().replace(/\./g, "-").replace(/\//g, "-");
      const parts = cleaned.split("-");
      if (parts.length === 3) {
        let [d, m, y] = parts;
        if (y.length === 2) y = `20${y}`;
        return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
      }
      const parsed = new Date(cleaned);
      if (!isNaN(parsed)) return parsed.toISOString().split("T")[0];
    }
    return "";
  };

  const getTaxMonth = (dateStr) => {
    const d = new Date(dateStr);
    if (isNaN(d)) return null;
    const month = d.getMonth() + 1;
    const names = [
      "01_April",
      "02_May",
      "03_June",
      "04_July",
      "05_August",
      "06_September",
      "07_October",
      "08_November",
      "09_December",
      "10_January",
      "11_February",
      "12_March",
    ];
    return names[(month + 8) % 12];
  };

  const getRowSource = (rowIndex) => {
    if (rowIndex < manualRows.length) return { type: "manual", index: rowIndex };
    if (rowIndex - manualRows.length < transactions.length)
      return { type: "transaction", index: rowIndex - manualRows.length };
    return { type: "empty", index: rowIndex };
  };

  /** ---------------------- FETCH CLIENT INFO ---------------------- */

  useEffect(() => {
    if (selectedClient?.panId) {
      axios
        .get(`http://localhost:8080/api/clients/${selectedClient.panId}`)
        .then((res) => {
          const data = res.data;
          setClientName(data.clientName || "");
          setBankName(data.bankName || "");
          setAccountNumber(data.accountNumber || "");
        })
        .catch((err) => console.error("Error fetching client info:", err));
    }
  }, [selectedClient]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/financialYear")
      .then((res) => setFinancialYears(res.data))
      .catch((err) => console.error("Error fetching financial years:", err));
  }, []);

  /** ---------------------- EXCEL IMPORT ---------------------- */

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const wb = XLSX.read(evt.target.result, { type: "binary" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const sheetData = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });

      const headerRowIndex = sheetData.findIndex((row) =>
        row.some(
          (cell) =>
            typeof cell === "string" &&
            (cell.toLowerCase().includes("transaction") ||
              cell.toLowerCase().includes("date") ||
              cell.toLowerCase().includes("posting"))
        )
      );

      const tableRows =
        headerRowIndex !== -1 ? sheetData.slice(headerRowIndex + 1) : sheetData;

      const headers =
        headerRowIndex !== -1
          ? sheetData[headerRowIndex].map((h) =>
              h.trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "")
            )
          : [];

      const findColIndex = (keywords) => {
        const normalized = keywords.map((k) =>
          k.trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "")
        );
        return headers.findIndex((h) => normalized.some((keyword) => h.includes(keyword)));
      };

      const idxTrnDate = findColIndex(["transactiondate", "date", "txndate"]);
      const idxPostingDate = findColIndex(["postingdate", "valuedate"]);
      const idxCheckNo = findColIndex(["chequeno", "checkno", "chqno"]);
      const idxDeposit = findColIndex(["deposit", "credit", "cramount", "receipt"]);
      const idxPayment = findColIndex(["payment", "debit", "dramount", "pymt"]);
      const idxBalance = findColIndex(["balance", "closingbalance"]);

      const parsedData = tableRows
        .map((row, i) => {
          const trnDateVal = idxTrnDate !== -1 ? row[idxTrnDate] : "";
          const postingDateVal = idxPostingDate !== -1 ? row[idxPostingDate] : "";

          return {
            id: i + 1,
            taxMonth: getTaxMonth(parseExcelDate(trnDateVal)),
            trnDate: parseExcelDate(trnDateVal),
            postingDate: parseExcelDate(postingDateVal),
            checkNo: idxCheckNo !== -1 ? row[idxCheckNo] : "",
            deposit:
              idxDeposit !== -1
                ? parseFloat(row[idxDeposit].toString().replace(/,/g, "")) || ""
                : "",
            payment:
              idxPayment !== -1
                ? parseFloat(row[idxPayment].toString().replace(/,/g, "")) || ""
                : "",
            balance:
              idxBalance !== -1 ? row[idxBalance].toString().replace(/,/g, "") : "",
          };
        })
        .filter((r) => r.trnDate || r.postingDate || r.deposit || r.payment || r.balance);

      setTransactions(parsedData);
      setSnack({
        open: true,
        severity: "success",
        message: `${parsedData.length} records imported successfully!`,
      });
    };

    reader.readAsBinaryString(file);
  };

  /** ---------------------- HANDLE CELL EDITING ---------------------- */

  const updateCell = (index, field, value) => {
    setManualRows((prev) => {
      const copy = [...prev];

      if (!copy[index]) {
        copy[index] = {
          trnDate: "",
          postingDate: "",
          checkNo: "",
          payment: "",
          deposit: "",
          balance: "",
        };
      }

      copy[index][field] = value;
      return copy;
    });
  };

  /** ----------------------- SAVE TRANSACTIONS ---------------------- */

  const handleSaveTransactions = () => {
    const payload = [...transactions, ...manualRows].map((tx, i) => ({
      importId: i + 1,
      taxMonth: tx.taxMonth,
      trnDate: tx.trnDate,
      postingDate: tx.postingDate,
      checkNo: tx.checkNo,
      deposit: parseFloat(tx.deposit) || 0,
      payment: parseFloat(tx.payment) || 0,
      balance: parseFloat(tx.balance) || 0,
    }));

    axios
      .post("http://localhost:8080/api/bank/import", payload)
      .then(() =>
        setSnack({ open: true, severity: "success", message: "Transactions saved successfully!" })
      )
      .catch(() =>
        setSnack({ open: true, severity: "error", message: "Error saving transactions." })
      );
  };

  /** ----------------------- EXPORT EXCEL ---------------------- */

  const handleExportExcel = () => {
    try {
      const rows = [...transactions, ...manualRows];

      if (!rows.length) {
        alert("No data to export!");
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Bank Transactions");

      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      saveAs(
        new Blob([excelBuffer], { type: "application/octet-stream" }),
        `Bank_Import_${new Date().toISOString().split("T")[0]}.xlsx`
      );
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  /** ----------------------- KEY NAVIGATION ---------------------- */

  const handleKeyNav = (e, rowIndex, field) => {
    const fields = ["trnDate", "postingDate", "checkNo", "payment", "deposit", "balance"];
    const colIndex = fields.indexOf(field);

    if (e.key === "ArrowDown")
      setActiveRow((prev) => Math.min(prev + 1, visibleRows.length - 1));
    if (e.key === "ArrowUp") setActiveRow((prev) => Math.max(prev - 1, 0));
    if (e.key === "ArrowRight" || e.key === "Tab")
      setActiveField(fields[Math.min(colIndex + 1, fields.length - 1)]);
    if (e.key === "ArrowLeft")
      setActiveField(fields[Math.max(colIndex - 1, 0)]);
  };

  /** ----------------------- RENDER ---------------------- */

  const totalRows = Math.max(transactions.length + manualRows.length, 60);

  const visibleRows = [
    ...manualRows,
    ...transactions,
    ...Array.from(
      { length: Math.max(0, totalRows - (manualRows.length + transactions.length)) },
      () => ({
        trnDate: "",
        postingDate: "",
        checkNo: "",
        payment: "",
        deposit: "",
        balance: "",
      })
    ),
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Bank Import
          </Typography>

          {/* ---------------- CLIENT HEADER ---------------- */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={3}>
              <TextField label="PAN" value={panNo} fullWidth size="small" InputProps={{ readOnly: true }} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField label="Client Name" value={clientName} fullWidth size="small" InputProps={{ readOnly: true }} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                select
                label="Financial Year"
                value={financialYear}
                onChange={(e) => setFinancialYear(e.target.value)}
                fullWidth
                size="small"
              >
                {financialYears.map((fy) => (
                  <MenuItem key={fy.yearLabel} value={fy.yearLabel}>
                    {fy.yearLabel}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField label="Bank Name" value={bankName} fullWidth size="small" InputProps={{ readOnly: true }} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Account Number"
                value={accountNumber}
                fullWidth
                size="small"
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>

          {/* ---------------- ACTION BUTTONS ---------------- */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Button component="label" variant="contained" startIcon={<UploadFileIcon />}>
              Import Excel
              <input hidden type="file" accept=".xlsx,.xls" onChange={handleFileImport} />
            </Button>

            <Button
              variant="contained"
              color="success"
              startIcon={<DownloadIcon />}
              onClick={handleExportExcel}
            >
              Export Excel
            </Button>

            <Button variant="contained" color="success" startIcon={<SaveIcon />} onClick={handleSaveTransactions}>
              Save
            </Button>

            <Button
              variant="outlined"
              color={pasteMode ? "warning" : "info"}
              onClick={() => {
                setPasteMode(true);
                setActiveRow(0);
                setActiveField("trnDate");
              }}
            >
              {pasteMode ? "Paste Now (Ctrl+V)" : "Paste From Excel"}
            </Button>
          </Box>

          {/* ---------------- TABLE ---------------- */}
          <Paper variant="outlined" sx={{ maxHeight: 500, overflow: "auto", border: "1px solid #bdbdbd" }}>
            <Table size="small" stickyHeader>
              <TableHead sx={{ backgroundColor: "#f3f3f3" }}>
                <TableRow>
                  <TableCell align="center">Sr</TableCell>
                  <TableCell align="center">FY</TableCell>
                  <TableCell>Tran Date</TableCell>
                  <TableCell>Posting Date</TableCell>
                  <TableCell>Cheque No</TableCell>
                  <TableCell align="right">Payment</TableCell>
                  <TableCell align="right">Deposit</TableCell>
                  <TableCell align="right">Balance</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {visibleRows.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{i + 1}</TableCell>

                    <TableCell align="center">{financialYear || ""}</TableCell>

                    {["trnDate", "postingDate", "checkNo", "payment", "deposit", "balance"].map(
                      (field, fIdx) => (
                        <TableCell key={fIdx}>
                          <input
                            type={field.includes("Date") ? "date" : "text"}
                            value={row[field] || ""}
                            onChange={(e) => updateCell(i, field, e.target.value)}
                            onClick={() => {
                              setActiveRow(i);
                              setActiveField(field);
                            }}
                            onKeyDown={(e) => handleKeyNav(e, i, field)}
                            style={{
                              width: "100%",
                              border: "none",
                              outline: "none",
                              background:
                                activeRow === i && activeField === field
                                  ? "rgba(255,255,0,0.3)"
                                  : "transparent",
                              textAlign:
                                ["payment", "deposit", "balance"].includes(field)
                                  ? "right"
                                  : "left",
                            }}
                          />
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          {/* Snackbar */}
          <Snackbar
            open={snack.open}
            autoHideDuration={4000}
            onClose={() => setSnack({ ...snack, open: false })}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert severity={snack.severity} onClose={() => setSnack({ ...snack, open: false })}>
              {snack.message}
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BankImportLandingPage;

