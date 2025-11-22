// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./BankList.css";

// const BankList = () => {
//   const [banks, setBanks] = useState([]);
//   const [selectedBankDetails, setSelectedBankDetails] = useState(null);
//   const [uploadModal, setUploadModal] = useState(null);
//   const [uploadFiles, setUploadFiles] = useState({
//     cheque: null,
//     passbook: null,
//     other: null,
//   });
//   const [importFile, setImportFile] = useState(null);
//   const [clientDetails, setClientDetails] = useState(null);
//   const [financialYears, setFinancialYears] = useState([]);
//   const [selectedFinancialYear, setSelectedFinancialYear] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();

//   const clientData = location.state?.clientData || {};
//   const panId =
//     clientData.pan ||
//     location.state?.panId ||
//     location.state?.clientPan ||
//     "ABCDE1234F";

//   useEffect(() => {
//     const fetchFinancialYears = async () => {
//       try {
//         const res = await axios.get("http://localhost:8080/api/financialYear");
//         setFinancialYears(res.data);
//         const active = res.data.find((fy) => fy.active === true);
//         if (active) setSelectedFinancialYear(active.yearLabel);
//       } catch (err) {
//         console.error("Error fetching financial years:", err);
//       }
//     };
//     fetchFinancialYears();
//   }, []);

//   useEffect(() => {
//     if (!panId) return;
//     const fetchClientDetails = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:8080/api/clients/${panId}`
//         );
//         setClientDetails(res.data);
//       } catch (err) {
//         console.error("Error fetching client details:", err);
//       }
//     };
//     fetchClientDetails();
//   }, [panId]);

//   useEffect(() => {
//     if (!panId || !selectedFinancialYear) return;
//     const fetchBanks = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:8080/api/bank/${panId}/${selectedFinancialYear}`
//         );
//         setBanks(res.data);
//       } catch (err) {
//         console.error("Error fetching banks:", err);
//       }
//     };
//     fetchBanks();
//   }, [panId, selectedFinancialYear]);

//   const handleFinancialYearChange = (e) => {
//     setSelectedFinancialYear(e.target.value);
//   };

//   const handleIfscClick = async (ifscCode) => {
//     try {
//       await axios.post(
//         `http://localhost:8080/api/banktransaction/save?pan=${panId}`,
//         {
//           bankName: "HDFC Bank",
//           accountNumber: "1234567890",
//           ifsc: ifscCode,
//           financialYear: selectedFinancialYear,
//         }
//       );
//       alert("Bank details saved successfully!");
//     } catch (err) {
//       console.error("Error saving bank details:", err);
//       alert("Failed to save bank details");
//     }
//   };

//   const handleFileChange = (tab, file) => {
//     setUploadFiles((prev) => ({ ...prev, [tab]: file }));
//   };

//   const handleUploadSubmit = async (bank) => {
//     try {
//       const formData = new FormData();
//       formData.append("accountNumber", bank.accountNumber);
//       if (uploadFiles.cheque) formData.append("cheque", uploadFiles.cheque);
//       if (uploadFiles.passbook) formData.append("passbook", uploadFiles.passbook);
//       if (uploadFiles.other) formData.append("other", uploadFiles.other);

//       await axios.post(
//         "http://localhost:8080/api/residential/uploadBankDocs",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       alert("Documents uploaded successfully!");
//       setUploadModal(null);
//       setUploadFiles({ cheque: null, passbook: null, other: null });
//     } catch (err) {
//       console.error("Error uploading documents:", err);
//       alert("Upload failed!");
//     }
//   };

//   // ✅ Navigate to ImportForm
//   const handleNavigateToImport = () => {
//     navigate("/excelimportexport", {
//       state: {
//         clientData: clientDetails || clientData,
//         financialYear: selectedFinancialYear,
//       },
//     });
//   };

//   const handleNavigateToStatement = (bank) => {
//     navigate("/excelimportexport", {
//       state: {
//         clientData: clientDetails || clientData,
//         bankName: bank.bankName,
//         accountNumber: bank.accountNumber,
//         financialYear: selectedFinancialYear,
//       },
//     });
//   };

//   return (
//     <div className="bank-list-container">
//       {/* ✅ Top Bar */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "15px",
//         }}
//       >
//         <h2 className="bank-list-heading" style={{ margin: 0 }}>
//           Bank List
//         </h2>

