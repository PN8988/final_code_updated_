// src/components/AssignWork.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  Grid,
} from "@mui/material";
import axios from "axios";

const AssignWork = () => {
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);
  const [work, setWork] = useState({
    employeeId: "",
    clientId: "",
    taskDescription: "",
    deadline: "",
  });

  useEffect(() => {
    fetchEmployees();
    fetchClients();
  }, []);

  const fetchEmployees = async () => {
    const res = await axios.get("http://localhost:8080/api/employees");
    setEmployees(res.data);
  };

  const fetchClients = async () => {
    const res = await axios.get("http://localhost:8080/api/clients");
    setClients(res.data);
  };

  const handleChange = (e) => {
    setWork({ ...work, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/assignments", work);
      alert("Work assigned successfully!");
      setWork({ employeeId: "", clientId: "", taskDescription: "", deadline: "" });
    } catch (err) {
      console.error("Error assigning work:", err);
      alert("Failed to assign work");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4 }} elevation={4}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: "bold", color: "#124f3c" }}
        >
          Assign Work to Employee
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Select Employee"
              name="employeeId"
              fullWidth
              value={work.employeeId}
              onChange={handleChange}
              required
            >
              {employees.map((emp) => (
                <MenuItem key={emp.id} value={emp.id}>
                  {emp.name} ({emp.role})
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Select Client"
              name="clientId"
              fullWidth
              value={work.clientId}
              onChange={handleChange}
              required
            >
              {clients.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name} ({c.pan})
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Task Description"
              name="taskDescription"
              fullWidth
              multiline
              rows={3}
              value={work.taskDescription}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Deadline"
              name="deadline"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={work.deadline}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2, textTransform: "none" }}
              onClick={handleSubmit}
            >
              Assign Work
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AssignWork;
