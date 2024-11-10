"use client";
import React, { useContext } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/AppProvider";
import { sendRequest } from "@/utils/api";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  rePassword: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function RegisterPageClient() {
  const { openSnackbar } = useContext(AppContext);
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent<SignInFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.password.value;
    const rePassword = e.currentTarget.elements.rePassword.value;
    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/auth/register`,
      body: {
        email,
        password,
        rePassword,
      },
    });
    if (res?.error) {
      alert(res.error);
    }else{
      openSnackbar({ message: "Đăng ký thành công", color: "success" });
      router.push(`/verify/${res?.data?.data._id}`)
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
          />
        </FormControl>
        <FormControl required>
          <FormLabel>Mật khẩu</FormLabel>
          <Input type="password" name="password" />
        </FormControl>
        <FormControl required>
          <FormLabel>Nhập lại mật khẩu</FormLabel>
          <Input type="password" name="rePassword" />
        </FormControl>
        <Stack sx={{ gap: 2, mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link level="title-sm" href="/login">
              Bạn đã có tài khoản? Đăng nhập ngay
            </Link>
          </Box>
          <Button type="submit" fullWidth color="success">
            Đăng ký
          </Button>
        </Stack>
      </form>
    </>
  );
}
