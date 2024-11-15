"use client";

import {
  Badge,
  Box,
  Container,
  Dropdown,
  Grid,
  Input,
  Link,
  ListDivider,
  Menu,
  MenuButton,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/joy";
import Image from "next/image";
import logo from "../../Public/logo.png";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { signOut } from "next-auth/react";

export default function HomeHeader({
  carts,
  session,
}: {
  carts: IBackendRes<any> | null;
  session: any;
}) {
  return (
    <Box
      sx={{
        background:
          "radial-gradient(159.85% 367.97% at 150% 123.85%, #ffe147 0%, #65ae17 38.76%, #469c4b 59.65%, #00713b 100%)",
        display: "flex",
        height: "90px",
      }}
    >
      <Container sx={{ padding: "0px 0px !important" }}>
        <Grid container spacing={2} paddingTop={1.5}>
          <Grid sm={3}>
            <Tooltip title="Trang chủ" color="success" variant="soft">
              <Link href="/" sx={{ textDecoration: "none" }}>
                <Image src={logo} alt="logo" width={150} />
              </Link>
            </Tooltip>
            <Typography
              level="h4"
              sx={{
                color: "white",
                display: "flex",
                alignItems: "center",
                padding: "5px 3px",
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
                <Link
                  href="/cart"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    textDecoration: "none",
                    "&:hover": {
                      color: "#66bb6a",
                    },
                  }}
                >
                  <Badge
                    badgeContent={carts?.data?.totalAmount || 0}
                    color="success"
                  >
                    <ShoppingCartOutlinedIcon
                      fontSize="large"
                      sx={{ color: "green" }}
                    />
                  </Badge>
                </Link>
              }
              size="lg"
            />
          </Grid>
          <Grid
            sm={3}
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
            }}
          >
            <Dropdown>
              <MenuButton
                color="success"
                variant="soft"
                sx={{
                  height: 45,
                  fontSize: 16,
                  width: 300,
                }}
              >
                <PersonOutlineOutlinedIcon sx={{ color: "green" }} />
                {session?.user?.name ? (
                  <>
                    Xin chào,
                    {session?.user?.name ? session.user.name : "Đăng nhập"}
                  </>
                ) : (
                  "Tài khoản"
                )}
              </MenuButton>
              <Menu
                sx={{
                  width: 290,
                }}
              >
                {session?.user?.name && (
                <MenuItem>
                  <Link href="/order" underline="none" color="neutral">
                    Đơn hàng của tôi
                  </Link>
                </MenuItem>
                )} 
                <ListDivider />
                {session?.user?.name ? (
                <MenuItem
                  color="danger"
                  onClick={async () => {
                    const confirm = window.confirm(
                      "Bạn có chắc chắn muốn đăng xuất không?"
                    );
                    if (confirm) await signOut();
                  }}
                >
                  Đăng xuất
                </MenuItem>
                ) : (
                <MenuItem>
                  <Link href="/login" underline="none" color="success">
                    Đăng nhập
                  </Link>
                </MenuItem>
                )}
              </Menu>
            </Dropdown>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
