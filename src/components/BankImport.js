import React, { useState } from "react";
import axios from "axios";
import { Button, Box, Typography, CircularProgress } from "@mui/material";

const BankImport = ({ onImportSuccess }) => {
  const [file, setFile] = useState(null);
  const [batchId] = useState("BATCH001");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("batchId", batchId);

    try {
      setLoading(true);
      setMessage("");

      // Upload file
      await axios.post("http://localhost:8080/api/bank/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Fetch updated list
      if (onImportSuccess) onImportSuccess();
      setMessage("✅ File imported successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("❌ Error importing file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={loading}
        sx={{ borderRadius: 2 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Upload"}
      </Button>
      {message && (
        <Typography
          variant="body2"
          color={message.startsWith("✅") ? "success.main" : "error.main"}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default BankImport;
