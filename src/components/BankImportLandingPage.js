// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import {
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   TextField,
//   Typography,
//   Button,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   IconButton,
//   Snackbar,
//   Alert,
//   Paper,
//   Divider,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import SaveIcon from "@mui/icons-material/Save";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import BankImport from "./BankImport";

// const BankImportLandingPage = () => {
//   const location = useLocation();
//   const selectedClient = location.state?.selectedClient || {}; // from BankList import button

//   const [clientName, setClientName] = useState(selectedClient?.clientName ||"");
//   const [panNo, setPanNo] = useState(selectedClient?.panId || "");
//   const [financialYear, setFinancialYear] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [suspenseLedger, setSuspenseLedger] = useState("");

//   const [transactions, setTransactions] = useState([]);
//   const [snack, setSnack] = useState({ open: false, severity: "info", message: "" });

//   // ✅ Fetch client & bank info when page loads or pan changes
//   useEffect(() => {
//     if (selectedClient?.panId) {
//       axios
//         .get(`http://localhost:8080/api/clients/${selectedClient.panId}`)
//         .then((res) => {
//           const data = res.data;
//           setClientName(data.clientName || "");
//           setBankName(selectedClient.bankName || "");
//           setAccountNumber(selectedClient.accountNumber || "");
//           setSnack({ open: true, severity: "success", message: "Client data loaded!" });
//         })
//         .catch((err) => {
//           console.error("Error fetching client info:", err);
//           setSnack({ open: true, severity: "error", message: "Failed to fetch client info." });
//         });
//     }
//   }, [selectedClient, panNo]);

//   // ✅ Utility to safely pick cell values from Excel columns
//   const pickCell = (row, names) => {
//     for (const n of names) {
//       if (row[n] !== undefined) return row[n];
//       const lower = Object.keys(row).find((k) => k?.toLowerCase().trim() === n.toLowerCase());
//       if (lower) return row[lower];
//     }
//     return "";
//   };

//   // ✅ Excel import handler
//   const handleFileImport = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     try {
//       const data = await file.arrayBuffer();
//       const workbook = XLSX.read(data, { type: "array", cellDates: true });
//       const sheet = workbook.Sheets[workbook.SheetNames[0]];
//       const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

//       // Map Excel rows to transaction model
//       const mapped = rows.map((r, i) => ({
//         id: i + 1,
//         fy: financialYear || "",
//         txMonth: "",
//         trnDate: pickCell(r, ["transactionDate", "txn_date", "date"]) || "",
//         postingDate: pickCell(r, ["postingDate", "valueDate"]) || "",
//         chqNo: pickCell(r, ["chequeNo", "chqNo"]) || "",
//         payment: pickCell(r, ["payment", "debit", "withdrawal"]) || "",
//         deposit: pickCell(r, ["deposit", "credit", "receipt"]) || "",
//         bankBalance: pickCell(r, ["balance", "closingBalance", "bankBalance"]) || "",
//         ledgerPostingName: pickCell(r, ["narration", "description", "ledger"]) || "",
//       }));

//       setTransactions(mapped);
//       setSnack({ open: true, severity: "success", message: `Imported ${mapped.length} transactions!` });
//     } catch (error) {
//       console.error("Excel import error:", error);
//       setSnack({ open: true, severity: "error", message: "Failed to import Excel file." });
//     }

//     e.target.value = "";
//   };

//   const handleSave = () => {
//     axios
//       .post("http://localhost:8080/api/bank/import", transactions)
//       .then(() => {
//         setSnack({ open: true, severity: "success", message: "Transactions saved successfully!" });
//       })
//       .catch(() => {
//         setSnack({ open: true, severity: "error", message: "Error saving transactions." });
//       });
//   };

//   return (
//     <Box sx={{ padding: 3, backgroundColor: "#f4f7fa", minHeight: "100vh" }}>
//       <Card elevation={3} sx={{ borderRadius: 3, padding: 2 }}>
//         <BankImport />
//         <CardContent>
//           <Typography variant="h5" sx={{ mb: 2, color: "#1976d2", fontWeight: 700 }}>
//             Bank Import Landing Page
//           </Typography>

