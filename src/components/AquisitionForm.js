import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AquisitionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { client, property } = location.state || {};

  const [clientData, setClientData] = useState(client || {});
  const [propertyData, setPropertyData] = useState({
    propId: property?.assetId || "",
    assetItemValue: property?.ledgerName || "",
    occupancy: property?.occupancy || "",
    unitNo: property?.unitNo || "",
  });

  const [assets, setAssets] = useState([
    { date: "", label: "Agreement Value", amount: "", share: "" },
    { date: "", label: "Stamp Duty", amount: "", share: "" },
    { date: "", label: "Registration Fees", amount: "", share: "" },
  ]);
  const [owners, setOwners] = useState([
    { ownerName: client?.clientName || "", ownerPan: client?.panId || "", share: "100" },
  ]);
  const [numOwners, setNumOwners] = useState(1);
  const [receivedAmount, setReceivedAmount] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [totalSharePercent, setTotalSharePercent] = useState(0);
  const [totalShareAmount, setTotalShareAmount] = useState(0);

  // 🔹 Helper Calculations
  const calculateTotalAssetAmount = () =>
    assets.reduce((sum, a) => sum + (parseFloat(a.amount) || 0), 0).toFixed(2);

  const handleAssetChange = (index, field, value) => {
    const updated = [...assets];
    updated[index][field] = value;
    if (field === "date" && index === 0) {
      updated[1].date = value;
      updated[2].date = value;
    }
    if (field === "share" && index === 0) {
      updated.forEach((row) => (row.share = value));
      const updatedOwners = [...owners];
      if (updatedOwners[0]) updatedOwners[0].share = value;
      setOwners(updatedOwners);
    }
    setAssets(updated);
  };

  const handleOwnerChange = (index, field, value) => {
    const updated = [...owners];
    updated[index][field] = value;
    if (field === "share" && index !== 0) {
      const sumExclLast = updated
        .slice(0, -1)
        .reduce((sum, o, i) => (i === 0 ? sum + (parseFloat(assets[0]?.share) || 0) : sum + (parseFloat(o.share) || 0)), 0);
      updated[updated.length - 1].share = Math.max(0, 100 - sumExclLast).toFixed(2);
    }
    setOwners(updated);
  };

  const handleNumOwnersChange = (value) => {
    const count = parseInt(value);
    setNumOwners(count);
    if (!isNaN(count) && count > 0) {
      const assetShare = parseFloat(assets[0]?.share) || 0;
      const remaining = 100 - assetShare;
      const newOwners = [
        { ownerName: clientData.clientName || "", ownerPan: clientData.panId || "", share: assetShare.toString() },
      ];
      let tempRemaining = remaining;
      for (let i = 1; i < count; i++) {
        const share = i === count - 1 ? tempRemaining.toFixed(2) : "";
        newOwners.push({ ownerName: "", ownerPan: "", share: share });
      }
      setOwners(newOwners);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const agreementValue = parseFloat(assets[0]?.amount || 0);
    const stampDuty = parseFloat(assets[1]?.amount || 0);
    const registrationFees = parseFloat(assets[2]?.amount || 0);
    const govtValue = parseFloat(receivedAmount || 0);
    const percentShare = parseFloat(owners[0]?.share || 0);

    const shareAmount = parseFloat(
      ((percentShare / 100) * (agreementValue + stampDuty + registrationFees)).toFixed(2)
    );

    const payload = {
      aquisitionId: Date.now(),
      residentialProp: { assetId: propertyData.propId },
      noOfOwners: numOwners,
      date: assets[0]?.date || "",
      agreementValue,
      stampDuty,
      registrationFees,
      govtValue,
      ownerName: owners[0]?.ownerName || "",
      ownerPan: owners[0]?.ownerPan || "",
      percentShare,
      shareAmount,
      totalAmount: parseFloat(assets.reduce((acc, a) => acc + (parseFloat(a.amount || 0)), 0)),
    };

    try {
      await axios.post("http://localhost:8080/api/residential/addAquisitions", payload, {
        headers: { "Content-Type": "application/json" },
      });
      alert("✅ Agreement saved successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Failed to save");
    }
  };

  return (
    <Box className="container mt-4">
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          🏠 Acquisition Form
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Client Info */}
        <Card variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 3 }}>
          <Typography variant="h6" color="primary">
            Client & Property Information
          </Typography>
          <Grid container spacing={2} className="mt-2">
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Client Name" value={clientData.clientName || ""} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Client PAN" value={clientData.panId || ""} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Property ID" value={propertyData.propId || ""} InputProps={{ readOnly: true }} />
            </Grid>
          </Grid>
        </Card>

        {/* Agreement Section */}
        <Card variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 3 }}>
          <Typography variant="h6" color="primary">
            Agreement Details
          </Typography>
          <Grid container spacing={2} className="mt-2">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="No. of Owners"
                value={numOwners}
                onChange={(e) => handleNumOwnersChange(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Govt Value"
                type="number"
                value={receivedAmount}
                onChange={(e) => setReceivedAmount(e.target.value)}
              />
            </Grid>
          </Grid>

          <Table className="mt-3" bordered hover>
            <TableHead>
              <TableRow>
                <TableCell>Sr.No</TableCell>
                <TableCell>Property ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Share %</TableCell>
                <TableCell>Share Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assets.map((asset, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{propertyData.propId}</TableCell>
                  <TableCell>
                    <TextField type="date" value={asset.date} onChange={(e) => handleAssetChange(idx, "date", e.target.value)} />
                  </TableCell>
                  <TableCell>{asset.label}</TableCell>
                  <TableCell>
                    <TextField type="number" value={asset.amount} onChange={(e) => handleAssetChange(idx, "amount", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <TextField type="number" value={asset.share} onChange={(e) => handleAssetChange(idx, "share", e.target.value)} />
                  </TableCell>
                  <TableCell>₹{((asset.amount * asset.share) / 100).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Owner Section */}
        <Card variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 3 }}>
          <Typography variant="h6" color="primary">
            Owner Details
          </Typography>
          <Table className="mt-3">
            <TableHead>
              <TableRow>
                <TableCell>Sr.No</TableCell>
                <TableCell>Owner Name</TableCell>
                <TableCell>Property ID</TableCell>
                <TableCell>Owner PAN</TableCell>
                <TableCell>Share %</TableCell>
                <TableCell>Share Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {owners.map((o, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <TextField
                      value={o.ownerName}
                      onChange={(e) => handleOwnerChange(idx, "ownerName", e.target.value)}
                      InputProps={{ readOnly: idx === 0 }}
                    />
                  </TableCell>
                  <TableCell>{propertyData.propId}</TableCell>
                  <TableCell>
                    <TextField
                      value={o.ownerPan}
                      onChange={(e) => handleOwnerChange(idx, "ownerPan", e.target.value)}
                      InputProps={{ readOnly: idx === 0 }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={o.share}
                      onChange={(e) => handleOwnerChange(idx, "share", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    ₹{(((o.share || 0) / 100) * (parseFloat(assets[0]?.amount || 0))).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Action Buttons */}
        {/* Action Buttons */}
<Box className="d-flex justify-content-between mt-4">
  <Box>
    <Button variant="outlined" sx={{ mr: 2 }} onClick={() => navigate(-1)}>
      ← Back
    </Button>

    <Button
      variant="outlined"
      color="secondary"
      sx={{ mr: 2 }}
      onClick={() =>
        navigate("/aquisition", {
          state: { client: clientData, property: propertyData },
        })
      }
    >
      👁️ View
    </Button>

    <Button
      variant="outlined"
      color="success"
      onClick={() =>
        navigate("/client/assets", {
          state: { client: clientData },
        })
      }
    >
      📊 Go to Asset List
    </Button>
  </Box>

  <Button variant="contained" color="primary" onClick={handleSubmit}>
    {isEditMode ? "Update" : "Save"}
  </Button>
</Box>

      </Card>
    </Box>
  );
};

export default AquisitionForm;
