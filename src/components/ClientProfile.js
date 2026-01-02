
// import React, { useState, useEffect, useMemo } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Stepper,
//   Step,
//   StepLabel,
//   Button,
//   Snackbar,
//   Alert,
//   Tabs,
//   Tab,
//   Fade,
//   Chip,
//   Avatar,
//   useTheme,
// } from "@mui/material";

// import PersonIcon from "@mui/icons-material/Person";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import WorkIcon from "@mui/icons-material/Work";
// import HomeIcon from "@mui/icons-material/Home";
// import DescriptionIcon from "@mui/icons-material/Description";
// import MenuBookIcon from "@mui/icons-material/MenuBook";

// import WelcomeCard from "../components/pages/WelcomeCard";
// import KycForm from "./KycForm";
// import BankForm from "./BankForm";
// import DematForm from "./DematForm";
// import EmployerForm from "./EmployerForm";
// import ResidentialPropAdd from "./ResidentialPropAdd";

// const steps = [
//   "KYC Details",
//   "Bank Accounts",
//   "Demat Accounts",
//   "Employment Info",
//   "Property Investment",
//   "Documents",
//   "Client Menu",
// ];

// const stepIcons = [
//   <PersonIcon />,
//   <AccountBalanceIcon />,
//   <AccountBalanceWalletIcon />,
//   <WorkIcon />,
//   <HomeIcon />,
//   <DescriptionIcon />,
//   <MenuBookIcon />,
// ];

// const ClientProfile = () => {
//   const location = useLocation();
//   const theme = useTheme();

//   // Safe client data load
//   const [clientData, setClientData] = useState(
//     location.state?.selectedClient ||
//       location.state?.client ||
//       location.state ||
//       {}
//   );

//   const [profileId, setProfileId] = useState(null);
//   const [activeStep, setActiveStep] = useState(0);
//   const [popup, setPopup] = useState({ show: false, message: "", type: "" });
//   const [photoUrl, setPhotoUrl] = useState("");

//   // Determine PAN safely
//   const pan =
//     clientData?.pan ||
//     clientData?.panId ||
//     clientData?.clientPan ||
//     clientData?.selectedPan;

//   // Fetch ClientProfile by PAN
//   useEffect(() => {
//     if (!pan) return;

//     axios
//       .get(`http://localhost:8080/api/clients/${pan}`)
//       .then((res) => setProfileId(res.data.profileId))
//       .catch((err) => console.log("Profile fetch failed:", err));
//   }, [pan]);

//   // Fetch profile photo
//   useEffect(() => {
//     if (!clientData?.email) return;

//     axios
//       .get(`http://localhost:8080/api/register/photo/${clientData.email}`, {
//         responseType: "blob",
//       })
//       .then((res) => setPhotoUrl(URL.createObjectURL(res.data)))
//       .catch(() => {});
//   }, [clientData?.email]);

//   useEffect(() => {
//   fetch("http://localhost:8080/api/users/me", {
//     method: "GET",
//     credentials: "include", // VERY IMPORTANT
//   })
//     .then(res => res.json())
//     .then(data => {
//       setUser(data);
//     })
//     .catch(err => console.error(err));
// }, []);

//   // Fetch Registration info
//   useEffect(() => {
//     if (!clientData?.loginId) return;

//     axios
//       .get(`http://localhost:8080/api/register/${clientData.loginId}`)
//       .then((res) =>
//         setClientData((prev) => ({
//           ...prev,
//           name: res.data.name,
//           pan: res.data.panId,
//           email: res.data.email,
//           mobile: res.data.mobile,
//           gender: res.data.gender,
//         }))
//       );
//   }, [clientData?.loginId]);

//   // Save Handler
//   const handleSave = async (stepData) => {
//     try {
//       const res = await axios.post(
//         `http://localhost:8080/api/client/update/${clientData.loginId}`,
//         stepData
//       );

//       setClientData((prev) => ({ ...prev, ...res.data }));
//       setPopup({ show: true, message: "Saved successfully", type: "success" });
//     } catch (error) {
//       setPopup({ show: true, message: "Save failed", type: "error" });
//     }
//   };

//   // Step Content Renderer
//   const renderStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <KycForm data={clientData} profileId={profileId} onSave={handleSave} />
//         );
//       case 1:
//         return (
//           <BankForm
//             data={clientData}
//             profileId={profileId}
//             onSave={handleSave}
//           />
//         );
//       case 2:
//         return (
//           <DematForm
//             data={clientData}
//             profileId={profileId}
//             onSave={handleSave}
//           />
//         );
//       case 3:
//         return (
//           <EmployerForm
//             data={clientData}
//             profileId={profileId}
//             onSave={handleSave}
//           />
//         );
//       case 4:
//         return (
//           <ResidentialPropAdd
//             data={clientData}
//             profileId={profileId}
//             onSave={handleSave}
//             skip={() => setActiveStep(5)}
//           />
//         );
//       default:
//         return <Typography>Step not found</Typography>;
//     }
//   };