//           {/* ✅ CLIENT INFO SECTION */}
//           <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
//             <Grid item xs={12} md={2}>
//               <TextField
//                 fullWidth
//                 label="PAN Number"
//                 value={panNo}
//                 size="small"
//                 InputProps={{ readOnly: true }}
//               />
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <TextField
//                 fullWidth
//                 label="Client Name"
//                 value={clientName}
//                 size="small"
//                 InputProps={{ readOnly: true }}
//               />
//             </Grid>
//             <Grid item xs={12} md={2}>
//               <TextField
//                 fullWidth
//                 label="Financial Year"
//                 value={financialYear}
//                 size="small"
//                 onChange={(e) => setFinancialYear(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <TextField
//                 fullWidth
//                 label="Bank Name"
//                 value={bankName}
//                 size="small"
//                 InputProps={{ readOnly: true }}
//               />
//             </Grid>
//             <Grid item xs={12} md={2}>
//               <TextField
//                 fullWidth
//                 label="Account Number"
//                 value={accountNumber}
//                 size="small"
//                 InputProps={{ readOnly: true }}
//               />
//             </Grid>
//           </Grid>

//           <Divider sx={{ mb: 2 }} />

//           {/* ✅ IMPORT BUTTONS */}
//           <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
//             <Grid item xs={12} md={3}>
//               <TextField
//                 fullWidth
//                 label="Suspense Ledger Name"
//                 value={suspenseLedger}
//                 onChange={(e) => setSuspenseLedger(e.target.value)}
//                 size="small"
//               />
//             </Grid>
//             <Grid item>
//               <Button
//                 component="label"
//                 variant="contained"
//                 startIcon={<UploadFileIcon />}
//                 sx={{ backgroundColor: "#0288d1" }}
//               >
//                 Import XLS
//                 <input hidden type="file" accept=".xlsx,.xls,.csv" onChange={handleFileImport} />
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button
//                 onClick={handleSave}
//                 variant="contained"
//                 color="success"
//                 startIcon={<SaveIcon />}
//               >
//                 Save Import Data
//               </Button>
//             </Grid>
//           </Grid>

//           {/* ✅ TRANSACTION TABLE */}
//           <Typography
//             variant="subtitle1"
//             sx={{ mb: 1, fontWeight: 700, textAlign: "center" }}
//           >
//             Imported Transactions
//           </Typography>
//           <Paper variant="outlined" sx={{ maxHeight: 400, overflow: "auto" }}>
//             <Table size="small" stickyHeader>
//               <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
//                 <TableRow>
//                   <TableCell>Sr.No</TableCell>
//                   <TableCell>FY</TableCell>
//                   <TableCell>Tx.Month</TableCell>
//                   <TableCell>TRN.Date</TableCell>
//                   <TableCell>Posting.Date</TableCell>
//                   <TableCell>Chq.No</TableCell>
//                   <TableCell>Payment</TableCell>
//                   <TableCell>Deposit</TableCell>
//                   <TableCell>Bank.Balance</TableCell>
//                   <TableCell>Ledger.Posting.Name</TableCell>
//                   <TableCell>EDIT</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {transactions.map((row) => (
//                   <TableRow key={row.id}>
//                     <TableCell>{row.id}</TableCell>
//                     {[
//                       "fy",
//                       "txMonth",
//                       "trnDate",
//                       "postingDate",
//                       "chqNo",
//                       "payment",
//                       "deposit",
//                       "bankBalance",
//                       "ledgerPostingName",
//                     ].map((field) => (
//                       <TableCell key={field}>
//                         <TextField
//                           value={row[field] || ""}
//                           size="small"
//                           onChange={(e) => {
//                             const val = e.target.value;
//                             setTransactions((prev) =>
//                               prev.map((t) =>
//                                 t.id === row.id ? { ...t, [field]: val } : t
//                               )
//                             );
//                           }}
//                         />
//                       </TableCell>
//                     ))}
//                     <TableCell>
//                       <IconButton onClick={() => alert(`Edit row ${row.id}`)}>
//                         <EditIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Paper>
//         </CardContent>
//       </Card>

