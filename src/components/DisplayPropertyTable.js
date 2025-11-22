import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Tooltip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Refresh as RefreshIcon,
  HomeWork as HomeWorkIcon,
} from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DisplayPropertyTable.css";

const DisplayPropertyTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { client, propertyList: passedPropertyList } = location.state || {};

  const [properties, setProperties] = useState(passedPropertyList || []);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch All Properties by PAN
  const fetchProperties = async () => {
    if (!client?.panId) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/residential/pan/${client.panId}`
      );
      setProperties(res.data || []);
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [client?.panId]);

  // ✅ Handle Delete
  const handleDelete = async (assetId) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/residential/delete/${assetId}`);
      alert("✅ Property deleted successfully.");
      fetchProperties(); // refresh table
    } catch (error) {
      if (error.response?.status === 409) {
        alert("❌ Property cannot be deleted because agreements exist.");
      } else {
        alert("⚠️ Error deleting property.");
      }
      console.error("Error deleting property:", error);
    }
  };

  // ✅ Handle Edit
  const handleEdit = (property) => {
    navigate("/addresidentialprop", {
      state: { client: client, propertyData: property, mode: "edit" },
    });
  };

  // ✅ Loader
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  // ✅ No Data Case
  if (!properties.length) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h5" gutterBottom>
          No Property Data Available
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box className="container-fluid mt-4 mb-5">
      <Card elevation={5} sx={{ borderRadius: 3 }}>
        <CardContent>
          {/* Header Section */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            mb={3}
          >
            <Typography variant="h5" fontWeight="bold" color="primary">
              <HomeWorkIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              Residential Property Details
            </Typography>

            <Box display="flex" gap={1}>
              <Tooltip title="Refresh Data">
                <IconButton color="secondary" onClick={fetchProperties}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </Box>
          </Box>

          {/* Table Section */}
          <div className="table-responsive">
            <Table className="table table-striped table-hover align-middle shadow-sm">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976d2" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Asset ID</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Ledger Name</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Unit No</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Building Name</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Street</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>City</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>State</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Pincode</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Country</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Occupancy</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {properties.map((property, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell>{property.assetId}</TableCell>
                    <TableCell>{property.ledgerId}</TableCell>
                    <TableCell>{property.unitNo}</TableCell>
                    <TableCell>{property.buildingName}</TableCell>
                    <TableCell>{property.street}</TableCell>
                    <TableCell>{property.city}</TableCell>
                    <TableCell>{property.state}</TableCell>
                    <TableCell>{property.pincode}</TableCell>
                    <TableCell>{property.country}</TableCell>
                    <TableCell>{property.occupancy}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit Property">
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(property)}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Property">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(property.assetId)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Box mt={3} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              Back to Client
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DisplayPropertyTable;
