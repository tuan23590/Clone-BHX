"use client";

import { Box, Container, Grid, Input, Link, Typography } from "@mui/joy";
import Image from "next/image";
import logo from "../../Public/logo.png";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

export default function HomeHeader() {
  return (
    <Box
      sx={{
        background:
          "radial-gradient(159.85% 367.97% at 150% 123.85%, #ffe147 0%, #65ae17 38.76%, #469c4b 59.65%, #00713b 100%)",
        height: "90px", // Đặt chiều cao cho Box để dễ nhìn thấy background
        display: "flex",
      }}
    >
      <Container sx={{ padding: "0px 0px !important" }}>
        <Grid container spacing={2} paddingTop={1}>
          <Grid sm={3}>
            <Image src={logo} alt="logo" width={150} />
            <Typography
              level="h4"
              sx={{
                color: "white",
                display: "flex",
                alignItems: "center",
                padding: "5px 0px",
                backgroundColor: "#00713b",
                borderRadius: "10px 10px 0px 0px",
              }}
            >
              <ViewHeadlineIcon sx={{ color: "white" }} />
              Danh mục sản phẩm
            </Typography>
          </Grid>
          <Grid sm={6}>
            <Input
              placeholder="Tìm kiếm sản phẩm"
              startDecorator={
                <SearchIcon fontSize="large" sx={{ color: "green" }} />
              }
              endDecorator={
                <ShoppingCartOutlinedIcon
                  fontSize="large"
                  sx={{ color: "green" }}
                />
              }
              size="lg"
            />
          </Grid>
          <Grid sm={3}>
            <Link
              href="/login"
              level="h4"
              sx={{
                color: "white",
                display: "flex",
                height: "50%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#00713b",
                borderRadius: "10px",
                '&:hover': {
                  backgroundColor: "#66bb6a",

                }
              }}
            >
              <PersonOutlineOutlinedIcon sx={{ color: "white" }} />
              Đăng nhập
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
