"use client";
import React, { useContext, useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import { authenticate } from "@/action/authAction";
import ModalReactive from "./modal.reactive";
import ModalForgotPassword from "./modal.forgotPassword";
import ModalRegister from "./modal.register";
import { AppContext } from "@/context/AppProvider";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function LoginPageClient() {
  const { openSnackbar } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [openVerify, setOpenVerify] = useState(false);
  const [openForgot, setOpenForgot] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const handleLogin = async (e: React.FormEvent<SignInFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.password.value;
    const res = await authenticate(email, password);
    if (res?.error) {
      // alert(res.error);
      openSnackbar({ message: res.error, color: "danger" });
      if (res.code === 2) {
        setOpenVerify(true);
      }
    } else {
      window.location.href = "/";
    }
  };
  return (
    <>
      <form onSubmit={handleLogin} style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "5px",
      }}>
        <FormControl required>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl required>
          <FormLabel>Mật khẩu</FormLabel>
          <Input type="password" name="password" />
        </FormControl>
        <Stack sx={{ gap: 2, mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link level="title-sm" onClick={() => setOpenForgot(true)}>
              Quên mật khẩu?
            </Link>
            <Link level="title-sm" onClick={() => setOpenRegister(true)}>
              Bạn chưa có tài khoản? Đăng ký ngay
            </Link>
          </Box>
          <Button type="submit" fullWidth color="success">
            Đăng nhập
          </Button>
        </Stack>
      </form>
      <ModalReactive open={openVerify} setOpen={setOpenVerify} email={email} />
      <ModalForgotPassword
        open={openForgot}
        setOpen={setOpenForgot}
        email={email}
      />
      <ModalRegister open={openRegister} setOpen={setOpenRegister} />
    </>
  );
}
