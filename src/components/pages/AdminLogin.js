import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Link,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import adminBg from "../assets/admin-bg.jpg"; // optional background image

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Dummy credentials (replace with backend API later)
    if (email === "admin@trinity.com" && password === "admin123") {
      localStorage.setItem("adminToken", "mock-token");
      localStorage.setItem("adminName", "Admin User");
      navigate("/admins-dashboard"); // redirect to dashboard
    } else {
      setError("Invalid email or password. Try again.");
    }
  };

  const handleRegister = () => {
    navigate("/register"); // 👉 redirect to admin register page
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password"); // 👉 redirect to forgot password page
  };

  return (
    <Box
      sx={{
        // backgroundImage: `url(${adminBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            backgroundColor: "rgba(255,255,255,0.9)",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Admin Login
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 3, borderRadius: 2 }}
            >
              Login
            </Button>

            {/* ✅ Added Register and Forgot Password Links */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <Link
                component="button"
                variant="body2"
                onClick={handleRegister}
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Register
              </Link>

              <Link
                component="button"
                variant="body2"
                onClick={handleForgotPassword}
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Forgot Password?
              </Link>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin;
