


// // src/components/Login.jsx
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import "./Login.css";

// export default function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   // Role passed via navigation state (default = CLIENT)
//   const role = location.state?.role || "CLIENT";
//   const isAdminLogin = role === "ADMIN";
//   const isEmployeeLogin = role === "EMPLOYEE";
//   const isRevenueOfficerLogin = role === "REVENUE_OFFICER";
//   const isIncomeTaxOfficerLogin = role === "INCOME_TAX_OFFICER";

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.username) newErrors.username = "Username is required";
//     if (!formData.password) newErrors.password = "Password is required";
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       setLoading(true);
//       try {
//         const response = await axios.post("http://localhost:8080/api/auth/login", {
//           username: formData.username,
//           password: formData.password,
//           role: role,
//         });

//         const user = response.data;

//         // ✅ Navigate by role
//         if (user.role === "ADMIN") {
//           navigate("/admin-dashboard", { state: { role: "ADMIN" } });
//         } else if (user.role === "CLIENT") {
//           navigate("/view-client-profile", {
//             state: { role: "CLIENT", username: user.username, showWelcome: true },
//           });
//         } else if (user.role === "EMPLOYEE") {
//           navigate("/employer-dashboard", { state: { role: "EMPLOYEE" } });
//         } else if (user.role === "REVENUE_OFFICER") {
//           navigate("/revenue-dashboard", { state: { role: "REVENUE_OFFICER" } });
//         } else if (user.role === "INCOME_TAX_OFFICER") {
//           navigate("/tax-dashboard", { state: { role: "INCOME_TAX_OFFICER" } });
//         } else {
//           setErrors({ password: "Invalid role" });
//         }
//       } catch (error) {
//         setErrors({ password: "Invalid username, password, or role" });
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   // ✅ Forgot Password and Register Navigation
//   const handleForgotPassword = () => {
//     navigate("/forgot-password", { state: { role } });
//   };

//   const handleRegister = () => {
//     navigate("/register", { state: { role } });
//   };

//   return (
//     <div className="login-container">
//       <form className="login-form" onSubmit={handleSubmit}>
//         <h2 className="login-title">
//           {isAdminLogin
//             ? "Admin Login"
//             : isEmployeeLogin
//             ? "Employee Login"
//             : isRevenueOfficerLogin
//             ? "Revenue Officer Login"
//             : isIncomeTaxOfficerLogin
//             ? "Income Tax Officer Login"
//             : "Client Login"}
//         </h2>

//         <div className="form-group1">
//           <label>Username</label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             className={errors.username ? "error-input" : ""}
//           />
//           {errors.username && <span className="error-text">{errors.username}</span>}
//         </div>

//         <div className="form-group1">
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className={errors.password ? "error-input" : ""}
//           />
//           {errors.password && <span className="error-text">{errors.password}</span>}
//         </div>

//         <button type="submit" className="login-button" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         {/* ✅ Forgot Password & Register Buttons */}
//         <div className="login-links">
//           <button
//             type="button"
//             className="link-button"
//             onClick={handleForgotPassword}
//           >
//             Forgot Password?
//           </button>
//           <span className="separator">|</span>
//           <button
//             type="button"
//             className="link-button"
//             onClick={handleRegister}
//           >
//             Register
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }



// // src/components/Login.jsx

// // import React, { useState } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import "./Login.css";

// // export default function Login() {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [formData, setFormData] = useState({ username: "", password: "" });
// //   const [errors, setErrors] = useState({});
// //   const [loading, setLoading] = useState(false);

