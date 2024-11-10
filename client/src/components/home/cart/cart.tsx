"use client";
import { Box, Button, ButtonGroup, Grid, Link, Typography } from "@mui/joy";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddressForm from "./addressForm";
import { handleAddCartAction } from "@/action/cartAction";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type CartPageProps = {
  tinhs: any[];
  cart: IBackendRes<any> | null;
};

export default function CartPage({ tinhs, cart }: CartPageProps) {
  const [openAddressForm, setOpenAddressForm] = React.useState<boolean>(false);

  const handleChageQuantity = (
    productId: string,
    variationId: string,
    type: string,
    quantity?: number
  ) => {
    if (type === "all") {
      cart?.data?.products.forEach((product: any) => {
        handleAddCartAction(
          product._id,
          -product.quantity,
          product.variation._id
        );
      });
    } else
      handleAddCartAction(
        productId,
        type === "+" ? 1 : quantity ? -quantity : -1,
        variationId
      );
  };
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
              <Grid
                xs={2}
                sx={{
                  position: "relative",
                }}
              >
                <HighlightOffIcon
                  sx={{
                    fontSize: 30,
                    position: "absolute",
                    zIndex: 1,
                    opacity: 0.3,
                    top: 0,
                    cursor: "pointer",
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                  onClick={() => {
                    const confirm = window.confirm(
                      "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?"
                    );
                    if (confirm)
                      handleChageQuantity(
                        product._id,
                        product.variation._id,
                        "-",
                        product.quantity
                      );
                  }}
                />
                <img src={product.variation.image} width={"100%"} />
              </Grid>
              <Grid xs={8}>
                <Link
                  href={`/${product.category}/${product.variation._id}`}
                  underline="none"
                >
                  <Typography level="body-md">
                    {product.variation.name}
                  </Typography>
                </Link>
              </Grid>
              <Grid
                xs={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "end",
                }}
              >
                <Typography level="title-lg">
                  {product.total.toLocaleString()}đ
                </Typography>
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      if (product.quantity == 1) {
                        const confirm = window.confirm(
                          "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?"
                        );
                        if (!confirm) return;
                      }
                      handleChageQuantity(
                        product._id,
                        product.variation._id,
                        "-"
                      );
                    }}
                  >
                    -
                  </Button>
                  <Button disabled variant="solid" sx={{ width: 1 }}>
                    {product.quantity}
                  </Button>
                  <Button
                    onClick={() =>
                      handleChageQuantity(
                        product._id,
                        product.variation._id,
                        "+"
                      )
                    }
                  >
                    +
                  </Button>
                </ButtonGroup>
                <Typography level="body-xs">
                  Giá: {product.variation.price.toLocaleString()}đ/{product.variation.size}{" "}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ))}
        {cart?.data?.products.length > 0 && (
          <Typography
            mt={1}
            textAlign="end"
            level="body-md"
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": {
                ".icon": {
                  color: "red",
                },
                color: "red",
              },
            }}
            onClick={() => {
              const confirm = window.confirm(
                "Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng không?"
              );
              if (confirm) handleChageQuantity("", "", "all");
            }}
          >
            <DeleteOutlineIcon
              className="icon"
              sx={{ fontSize: 20, mr: 0.2 }}
            />
            Xóa hết giỏ hàng
          </Typography>
        )}
        {cart?.data?.products.length == 0 && (
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "20vh",
            flexDirection: "column"
          }}>
            <Typography textAlign="center" level="h4">
            Giỏ hàng trống
          </Typography>
          <Link href="/" underline="none">
            <Button variant="solid" color="success" sx={{ mt: 1 }}>
              Tiếp tục mua hàng
            </Button>
          </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
}
