// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import {
//   Container,
//   Box,
//   TextField,
//   Button,
//   Typography,
//   CircularProgress,
//   Paper,
//   InputAdornment,
//   IconButton,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { Visibility, VisibilityOff, Lock, Person } from "@mui/icons-material";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Login.css";

// export default function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [formData, setFormData] = useState({ loginId: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [popup, setPopup] = useState({ show: false, message: "", type: "" });

//   const role = location.state?.role || "CLIENT";

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.loginId) newErrors.loginId = "Username is required";
//     if (!formData.password) newErrors.password = "Password is required";
//     return newErrors;
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const validationErrors = validate();
//   setErrors(validationErrors);
//   if (Object.keys(validationErrors).length > 0) return;

//   setLoading(true);

//   try {
//     const response = await axios.post(
//       "http://localhost:8080/api/register/login", // <-- updated URL
//       {
//         panId: formData.loginId,
//         password: formData.password,
//         role: role, // optional, if your backend needs role
//       }
//     );

//     const user = response.data;

//     // Role-based navigation
//     if (user.role === "ADMIN") {
//       navigate("/admin-dashboard", { state: { role: "ADMIN", user } });
//     } else if (user.role === "EMPLOYEE") {
//       navigate("/employee-dashboard", { state: { role: "EMPLOYEE", user } });
//     } else if (user.role === "CLIENT") {
//       navigate("/view-client-profile", { state: { ...user } });
//     } else {
//       setErrors({ password: "Invalid role" });
//     }
//   } catch (error) {
//     setErrors({ password: "Invalid PAN, Password or Role" });
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <Container maxWidth="sm" className="d-flex justify-content-center align-items-center vh-100">
//       <Paper
//         elevation={5}
//         sx={{
//           p: 4,
//           borderRadius: 4,
//           width: "100%",
//           background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
//         }}
//       >
//         <Box textAlign="center" mb={3}>
//           <Typography variant="h5" fontWeight="bold" color="primary">
//             {role.charAt(0).toUpperCase() + role.slice(1)} Login
//           </Typography>
//           <Typography variant="body2" color="textSecondary">
//             Welcome back! Please enter your credentials.
//           </Typography>
//         </Box>

//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="PAN ID"
//             name="loginId"
//             value={formData.loginId}
//             onChange={handleChange}
//             margin="normal"
//             error={!!errors.loginId}
//             helperText={errors.loginId}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Person color="action" />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <TextField
//             fullWidth
//             label="Password"
//             name="password"
//             type={showPassword ? "text" : "password"}
//             value={formData.password}
//             onChange={handleChange}
//             margin="normal"
//             error={!!errors.password}
//             helperText={errors.password}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Lock color="action" />
//                 </InputAdornment>
//               ),
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             type="submit"
//             disabled={loading}
//             sx={{
//               mt: 3,
//               py: 1.3,
//               fontWeight: "bold",
//               borderRadius: 2,
//               textTransform: "none",
//               background: "linear-gradient(45deg, #1976d2, #42a5f5)",
//               "&:hover": { background: "linear-gradient(45deg, #1565c0, #2196f3)" },
//             }}
//           >
//             {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Login"}
//           </Button>

//           <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
//             <Button
//               variant="text"
//               color="primary"
//               onClick={() => navigate("/forgot-password", { state: { role } })}
//               sx={{ textTransform: "none" }}
//             >
//               Forgot Password?
//             </Button>
//             <Typography mx={1}>|</Typography>
//             <Button
//               variant="text"
//               color="primary"
//               onClick={() => navigate("/register", { state: { role } })}
//               sx={{ textTransform: "none" }}
//             >
//               Register
//             </Button>
//           </Box>
//         </form>

//         <Snackbar
//           open={popup.show}
//           autoHideDuration={3000}
//           onClose={() => setPopup({ ...popup, show: false })}
//         >
//           <Alert severity={popup.type}>{popup.message}</Alert>
//         </Snackbar>
//       </Paper>
//     </Container>
//   );
// }

// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import {
//   Container,
//   Box,
//   TextField,
//   Button,
//   Typography,
//   CircularProgress,
//   Paper,
//   InputAdornment,
//   IconButton,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { Visibility, VisibilityOff, Lock, Person } from "@mui/icons-material";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Login.css";

// export default function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [formData, setFormData] = useState({ loginId: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [popup, setPopup] = useState({ show: false, message: "", type: "" });

//   const role = location.state?.role || "CLIENT";

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.loginId) newErrors.loginId = "PAN is required";
//     if (!formData.password) newErrors.password = "Password is required";
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationErrors = validate();
//     setErrors(validationErrors);
//     if (Object.keys(validationErrors).length > 0) return;

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/register/login",
//         {
//           panId: formData.loginId,
//           password: formData.password,
//           role: role,
//         }
//       );

