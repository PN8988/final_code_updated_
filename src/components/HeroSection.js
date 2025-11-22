import React from "react";
import { Box, Typography, Button } from "@mui/material";
//import heroImage from "../images/investments.jpg"; // add any finance-related banner image

const HeroSection = () => {
  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
        px: 8,
      }}
    >
      <Box sx={{ width: "50%" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#0b3d2e", mb: 2 }}>
          Build Your Financial Future With Confidence
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "gray", fontSize: "1.1rem" }}>
          Expert consultancy in investments, tax planning, and wealth management.
          Let’s create a strategy that grows your assets and secures your future.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0b3d2e",
            color: "#fff",
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": { backgroundColor: "#09442b" },
          }}
        >
          Get Started
        </Button>
      </Box>

      <Box sx={{ width: "45%" }}>
        <img
          src="../images/investments.jpg"
          alt="Financial planning"
          style={{
            width: "100%",
            borderRadius: "12px",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
          }}
        />
      </Box>
    </Box>
  );
};

export default HeroSection;
