import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const EmailSuccessPage = () => (
  <Box className="d-flex justify-content-center align-items-center vh-100">
    <Paper
      elevation={4}
      sx={{
        p: 4,
        borderRadius: 3,
        textAlign: "center",
        width: 400,
      }}
    >
      <MailOutlineIcon color="primary" sx={{ fontSize: 60 }} />
      <Typography variant="h6" fontWeight="bold" mt={2}>
        Reset Link Sent!
      </Typography>
      <Typography variant="body2" color="text.secondary">
        We’ve sent a password reset link to your email. Please check your inbox.
      </Typography>
    </Paper>
  </Box>
);

export default EmailSuccessPage;
