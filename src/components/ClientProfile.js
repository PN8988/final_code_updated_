
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Button,
//   Divider,
//   Box,
//   Avatar,
//   IconButton,
//   Drawer,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import PersonIcon from "@mui/icons-material/Person";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./ClientProfile.css";

// const ClientProfile = ({ userRole = "client" }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const [activeTab, setActiveTab] = useState("viewProfile");
//   const [activeSubTab, setActiveSubTab] = useState("Basic Details");
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [kycDetails, setKycDetails] = useState(null);

//   // ✅ Auto-updated client data from ClientList
//   const clientData = location.state?.clientData || {};
//   const selectedClient = location.state?.selectedClient || null;
//   useEffect(() => {
//     if (location.state?.kycData) setKycDetails(location.state.kycData);
//   }, [location.state]);

//   const profileData = {
//     name: clientData.fullName || "Client User",
//     email: clientData.email || "client@example.com",
//     pan: clientData.pan || "N/A",
//     phone: clientData.mobileNo || "N/A",
//   };

//   const handleKycUpdate = () =>
//     navigate("/update-kyc", { state: { clientData } });

//   const handleNavigation = (subTabName) => {
//     switch (subTabName) {
//       case "Bank Accounts":
//         navigate("/bank-list",  { state: { selectedClient } });
//         break;
//       case "Demat Accounts":
//         navigate("/demat-list", { state: { clientData } });
//         break;
//       case "Property Details":
//         navigate("/property-list", { state: { clientData } });
//         break;
//       case "Form-16 / Salary Form":
//         navigate("/form16-upload", { state: { clientData } });
//         break;
//       case "Securities":
//         navigate("/securitymasterlist", { state: { clientData } });
//         break;
//       default:
//         setActiveSubTab(subTabName);
//     }
//   };

//   // ✅ Responsive sidebar toggle
//   const sidebarContent = (
//     <Box sx={{ width: 240, p: 2 }}>
//       <Typography variant="h6" color="primary" gutterBottom>
//         Client Portal
//       </Typography>
//       <Button
//         fullWidth
//         variant={activeTab === "viewProfile" ? "contained" : "outlined"}
//         onClick={() => setActiveTab("viewProfile")}
//       >
//         View Profile
//       </Button>
//     </Box>
//   );

//   // ✅ Reusable function to show client info in all tabs
//   const renderClientInfoHeader = () => (
//     <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 3 }}>
//       <CardContent>
//         <Grid container spacing={2} alignItems="center">
//           <Grid item xs={12} md={2} className="text-center">
//             <Avatar
//               sx={{
//                 bgcolor: "#1976d2",
//                 width: 70,
//                 height: 70,
//                 margin: "auto",
//               }}
//             >
//               <PersonIcon fontSize="large" />
//             </Avatar>
//           </Grid>

//           <Grid item xs={12} md={10}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <Typography><b>Name:</b> {profileData.name}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography><b>Email:</b> {profileData.email}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography><b>PAN:</b> {profileData.pan}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography><b>Phone:</b> {profileData.phone}</Typography>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </CardContent>
//     </Card>
//   );

//   // ✅ Render content based on tab selected
//   const renderActiveTabContent = () => {
//     switch (activeSubTab) {
//       case "Basic Details":
//         return (
//           <>
//             {renderClientInfoHeader()}
//             <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//               <CardContent>
//                 <Box className="d-flex justify-content-between align-items-center mb-2">
//                   <Typography variant="h6" fontWeight={600}>
//                     Basic Details
//                   </Typography>
//                   <Button variant="outlined" onClick={handleKycUpdate}>
//                     Update KYC
//                   </Button>
//                 </Box>
//                 <Divider sx={{ mb: 2 }} />
//                 <Typography>
//                   <b>Full Name:</b> {profileData.name}
//                 </Typography>
//                 <Typography>
//                   <b>Email:</b> {profileData.email}
//                 </Typography>
//                 <Typography>
//                   <b>PAN:</b> {profileData.pan}
//                 </Typography>
//                 <Typography>
//                   <b>Phone:</b> {profileData.phone}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </>
//         );

