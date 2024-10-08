"use client";
import { authenticate } from "@/utils/action";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ModalReactive from "./modal.reactive";
import ModalForgotPassword from "./modal.forgotPassword";

const LoginPageClient = () => {
  const [email, setEmail] = useState("");
  const [openVerify, setOpenVerify] = useState(false);
  const [openForgot, setOpenForgot] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async () => {
    const res = await authenticate(email, password);
    console.log(res);
    if (res?.error) {
      alert(res.error);
      if (res.code === 2) {
        setOpenVerify(true);
      }
    } else {
      router.push("/dashboard");
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
          alignItems: "center",
        }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleLogin();
          }}
        >
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                autoFocus
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                required
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Typography variant="plain">
                <Link onClick={() => setOpenForgot(true)}>Forgot password?</Link>
              </Typography>
            </FormControl>
            <Button type="submit">Login</Button>
          </Stack>
        </form>
      </Box>
      <ModalReactive open={openVerify} setOpen={setOpenVerify} email={email} />
      <ModalForgotPassword open={openForgot} setOpen={setOpenForgot} email={email} />
    </>
  );
};

export default LoginPageClient;
