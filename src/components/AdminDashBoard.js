import React, { useMemo, useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Avatar,
  IconButton,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Switch,
} from "@mui/material";
import { motion } from "framer-motion";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./AdminDashBoard.css";

export default function AdminDashboard() {
  const location = useLocation();
  const role = location.state?.role || "ADMIN";
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // 🌗 Dark/Light Mode Toggle
  const [mode, setMode] = useState("light");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default:
              mode === "light"
                ? "linear-gradient(135deg, #f8f9fa, #e9ecef)"
                : "linear-gradient(135deg, #1c1c1c, #121212)",
            paper: mode === "light" ? "#ffffffdd" : "#1e1e1edd",
          },
          text: {
            primary: mode === "light" ? "#212529" : "#f8f9fa",
            secondary: mode === "light" ? "#6c757d" : "#adb5bd",
          },
        },
      }),
    [mode]
  );

  const dashboardItems = [
    { title: "Employee Master", link: "/employermasterlist", color: "#007bff", icon: "bi-people-fill" },
    { title: "Client Master", link: "/clientlist", color: "#28a745", icon: "bi-person-badge-fill" },
    { title: "Bank Master", link: "/bankmasterlist", color: "#17a2b8", icon: "bi-bank" },
    { title: "Demat Master", link: "/dematmaster-list", color: "#ffc107", icon: "bi-wallet2" },
    { title: "Security Master", link: "/securitymasterlist", color: "#dc3545", icon: "bi-shield-lock-fill" },
    { title: "Property Master", link: "/display-property", color: "#6c757d", icon: "bi-house-door-fill" },
    { title: "Tax-Year Master", link: "/tax-year-form", color: "#343a40", icon: "bi-calendar3" },
    { title: "Financial-Year Master", link: "/financial-year", color: "#343a40", icon: "bi-calendar3" },
  ];

  // 🌀 Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (!isPaused) {
        scrollContainer.scrollLeft += 1; // adjust speed (1 = slow, 2 = faster)
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0; // loop back
        }
      }
    };

    const interval = setInterval(scroll, 30); // speed of animation
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          py: 5,
          px: { xs: 2, md: 5 },
          minHeight: "100vh",
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
          transition: "background 0.5s, color 0.5s",
        }}
      >
        {/* 🌗 Theme Toggle Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mb: 2,
            pr: 2,
          }}
        >
          <Typography sx={{ mr: 1, fontSize: "0.9rem" }}>
            {mode === "light" ? "Light Mode" : "Dark Mode"}
          </Typography>
          <Switch
            checked={mode === "dark"}
            onChange={() => setMode(mode === "light" ? "dark" : "light")}
            color="default"
          />
          <IconButton
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            color="inherit"
          >
            {mode === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Box>

        {/* Title Section */}
        <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 1 }}>
          Admin Dashboard
        </Typography>
        <Typography
          align="center"
          sx={{ mb: 4, color: theme.palette.text.secondary, fontSize: "1rem" }}
        >
          Logged in as: <strong>{role}</strong>
        </Typography>

        {/* 🔹 Scrollable & Auto-Scrolling Cards Section */}
        <Box
          className="scrollable-dashboard"
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {dashboardItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card
                className="dashboard-card"
                sx={{
                  borderRadius: "15px",
                  width: 220,
                  height: 260,
                  textAlign: "center",
                  mx: 1,
                  boxShadow:
                    mode === "light"
                      ? "0 4px 15px rgba(0,0,0,0.08)"
                      : "0 4px 15px rgba(255,255,255,0.1)",
                  background: theme.palette.background.paper,
                  backdropFilter: "blur(6px)",
                  "&:hover": {
                    boxShadow:
                      mode === "light"
                        ? "0 8px 20px rgba(0,0,0,0.15)"
                        : "0 8px 20px rgba(255,255,255,0.2)",
                  },
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      bgcolor: item.color,
                      width: 60,
                      height: 60,
                      margin: "auto",
                      mb: 1.5,
                    }}
                  >
                    <i
                      className={`${item.icon} text-white`}
                      style={{ fontSize: "1.4rem" }}
                    ></i>
                  </Avatar>

                  <Typography
                    variant="h6"
                    fontWeight="600"
                    sx={{ mb: 1, fontSize: "1rem" }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      color: theme.palette.text.secondary,
                      fontSize: "0.8rem",
                    }}
                  >
                    Manage all{" "}
                    {item.title.replace("Master", "").trim().toLowerCase()} data
                    here.
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                  <Button
                    component={Link}
                    to={item.link}
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      px: 2.5,
                      py: 0.8,
                      borderRadius: "10px",
                      backgroundColor: item.color,
                      fontSize: "0.8rem",
                      "&:hover": {
                        backgroundColor: theme.palette.grey[900],
                        color: "#fff",
                      },
                    }}
                  >
                    Go to
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