//         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <label style={{ fontWeight: "bold", marginRight: "8px" }}>
//             Financial Year:
//           </label>
//           <select
//             value={selectedFinancialYear}
//             onChange={handleFinancialYearChange}
//             style={{
//               padding: "6px 10px",
//               borderRadius: "6px",
//               border: "1px solid #ccc",
//               backgroundColor: "#f9f9f9",
//               fontWeight: "500",
//             }}
//           >
//             <option value="">-- Select --</option>
//             {financialYears.map((fy) => (
//               <option key={fy.id} value={fy.yearLabel}>
//                 {fy.yearLabel}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* ✅ Client Info */}
//       {clientDetails || clientData ? (
//         <div
//           style={{
//             backgroundColor: "#f9f9ff",
//             border: "1px solid #ddd",
//             padding: "15px 20px",
//             borderRadius: "10px",
//             marginBottom: "20px",
//             display: "grid",
//             gridTemplateColumns: "repeat(4, 1fr)",
//             gap: "10px",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//           }}
//         >
//           <div>
//             <strong>Client Name:</strong>
//             <div style={{ color: "#007bff", fontWeight: "600" }}>
//               {clientDetails?.clientName || clientData.fullName || "N/A"}
//             </div>
//           </div>
//           <div>
//             <strong>PAN No:</strong>
//             <div>{clientDetails?.panId || clientData.pan || panId}</div>
//           </div>
//           <div>
//             <strong>Email:</strong>
//             <div>{clientDetails?.emailId || clientData.email || "N/A"}</div>
//           </div>
//           <div>
//             <strong>Mobile:</strong>
//             <div>
//               {clientDetails?.mobileNumber || clientData.mobileNo || "N/A"}
//             </div>
//           </div>
//         </div>
//       ) : null}

//       {/* ✅ Buttons */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "flex-end",
//           gap: "10px",
//           marginBottom: "15px",
//         }}
//       >
//         <button className="btn-add-new" onClick={() => navigate("/bank-form")}>
//           + Add Bank
//         </button>

//         {/* ✅ Updated Import Button */}
//         <button className="btn-import" onClick={handleNavigateToImport}>
//           📁 Import
//         </button>
//       </div>

//       {/* ✅ Bank Table */}
//       <table className="bank-table">
//         <thead>
//           <tr>
//             <th>Sr.No</th>
//             <th>Account Holder Name</th>
//             <th>Account No</th>
//             <th>IFSC</th>
//             <th>Bank Name</th>
//             <th>Email</th>
//             <th>Contact</th>
//             <th>Account Type</th>
//             <th>Refund</th>
//             <th>Nominee</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {banks.length > 0 ? (
//             banks.map((bank, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{bank.accountHolderName}</td>
//                 <td>{bank.accountNumber}</td>
//                 <td
//                   style={{
//                     color: "blue",
//                     cursor: "pointer",
//                     textDecoration: "underline",
//                   }}
//                   onClick={() => handleIfscClick(bank.ifscCode)}
//                 >
//                   {bank.ifscCode}
//                 </td>
//                 <td>{bank.bankName}</td>
//                 <td>{bank.managerEmail}</td>
//                 <td>{bank.managerContact}</td>
//                 <td>{bank.accountType}</td>
//                 <td>{bank.refund}</td>
//                 <td>{bank.nominee}</td>
//                 <td>
//                   <div className="groups-button">
//                     <button className="btns-edit">Edit</button>
//                     <button className="delete-btns">Delete</button>
//                     <button
//                       className="btns-upload"
//                       onClick={() => setUploadModal(bank)}
//                     >
//                       Upload
//                     </button>
//                     <button
//                       className="btns-import"
//                       style={{
//                         backgroundColor: "#007bff",
//                         color: "white",
//                         border: "none",
//                         padding: "5px 10px",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => handleNavigateToStatement(bank)}
//                     >
//                       Import Statement
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="10" style={{ textAlign: "center" }}>
//                 {selectedFinancialYear
//                   ? "No bank records found for this year"
//                   : "Please select a financial year"}
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BankList;

