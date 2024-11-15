"use client";

import { formatDateTime } from "@/utils/fomart";
import { Box, Divider, Grid, Typography } from "@mui/joy";

type OrderDetailProps = {
  order: {
    _id: string;
    createdAt: string;
    products: {
      quantity: number;
      sumPrice: number;
      variation: {
        image: string;
        name: string;
        price: number;
        size: string;
        _id: string;
      };
    }[];
    shippingAddress: {
      address: string;
      name: string;
      phone: string;
      gender: string;
    };
    status: string;
    totalAmount: number;
    totalPirce: number;
  };
};

export default function OrderDetail({ order }: OrderDetailProps) {
  console.log(order);
  return (
    <Box
      sx={{
        maxHeight: "88vh",
        overflow: "auto",
        scrollbarWidth: "thin",
      }}
    >
      <Typography
        level="h4"
        sx={{
          textAlign: "center",
          backgroundColor: "white",
          padding: 2,
        }}
      >
        Chi tiết đơn hàng
      </Typography>
      <Box
        sx={{
          marginTop: 1,
          backgroundColor: "white",
          padding: 2,
        }}
      >
        <Typography level="title-lg">
          Thông tin đặt hàng #{order._id}
        </Typography>
        <Typography>
          Trạng thái: <b>{order.status}</b>
        </Typography>
        <Typography>
          Ngày đặt hàng: <b>{formatDateTime(order.createdAt)}</b>
        </Typography>
        <Typography>
          Địa chỉ giao hàng: <b>{order.shippingAddress.address}</b>
        </Typography>
        <Typography>
          Người nhận: <b>{order.shippingAddress.name}</b>
        </Typography>
        <Typography>
          Số điện thoại: <b>{order.shippingAddress.phone}</b>
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          marginTop: 2,
        }}
      >
        {order.products.map((product, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: 2,
              padding: 2,
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <Grid container width={"100%"}>
              <Grid xs={2}>
                <img
                  src={product.variation.image}
                  alt="product"
                  style={{ width: "100px", height: "100px" }}
                />
              </Grid>
              <Grid xs={7}>
                <Typography level="body-lg">
                  {product.variation.name}
                </Typography>
              </Grid>
              <Grid xs={3}>
                <Typography level="body-md">
                  Giá tiền: <b>{product.variation.price.toLocaleString()}đ</b>/
                  {product.variation.size}
                </Typography>
                <Typography level="body-md">
                  Số lượng: <b>{product.quantity}</b>
                </Typography>
                <Typography level="body-md">
                  Thành tiền: <b>{product.sumPrice.toLocaleString()}đ</b>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ))}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            padding: 2,
          }}
        >
          <Typography level="h4">
            {" "}
            Tổng tiền hàng: {order.totalPirce.toLocaleString()}đ
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