//   // Avatar initials
//   const avatarInitials = useMemo(() => {
//     const name = clientData?.name || clientData?.fullName || "";
//     if (!name) return "CL";
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .slice(0, 2)
//       .join("")
//       .toUpperCase();
//   }, [clientData]);

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 } }}>
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           gap: 2,
//           flexDirection: { xs: "column", md: "row" },
//           alignItems: { xs: "stretch", md: "center" },
//           mb: 2,
//         }}
//       >
//         <WelcomeCard client={clientData} />

//         <Box sx={{ display: "flex", gap: 1, alignItems: "center", ml: "auto" }}>
//           <Chip
//             label={clientData?.status || "Active"}
//             color="primary"
//             sx={{ px: 2, fontWeight: 600 }}
//           />
//           <Avatar src={photoUrl} sx={{ width: 120, height: 120 }}>
//             {!photoUrl && avatarInitials}
//           </Avatar>
//         </Box>
//       </Box>

//       {/* Tabs */}
//       <Card sx={{ mb: 2 }}>
//         <CardContent sx={{ p: 1 }}>
//           <Tabs
//             value={activeStep}
//             onChange={(e, val) => setActiveStep(val)}
//             variant="scrollable"
//             scrollButtons="auto"
//           >
//             {steps.map((label, idx) => (
//               <Tab
//                 key={label}
//                 icon={stepIcons[idx]}
//                 iconPosition="start"
//                 label={label}
//               />
//             ))}
//           </Tabs>
//         </CardContent>
//       </Card>

//       {/* Stepper */}
//       <Stepper activeStep={activeStep} sx={{ my: 2 }} alternativeLabel>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>

//       {/* Content */}
//       <Fade in={true} key={activeStep}>
//         <Card>
//           <CardContent sx={{ minHeight: 320 }}>
//             {renderStepContent(activeStep)}
//           </CardContent>
//         </Card>
//       </Fade>

//       {/* Navigation Buttons */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
//         <Button
//           disabled={activeStep === 0}
//           onClick={() => setActiveStep((s) => s - 1)}
//           variant="outlined"
//         >
//           Back
//         </Button>

//         {activeStep < steps.length - 1 ? (
//           <Button onClick={() => setActiveStep((s) => s + 1)} variant="contained">
//             Next
//           </Button>
//         ) : (
//           <Button variant="contained" disabled>
//             Completed
//           </Button>
//         )}
//       </Box>

//       {/* Snackbar */}
//       <Snackbar
//         open={popup.show}
//         autoHideDuration={3000}
//         onClose={() => setPopup({ ...popup, show: false })}
//       >
//         <Alert severity={popup.type}>{popup.message}</Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default ClientProfile;


import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Box, Card, CardContent, Typography, Stepper, Step,
  StepLabel, Button, Snackbar, Alert, Tabs, Tab,
  Fade, Avatar, useTheme
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import WelcomeCard from "../components/pages/WelcomeCard";
import KycForm from "./KycForm";
import BankForm from "./BankForm";
import DematForm from "./DematForm";
import EmployerForm from "./EmployerForm";
import ResidentialPropAdd from "./ResidentialPropAdd";

const steps = [
  "KYC Details", "Bank Accounts", "Demat Accounts",
  "Employment Info", "Property Investment",
  "Documents", "Client Menu"
];

const stepIcons = [
  <PersonIcon />, <AccountBalanceIcon />, <AccountBalanceWalletIcon />,
  <WorkIcon />, <HomeIcon />, <DescriptionIcon />, <MenuBookIcon />
];