//       case "Bank Accounts":
//         return (
//           <>
//             {renderClientInfoHeader()}
//             <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   Bank Accounts
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />
//                 <Typography color="text.secondary">
//                   List of bank accounts linked with the client will appear here.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </>
//         );

//       case "Demat Accounts":
//         return (
//           <>
//             {renderClientInfoHeader()}
//             <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   Demat Accounts
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />
//                 <Typography color="text.secondary">
//                   All demat account details related to the client.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </>
//         );

//       case "Property Details":
//         return (
//           <>
//             {renderClientInfoHeader()}
//             <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   Property Details
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />
//                 <Typography color="text.secondary">
//                   Property details of the client will be displayed here.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </>
//         );

//       case "Form-16 / Salary Form":
//         return (
//           <>
//             {renderClientInfoHeader()}
//             <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   Form-16 / Salary Form
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />
//                 <Typography color="text.secondary">
//                   Upload and view Form-16 or Salary details here.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </>
//         );

//       case "Securities":
//         return (
//           <>
//             {renderClientInfoHeader()}
//             <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   Securities
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />
//                 <Typography color="text.secondary">
//                   Securities investments and related information go here.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </>
//         );

//       default:
//         return renderClientInfoHeader();
//     }
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       {/* Mobile Sidebar */}
//       <IconButton
//         onClick={() => setDrawerOpen(true)}
//         sx={{
//           display: { xs: "block", md: "none" },
//           position: "fixed",
//           top: 16,
//           left: 16,
//           zIndex: 1200,
//           bgcolor: "#1976d2",
//           color: "white",
//           "&:hover": { bgcolor: "#1565c0" },
//         }}
//       >
//         <MenuIcon />
//       </IconButton>

//       <Drawer
//         anchor="left"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         sx={{ display: { xs: "block", md: "none" } }}
//       >
//         {sidebarContent}
//       </Drawer>

//       {/* Desktop Sidebar */}
//       <Box
//         sx={{
//           width: 240,
//           p: 2,
//           display: { xs: "none", md: "block" },
//           bgcolor: "#f4f6f8",
//           height: "100vh",
//           boxShadow: 2,
//         }}
//       >
//         {sidebarContent}
//       </Box>

//       {/* Main Content */}
//       <Box sx={{ flexGrow: 1, p: { xs: 3, md: 4 } }}>
//         <Typography variant="h5" gutterBottom>
//           Welcome, <span style={{ color: "#1976d2" }}>{profileData.name}</span> 👋
//         </Typography>

//         {/* ✅ Tabs */}
//         <Box className="d-flex flex-wrap gap-2 mb-3">
//           {[
//             "Basic Details",
//             "Bank Accounts",
//             "Demat Accounts",
//             "Form-16 / Salary Form",
//             "Property Details",
//             "Securities",
//           ].map((tab) => (
//             <Button
//               key={tab}
//               variant={activeSubTab === tab ? "contained" : "outlined"}
//               onClick={() => handleNavigation(tab)}
//             >
//               {tab}
//             </Button>
//           ))}
//         </Box>

//         {/* ✅ Show active tab content with client info header on all */}
//         {renderActiveTabContent()}
//       </Box>
//     </Box>
//   );
// };

// export default ClientProfile;


// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Button,
//   Divider,
//   Box,
// } from "@mui/material";

// const ClientProfile = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const selectedClient = location.state?.selectedClient;

//   if (!selectedClient) {
//     return (
//       <Typography color="error" align="center" mt={4}>
//         No client data found.
//       </Typography>
//     );
//   }

//   const handleAddBankAccount = () => {
//     navigate("/bank-form", { state: { selectedClient } });
//   };

