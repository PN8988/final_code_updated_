// // src/components/Navbar.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   Menu,
//   MenuItem,
//   Tabs,
//   Tab
// } from '@mui/material';

// import './Navbar.css';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [showLoginTabs, setShowLoginTabs] = useState(false); 
//   const [selectedTab, setSelectedTab] = useState(0);

//   const handleGoBack = () => {
//     navigate('/navbar');
//   };

//   const handleViewClient = () => {
//     navigate('/clientlist');
//   };

//   const handleAddMasterClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleMasterNavigation = (path) => {
//     navigate(path);
//     handleClose();
//   };

//   const handleViewClientProfile = () => {
//     setShowLoginTabs(true);
//   };

//   // 🔹 When switching tabs (Client/Admin login)
//   // 🔹 When switching tabs (Client/Admin/Employee login)
// const handleTabChange = (event, newValue) => {
//   setSelectedTab(newValue);

//   if (newValue === 0) {
//     navigate("/login", { state: { role: "CLIENT" } });   // Client login
//   } else if (newValue === 1) {
//     navigate("/login", { state: { role: "ADMIN" } });    // Admin login
//   } else if (newValue === 2) {
//     navigate("/login", { state: { role: "EMPLOYEE" } }); // Employee login
//   }
// else if (newValue === 3) {
//     navigate("/login", { state: { role: "REVENUE OFFICER" } }); 
//   }
//   else if (newValue === 4) {
//     navigate("/login", { state: { role: "INCOME TAX OFFICER" } }); 
//   }
//   setShowLoginTabs(false);
// };


//   return (
//     <>
//       <AppBar position="fixed" className="navbar">
//         <Toolbar className="navbar-toolbar">
//           <Typography variant="h6" className="navbar-title">
//             Trinity Consultancy Services
//           </Typography>

//           <Box className="navbar-actions">
//            <Button color="inherit" onClick={handleAddMasterClick}>
//               01_Super User
//             </Button>

//            <Button color="inherit" onClick={handleViewClient}>
//               02_Client Master
//             </Button> 

//             <Button color="inherit" onClick={handleViewClientProfile}>
//               03_View Client's Income Profile
//             </Button> 
           
//            <Button color="inherit" onClick={handleGoBack}>
//               Back
//             </Button>
//             <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
//               <MenuItem onClick={() => handleMasterNavigation('/employer-form')}>
//                 Employer Master
//               </MenuItem>
//               <MenuItem onClick={() => handleMasterNavigation('/bank-master')}>
//                 Bank Master
//               </MenuItem>
//               <MenuItem onClick={() => handleMasterNavigation('/security-master')}>
//                 Security Master
//               </MenuItem>
//               <MenuItem onClick={() => handleMasterNavigation('/property-master')}>
//                 Property Master
//               </MenuItem>
//               <MenuItem onClick={() => handleMasterNavigation('/demat-account-master')}>
//                 Demat Account Master
//               </MenuItem>
//               <MenuItem onClick={() => handleMasterNavigation('/tax-year-form')}>
//                 Tax-Year Master
//               </MenuItem>
//             </Menu>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* 🔹 Tabs for choosing Client/Admin login */}
//     {showLoginTabs && (
//   <Box
//     sx={{
//       position: "absolute",
//       top: "64px",   // just below navbar
//       left: 0,
//       right: 0,
//       display: "flex",
//       justifyContent: "center",
//       zIndex: 1200,
//     }}
//   >
//     <Box className="login-options-cascade">
//       <Button className="login-btn" onClick={() => handleTabChange(null, 0)}>
//         LOGIN AS CLIENT
//       </Button>
//       <Button className="login-btn" onClick={() => handleTabChange(null, 1)}>
//         LOGIN AS ADMIN
//       </Button>
//       <Button className="login-btn" onClick={() => handleTabChange(null, 2)}>
//         LOGIN AS EMPLOYEE
//       </Button>
//       <Button className="login-btn" onClick={() => handleTabChange(null, 3)}>
//         LOGIN AS REVENUE OFFICER
//       </Button>
//       <Button className="login-btn" onClick={() => handleTabChange(null, 4)}>
//         LOGIN AS INCOME TAX OFFICER
//       </Button>
//     </Box>
//   </Box>
// )}



//     </>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect } from "react";
// import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";

// const Navbar = () => {
//   const [navBg, setNavBg] = useState("transparent");
//   const navigate = useNavigate();
//   const location = useLocation(); // get current path

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 100) setNavBg("#1B4D3E");
//       else setNavBg("transparent");
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // User roles
//   const userRoles = [
//     { name: "Admin", path: "/admin-login" },
//     { name: "Client", path: "/login" },
//     { name: "Employee", path: "/employee" },
//     { name: "Revenue Officer", path: "/revenue-officer" },
//     { name: "Income Tax Officer", path: "/income-tax-officer" },
//   ];

//   // Main menu
//   const mainMenu = [
//     { name: "Home", path: "/home" },
//     { name: "About", path: "/about" },
//     { name: "Services", path: "/services" },
//     { name: "Contact", path: "/contact" },
//   ];

//   // Navigate and scroll to top
//   const handleNavigate = (path) => {
//     navigate(path);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       {/* ===== User Role Bar ===== */}
//       <Box
//         sx={{
//           backgroundColor: "#145c3b",
//           color: "white",
//           py: 0.5,
//           textAlign: "center",
//           fontSize: "0.9rem",
//           fontWeight: 500,
//           display: "flex",
//           justifyContent: "center",
//           gap: 2,
//           flexWrap: "wrap",
//         }}
//       >
//         {userRoles.map((role, index) => (
//           <Typography
//             key={index}
//             component="span"
//             sx={{
//               cursor: "pointer",
//               textDecoration: "underline",
//               "&:hover": { color: "#C0C0C0" },
//             }}
//             onClick={() => handleNavigate(role.path)}
//           >
//             {role.name}
//           </Typography>
//         ))}
//       </Box>