//       const user = response.data;

//       // Role based navigation
//       if (user.role === "ADMIN") {
//         navigate("/admin-dashboard", { state: { role: "ADMIN", user } });
//       } else if (user.role === "EMPLOYEE") {
//         navigate("/employee-dashboard", { state: { role: "EMPLOYEE", user } });
//       } else if (user.role === "CLIENT") {
//         navigate("/view-client-profile", { state: { ...user } });
//       } else {
//         setErrors({ password: "Invalid role" });
//       }
//     } catch (error) {
//       setPopup({
//         show: true,
//         message: "Invalid PAN, password or role",
//         type: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       className="d-flex justify-content-center align-items-center vh-100"
//     >
//       <Paper
//         elevation={5}
//         sx={{
//           p: 4,
//           borderRadius: 4,
//           width: "100%",
//           background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
//         }}
//       >
//         <Box textAlign="center" mb={3}>
//           <Typography variant="h5" fontWeight="bold" color="primary">
//             {role.charAt(0).toUpperCase() + role.slice(1)} Login
//           </Typography>
//           <Typography variant="body2" color="textSecondary">
//             Welcome back! Please enter your credentials.
//           </Typography>
//         </Box>

//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="PAN ID"
//             name="loginId"
//             value={formData.loginId}
//             onChange={handleChange}
//             margin="normal"
//             error={!!errors.loginId}
//             helperText={errors.loginId}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Person color="action" />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <TextField
//             fullWidth
//             label="Password"
//             name="password"
//             type={showPassword ? "text" : "password"}
//             value={formData.password}
//             onChange={handleChange}
//             margin="normal"
//             error={!!errors.password}
//             helperText={errors.password}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Lock color="action" />
//                 </InputAdornment>
//               ),
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={() => setShowPassword(!showPassword)}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             type="submit"
//             disabled={loading}
//             sx={{
//               mt: 3,
//               py: 1.3,
//               fontWeight: "bold",
//               borderRadius: 2,
//               textTransform: "none",
//               background: "linear-gradient(45deg, #1976d2, #42a5f5)",
//               "&:hover": {
//                 background: "linear-gradient(45deg, #1565c0, #2196f3)",
//               },
//             }}
//           >
//             {loading ? (
//               <CircularProgress size={24} sx={{ color: "#fff" }} />
//             ) : (
//               "Login"
//             )}
//           </Button>
//         </form>

//         <Snackbar
//           open={popup.show}
//           autoHideDuration={3000}
//           onClose={() => setPopup({ ...popup, show: false })}
//         >
//           <Alert severity={popup.type}>{popup.message}</Alert>
//         </Snackbar>
//       </Paper>
//     </Container>
//   );
// }


// 🔥 ONLY THE NEW/ADDED PARTS ARE MARKED WITH "🔥 ADDED"

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container, Box, TextField, Button, Typography,
  CircularProgress, Paper, InputAdornment, IconButton,
  Snackbar, Alert, Avatar
} from "@mui/material";
import { Visibility, VisibilityOff, Lock, Email } from "@mui/icons-material";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email: form.email,
        password: form.password,
      });

      const { user, profile } = res.data;

      if (profile?.profilePhoto) {
        setProfilePhoto(profile.profilePhoto);
      }

      if (user.role === "CLIENT") {
        navigate("/view-client-profile", { state: { user, profile } });
      } else if (user.role === "ADMIN") {
        navigate("/admin-dashboard", { state: { user, profile } });
      } else if (user.role === "EMPLOYEE") {
        navigate("/employee-dashboard", { state: { user, profile } });
      }

    } catch (err) {
      setPopup({
        show: true,
        message: "Invalid email or password",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="vh-100 d-flex justify-content-center align-items-center">
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, width: "100%" }}>

        {/* 🔹 NEW: Profile Avatar */}
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar
            src={profilePhoto || ""}
            sx={{ width: 80, height: 80 }}
          />
        </Box>

        <Typography textAlign="center" variant="h5" fontWeight="bold">
          Login
        </Typography>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />

          <Button fullWidth variant="contained" type="submit" sx={{ mt: 3 }}>
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>

        {/* Register Link */}
        <Box textAlign="center" mt={3}>
          <Typography variant="body2">
            Don’t have an account?{" "}
            <span
              style={{ color: "#1976d2", fontWeight: "bold", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
          </Typography>

          <Typography
            variant="body2"
            sx={{ mt: 1, cursor: "pointer", color: "primary.main", textDecoration: "underline" }}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </Typography>l
        </Box>

        {/* Snackbar */}
        <Snackbar
          open={popup.show}
          autoHideDuration={3000}
          onClose={() => setPopup({ ...popup, show: false })}
        >
          <Alert severity={popup.type}>{popup.message}</Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
}


