import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Collapse,
  Paper,
  Grid
} from "@mui/material";
import { useLocation } from "react-router-dom";

const AddressComponent = ({ userId: propUserId, onSuccess, onNext}) => {
  const location = useLocation();
  const userId = propUserId || location.state?.userId;

  const [isSaved, setIsSaved] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // ================= FETCH ADDRESS =================
  useEffect(() => {
    if (userId) fetchAddress();
  }, [userId]);


  const handleNext = () => {
  if (!isSaved) {
    setSnackbar({
      open: true,
      message: "Please save address before continuing",
      severity: "warning",
    });
    return;
  }

  if (onNext) {
    onNext(); // move to next step
  }
};

  const fetchAddress = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/address/${userId}`);
      if (res.data) {
        setAddress1(res.data.address1 || "");
        setAddress2(res.data.address2 || "");
        setPincode(res.data.pincode || "");
        setCity(res.data.city || "");
        setDistrict(res.data.district || "");
        setState(res.data.state || "");
        setIsSaved(true);
      }
    } catch (err) {
      console.warn("No existing address or error fetching:", err);
      setIsSaved(false);
    }
  };

  // ================= PINCODE AUTO-FILL =================
  useEffect(() => {
    const timer = setTimeout(() => {
      if (pincode.length === 6) fetchLocation(pincode);
    }, 600);
    return () => clearTimeout(timer);
  }, [pincode]);

  const fetchLocation = async (pin) => {
    try {
      const res = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);
      const po = res.data?.[0]?.PostOffice?.[0];
      if (!po) throw new Error("Invalid pincode");
      setCity(po.Block || "");
      setDistrict(po.District || "");
      setState(po.State || "");
    } catch (err) {
      console.error("Pincode API failed", err);
      setCity("");
      setDistrict("");
      setState("");
    }
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPincode(value);

    if (value.length < 6) {
      setCity("");
      setDistrict("");
      setState("");
    }
  };


  

  // ================= SAVE / UPDATE =================
  const handleSaveOrUpdate = async () => {
    if (!userId) {
      setSnackbar({ open: true, message: "User not found", severity: "error" });
      return;
    }

    if (!address1 || !pincode) {
      setSnackbar({ open: true, message: "Address1 & Pincode required", severity: "error" });
      return;
    }

    const payload = {
      userId,
      address1,
      address2,
      city,
      district,
      state,
      pincode: pincode.toString()
    };

    try {
      if (isSaved) {
        await axios.put(`http://localhost:8080/api/address/updateAddress/${userId}`, payload);
        setSnackbar({ open: true, message: "Address updated successfully", severity: "success" });
      } else {
        await axios.post("http://localhost:8080/api/address/saveByUser", payload);
        setIsSaved(true);
        setSnackbar({ open: true, message: "Address saved successfully", severity: "success" });
        onSuccess({
              address1,
              address2,
              city,
              district,
              state,
              pincode,
          });

      }
    } catch (err) {
      console.error("Error saving address:", err);
      setSnackbar({ open: true, message: "Error saving address", severity: "error" });
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Card sx={{ width: 600, p: 2 }}>
        <CardContent>
          <Typography variant="h6">Address Details</Typography>
          <TextField fullWidth label="Address Line 1" margin="normal" value={address1} onChange={(e) => setAddress1(e.target.value)} />
          <TextField fullWidth label="Address Line 2" margin="normal" value={address2} onChange={(e) => setAddress2(e.target.value)} />
          <TextField
            fullWidth
            label="Pincode"
            margin="normal"
            value={pincode}
            inputProps={{ maxLength: 6 }}
            onChange={handlePincodeChange}
          />
          <TextField fullWidth label="City" margin="normal" value={city} disabled />
          <TextField fullWidth label="District" margin="normal" value={district} disabled />
          <TextField fullWidth label="State" margin="normal" value={state} disabled />

         <Button
  fullWidth
  variant="contained"
  sx={{ mt: 2 }}
  onClick={handleSaveOrUpdate}
>
  {isSaved ? "Update Address" : "Save & Continue"}
</Button>

{isSaved && (
  <>
    <Button
      fullWidth
      variant="outlined"
      sx={{ mt: 1 }}
      onClick={() => setShowAddress((prev) => !prev)}
    >
      {showAddress ? "Hide Address" : "View Address"}
    </Button>

    <Button
      fullWidth
      variant="contained"
      color="success"
      sx={{ mt: 1 }}
      onClick={handleNext}
    >
      Next
    </Button>
  </>
)}


          <Collapse in={showAddress} sx={{ mt: 2 }}>
            <Paper sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
              <Grid container spacing={1}>
                <Grid item xs={12}><b>Address Line 1:</b> {address1}</Grid>
                <Grid item xs={12}><b>Address Line 2:</b> {address2}</Grid>
                <Grid item xs={4}><b>City:</b> {city}</Grid>
                <Grid item xs={4}><b>District:</b> {district}</Grid>
                <Grid item xs={4}><b>State:</b> {state}</Grid>
                <Grid item xs={4}><b>Pincode:</b> {pincode}</Grid>
              </Grid>
            </Paper>
          </Collapse>
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

export default AddressComponent;