//       <Snackbar
//         open={snack.open}
//         autoHideDuration={2500}
//         onClose={() => setSnack((s) => ({ ...s, open: false }))}
//       >
//         <Alert severity={snack.severity}>{snack.message}</Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default BankImportLandingPage;


// ✅ BankImportLandingPage.jsx

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
import { saveAs } from "file-saver"; // 
import DownloadIcon from "@mui/icons-material/Download"; //

import axios from "axios";
import { useLocation } from "react-router-dom";

const BankImportLandingPage = () => {
  const location = useLocation();
const selectedClient = location.state?.selectedClient || {};

const [bankName, setBankName] = useState(selectedClient?.bankName || "");
const [accountNumber, setAccountNumber] = useState(selectedClient?.accountNumber || "");
const [activeRow, setActiveRow] = useState(null);
const [activeField, setActiveField] = useState(null);


  const [clientName, setClientName] = useState(selectedClient?.clientName || "");
  const [panNo, setPanNo] = useState(selectedClient?.panId || "");
  const [financialYear, setFinancialYear] = useState("");
  // const [bankName, setBankName] = useState(selectedClient?.bankName || "");
  // const [accountNumber, setAccountNumber] = useState(selectedClient?.accountNumber || "");
  const [financialYears, setFinancialYears] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [manualRows, setManualRows] = useState([]);
  const [snack, setSnack] = useState({ open: false, severity: "info", message: "" });

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
      narration: "",
      payment: "",
      deposit: "",
      balance: "",
    })
  ),
];

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
      "01_April", "02_May", "03_June", "04_July",
      "05_August", "06_September", "07_October",
      "08_November", "09_December", "10_January",
      "11_February", "12_March"
    ];
    return names[(month + 8) % 12];
  };
const getRowSource = (rowIndex) => {
  if (rowIndex < manualRows.length) {
    return { type: "manual", index: rowIndex };
  }
  if (rowIndex - manualRows.length < transactions.length) {
    return { type: "transaction", index: rowIndex - manualRows.length };
  }
  return { type: "empty", index: rowIndex };
};

  

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

  const handleFileImport = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();

  reader.onload = (evt) => {
    const wb = XLSX.read(evt.target.result, { type: "binary" });
    const ws = wb.Sheets[wb.SheetNames[0]];

    // ✅ Convert entire sheet into 2D array (for scanning table)
    const sheetData = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });

    // ✅ Try to find header row dynamically by keywords
    const headerRowIndex = sheetData.findIndex((row) =>
      row.some(
        (cell) =>
          typeof cell === "string" &&
          (cell.toLowerCase().includes("transaction") ||
            cell.toLowerCase().includes("date") ||
            cell.toLowerCase().includes("posting"))
      )
    );

    // If header row found, extract actual table rows
    const tableRows =
      headerRowIndex !== -1 ? sheetData.slice(headerRowIndex + 1) : sheetData;

    // Extract headers from header row
    const headers =
      headerRowIndex !== -1
        ? sheetData[headerRowIndex].map((h) =>
            h.trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "")
          )
        : [];

    // Helper: find column index by keywords
    const findColIndex = (keywords) => {
      const normalized = keywords.map((k) =>
        k.trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "")
      );
      return headers.findIndex((h) =>
        normalized.some((keyword) => h.includes(keyword))
      );
    };

    // ✅ Find column indexes automatically
    const idxTrnDate = findColIndex(["transactiondate", "date", "txndate"]);
    const idxPostingDate = findColIndex(["postingdate", "valuedate"]);
    const idxCheckNo = findColIndex(["chequeno", "checkno", "chqno"]);
    const idxNarration = findColIndex(["narration", "description", "particulars"]);
    const idxDeposit = findColIndex(["deposit", "credit", "cramount", "receipt"]);
    const idxPayment = findColIndex(["payment", "debit", "dramount", "pymt"]);
    const idxBalance = findColIndex(["balance", "closingbalance"]);

    // ✅ Parse table rows
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
          narration: idxNarration !== -1 ? row[idxNarration] : "",
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
      .filter(
        (r) =>
          r.trnDate ||
          r.postingDate ||
          r.deposit ||
          r.payment ||
          r.balance ||
          r.narration
      );

    setTransactions(parsedData);
    setSnack({
      open: true,
      severity: "success",
      message: `${parsedData.length} records imported successfully!`,
    });
  };

  reader.readAsBinaryString(file);
};

