import React, { useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const AddressForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Coming from KYC Update Page
  const client = location.state?.client || {};

  const [address1, setAddress1] = useState(client.address1 || "");
  const [address2, setAddress2] = useState(client.address2 || "");
  const [pincode, setPincode] = useState(client.pincode || "");
  const [city, setCity] = useState(client.city || "");
  const [district, setDistrict] = useState(client.district || "");
  const [state, setState] = useState(client.state || "");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // -------------------------
  // PINCODE → AUTO FILL API
  // -------------------------
  const fetchPincodeDetails = async (pin) => {
    if (pin.length === 6) {
      try {
        const res = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);
        
        if (res.data[0].Status === "Success") {
          const post = res.data[0].PostOffice[0];

          setCity(post.Block);
          setDistrict(post.District);
          setState(post.State);
        } else {
          setSnackbar({
            open: true,
            message: "Invalid Pincode",
            severity: "error",
          });
        }
      } catch (err) {
        console.error("Error fetching pincode:", err);
      }
    }
  };

  // -------------------------
  // SAVE ADDRESS FUNCTION
  // -------------------------
  const handleSave = async () => {
    try {
      const updatedClient = {
        ...client,
        address1,
        address2,
        pincode,
        city,
        district,
        state,
      };

      // Save API (change URL as per your backend)
      await axios.put(`http://localhost:8080/api/client/update/${client.pan}`, updatedClient);

      setSnackbar({
        open: true,
        message: "Address Updated Successfully!",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/kyc-update", { state: { client: updatedClient } });
      }, 1000);

    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error updating address",
        severity: "error",
      });
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Card sx={{ width: "600px", padding: 2 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Address Details
          </Typography>

          <TextField
            fullWidth
            label="Address Line 1"
            margin="normal"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />

          <TextField
            fullWidth
            label="Address Line 2"
            margin="normal"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />

          <TextField
            fullWidth
            label="Pincode"
            margin="normal"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value);
              fetchPincodeDetails(e.target.value);
            }}
          />

          <TextField fullWidth label="City" margin="normal" value={city} disabled />
          <TextField fullWidth label="District" margin="normal" value={district} disabled />
          <TextField fullWidth label="State" margin="normal" value={state} disabled />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSave}
          >
            Save Address
          </Button>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AddressForm;