//   return (
//     <Box className="container my-4">
//       <Card elevation={4} className="shadow-sm">
//         <CardContent>
//           <Typography variant="h5" color="primary" gutterBottom align="center">
//             Client Profile
//           </Typography>
//           <Divider sx={{ mb: 2 }} />

//           <Grid container spacing={2}>
//             <Grid item xs={12} md={3}>
//               <Typography fontWeight="bold">Client Name:</Typography>
//               <Typography>{selectedClient.clientName}</Typography>
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <Typography fontWeight="bold">PAN ID:</Typography>
//               <Typography>{selectedClient.panId}</Typography>
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <Typography fontWeight="bold">Email:</Typography>
//               <Typography>{selectedClient.emailId}</Typography>
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <Typography fontWeight="bold">Mobile:</Typography>
//               <Typography>{selectedClient.mobileNumber}</Typography>
//             </Grid>
//           </Grid>

//           <Box textAlign="center" mt={4}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleAddBankAccount}
//             >
//               Add Bank Account
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default ClientProfile;


// ClientProfile.js
import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Avatar,
  IconButton,
  Divider,
  Chip,
  Fade,
  Stack,
  useTheme,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CloseIcon from "@mui/icons-material/Close";

import WelcomeCard from "../components/pages/WelcomeCard";
import KycForm from "./KycForm";
import BankForm from "./BankForm";
import DematForm from "./DematForm";
import EmployerForm from "./EmployerForm";
import ResidentialPropAdd from "./ResidentialPropAdd";


import axios from "axios";



const steps = [
  "KYC Details",
  "Bank Accounts",
  "Demat Accounts",
  "Employment Info",
  "Property Investment",
  "Documents",
  "Client Menu",
];

const stepIcons = [
  <PersonIcon />,
  <AccountBalanceIcon />,
  <AccountBalanceWalletIcon />,
  <WorkIcon />,
  <HomeIcon />,
  <DescriptionIcon />,
  <MenuBookIcon />,
];

