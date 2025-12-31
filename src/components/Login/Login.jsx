// Login.jsx
import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  LinearProgress,
  Typography,
} from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleUsername = (e) => {
    setUsername(e.target.value)
  };

  const handlePassword = (e) => {
    setPassword(e.target.value)
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Please enter username and password.",
      });
      return;
    }

    setLoading(true);
    // simulate async login
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        severity: "success",
        message: "Logged in successfully!",
      });
    }, 2000);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage:
          "url('/nature-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        {/* Title */}
        <Grid
          item
          xs={12}
          sx={{
            position: "absolute",
            top: 60,
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography
            variant="h2"
            sx={{ fontWeight: 600, textShadow: "0 0 10px rgba(0,0,0,0.6)" }}
          >
            find.My.News :)
          </Typography>
        </Grid>

        {/* Login Card */}
        <Grid item xs={11} sm={6} md={4} lg={3}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              bgcolor: "rgba(255,255,255,0.85)",
              borderRadius: 2,
              p: 5,
              boxShadow: 4,
              display: "flex",
              flexDirection: "column",
              gap: 5,
              minHeight: "340px",                  // Minimum height for more space
              minWidth: "400px", 
              alignItems: "center",
              justifyContent: "center", 
            }}
          >
            <TextField
              fullWidth
              label="User Name"
              name="username"
              value={username}
              onChange={handleUsername}
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
              variant="outlined"
              required
            />

            {loading && (
              <LinearProgress
                color="primary"
                sx={{ borderRadius: 1, mt: 1 }}
              />
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mt: 1,
                bgcolor: "#ff7a00",
                "&:hover": { bgcolor: "#ff9800" },
              }}
            >
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar + Alert */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
