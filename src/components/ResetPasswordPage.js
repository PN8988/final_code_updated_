import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const token = new URLSearchParams(useLocation().search).get("token");

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/api/auth/reset-password?token=${token}&newPassword=${password}`);
      toast.success(res.data);
    } catch {
      toast.error("Invalid or expired link!");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>Reset Password</Typography>
        <TextField
          fullWidth
          label="New Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Reset Password
        </Button>
      </Paper>
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
}
