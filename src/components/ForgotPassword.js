// // src/components/ForgotPassword.jsx
// import React, { useState } from "react";
// import { Box, Typography, TextField, Button, Alert, Paper } from "@mui/material";
// import "bootstrap/dist/css/bootstrap.min.css";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email) {
//       setError("Email is required");
//       setSuccess(false);
//       return;
//     } else if (!emailRegex.test(email)) {
//       setError("Please enter a valid email address");
//       setSuccess(false);
//       return;
//     }

//     setError("");
//     setSuccess(true);

//     // Call backend API to send reset link here
//     console.log("Sending password reset link to:", email);
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #bfc5bfff 0%, #bec9c4ff 100%)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 2,
//       }}
//     >
//       <Paper
//         elevation={6}
//         sx={{
//           maxWidth: 400,
//           width: "100%",
//           padding: 4,
//           borderRadius: 3,
//         }}
//       >
//         <Typography variant="h4" mb={3} textAlign="center" fontWeight="bold">
//           Forgot Password
//         </Typography>

//         {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//         {success && <Alert severity="success" sx={{ mb: 2 }}>Password reset link sent successfully!</Alert>}

//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             margin="normal"
//           />

//           <Button
//             variant="contained"
//             color="primary"
//             type="submit"
//             fullWidth
//             sx={{ mt: 2 }}
//           >
//             Send Reset Link
//           </Button>
//         </form>

//         <Box textAlign="center" mt={3}>
//           <a href="/admin-login" style={{ textDecoration: "none", color: "#1a361aff" }}>
//             Back to Login
//           </a>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default ForgotPassword;


// src/components/ForgotPassword.jsx
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Alert, Paper } from "@mui/material";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    setError("Email is required");
    setSuccess(false);
    return;
  } else if (!emailRegex.test(email)) {
    setError("Please enter a valid email address");
    setSuccess(false);
    return;
  }

  setError("");
  setSuccess(false);
  setLoading(true);

  try {
    const response = await axios.post(
      `http://localhost:8080/api/auth/forgot-password?email=${encodeURIComponent(email)}`
    );

    if (response.status === 200) {
      setSuccess(true);
      setError("");
    }
  } catch (err) {
    console.error("Error sending reset link:", err);

    let message = "Failed to send reset link. Please try again later.";
    if (err.response) {
      if (typeof err.response.data === "string") {
        message = err.response.data;
      } else if (err.response.data.message) {
        message = err.response.data.message;
      } else if (err.response.data.error) {
        message = err.response.data.error;
      }
    }

    setError(message);
    setSuccess(false);
  } finally {
    setLoading(false);
  }
};


  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #bfc5bfff 0%, #bec9c4ff 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 400,
          width: "100%",
          padding: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" mb={3} textAlign="center" fontWeight="bold">
          Forgot Password
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Password reset link sent successfully! <br />
            Please check your email inbox (and spam folder).
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            disabled={loading}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        <Box textAlign="center" mt={3}>
          <a href="/admin-login" style={{ textDecoration: "none", color: "#1a361aff" }}>
            Back to Login
          </a>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
