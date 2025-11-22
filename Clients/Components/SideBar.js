import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BusinessIcon from "@mui/icons-material/Business";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle, role }) => {
  const commonMenu = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { name: "Bank Accounts", icon: <AccountBalanceIcon />, path: "/bank" },
  ];

  const adminMenu = [
    { name: "Clients", icon: <PeopleIcon />, path: "/clients" },
    { name: "Employees", icon: <BusinessIcon />, path: "/employees" },
    { name: "Masters", icon: <SettingsIcon />, path: "/masters" },
  ];

  const employeeMenu = [
    { name: "Assigned Clients", icon: <PeopleIcon />, path: "/my-clients" },
  ];

  const clientMenu = [
    { name: "My Investments", icon: <BusinessIcon />, path: "/investments" },
  ];

  let finalMenu = [...commonMenu];

  if (role === "ADMIN") finalMenu = [...finalMenu, ...adminMenu];
  if (role === "EMPLOYEE") finalMenu = [...finalMenu, ...employeeMenu];
  if (role === "CLIENT") finalMenu = [...finalMenu, ...clientMenu];

  const drawer = (
    <Box>
      <Toolbar />
      <List>
        {finalMenu.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;
