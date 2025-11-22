import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Paper,
  InputLabel,
  Select,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeMasterForm = () => {
  const [formData, setFormData] = useState({
    empId: "",
    empName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    status: "Active",
  });

  const [departments, setDepartments] = useState([
    "Finance",
    "Accounts",
    "HR",
    "IT",
    "Operations",
    "Taxation",
    "Auditing",
    "Client Relations",
    "Consulting",
    "Compliance",
  ]);

  const [designations, setDesignations] = useState([
    "Manager",
    "Executive",
    "Analyst",
    "Assistant",
    "Senior Consultant",
    "Junior Consultant",
    "Account Officer",
    "Finance Head",
    "Audit Associate",
    "Tax Advisor",
  ]);

  const fetchNextEmpId = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/employees/nextEmpId");
      setFormData((prev) => ({ ...prev, empId: res.data }));
    } catch (err) {
      toast.error("Failed to fetch next Employee ID");
    }
  };

  useEffect(() => {
    fetchNextEmpId();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddDepartment = () => {
    const newDept = prompt("Enter new Department:");
    if (newDept && !departments.includes(newDept)) {
      setDepartments([...departments, newDept]);
      toast.success("New Department added!");
    }
  };

  const handleAddDesignation = () => {
    const newDesig = prompt("Enter new Designation:");
    if (newDesig && !designations.includes(newDesig)) {
      setDesignations([...designations, newDesig]);
      toast.success("New Designation added!");
    }
  };

  const handleReset = () => {
    setFormData({
      empId: "",
      empName: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      status: "Active",
    });
    fetchNextEmpId();
  };

  // ✅ Save Functionality Only
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/employees/addEmployee", formData);
      toast.success("Employee saved successfully!");
      handleReset();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error saving employee.");
    }
  };

  return (
    <Box sx={{ maxWidth: 700, margin: "30px auto", padding: 4 }}>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Employee Master Form
        </Typography>

        <form onSubmit={handleSave}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Employee ID"
                name="empId"
                value={formData.empId}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Employee Name"
                name="empName"
                value={formData.empName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            {/* Department */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <InputLabel sx={{ flexGrow: 1 }}>Department</InputLabel>
                <IconButton color="primary" onClick={handleAddDepartment}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Box>
              <Select
                fullWidth
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/* Designation */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <InputLabel sx={{ flexGrow: 1 }}>Designation</InputLabel>
                <IconButton color="primary" onClick={handleAddDesignation}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Box>
              <Select
                fullWidth
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              >
                {designations.map((desig) => (
                  <MenuItem key={desig} value={desig}>
                    {desig}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/* Status */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Status</InputLabel>
              <Select
                fullWidth
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </Grid>
          </Grid>

          {/* Save and Reset Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ px: 3, borderRadius: "25px", textTransform: "none" }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleReset}
              sx={{ px: 3, borderRadius: "25px", textTransform: "none" }}
            >
              Reset
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EmployeeMasterForm;
