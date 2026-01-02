import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    //panId: "",
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    gender: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "success" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/register", // ✅ CORRECT API
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ✅ safe for session/cookies
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || "Registration failed");
      }

      setPopup({
        show: true,
        message: "Registration Successful!",
        type: "success",
      });

      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      setPopup({
        show: true,
        message: err.message || "Registration Failed!",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="register-bg d-flex align-items-center justify-content-center"
      sx={{ minHeight: "100vh", p: 3 }}
    >
      <Card sx={{ width: "65%", borderRadius: 4, boxShadow: 6 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Create Your Account
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              {/*
              <TextField
                label="PAN ID"
                name="panId"
                value={form.panId}
                onChange={handleChange}
                required
              />
            */}
              <TextField
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <TextField
                label="Mobile Number"
                name="mobileNumber"
                value={form.mobileNumber}
                onChange={handleChange}
                required
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={form.gender}
                  label="Gender"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

              <TextField
                select
                label="Role"
                name="role"
                value={form.role}
                onChange={handleChange}
                required
              >
                <MenuItem value="ADMIN">Admin</MenuItem>
                <MenuItem value="EMPLOYEE">Employee</MenuItem>
                <MenuItem value="CLIENT">Client</MenuItem>
              </TextField>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, py: 1.3, fontWeight: "bold" }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={26} sx={{ color: "white" }} />
              ) : (
                "Register"
              )}
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                style={{ color: "#1976d2", cursor: "pointer", fontWeight: "bold" }}
              >
                Login here
              </span>
            </Typography>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={popup.show}
        autoHideDuration={4000}
        onClose={() => setPopup({ ...popup, show: false })}
      >
        <Alert severity={popup.type}>{popup.message}</Alert>
      </Snackbar>
    </Box>
  );
}