const ClientProfile = () => {
  const location = useLocation();
  const theme = useTheme();

  const loginUser = location.state?.user;
  const loginProfile = location.state?.profile;

  const [user, setUser] = useState(loginUser || null);
  const [clientData, setClientData] = useState(loginProfile || {});
  const [profileId, setProfileId] = useState(loginProfile?.profileId || null);
  const [activeStep, setActiveStep] = useState(0);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const [photoUrl, setPhotoUrl] = useState("");
  const [showFullProfile, setShowFullProfile] = useState(false); // NEW
  

  useEffect(() => {
    if (loginUser?.role === "CLIENT") {
      setUser(loginUser);
      setClientData((prev) => ({
        ...prev,
        ...loginProfile,
        userId: loginUser.userId,
        email: loginUser.email,
        panId:loginUser.panId,
        fullName:loginUser.fullName,
        mobileNumber:loginUser.mobileNumber,
        gender:loginUser.gender,

      }));
      setProfileId(loginProfile?.profileId);
    }
  }, [loginUser, loginProfile]);

  useEffect(() => {
    if (!user) {
      fetch("http://localhost:8080/api/users/me", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(() => {});
    }
  }, [user]);

  useEffect(() => {
    if (!clientData?.email) return;
    axios
      .get(`http://localhost:8080/api/register/photo/${clientData.email}`, {
        responseType: "blob",
      })
      .then((res) => setPhotoUrl(URL.createObjectURL(res.data)))
      .catch(() => {});
  }, [clientData?.email]);

  const handleSave = (savedData) => {
    setClientData((prev) => ({
      ...prev,
      ...savedData,
    }));
    setPopup({
      show: true,
      message: "Saved successfully",
      type: "success",
    });
  };

  const avatarInitials = useMemo(() => {
    const name = clientData?.fullName || "";
    return name
      ? name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
      : "CL";
  }, [clientData]);

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <KycForm  userId={clientData.userId} client={clientData}
             profileId={profileId}
             onSave={handleSave}
             />;
      case 1:
        return <BankForm data={clientData} profileId={profileId} onSave={handleSave} />;
      case 2:
        return <DematForm data={clientData} profileId={profileId} onSave={handleSave} />;
      case 3:
        return <EmployerForm data={clientData} profileId={profileId} onSave={handleSave} />;
      case 4:
        return (
          <ResidentialPropAdd
            data={clientData}
            profileId={profileId}
            onSave={handleSave}
            skip={() => setActiveStep(5)}
          />
        );
      default:
        return <Typography>Step not found</Typography>;
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        p: 3,
        minHeight: "100vh",
        backgroundImage: "url('/images/buisness.webap')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Top-right email/UserID box */}
      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: 30,
          display: "flex",
          alignItems: "center",
          gap: 1,
          backgroundColor: "rgba(255,255,255,0.9)",
          p: 1.5,
          borderRadius: 3,
          boxShadow: 3,
          cursor: "pointer",
          zIndex: 10,
        }}
        onClick={() => setShowFullProfile(true)} // click to show full profile
      >
        <Box>
          <Typography fontSize={13} fontWeight={600}>
            {clientData?.email || "Email"}
          </Typography>
          <Typography fontSize={11}>
            {clientData?.userId || "UserID/ClientID"}
          </Typography>
          {!showFullProfile && (
            <Typography fontSize={11} color="error">
              Click to complete profile
            </Typography>
          )}
        </Box>
      </Box>

      {/* Always show WelcomeCard */}
      <WelcomeCard client={clientData} />

      {/* Show rest only after clicking "Complete Profile" */}
      {showFullProfile && (
        <>
          <Avatar src={photoUrl} sx={{ width: 100, height: 100, mt: 2 }}>
            {!photoUrl && avatarInitials}
          </Avatar>

          <Card sx={{ mt: 2, p: 2, backgroundColor: "rgba(255,255,255,0.9)" }}>
            <Typography>User ID: {clientData.userId}</Typography>
             <Typography>Full Name: {clientData.fullName}</Typography>
            
            <Typography>Email: {clientData.email}</Typography>
            {/* <Typography>PAN: {clientData.panId}</Typography> */}
            <Typography>Mobile: {clientData.mobileNumber}</Typography>
          </Card>

          <Card sx={{ mb: 2, backgroundColor: "rgba(255, 255, 255, 0.27)" }}>
            <CardContent sx={{ p: 1 }}>
              <Tabs
                value={activeStep}
                onChange={(e, val) => setActiveStep(val)}
                variant="scrollable"
              >
                {steps.map((label, idx) => (
                  <Tab key={label} icon={stepIcons[idx]} iconPosition="start" label={label} />
                ))}
              </Tabs>
            </CardContent>
          </Card>

          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Fade in key={activeStep}>
            <Card sx={{ backgroundColor: "rgba(255,255,255,0.95)" }}>
              <CardContent sx={{ minHeight: 320 }}>
                {renderStepContent(activeStep)}
              </CardContent>
            </Card>
          </Fade>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button disabled={activeStep === 0} onClick={() => setActiveStep(s => s - 1)}>
              Back
            </Button>
            <Button onClick={() => setActiveStep(s => s + 1)} variant="contained">
              Next
            </Button>
          </Box>
        </>
      )}

      <Snackbar
        open={popup.show}
        autoHideDuration={3000}
        onClose={() => setPopup({ ...popup, show: false })}
      >
        <Alert severity={popup.type}>{popup.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ClientProfile;




