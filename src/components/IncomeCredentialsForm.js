import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock, Badge } from "@mui/icons-material";

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

export default function IncomeCredentialsForm({ onSave }) {
  const [form, setForm] = useState({
    incomeId: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const newErrors = {};

    if (!form.incomeId) {
      newErrors.incomeId = "PAN ID is required";
    } else if (!panRegex.test(form.incomeId.toUpperCase())) {
      newErrors.incomeId = "Enter valid PAN (ABCDE1234F)";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = () => {
    if (!validate()) return;

    const payload = {
      incomeId: form.incomeId.toUpperCase(),
      password: form.password,
    };

    console.log("Income Credentials:", payload);

    onSave?.(payload);
    setSnackbar(true);
  };

  /* ---------------- UI ---------------- */
  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Card sx={{ width: 420, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Income Credentials
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            Enter Income Tax login details
          </Typography>

          {/* PAN / Income ID */}
          <TextField
            fullWidth
            label="Income ID (PAN)"
            placeholder="ABCDE1234F"
            value={form.incomeId}
            onChange={(e) =>
              setForm({ ...form, incomeId: e.target.value.toUpperCase() })
            }
            error={!!errors.incomeId}
            helperText={errors.incomeId}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Badge fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          {/* PASSWORD */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            error={!!errors.password}
            helperText={errors.password}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.2, borderRadius: 2 }}
            onClick={handleSubmit}
          >
            Save Credentials
          </Button>
        </CardContent>
      </Card>

      {/* SUCCESS MESSAGE */}
      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(false)}
      >
        <Alert severity="success" variant="filled">
          Income credentials saved successfully
        </Alert>
      </Snackbar>
    </Box>
  );
}
