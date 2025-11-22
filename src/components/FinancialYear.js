import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { AddCircle, Save, Edit } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";

const FinancialYear = ({ onSelectYear }) => {
  const [financialYears, setFinancialYears] = useState([]);
  const [newYearLabel, setNewYearLabel] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editYearId, setEditYearId] = useState(null);

  // ✅ Fetch all financial years
  useEffect(() => {
    fetchFinancialYears();
  }, []);

  const fetchFinancialYears = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/financialYear");
      setFinancialYears(res.data);
    } catch (error) {
      console.error("Error fetching financial years:", error);
    }
  };

  // ✅ Auto-generate label when start or end date changes
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const startYear = start.getFullYear();
      const endYear = end.getFullYear();
      setNewYearLabel(`${startYear}-${endYear}`);
    }
  }, [startDate, endDate]);

  // ✅ Validate Financial Year range (April 1 to March 31)
  const isValidFinancialYear = (start, end) => {
    const startDt = new Date(start);
    const endDt = new Date(end);
    const isStartApril = startDt.getMonth() === 3 && startDt.getDate() === 1; // April 1
    const isEndMarch = endDt.getMonth() === 2 && endDt.getDate() === 31; // March 31
    const validDuration =
      endDt.getFullYear() - startDt.getFullYear() === 1 && isStartApril && isEndMarch;
    return validDuration;
  };

  // ✅ Add or Update Financial Year
  const handleSaveYear = async () => {
    if (!startDate || !endDate)
      return alert("Please select both start and end dates.");
    if (!isValidFinancialYear(startDate, endDate))
      return alert("Financial Year must be from 1st April to 31st March of next year.");

    const newYear = {
      yearLabel: newYearLabel,
      startDate,
      endDate,
      active: true,
    };

    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:8080/api/financialYear/${editYearId}`,
          newYear
        );
      } else {
        await axios.post("http://localhost:8080/api/financialYear", newYear);
      }
      setNewYearLabel("");
      setStartDate("");
      setEndDate("");
      setIsEditing(false);
      setEditYearId(null);
      fetchFinancialYears();
    } catch (error) {
      console.error("Error saving financial year:", error);
    }
  };

  // ✅ Edit existing year
  const handleEdit = (year) => {
    setNewYearLabel(year.yearLabel);
    setStartDate(year.startDate || "");
    setEndDate(year.endDate || "");
    setIsEditing(true);
    setEditYearId(year.id);
  };

  // ✅ Toggle active status
  const handleToggleActive = async (year) => {
    try {
      await axios.put(`http://localhost:8080/api/financialYear/${year.id}`, {
        ...year,
        active: !year.active,
      });
      fetchFinancialYears();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // ✅ Select financial year globally (prop to parent)
  const handleSelectYear = (year) => {
    if (onSelectYear) onSelectYear(year);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            className="mb-3 text-center"
            style={{ fontWeight: "bold" }}
          >
            Financial Year Management
          </Typography>

          {/* Input Section */}
          <Grid container spacing={2} alignItems="center" className="mb-3">
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                InputLabelProps={{ shrink: true }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Financial Year (auto)"
                value={newYearLabel}
                onChange={(e) => setNewYearLabel(e.target.value)}
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={3} className="text-center">
              <Button
                variant="contained"
                color={isEditing ? "success" : "primary"}
                onClick={handleSaveYear}
                startIcon={isEditing ? <Save /> : <AddCircle />}
              >
                {isEditing ? "Update Year" : "Add Year"}
              </Button>
            </Grid>
          </Grid>

          {/* Table Section */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Year Label</strong></TableCell>
                  <TableCell><strong>Start Date</strong></TableCell>
                  <TableCell><strong>End Date</strong></TableCell>
                  <TableCell><strong>Active</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {financialYears.map((year, index) => (
                  <TableRow
                    key={index}
                    hover
                    onClick={() => handleSelectYear(year)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>{year.id}</TableCell>
                    <TableCell>{year.yearLabel}</TableCell>
                    <TableCell>{year.startDate}</TableCell>
                    <TableCell>{year.endDate}</TableCell>
                    <TableCell>
                      <Switch
                        checked={year.active}
                        onChange={() => handleToggleActive(year)}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton color="secondary" onClick={() => handleEdit(year)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FinancialYear;
