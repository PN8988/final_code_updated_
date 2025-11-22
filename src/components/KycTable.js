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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router-dom";

export default function KycTablePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [submittedData, setSubmittedData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // ✅ Load data from KycForm
  useEffect(() => {
    if (location.state?.kycData) {
      setSubmittedData(location.state.kycData);
    }
  }, [location.state]);

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

  const startIndex = (page - 1) * rowsPerPage;
  const displayedData = submittedData.slice(startIndex, startIndex + rowsPerPage);

  // ✅ Function to create preview URLs for images
  const getFilePreview = (file) => {
    if (!file) return null;
    if (typeof file === "string") return file; // backend URL
    return URL.createObjectURL(file); // local preview
  };

  return (
    <Paper sx={{ p: 3, mt: 3, borderRadius: 2, boxShadow: 3 }}>
      <h3>KYC Data List (With Documents)</h3>

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
            {/* <TableCell>Photo</TableCell> */}
            <TableCell>Aadhaar File</TableCell>
            <TableCell>PAN File</TableCell>
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
                        onChange={(e) =>
                          handleEditChange("name", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editData.pan || ""}
                        onChange={(e) =>
                          handleEditChange("pan", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editData.addhar || ""}
                        onChange={(e) =>
                          handleEditChange("addhar", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editData.email || ""}
                        onChange={(e) =>
                          handleEditChange("email", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editData.mobile || ""}
                        onChange={(e) =>
                          handleEditChange("mobile", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editData.address || ""}
                        onChange={(e) =>
                          handleEditChange("address", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell colSpan={4}>
                      <IconButton
                        color="primary"
                        onClick={() => handleSave(globalIndex)}
                      >
                        <SaveIcon />
                      </IconButton>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.pan}</TableCell>
                    <TableCell>{row.addhar}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.mobile}</TableCell>
                    <TableCell>{row.address}</TableCell>

                    {/* ✅ Document Previews */}
                    {/* <TableCell>
                      {row.photoFile && (
                        <img
                          src={getFilePreview(row.photoFile)}
                          alt="Photo"
                          width={60}
                          height={60}
                          style={{ borderRadius: "6px" }}
                        />
                      )}
                    </TableCell> */}

                    <TableCell>
                      {row.addharFile && (
                        <a
                          href={getFilePreview(row.addharFile)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Aadhaar
                        </a>
                      )}
                    </TableCell>

                    <TableCell>
                      {row.panFile && (
                        <a
                          href={getFilePreview(row.panFile)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View PAN
                        </a>
                      )}
                    </TableCell>

                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(globalIndex)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(globalIndex)}
                      >
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

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(submittedData.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {/* Back Button */}
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/update-kyc")}
        >
          Back to KYC Form
        </Button>
      </Box>
    </Paper>
  );
}
