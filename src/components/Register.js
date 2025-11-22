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
  Avatar,
  Divider,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";

const Register = () => {
  const [panId, setPanId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  // Photo selection
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  // Submit JSON
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      panId,
      fullName,
      email,
      mobile,
      password,
      gender,
      role,
    };

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      setPopup({
        show: true,
        message: "Registration successful!",
        type: "success",
      });
    } catch (error) {
      setPopup({
        show: true,
        message: "Registration failed!",
        type: "error",
      });
    }

    setLoading(false);
  };

  return (
    <Box
      className="register-bg d-flex align-items-center justify-content-center"
      sx={{ minHeight: "100vh", p: 3 }}
    >
      <Card
        sx={{
          width: "70%",
          display: "flex",
          flexDirection: "row",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
          backgroundColor: "#fff",
        }}
      >
        {/* LEFT SECTION */}
        <Box
          sx={{
            width: "35%",
            background:
              "linear-gradient(180deg, rgba(0,123,255,0.8), rgba(102,16,242,0.8))",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
          }}
        >
          <Button variant="contained" component="label">
            Upload Profile Photo
            <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
          </Button>

          {photo && (
            <Avatar
              src={URL.createObjectURL(photo)}
              sx={{ width: 80, height: 80, mt: 1 }}
            />
          )}
        </Box>

        {/* RIGHT SECTION */}
        <CardContent
          sx={{
            flex: 1,
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: "#333" }}>
            Create Your Account
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <form onSubmit={handleRegister}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              {/* PAN */}
              <TextField
                label="PAN ID"
                value={panId}
                onChange={(e) => setPanId(e.target.value)}
                required
              />

              {/* Full Name */}
              <TextField
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />

              {/* Email */}
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* Mobile */}
              <TextField
                label="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />

              {/* Password */}
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* Gender */}
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  label="Gender"
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

              {/* Role */}
              <TextField
                select
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                fullWidth
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
              color="primary"
              fullWidth
              sx={{ mt: 3, py: 1.4, fontWeight: "bold", borderRadius: 2 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={26} sx={{ color: "white" }} />
              ) : (
                "Register"
              )}
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2, color: "#555" }}>
              Already have an account?{" "}
              <a href="/admin-login" className="fw-bold text-primary text-decoration-none">
                Login here
              </a>
            </Typography>
          </form>
        </CardContent>
      </Card>

      {/* Snackbar */}
      <Snackbar
        open={popup.show}
        autoHideDuration={4000}
        onClose={() => setPopup({ ...popup, show: false })}
      >
        <Alert
          severity={popup.type}
          onClose={() => setPopup({ ...popup, show: false })}
          sx={{ width: "100%", fontSize: "1rem" }}
        >
          {popup.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