import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const BankList = () => {
  const location = useLocation();
  const selectedClient = location.state?.selectedClient;
  const navigate = useNavigate();
  const [banks, setBanks] = useState([]);
  const [showClientInfo, setShowClientInfo] = useState(true);

  // 🧩 Delete confirmation modal
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [bankToDelete, setBankToDelete] = useState(null);

  useEffect(() => {
    if (selectedClient?.panId) {
      fetchBanks();
    }
  }, [selectedClient]);

  const fetchBanks = () => {
    axios
      .get(`http://localhost:8080/api/bank/getByPan/${selectedClient.panId}`)
      .then((res) => setBanks(res.data))
      .catch((err) => console.error("Error fetching bank list:", err));
  };

  const handleAddBankClick = () => {
    navigate("/bank-form", { state: { selectedClient } });
  };

  const handleBackClick = () => {
    navigate("/clientlist");
  };
const handleImport = (bank) => {
  navigate("/bankimport-form", {
    state: {
      selectedClient: {
        ...selectedClient,
        bankName: bank.bankMaster?.bankName || "",
        accountNumber: bank.accountNumber || "",
      },
    },
  });
};


  const handleEdit = (bank) => {
    navigate("/bank-form", { state: { bank, selectedClient } });
  };

  const handleDelete = (bank) => {
    setBankToDelete(bank);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (!bankToDelete?.bankAccountId) return;
    axios
      .delete(`http://localhost:8080/api/bank/delete/${bankToDelete.bankAccountId}`)
      .then(() => {
        setOpenDeleteDialog(false);
        setBankToDelete(null);
        fetchBanks(); // 🔁 Refresh table after delete
      })
      .catch((err) => {
        console.error("Error deleting bank:", err);
        setOpenDeleteDialog(false);
      });
  };

  const toggleClientInfo = () => {
    setShowClientInfo((prev) => !prev);
  };

  return (
    <Box sx={{ p: 3, position: "relative" }}>
      {/* Sticky Header Buttons */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "#fff",
          pb: 2,
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackClick}
          sx={{ fontWeight: 600 }}
        >
          Back to Client List
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddBankClick}
          sx={{ fontWeight: 600 }}
        >
          + Add Bank
        </Button>
      </Box>

      {/* Collapsible Client Info */}
      {selectedClient && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={toggleClientInfo}
            >
              <Typography variant="h6" gutterBottom>
                Client Information
              </Typography>
              {showClientInfo ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>

            <Collapse in={showClientInfo}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography>
                    <b>Name:</b> {selectedClient.clientName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography>
                    <b>PAN ID:</b> {selectedClient.panId}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography>
                    <b>Email:</b> {selectedClient.emailId}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography>
                    <b>Mobile:</b> {selectedClient.mobileNumber}
                  </Typography>
                </Grid>
              </Grid>
            </Collapse>
          </CardContent>
        </Card>
      )}

      {/* Bank List Table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><b>Sr No</b></TableCell>
              <TableCell><b>Account Number</b></TableCell>
              <TableCell><b>Account Holder</b></TableCell>
              <TableCell><b>Account Type</b></TableCell>
              <TableCell><b>Refund</b></TableCell>
              <TableCell><b>Nominee</b></TableCell>
              <TableCell><b>IFSC</b></TableCell>
              <TableCell><b>Bank Name</b></TableCell>
              <TableCell><b>Manager Email</b></TableCell>
              <TableCell><b>Manager Contact</b></TableCell>
              <TableCell><b>Website</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(banks || []).map((bank, index) => (
              <TableRow key={bank.bankAccountId || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{bank.accountNumber}</TableCell>
                <TableCell>{bank.accountHolderName}</TableCell>
                <TableCell>{bank.accountType}</TableCell>
                <TableCell>{bank.refund}</TableCell>
                <TableCell>{bank.nominee}</TableCell>
                <TableCell>{bank.bankMaster?.ifscCode}</TableCell>
                <TableCell>{bank.bankMaster?.bankName}</TableCell>
                <TableCell>{bank.bankMaster?.managerEmail}</TableCell>
                <TableCell>{bank.bankMaster?.managerContact}</TableCell>
                <TableCell>{bank.bankMaster?.bankWebsite}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(bank)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(bank)} color="error">
                    <DeleteIcon />
                  </IconButton>
                  <Button
                 variant="contained"
                 color="success"
                 size="medium"
                 onClick={() => handleImport(bank)} // ✅ pass bank as argument
                 >
                 Import (Excel)
              </Button>

                </TableCell>
              </TableRow>
            ))}

            {(banks || []).length === 0 && (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  No bank records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this bank record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
         
        </DialogActions>
      </Dialog>
      
    </Box>
  );
};

export default BankList;
