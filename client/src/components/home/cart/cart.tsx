"use client";
import { Box, Button, ButtonGroup, Grid, Link, Typography } from "@mui/joy";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddressForm from "./addressForm";

type CartPageProps = {
  tinhs: any[];
  cart: IBackendRes<any> | null;
};

export default function CartPage({ tinhs, cart }: CartPageProps) {
  const [openAddressForm, setOpenAddressForm] = React.useState<boolean>(false);
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          textAlign: "center",
          py: 1,
          mb: 1,
        }}
      >
        <Typography level="h3">Giỏ hàng</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          padding: 1,
        }}
      >
        <Typography mb={2} textAlign={"center"} level="title-lg">
          Địa chỉ giao hàng
        </Typography>
        {openAddressForm ? (
          <AddressForm tinhs={tinhs} setOpenAddressForm={setOpenAddressForm} />
        ) : (
          <Button
            color="success"
            variant="soft"
            fullWidth
            onClick={() => setOpenAddressForm(true)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <AddCircleOutlineIcon />
            Thêm địa chỉ
          </Button>
        )}
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          padding: 1,
          mt: 1,
        }}
      >
        <Typography level="h4">Danh sách sản phẩm</Typography>
        {cart?.data?.products.map((product: any) => (
          <Box
            key={product._id + product.createdAt}
            sx={{
              borderBottom: "1px solid #f0f0f0",
              padding: 1,
            }}
          >
            <Grid container>
              <Grid xs={2}>
                <img src={product.variation.image} width={"100%"} />
              </Grid>
              <Grid xs={8}>
                <Link href={`/${product.category}/${product.variation._id}`} underline="none">
                <Typography level="body-md">
                  {product.variation.name}
                </Typography>
                </Link>
              </Grid>
              <Grid xs={2} sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "end",
              }}>
                <Typography level="title-lg">
                  {product.variation.price.toLocaleString()}đ
                </Typography>
                <ButtonGroup>
                  <Button>-</Button>
                  <Button disabled variant="solid" sx={{ width: 1 }}>
                    {product.quantity}
                  </Button>
                  <Button>+</Button>
                </ButtonGroup>
                <Typography level="body-xs">
                  Giá: {product.total.toLocaleString()}đ/đơn vị
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