//       {/* ===== Main Navbar ===== */}
//       <AppBar
//         position="fixed"
//         elevation={0}
//         sx={{
//           backgroundColor: navBg,
//           transition: "background-color 0.5s ease",
//           top: "24px",
//         }}
//       >
//         <Container>
//           <Toolbar sx={{ justifyContent: "space-between" }}>
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: "bold",
//                 color: "white",
//                 letterSpacing: 1,
//                 cursor: "pointer",
//               }}
//               onClick={() => handleNavigate("/home")}
//             >
//               Trinity Consultancy Services
//             </Typography>

//             <Box>
//               {mainMenu.map((item) => (
//                 <Button
//                   key={item.name}
//                   color="inherit"
//                   sx={{
//                     color: location.pathname === item.path ? "#FFD700" : "white",
//                     mx: 1,
//                     fontWeight: 500,
//                     "&:hover": { color: "#C0C0C0" },
//                   }}
//                   onClick={() => handleNavigate(item.path)}
//                 >
//                   {item.name}
//                 </Button>
//               ))}
//             </Box>
//           </Toolbar>
//         </Container>
//       </AppBar>
//     </>
//   );
// };

// export default Navbar;

// src/components/Navbar.jsx
// src/components/Navbar.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeUser, setActiveUser] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = Boolean(anchorEl);

  const navItems = ["Home", "Services", "Contact"];

  const handleNavigate = (page) => {
    if (page === "Home") navigate("/home");
    else if (page === "Services") navigate("/services");
    else if (page === "Contact") navigate("/contact-us");
    else if (page === "Login") navigate("/login");
  };

  const handleUserNavigate = (userType) => {
    setActiveUser(userType);
    if (userType === "Admin") navigate("/admin-login");
    else if (userType === "Employee") navigate("/employee/login");
    else if (userType === "Client") navigate("/login");
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleProfileOption = (option) => {
    handleMenuClose();
    if (option === "Profile") navigate("/profile");
    else if (option === "Settings") navigate("/settings");
    else if (option === "Logout") {
      setActiveUser("");
      navigate("/login");
    }
  };

  const userIcons = {
    Admin: <AdminPanelSettingsIcon sx={{ fontSize: 18, mr: 0.5 }} />,
    Employee: <WorkIcon sx={{ fontSize: 18, mr: 0.5 }} />,
    Client: <PersonIcon sx={{ fontSize: 18, mr: 0.5 }} />,
  };

  const isLoginPage = [
    "/admin-login",
    "/employee/login",
    "/login",

  ].includes(location.pathname);

  return (
    <>
      {/* Top user bar */}
      {!isLoginPage && (
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            color: "#333",
            py: 0.5,
            px: 2,
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            fontSize: "0.875rem",
          }}
        >
          {["Login As", "Admin", "Employee", "Client"].map((userType) => (
            <Button
              key={userType}
              onClick={() => handleUserNavigate(userType)}
              startIcon={userIcons[userType]}
              sx={{
                color: activeUser === userType ? "#0b3d2e" : "#333",
                textTransform: "none",
                fontWeight: activeUser === userType ? 600 : 500,
                "&:hover": { color: "#0b3d2e" },
                minWidth: "auto",
                padding: "0 4px",
                fontSize: "0.9rem",
              }}
            >
              {userType}
            </Button>
          ))}
        </Box>
      )}

      {/* Main Navbar */}
      <AppBar position="sticky" sx={{ backgroundColor: "#0b3d2e", boxShadow: "none", py: 1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo + Company Name (Left) */}
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ cursor: "pointer" }}
            onClick={() => handleNavigate("Home")}
          >
            <img className="logo-image"
              src="/images/logo-search-grid-1x.png" // Replace with your logo path
              alt="Logo"
              style={{ width: 150, height: 100, left:"50px" }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                letterSpacing: 1,
                color: "#c0c0c0",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Trinity Consultancy Services
            </Typography>
          </Box>

          {/* Desktop nav + profile (Right) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{
                    color: "#c0c0c0",
                    fontWeight: 500,
                    textTransform: "none",
                    "&:hover": { color: "#ffffff", backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                  onClick={() => handleNavigate(item)}
                >
                  {item}
                </Button>
              ))}
            </Box>

            {/* Profile Dropdown */}
            {!isLoginPage && activeUser && (
              <>
                <IconButton onClick={handleMenuOpen} sx={{ color: "#fff" }}>
                  <Avatar sx={{ bgcolor: "#c0c0c0", width: 32, height: 32 }}>
                    <AccountCircleIcon sx={{ color: "#0b3d2e" }} />
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <MenuItem onClick={() => handleProfileOption("Profile")}>Profile</MenuItem>
                  <MenuItem onClick={() => handleProfileOption("Settings")}>Settings</MenuItem>
                  <MenuItem onClick={() => handleProfileOption("Logout")}>Logout</MenuItem>
                </Menu>
              </>
            )}

            {/* Hamburger menu for mobile */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setMobileOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {navItems.map((text) => (
              <ListItem
                button
                key={text}
                onClick={() => {
                  handleNavigate(text);
                  setMobileOpen(false);
                }}
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;


