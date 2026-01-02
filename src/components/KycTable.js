import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  IconButton,
  Button,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function KycTable() {
  const location = useLocation();
  const navigate = useNavigate();

  const [submittedData, setSubmittedData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [page, setPage] = useState(1);
  const [addressDialog, setAddressDialog] = useState({ open: false, address: {} });
  const rowsPerPage = 10;

  const userId = location.state?.userId;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/kyc/allKyc")
      .then((res) => setSubmittedData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData({ ...submittedData[index] });
  };

  const handleSave = (index) => {
    const updated = [...submittedData];
    updated[index] = editData;
    setSubmittedData(updated);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updated = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updated);
  };

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleViewAddress = (address) => {
    setAddressDialog({ open: true, address });
  };

  const handleCloseAddressDialog = () => {
    setAddressDialog({ open: false, address: {} });
  };

  const startIndex = (page - 1) * rowsPerPage;
  const displayedData = submittedData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const getFilePreview = (file) => {
    if (!file) return null;
    if (typeof file === "string") return `http://localhost:8080/${file}`;
    return URL.createObjectURL(file);
  };

  return (
    <Paper sx={{ p: 3, mt: 3, borderRadius: 2, boxShadow: 3 }}>
      <h3>KYC Data List</h3>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sr No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>PAN</TableCell>
            <TableCell>AADHAR</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Aadhaar File</TableCell>
            <TableCell>PAN File</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {displayedData.map((row, i) => {
            const globalIndex = startIndex + i;
            return (
              <TableRow key={globalIndex}>
                <TableCell>{globalIndex + 1}</TableCell>

                {editIndex === globalIndex ? (
                  <>
                    <TableCell>
                      <TextField
                        value={editData.name || ""}
                        onChange={(e) => handleEditChange("name", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editData.panNumber || ""}
                        onChange={(e) => handleEditChange("pan", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editData.aadhaarNumber || ""}
                        onChange={(e) => handleEditChange("aadhaarNumber", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editData.email || ""}
                        onChange={(e) => handleEditChange("email", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editData.mobileNumber || ""}
                        onChange={(e) => handleEditChange("mobileNumber", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editData.address || ""}
                        onChange={(e) => handleEditChange("address", e.target.value)}
                      />
                    </TableCell>
                    <TableCell colSpan={3}>
                      <IconButton color="primary" onClick={() => handleSave(globalIndex)}>
                        <SaveIcon />
                      </IconButton>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.panNumber}</TableCell>
                    <TableCell>{row.aadhaarNumber}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.mobileNumber}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewAddress(row.addressObject || {})}
                      >
                        View Address
                      </Button>
                    </TableCell>
                    <TableCell>
                      {row.aadhaarFilePath && (
                        <a
                          href={getFilePreview(row.aadhaarFilePath)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Aadhaar
                        </a>
                      )}
                    </TableCell>
                    <TableCell>
                      {row.panFilePath && (
                        <a
                          href={getFilePreview(row.panFilePath)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View PAN
                        </a>
                      )}
                    </TableCell>
                    <TableCell>
                      {row.kycCompleted ? (
                        <span style={{ color: "green", fontWeight: "bold" }}>✔ Completed</span>
                      ) : (
                        <span style={{ color: "orange", fontWeight: "bold" }}>Pending</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEdit(globalIndex)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(globalIndex)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(submittedData.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button variant="contained" color="secondary" onClick={() => navigate("/update-kyc")}>
          Back to KYC Form
        </Button>
      </Box>

      {/* ================= Address Dialog ================= */}
      <Dialog open={addressDialog.open} onClose={handleCloseAddressDialog} fullWidth maxWidth="sm">
        <DialogTitle>Saved Address</DialogTitle>
        <DialogContent>
          {addressDialog.address ? (
            <>
              <Typography><b>Line 1:</b> {addressDialog.address.address1 || "-"}</Typography>
              <Typography><b>Line 2:</b> {addressDialog.address.address2 || "-"}</Typography>
              <Typography><b>City:</b> {addressDialog.address.city || "-"}</Typography>
              <Typography><b>District:</b> {addressDialog.address.district || "-"}</Typography>
              <Typography><b>State:</b> {addressDialog.address.state || "-"}</Typography>
              <Typography><b>Pincode:</b> {addressDialog.address.pincode || "-"}</Typography>
            </>
          ) : (
            <Typography>No address found</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddressDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
