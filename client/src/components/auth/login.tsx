"use client";
import { authenticate } from "@/utils/action";
import { Box, Button, TextField, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

const LoginPageClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await authenticate(email, password);
    console.log("res: ",res);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" mb={2}>
        Login Page
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: 300,
        }}
      >
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPageClient;