const handleCellPaste = (e, startRow) => {
  e.preventDefault();

  const pastedData = e.clipboardData.getData("text/plain");
  if (!pastedData) return;

  const rows = pastedData
    .trim()
    .split("\n")
    .map(r => r.split("\t"));

  rows.forEach((cols, rowOffset) => {
    const targetRow = startRow + rowOffset;
    const { type, index } = getRowSource(targetRow);

    let updateRow = {
      trnDate: "",
      postingDate: "",
      checkNo: "",
      narration: "",
      payment: "",
      deposit: "",
      balance: "",
    };

    if (type === "manual") {
      updateRow = { ...manualRows[index], ...updateRow };
    } else if (type === "transaction") {
      updateRow = { ...transactions[index], ...updateRow };
    }

    const fieldOrder = [
      "trnDate",
      "postingDate",
      "checkNo",
      "narration",
      "payment",
      "deposit",
      "balance",
    ];

    cols.forEach((colValue, colIndex) => {
      if (fieldOrder[colIndex]) {
        updateRow[fieldOrder[colIndex]] = colValue.trim();
      }
    });

    if (type === "manual") {
      setManualRows(prev => {
        const copy = [...prev];
        copy[index] = updateRow;
        return copy;
      });
    } else if (type === "transaction") {
      setTransactions(prev => {
        const copy = [...prev];
        copy[index] = updateRow;
        return copy;
      });
    } else {
      // empty row → add into manualRows
      setManualRows(prev => {
        const copy = [...prev];
        copy[index] = updateRow;
        return copy;
      });
    }
  });
};


  const updateCell = (index, field, value) => {
  setManualRows((prev) => {
    let copy = [...prev];

    // Ensure row exists
    if (!copy[index]) {
      copy[index] = {
        trnDate: "",
        postingDate: "",
        checkNo: "",
        narration: "",
        payment: "",
        deposit: "",
        balance: "",
      };
    }

    copy[index][field] = value;
    return copy;
  });
};

  const handleExportExcel = () => {
  try {
    const rows = [...transactions, ...manualRows]; // ✅ define rows properly

    if (!rows || rows.length === 0) {
      alert("No data available to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bank Transactions");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, `Bank_Import_${new Date().toISOString().split("T")[0]}.xlsx`);
  } catch (error) {
    console.error("Error exporting Excel:", error);
  }
};

