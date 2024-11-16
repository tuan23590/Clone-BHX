'use client';
import { Box, Button, Link, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFoundPage() {
  const [time, setTime] = useState(30);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (time === 0) {
      router.push("/");
    }
  } , [time]);
  return (
    <Box sx={{
      width: {xs: "100vw", sm: "auto"},
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "51vh",
      backgroundColor: "white",
    }}>
      <img
        src="https://cdnv2.tgdd.vn/bhx/prod-fe/home/_next/public/static/images/page-500.svg"
        alt="404"
        width={300}
      />
      <Typography level="h4" my={3}>
        Không tìm thấy trang
      </Typography>
      <Button variant="solid" color="success">
        {" "}
        <Link href="/" underline="none" sx={{
          color: "white",
        }}>
        Trở về trang chủ ({time}s)
        </Link>{" "}
      </Button>
    </Box>
  );
}