const ClientProfile = () => {
  const location = useLocation();
  const client = location.state; // client object passed from login
  const [activeStep, setActiveStep] = useState(0);
  const [clientData, setClientData] = useState(client || {});
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  // View Profile dialog state
  const [openProfileDialog, setOpenProfileDialog] = useState(false);

  const [photoUrl, setPhotoUrl] = useState("");

useEffect(() => {
  if (!clientData?.email) return;

  axios
    .get(`http://localhost:8080/api/register/photo/${clientData.email}`, {
      responseType: "blob",
    })
    .then((res) => {
      setPhotoUrl(URL.createObjectURL(res.data));
    })
    .catch((err) => console.log("Photo load failed", err));
}, [clientData?.email]);

  // fetch full client data from backend
  useEffect(() => {
    if (!client?.loginId) {
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/api/client/${client.loginId}`)
      .then((res) => setClientData(res.data))
      .catch((err) => {
        console.error(err);
        // keep basic client object if backend fails
      })
      .finally(() => setLoading(false));
  }, [client]);

  // Fetch registration details (name, panId, email, mobile, gender)
useEffect(() => {
  if (!client?.loginId) return;

  axios
    .get(`http://localhost:8080/api/register/${client.loginId}`)
    .then((res) => {
      setClientData((prev) => ({
        ...prev,
        name: res.data.name,
        pan: res.data.panId,
        email: res.data.email,
        mobile: res.data.mobile,
        gender: res.data.gender,
      }));
    })
    .catch((err) => console.log("Registration data fetch failed:", err));
}, [client?.loginId]);

  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  // Save step data in real-time (unchanged)
  const handleSave = async (stepData) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/client/update/${client.loginId}`,
        stepData
      );
      setClientData((prev) => ({ ...prev, ...res.data }));
      setPopup({ show: true, message: "Saved successfully", type: "success" });
    } catch (error) {
      console.error(error);
      setPopup({ show: true, message: "Failed to save data", type: "error" });
    }
  };

  // Render step content safely (unchanged)
  const renderStepContent = (step) => {
    if (!clientData) return <Typography>Loading step data...</Typography>;
    switch (step) {
      case 0:
        return <KycForm data={clientData} onSave={handleSave} />;
      case 1:
        return <BankForm data={clientData} onSave={handleSave} />;
      case 2:
        return <DematForm data={clientData} onSave={handleSave} />;
      case 3:
        return <EmployerForm data={clientData} onSave={handleSave} />;
      case 4:
        return (
          <ResidentialPropAdd
            data={clientData}
            onSave={handleSave}
            skip={handleNext}
          />
        );
      // case 5:
      //   return <DocumentChecklist data={clientData} onSave={handleSave} />;
      // case 6:
      //   return <ClientMenuForm data={clientData} />;
      default:
        return <Typography>Step not found</Typography>;
    }
  };

  // derive initials for avatar
  const avatarInitials = useMemo(() => {
    const name = clientData?.name || clientData?.fullName || clientData?.firstName || "";
    if (!name) return "CL";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [clientData]);

  if (loading) return <Typography>Loading client details...</Typography>;

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header area: Welcome + action */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          mb: 2,
        }}
      >
        <WelcomeCard client={clientData} />

        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            ml: "auto",
          }}
        >
          <Chip
            label={clientData?.status || "Active"}
            color="primary"
            sx={{ px: 2, fontWeight: 600 }}
          />

<Avatar
  src={photoUrl}
  sx={{ width: 120, height: 120, border: "3px solid #1976d2" }}
/>

          <Button
          
            variant="outlined"
            onClick={() => setOpenProfileDialog(true)}
            sx={{
              height: 44,
              borderRadius: 2,
              textTransform: "none",
              borderColor: theme.palette.primary.main,
            }}
            startIcon={<PersonIcon />}
          >
            View Profile
          </Button>
        </Box>
      </Box>

      {/* Styled tabs for question flow */}
      <Card sx={{ mb: 2, background: "#f6f9ff" }}>
        <CardContent sx={{ p: 1 }}>
          <Tabs
            value={activeStep}
            onChange={(e, val) => setActiveStep(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTabs-indicator": {
                height: 4,
                borderRadius: 2,
                background: theme.palette.primary.main,
              },
              "& .MuiTab-root": {
                minHeight: 56,
                px: { xs: 1, md: 2 },
                textTransform: "none",
              },
            }}
          >
            {steps.map((label, idx) => (
              <Tab
                key={label}
                icon={stepIcons[idx]}
                iconPosition="start"
                label={label}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: idx === activeStep ? theme.palette.primary.main : "rgba(0,0,0,0.7)",
                  fontWeight: idx === activeStep ? 700 : 500,
                }}
              />
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ my: 2 }} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              sx={{
                "& .MuiStepLabel-label": {
                  fontSize: 12,
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Animated step content area */}
      <Fade in={true} key={activeStep}>
        <Card>
          <CardContent sx={{ minHeight: 320 }}>{renderStepContent(activeStep)}</CardContent>
        </Card>
      </Fade>

      {/* Navigation Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
          sx={{ textTransform: "none" }}
        >
          Back
        </Button>

        <Stack direction="row" spacing={1}>
          <Button
            onClick={() => {
              // go to first step
              setActiveStep(0);
            }}
            variant="text"
            sx={{ textTransform: "none" }}
          >
            First
          </Button>

          {activeStep < steps.length - 1 ? (
            <Button onClick={handleNext} variant="contained" sx={{ textTransform: "none" }}>
              Next
            </Button>
          ) : (
            <Button variant="contained" disabled sx={{ textTransform: "none" }}>
              Completed
            </Button>
          )}
        </Stack>
      </Box>

      {/* Snackbar for save */}
      <Snackbar
        open={popup.show}
        autoHideDuration={3000}
        onClose={() => setPopup({ ...popup, show: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={popup.type} sx={{ width: "100%" }}>
          {popup.message}
        </Alert>
      </Snackbar>

      {/* View Profile Dialog - upgraded UI */}
      <Dialog
        open={openProfileDialog}
        onClose={() => setOpenProfileDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ width: 64, height: 64, bgcolor: theme.palette.primary.main }}>
              <Typography variant="h6" sx={{ color: "#fff" }}>
                {avatarInitials}
              </Typography>
            </Avatar>
            <Box>
              <Typography variant="h6">
                {clientData?.name || clientData?.fullName || clientData?.loginId || "Client"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {clientData?.email || clientData?.contact || clientData?.phone || ""}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Chip label={clientData?.clientType || "Retail"} variant="outlined" />
            <IconButton onClick={() => setOpenProfileDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <Divider />

        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* Personal */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <PersonIcon color="primary" />
                    <Typography variant="subtitle1">Personal</Typography>
                  </Stack>
                  <Box>
                    <Typography variant="body2"><strong>Name:</strong> {clientData?.name || "--"}</Typography>
                    <Typography variant="body2"><strong>Father/Spouse:</strong> {clientData?.fatherName || clientData?.spouseName || "--"}</Typography>
                    <Typography variant="body2"><strong>DOB:</strong> {clientData?.dob || "--"}</Typography>
                    <Typography variant="body2"><strong>PAN:</strong> {clientData?.pan || clientData?.panNumber || "--"}</Typography>
                    <Box>
  <Typography variant="body2"><strong>Gender:</strong> {clientData?.gender || "--"}</Typography>
  
</Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Contact */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <AccountBalanceIcon color="primary" />
                    <Typography variant="subtitle1">Contact</Typography>
                  </Stack>
                  <Box>
                    <Typography variant="body2"><strong>Email:</strong> {clientData?.email || "--"}</Typography>
                    <Typography variant="body2"><strong>Phone:</strong> {clientData?.phone || clientData?.mobile || "--"}</Typography>
                    <Typography variant="body2"><strong>Address:</strong> {clientData?.address || clientData?.city || "--"}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Employment */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <WorkIcon color="primary" />
                    <Typography variant="subtitle1">Employment</Typography>
                  </Stack>
                  <Box>
                    <Typography variant="body2"><strong>Occupation:</strong> {clientData?.occupation || clientData?.job || "--"}</Typography>
                    <Typography variant="body2"><strong>Employer:</strong> {clientData?.employerName || clientData?.company || "--"}</Typography>
                    <Typography variant="body2"><strong>Designation:</strong> {clientData?.designation || "--"}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* KYC / IDs */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <DescriptionIcon color="primary" />
                    <Typography variant="subtitle1">KYC / IDs</Typography>
                  </Stack>
                  <Box>
                    <Typography variant="body2"><strong>Aadhaar:</strong> {clientData?.aadhaar || "--"}</Typography>
                    <Typography variant="body2"><strong>PAN:</strong> {clientData?.pan || "--"}</Typography>
                    <Typography variant="body2"><strong>KYC Status:</strong> {clientData?.kycStatus || "--"}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Additional full-width section (Notes / Meta) */}
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <MenuBookIcon color="primary" />
                    <Typography variant="subtitle1">Notes & Meta</Typography>
                  </Stack>

                  <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-wrap" }}>
                    {clientData?.notes || clientData?.remarks || "No additional notes."}
                  </Typography>

                  <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip label={`LoginId: ${clientData?.loginId || "--"}`} variant="outlined" />
                    <Chip label={`Created: ${clientData?.createdAt ? new Date(clientData.createdAt).toLocaleDateString() : "--"}`} variant="outlined" />
                    <Chip label={`Last Updated: ${clientData?.updatedAt ? new Date(clientData.updatedAt).toLocaleDateString() : "--"}`} variant="outlined" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ClientProfile;