const handleKeyNav = (e, rowIndex, field) => {
  const fields = ["trnDate", "postingDate", "checkNo", "narration", "payment", "deposit", "balance"];
  const colIndex = fields.indexOf(field);

  switch (e.key) {
    case "ArrowDown":
      setActiveRow((prev) => Math.min(prev + 1, visibleRows.length - 1));
      break;

    case "ArrowUp":
      setActiveRow((prev) => Math.max(prev - 1, 0));
      break;

    case "ArrowRight":
    case "Tab":
      setActiveField(fields[Math.min(colIndex + 1, fields.length - 1)]);
      break;

    case "ArrowLeft":
      setActiveField(fields[Math.max(colIndex - 1, 0)]);
      break;

    case "Enter":
      if (field === "narration") {
        // insert newline inside narration
        updateCell(rowIndex, field, (visibleRows[rowIndex][field] || "") + "\n");
      } else {
        setActiveRow(rowIndex + 1);
      }
      break;

    case "F2":
      // optional: open full-screen editing for narration
      if (field === "narration") {
        const fullText = prompt("Edit narration:", visibleRows[rowIndex][field]);
        if (fullText !== null) updateCell(rowIndex, "narration", fullText);
      }
      break;

    default:
      break;
  }
};

  const handleSaveTransactions = () => {
    const payload = [...transactions, ...manualRows].map((tx, i) => ({
      importId: i + 1,
      taxMonth: tx.taxMonth,
      trnDate: tx.trnDate,
      postingDate: tx.postingDate,
      checkNo: tx.checkNo,
      narration: tx.narration,
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

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Bank Import 
          </Typography>

          {/* --- Client Info Header --- */}
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
                  <MenuItem key={fy.id || fy.yearLabel} value={fy.yearLabel}>
                    {fy.yearLabel}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField label="Bank Name" value={bankName} fullWidth size="small" InputProps={{ readOnly: true }} />
            </Grid>
             <Grid item xs={12} md={3}>
              <TextField label="Account Number" value={accountNumber} fullWidth size="small" InputProps={{ readOnly: true }} />
            </Grid>
          </Grid>

          {/* --- Action Buttons --- */}
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
            <Button variant="contained" color="success" onClick={handleSaveTransactions} startIcon={<SaveIcon />}>
              Save
            </Button>
            <Button variant="outlined" color="info" >
              Paste from Excel
            </Button>
          </Box>

          {/* --- Tally-like Table --- */}
          <Paper variant="outlined" sx={{ maxHeight: 500, overflow: "auto", border: "1px solid #bdbdbd" }}>
            <Table size="small" stickyHeader>
              <TableHead sx={{ backgroundColor: "#f3f3f3" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Sr</TableCell>
                   <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>FY</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Tran Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Posting Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Cheque No</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Narration</TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>Payment</TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>Deposit</TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>Balance</TableCell>
                </TableRow>
              </TableHead>
      <TableBody>
  {visibleRows.map((row, i) => {

    if (!row) {
      row = {
        trnDate: "",
        postingDate: "",
        checkNo: "",
        narration: "",
        payment: "",
        deposit: "",
        balance: "",
      };
    }

    return (
      <TableRow key={i} sx={{ "&:hover": { backgroundColor: "#fafafa" } }}>

        <TableCell align="center">{i + 1}</TableCell>

        <TableCell align="center">
          {financialYear || ""}
        </TableCell>

        {["trnDate", "postingDate", "checkNo", "narration", "payment", "deposit", "balance"].map(
          (field, fIndex) => (
            <TableCell
              key={fIndex}
              sx={{ verticalAlign: "top" }}
              onClick={() => { setActiveRow(i); setActiveField(field); }}
            >
              {field === "narration" ? (
                <textarea
                  rows={1}
                  value={row[field] || ""}
                  onPaste={(e) => handleCellPaste(e, i)}
                  onChange={(e) => updateCell(i, field, e.target.value)}
                  onClick={() => { setActiveRow(i); setActiveField(field); }}
                  onKeyDown={(e) => handleKeyNav(e, i, field)}
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    resize: "none",
                    overflow: "hidden",
                    fontSize: "14px",
                    background:
                      activeRow === i && activeField === field
                        ? "rgba(255, 255, 0, 0.3)"
                        : "transparent",
                  }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                />
              ) : (
                <input
                  type={field.includes("Date") ? "date" : "text"}
                  value={row[field] || ""}
                  onPaste={(e) => handleCellPaste(e, i)}
                  onClick={() => { setActiveRow(i); setActiveField(field); }}
                  onKeyDown={(e) => handleKeyNav(e, i, field)}
                  onChange={(e) => updateCell(i, field, e.target.value)}
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    textAlign:
                      field === "payment" ||
                      field === "deposit" ||
                      field === "balance"
                        ? "right"
                        : "left",
                    background:
                      activeRow === i && activeField === field
                        ? "rgba(255, 255, 0, 0.3)"
                        : "transparent",
                  }}
                />
              )}
            </TableCell>
          )
        )}

      </TableRow>
    );
  })}
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
            <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.severity}>
              {snack.message}
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BankImportLandingPage;
