// src/components/EmployeeLogin.js
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:8080/api/auth/login", {
      panId: email,        // Use PAN as loginId
      password: password,
      role: "EMPLOYEE"
    });

    toast.success("Login successful!", { position: "top-center" });

    setTimeout(() => {
      navigate("/employee-dashboard", { state: res.data });
    }, 1500);

  } catch (err) {
    toast.error("Invalid Email / Password / Role");
  }
};

  const handleRegister = () => navigate("/register");
  const handleForgotPassword = () => navigate("/forgot-password");

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #22552aff 0%, #d3d1d6ff 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Paper
          elevation={12}
          sx={{
            p: 5,
            borderRadius: 4,
            width: { xs: "90%", sm: 420 },
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0px 20px 40px rgba(0,0,0,0.2)",
          }}
        >
          <Typography variant="h4" fontWeight="bold" mb={1} textAlign="center">
            Employee Login
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            mb={3}
            textAlign="center"
          >
            Enter your credentials to access your account
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              sx={{
                "& .MuiInputLabel-root": { color: "#555" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              sx={{
                "& .MuiInputLabel-root": { color: "#555" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                mb: 1,
                borderRadius: 3,
                background: "linear-gradient(90deg, #667eea, #764ba2)",
                "&:hover": {
                  background: "linear-gradient(90deg, #764ba2, #667eea)",
                },
                py: 1.5,
                fontSize: 16,
              }}
            >
              Login
            </Button>
          </form>

          <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
            <Grid item>
              <Button
                variant="text"
                color="secondary"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="text"
                color="secondary"
                onClick={handleRegister}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </>
  );
};

export default EmployeeLogin;
