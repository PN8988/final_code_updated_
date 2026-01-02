import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const WelcomeCard = ({ client }) => (
  <Card sx={{ mb: 3, p: 2, backgroundColor: "#f0f4f8" }}>
    <CardContent>
      <Typography variant="h5" fontWeight="bold">
        {/* Welcome to Trinity Consultancy Services, {client.email || "Client"}! */}
         Welcome to Trinity Consultancy Services, {client.fullName || "Client"}!
      </Typography>
      {/* {client.email && (
        <Typography variant="body1">Email: {client.email}</Typography>
      )} */}
       {client.fullName && (
        <Typography variant="body1">Full Name: {client.fullName}</Typography>
      )}
      {client.mobileNumber && (
        <Typography variant="body1">Mobile: {client.mobileNumber}</Typography>
      )}
    </CardContent>
  </Card>
);

export default WelcomeCard;
