"use client";
import { sendRequest } from "@/utils/api";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Verify({ _id }: { _id: string }) {
  const [verifyCode, setVerifyCode] = useState("");
  const route = useRouter();
  const handleVerify = async () => {
    const res= await sendRequest<IBackendRes<any>>({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/auth/verify`,
        body: {
            verifyCode,
            _id
        }
      })
      if (res?.data) {
        alert('Verify success')
        route.push(`/login`)
      } else {
        alert(res?.message)
      }
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
        Verify Page
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
          label="Code"
          value={verifyCode}
          onChange={(e) => setVerifyCode(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleVerify}>
            Verify
        </Button>
      </Box>
    </Box>
  );
}