// //   // Role passed via navigation state or default to CLIENT
// //   const role = location.state?.role || "CLIENT";

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const validate = () => {
// //     const newErrors = {};
// //     if (!formData.username) newErrors.username = "Username is required";
// //     if (!formData.password) newErrors.password = "Password is required";
// //     return newErrors;
// //   };

// //   const handleSubmit = async (e) => {
// //   e.preventDefault();
// //   const validationErrors = validate();
// //   setErrors(validationErrors);

// //   if (Object.keys(validationErrors).length === 0) {
// //     setLoading(true);
// //     try {
// //       const res = await fetch("/api/auth/login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData),
// //       });

// //       if (!res.ok) throw new Error("Invalid username or password");

// //       const data = await res.json();

// //       localStorage.setItem("token", data.token);
// //       localStorage.setItem("role", data.role);
// //       localStorage.setItem("username", data.username);

// //       if (data.role === "ADMIN") navigate("/admin-dashboard");
// //       else if (data.role === "EMPLOYEE") navigate("/employee-dashboard");
// //       else navigate("/view-client-profile", { state: { pan: data.pan } });

// //     } catch (err) {
// //       setErrors({ password: err.message });
// //     } finally {
// //       setLoading(false);
// //     }
// //   }
// // };

// //   return (
// //     <div className="login-container">
// //       <form className="login-form" onSubmit={handleSubmit}>
// //         <h2 className="login-title">
// //           {role === "ADMIN"
// //             ? "Admin Login"
// //             : role === "EMPLOYEE"
// //             ? "Employee Login"
// //             : "Client Login"}
// //         </h2>

// //         <div className="form-group1">
// //           <label>Username</label>
// //           <input
// //             type="text"
// //             name="username"
// //             value={formData.username}
// //             onChange={handleChange}
// //             className={errors.username ? "error-input" : ""}
// //           />
// //           {errors.username && (
// //             <span className="error-text">{errors.username}</span>
// //           )}
// //         </div>

// //         <div className="form-group1">
// //           <label>Password</label>
// //           <input
// //             type="password"
// //             name="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             className={errors.password ? "error-input" : ""}
// //           />
// //           {errors.password && (
// //             <span className="error-text">{errors.password}</span>
// //           )}
// //         </div>

// //         <button type="submit" className="login-button" disabled={loading}>
// //           {loading ? "Logging in..." : "Login"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }


// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock, Person } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ loginId: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const role = location.state?.role || "CLIENT";
  const isAdminLogin = role === "ADMIN";
  const isEmployeeLogin = role === "EMPLOYEE";
  const isRevenueOfficerLogin = role === "REVENUE_OFFICER";
  const isIncomeTaxOfficerLogin = role === "INCOME_TAX_OFFICER";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!formData.loginId) newErrors.loginId = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();
  setErrors(validationErrors);
  if (Object.keys(validationErrors).length > 0) return;

  setLoading(true);

  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/login",
      {
        panId: formData.loginId,
        password: formData.password,
        role: role
      }
    );

    const user = response.data;

    // Role based navigation
    if (user.role === "ADMIN") {
      navigate("/admin-dashboard", { state: { role: "ADMIN", user } });
    } else if (user.role === "EMPLOYEE") {
      navigate("/employee-dashboard", { state: { role: "EMPLOYEE", user } });
    } else if (user.role === "CLIENT") {
      navigate("/view-client-profile", { state: { ...user } });
    } else {
      setErrors({ password: "Invalid role" });
    }

  } catch (error) {
    setErrors({ password: "Invalid PAN, Password or Role" });
  } finally {
    setLoading(false);
  }
};


  const handleForgotPassword = () => navigate("/forgot-password", { state: { role } });
  const handleRegister = () => navigate("/register", { state: { role } });

  const loginTitle =
    (isAdminLogin && "Admin Login") ||
    (isEmployeeLogin && "Employee Login") ||
    (isRevenueOfficerLogin && "Revenue Officer Login") ||
    (isIncomeTaxOfficerLogin && "Income Tax Officer Login") ||
    "Client Login";

  return (
    <Container
      maxWidth="sm"
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <Paper
        elevation={5}
        sx={{
          p: 4,
          borderRadius: 4,
          width: "100%",
          background:
            "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography variant="h5" fontWeight="bold" color="primary">
            {loginTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Welcome back! Please enter your credentials.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
         <TextField
  fullWidth
  label="PAN ID"
  name="loginId"
  value={formData.loginId}
  onChange={handleChange}
  margin="normal"
  error={!!errors.loginId}
  helperText={errors.loginId}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Person color="action" />
      </InputAdornment>
    ),
  }}
/>

          

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button 
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.3,
              fontWeight: "bold",
              borderRadius: 2,
              textTransform: "none",
              background:
                "linear-gradient(45deg, #1976d2, #42a5f5)",
              "&:hover": {
                background: "linear-gradient(45deg, #1565c0, #2196f3)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Login"
            )}
          </Button>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
          >
            <Button
              variant="text"
              color="primary"
              onClick={handleForgotPassword}
              sx={{ textTransform: "none" }}
            >
              Forgot Password?
            </Button>
            <Typography mx={1}>|</Typography>
            <Button
              variant="text"
              color="primary"
              onClick={handleRegister}
              sx={{ textTransform: "none" }}
            >
              Register
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
