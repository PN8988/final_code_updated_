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
import DownloadIcon from "@mui/icons-material/Download";
import { saveAs } from "file-saver";

import axios from "axios";
import { useLocation } from "react-router-dom";

const DematImportLandingPage = () => {
 const location = useLocation();

// ✅ FIX: correct key name (clientDetails — not ClientDetails)
const clientDetails = location.state?.clientDetails || {};

// ✅ FIX: panId must come from clientDetails
//const panId = clientDetails.pan || clientDetails.panId || "";

// Already existing selectedDemat
const selectedDemat = location.state?.selectedDemat || {};

const [clientName, setClientName] = useState(clientDetails?.clientName || "");
const [panId, setPanId] = useState(clientDetails?.panId || "");

// From backend if available
const [dematAccountNo, setDematAccountNo] = useState(clientDetails.dematAccountNo || "");
const [dpName, setDpName] = useState(clientDetails.dpName || "");


  const [financialYear, setFinancialYear] = useState("");
  const [financialYears, setFinancialYears] = useState([]);

  const [transactions, setTransactions] = useState([]);
  const [manualRows, setManualRows] = useState([]);

  const [activeRow, setActiveRow] = useState(null);
  const [activeField, setActiveField] = useState(null);

  const [pasteMode, setPasteMode] = useState(false);
  const [snack, setSnack] = useState({ open: false, severity: "info", message: "" });

  /** ----------------------- HELPERS ------------------------ */

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

  /** ---------------------- FETCH CLIENT INFO / FY ---------------------- */

  useEffect(() => {
    if (clientDetails?.panId) {
      axios
        .get(`http://localhost:8080/api/clients/${clientDetails.panId}`)
        .then((res) => {
          const data = res.data;
          setClientName(data.clientName || "");
          setDematAccountNo(data.dematAccountNo || "");
          setDpName(data.dpName || "");
        })
        .catch((err) => console.error("Error fetching client info:", err));
    }
  }, [clientDetails]);

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

      // find header row by looking for typical demat/trade column keywords
      const headerRowIndex = sheetData.findIndex((row) =>
        row.some(
          (cell) =>
            typeof cell === "string" &&
            (cell.toLowerCase().includes("trade") ||
              cell.toLowerCase().includes("settle") ||
              cell.toLowerCase().includes("isin") ||
              cell.toLowerCase().includes("quantity"))
        )
      );

      const tableRows =
        headerRowIndex !== -1 ? sheetData.slice(headerRowIndex + 1) : sheetData;

      const headers =
        headerRowIndex !== -1
          ? sheetData[headerRowIndex].map((h) =>
              h.toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "")
            )
          : [];

      const findColIndex = (keywords) => {
        const normalized = keywords.map((k) =>
          k.toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "")
        );
        return headers.findIndex((h) => normalized.some((keyword) => h.includes(keyword)));
      };

      // try to detect columns commonly found in demat/trade exports
      const idxTradeDate = findColIndex(["tradedate", "trade", "transactiondate", "date"]);
      const idxSettleDate = findColIndex(["settlementdate", "settledate", "value date"]);
      const idxISIN = findColIndex(["isin", "security", "symbol"]);
      const idxTxnType = findColIndex(["type", "transactiontype", "txn", "trade type", "action"]);
      const idxQty = findColIndex(["quantity", "qty", "no.ofshares", "shares"]);
      const idxPrice = findColIndex(["price", "rate", "tranprice"]);
      const idxValue = findColIndex(["value", "amount", "turnover"]);
      const idxBalance = findColIndex(["balance", "holding", "closingbalance"]);

      const parsedData = tableRows
        .map((row, i) => {
          const tradeDateVal = idxTradeDate !== -1 ? row[idxTradeDate] : "";
          const settleDateVal = idxSettleDate !== -1 ? row[idxSettleDate] : "";

          const qtyRaw = idxQty !== -1 ? row[idxQty] : "";
          const priceRaw = idxPrice !== -1 ? row[idxPrice] : "";
          const valueRaw = idxValue !== -1 ? row[idxValue] : "";

          return {
            id: i + 1,
            taxMonth: getTaxMonth(parseExcelDate(tradeDateVal)),
            tradeDate: parseExcelDate(tradeDateVal),
            settleDate: parseExcelDate(settleDateVal),
            isin: idxISIN !== -1 ? row[idxISIN] : "",
            txnType: idxTxnType !== -1 ? row[idxTxnType] : "",
            quantity: qtyRaw !== "" ? parseFloat(qtyRaw.toString().replace(/,/g, "")) || "" : "",
            price: priceRaw !== "" ? parseFloat(priceRaw.toString().replace(/,/g, "")) || "" : "",
            value: valueRaw !== "" ? parseFloat(valueRaw.toString().replace(/,/g, "")) || "" : "",
            balance: idxBalance !== -1 ? row[idxBalance].toString().replace(/,/g, "") : "",
          };
        })
        .filter((r) => r.tradeDate || r.settleDate || r.isin || r.quantity || r.value || r.balance);

      setTransactions(parsedData);
      setSnack({
        open: true,
        severity: "success",
        message: `${parsedData.length} demat records imported successfully!`,
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
          tradeDate: "",
          settleDate: "",
          isin: "",
          txnType: "",
          quantity: "",
          price: "",
          value: "",
          balance: "",
        };
      }
      copy[index][field] = value;
      return copy;
    });
  };

  /** ----------------------- SAVE TRANSACTIONS ---------------------- */

  const handleSaveTransactions = () => {
    const rows = [...transactions, ...manualRows].map((tx, i) => ({
      importId: i + 1,
      pan: panId,
      dematAccountNo,
      dpName,
      taxMonth: tx.taxMonth,
      tradeDate: tx.tradeDate,
      settleDate: tx.settleDate,
      isin: tx.isin,
      txnType: tx.txnType,
      quantity: parseFloat(tx.quantity) || 0,
      price: parseFloat(tx.price) || 0,
      value: parseFloat(tx.value) || 0,
      balance: parseFloat(tx.balance) || 0,
      financialYear: financialYear || "",
    }));

    axios
      .post("http://localhost:8080/api/demat/import", rows)
      .then(() =>
        setSnack({ open: true, severity: "success", message: "Demat transactions saved successfully!" })
      )
      .catch((err) => {
        console.error("save error", err);
        setSnack({ open: true, severity: "error", message: "Error saving demat transactions." });
      });
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
      XLSX.utils.book_append_sheet(workbook, worksheet, "Demat Transactions");

      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      saveAs(
        new Blob([excelBuffer], { type: "application/octet-stream" }),
        `Demat_Import_${new Date().toISOString().split("T")[0]}.xlsx`
      );
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  /** ----------------------- KEY NAVIGATION ---------------------- */

  const handleKeyNav = (e, rowIndex, field) => {
    const fields = [
      "tradeDate",
      "settleDate",
      "isin",
      "txnType",
      "quantity",
      "price",
      "value",
      "balance",
    ];
    const colIndex = fields.indexOf(field);

    if (e.key === "ArrowDown") setActiveRow((prev) => Math.min(prev + 1, visibleRows.length - 1));
    if (e.key === "ArrowUp") setActiveRow((prev) => Math.max(prev - 1, 0));
    if (e.key === "ArrowRight" || e.key === "Tab")
      setActiveField(fields[Math.min(colIndex + 1, fields.length - 1)]);
    if (e.key === "ArrowLeft") setActiveField(fields[Math.max(colIndex - 1, 0)]);
  };

  /** ----------------------- RENDER ---------------------- */

  const totalRows = Math.max(transactions.length + manualRows.length, 60);

  const visibleRows = [
    ...manualRows,
    ...transactions,
    ...Array.from(
      { length: Math.max(0, totalRows - (manualRows.length + transactions.length)) },
      () => ({
        tradeDate: "",
        settleDate: "",
        isin: "",
        txnType: "",
        quantity: "",
        price: "",
        value: "",
        balance: "",
      })
    ),
  ];

  return (
  <Box sx={{ p: 3 }}>
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Demat Import
        </Typography>

        {/* {clientDetails ? (
          <div>
            <p><b>Name:</b> {clientDetails.name}</p>
            <p><b>PAN:</b> {clientDetails.pan}</p>
            <p><b>Email:</b> {clientDetails.email}</p>
          </div>
        ) : (
          <p style={{ color: "red" }}>❌ No client details received!</p>
        )} */}

     
    
  


          {/* ---------------- CLIENT HEADER ---------------- */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={3}>
              <TextField label="PAN" value={panId} fullWidth size="small" InputProps={{ readOnly: true }} />
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
              <TextField label="Demat A/c No" value={dematAccountNo} fullWidth size="small" InputProps={{ readOnly: true }} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField label="DP Name" value={dpName} fullWidth size="small" InputProps={{ readOnly: true }} />
            </Grid>
          </Grid>

          {/* ---------------- ACTION BUTTONS ---------------- */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Button component="label" variant="contained" startIcon={<UploadFileIcon />}>
              Import Excel
              <input hidden type="file" accept=".xlsx,.xls" onChange={handleFileImport} />
            </Button>

            <Button variant="contained" color="success" startIcon={<DownloadIcon />} onClick={handleExportExcel}>
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
                setActiveField("tradeDate");
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
                  <TableCell>Trade Date</TableCell>
                  <TableCell>Settle Date</TableCell>
                  <TableCell>ISIN / Security</TableCell>
                  <TableCell>Txn Type</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Value</TableCell>
                  <TableCell align="right">Balance</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {visibleRows.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{i + 1}</TableCell>

                    <TableCell align="center">{financialYear || ""}</TableCell>

                    {[
                      "tradeDate",
                      "settleDate",
                      "isin",
                      "txnType",
                      "quantity",
                      "price",
                      "value",
                      "balance",
                    ].map((field, fIdx) => (
                      <TableCell key={fIdx}>
                        <input
                          type={field.toLowerCase().includes("date") ? "date" : "text"}
                          value={row[field] !== undefined ? row[field] : ""}
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
                              activeRow === i && activeField === field ? "rgba(255,255,0,0.3)" : "transparent",
                            textAlign: ["quantity", "price", "value", "balance"].includes(field) ? "right" : "left",
                          }}
                        />
                      </TableCell>
                    ))}
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

export default DematImportLandingPage;
