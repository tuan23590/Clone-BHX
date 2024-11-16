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
import React, { useContext } from "react";
import { AppContext } from "@/context/AppProvider";
import TableRowsIcon from "@mui/icons-material/TableRows";

export default function HomeHeader({
  carts,
  session,
}: {
  carts: IBackendRes<any> | null;
  session: any;
}) {
  const { openSidebar, setOpenSidebar } = useContext(AppContext);
  const [isPhone, setIsPhone] = React.useState(false);
  React.useEffect(() => {
    setIsPhone(window.innerWidth < 600);
  }, []);
  return (
    <Box
      sx={{
        background:
          "radial-gradient(159.85% 367.97% at 150% 123.85%, #ffe147 0%, #65ae17 38.76%, #469c4b 59.65%, #00713b 100%)",
        display: "flex",
        height: { xs: "auto", sm: "90px" }, // Điều chỉnh chiều cao cho màn hình nhỏ
        padding: { xs: 1, sm: 0 }, // Thêm padding trên màn hình nhỏ
      }}
    >
      <Container sx={{ padding: "0px 0px !important" }}>
        <Grid container spacing={2} paddingTop={1.5}>
          {/* Logo */}
          <Grid
            xs={12}
            sm={3}
            sx={{
              display: { xs: "none", sm: "block" }, // Ẩn logo trên phone, chỉ hiển thị trên màn hình lớn hơn
            }}
          >
            <Tooltip title="Trang chủ" color="success" variant="soft">
              <Link href="/" sx={{ textDecoration: "none" }}>
                <Image src={logo} alt="logo" width={150} />
              </Link>
            </Tooltip>
            <Typography
              level="h4"
              sx={{
                color: "white",
                display: { xs: "none", sm: "flex" }, // Ẩn tiêu đề trên màn hình nhỏ
                alignItems: "center",
                padding: "5px 3px",
                backgroundColor: "#00713b",
                borderRadius: "10px 10px 0px 0px",
              }}
            >
              <ViewHeadlineIcon
                sx={{ color: "white" }}
              />
              Danh mục sản phẩm
            </Typography>
          </Grid>

          {/* Tìm kiếm */}
          <Grid xs={12} sm={6}>
            <Input
              placeholder="Tìm kiếm sản phẩm"
              startDecorator={
                <>
                  
                  {isPhone ? (
                    <TableRowsIcon
                      fontSize="large"
                      sx={{ color: "green" }}
                      onClick={() => {
                        setOpenSidebar(!openSidebar);
                      }}
                    />
                  ): (
                    <SearchIcon fontSize="large" sx={{ color: "green" }} />
                  )}
                </>
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
              sx={{
                width: "100%",
                fontSize: { xs: "14px", sm: "16px" },
              }}
            />
          </Grid>

          {/* Menu tài khoản */}
          <Grid
            xs={12}
            sm={3}
            sx={{
              display: "flex",
              alignItems: "top",
              justifyContent: "center",
            }}
          >
            <Dropdown>
              <MenuButton
                color="success"
                variant="soft"
                sx={{
                  height: 45,
                  fontSize: { xs: 14, sm: 16 }, // Điều chỉnh kích thước font
                  width: { xs: "100%", sm: 300 }, // Kích thước nút linh hoạt
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
              <Menu sx={{ width: 290 }}>
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
