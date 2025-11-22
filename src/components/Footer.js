import React from "react";
import { Box, Typography, Button } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0b3d2e",
        color: "#c0c0c0",
        py: 3,
        px: 4,
        mt: 6,
        textAlign: "center",
        position: "relative",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Trinity Consultancy Services. All Rights Reserved.
      </Typography>

      <Box
        sx={{
          backgroundColor: "#f2f2f2",
          py: 2,
          px: 4,
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" sx={{ color: "gray" }}>
          We use cookies to ensure you get the best experience.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0b3d2e",
            color: "white",
            borderRadius: "10px",
            textTransform: "none",
          }}
        >
          GOT IT
        </Button>
      </Box>
    </Box>
  );
};

export default Footer;
