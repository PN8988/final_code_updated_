// src/components/AdminNavbar.jsx
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Toolbar,
  AppBar,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Dashboard,
  People,
  Settings,
  Logout,
  Business,
  Folder,
  Report,
  Menu as MenuIcon,
  WorkOutline, // 👈 New icon for Employee section
  AssignmentInd, // 👈 Optional for assign work
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [openMasters, setOpenMasters] = useState(false);
  const [openClients, setOpenClients] = useState(false);
  const [openEmployees, setOpenEmployees] = useState(false); // 👈 New toggle for Employee section
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleLogout = () => {
    localStorage.removeItem("activeUser");
    navigate("/login");
  };

  // Existing masters
  const masters = [
    { name: "Client Master", path: "/clientlist" },
    { name: "Employer Master", path: "/admin/masters/employer" },
    { name: "Bank Master", path: "/admin/masters/bankmasterlist" },
    { name: "Demat Master", path: "/admin/demat-account-master" },
    { name: "Tax Year Master", path: "/admin/masters/tax-year" },
    { name: "Security Master", path: "/admin/masters/security" },
    { name: "Property Type Master", path: "/admin/masters/property-type" },
     { name: "Financial Year Master", path: "/financial-year" },
  ];

  // Existing Clients
  const clients = [
    { name: "Add New", path: "/client-master" },
    { name: "View", path: "/clientlist" },
  ];

  // 👇 New Employee section
  const employees = [
    { name: "Add New", path: "/employee-master" },
    { name: "View", path: "/employee-list" },
    { name: "Assign Work", path: "/assign-work" }, // 👈 New route for assigning work
  ];

  const drawer = (
    <Box
      sx={{
        height: "100%",
        background: "linear-gradient(180deg, #0b3d2e 0%, #124f3c 100%)",
        color: "#fff",
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", fontFamily: "Poppins" }}>
          Admin Panel
        </Typography>
      </Toolbar>
      <List>
        {/* Dashboard */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/admin-dashboard")}>
            <ListItemIcon sx={{ color: "#cfd8dc" }}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        {/* Masters */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => setOpenMasters(!openMasters)}>
            <ListItemIcon sx={{ color: "#cfd8dc" }}>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Masters" />
            {openMasters ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openMasters} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <AnimatePresence>
              {masters.map((m) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ListItemButton
                    sx={{ pl: 6, "&:hover": { backgroundColor: "#2e7d32" } }}
                    onClick={() => navigate(m.path)}
                  >
                    <ListItemText primary={m.name} />
                  </ListItemButton>
                </motion.div>
              ))}
            </AnimatePresence>
          </List>
        </Collapse>

        {/* Clients */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => setOpenClients(!openClients)}>
            <ListItemIcon sx={{ color: "#cfd8dc" }}>
              <People />
            </ListItemIcon>
            <ListItemText primary="Clients" />
            {openClients ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openClients} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <AnimatePresence>
              {clients.map((c) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ListItemButton
                    sx={{ pl: 6, "&:hover": { backgroundColor: "#2e7d32" } }}
                    onClick={() => navigate(c.path)}
                  >
                    <ListItemText primary={c.name} />
                  </ListItemButton>
                </motion.div>
              ))}
            </AnimatePresence>
          </List>
        </Collapse>

        {/* 👇 Employees Section */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => setOpenEmployees(!openEmployees)}>
            <ListItemIcon sx={{ color: "#cfd8dc" }}>
              <WorkOutline />
            </ListItemIcon>
            <ListItemText primary="Employees" />
            {openEmployees ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openEmployees} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <AnimatePresence>
              {employees.map((e) => (
                <motion.div
                  key={e.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ListItemButton
                    sx={{ pl: 6, "&:hover": { backgroundColor: "#2e7d32" } }}
                    onClick={() => navigate(e.path)}
                  >
                    <ListItemText primary={e.name} />
                  </ListItemButton>
                </motion.div>
              ))}
            </AnimatePresence>
          </List>
        </Collapse>

        {/* Reports */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/admin/generated-reports")}>
            <ListItemIcon sx={{ color: "#cfd8dc" }}>
              <Report />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
        </ListItem>

        {/* Settings */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/admin/settings")}>
            <ListItemIcon sx={{ color: "#cfd8dc" }}>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>

        {/* Logout */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon sx={{ color: "#cfd8dc" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* Top Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(184, 192, 190, 0.9)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Avatar sx={{ bgcolor: "#c0c0c0", color: "#0b3d2e" }}>
            <Business />
          </Avatar>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          {drawer}
        </Drawer>

        {/* Permanent Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default AdminNavbar;
