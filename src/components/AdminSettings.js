// src/components/AdminSettings.js
import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Divider,
} from "@mui/material";
import { Save } from "@mui/icons-material";

// Helper component for tab panels
function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminSettings = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event, newValue) => setTabIndex(newValue);

  // Example states
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("Trinity Consultancy Services");

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Manage your system preferences, security, and integrations.
      </Typography>

      {/* Tabs Header */}
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 3,
          "& .MuiTab-root": { textTransform: "none", fontWeight: 500 },
        }}
      >
        <Tab label="General" />
        <Tab label="Profile" />
        <Tab label="Users" />
        <Tab label="Notifications" />
        <Tab label="Security" />
        <Tab label="Integrations" />
        <Tab label="System Logs" />
      </Tabs>

      {/* ---- TAB 1: GENERAL SETTINGS ---- */}
      <TabPanel value={tabIndex} index={0}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              General Settings
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Default Language" value="English" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={darkMode}
                      onChange={(e) => setDarkMode(e.target.checked)}
                    />
                  }
                  label="Enable Dark Mode"
                />
              </Grid>

              <Grid item xs={12} textAlign="right">
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  sx={{ borderRadius: 2 }}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TabPanel>

      {/* ---- TAB 2: PROFILE SETTINGS ---- */}
      <TabPanel value={tabIndex} index={1}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Profile Settings
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Admin Name" placeholder="John Doe" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="Change Password"
                  placeholder="********"
                />
              </Grid>
              <Grid item xs={12} textAlign="right">
                <Button variant="contained" startIcon={<Save />} onClick={handleSave}>
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TabPanel>

      {/* ---- TAB 3: USER MANAGEMENT ---- */}
      <TabPanel value={tabIndex} index={2}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              User Management
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Typography color="text.secondary">
              Manage user roles and permissions here.
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }}>
              View All Users
            </Button>
          </CardContent>
        </Card>
      </TabPanel>

      {/* ---- TAB 4: NOTIFICATIONS ---- */}
      <TabPanel value={tabIndex} index={3}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Notification Preferences
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <FormControlLabel
              control={
                <Switch
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
              }
              label="Enable Email Notifications"
            />
            <Box textAlign="right" mt={2}>
              <Button variant="contained" startIcon={<Save />} onClick={handleSave}>
                Save
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* ---- TAB 5: SECURITY ---- */}
      <TabPanel value={tabIndex} index={4}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Security Settings
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <FormControlLabel control={<Switch />} label="Two-Factor Authentication" />
            <FormControlLabel control={<Switch />} label="Session Timeout Alert" />
            <Box textAlign="right" mt={2}>
              <Button variant="contained" startIcon={<Save />} onClick={handleSave}>
                Apply Security Settings
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* ---- TAB 6: INTEGRATIONS ---- */}
      <TabPanel value={tabIndex} index={5}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Integrations
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="API Key" placeholder="Enter API Key" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Webhook URL" placeholder="https://..." />
              </Grid>
              <Grid item xs={12} textAlign="right">
                <Button variant="contained" startIcon={<Save />} onClick={handleSave}>
                  Save Integration
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TabPanel>

      {/* ---- TAB 7: SYSTEM LOGS ---- */}
      <TabPanel value={tabIndex} index={6}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              System Logs
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Typography color="text.secondary">
              View audit trails and recent activity.
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }}>
              View Logs
            </Button>
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  );
};

export default AdminSettings;
