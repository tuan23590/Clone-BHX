"use client";

import { Box, Link, Typography } from "@mui/joy";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { formatDateTime } from "@/utils/fomart";
import React from "react";

export default function OrderPage({ listOrders }: { listOrders: any }) {
  const [isPhone, setIsPhone] = React.useState(false);
  React.useEffect(() => {
    setIsPhone(window.innerWidth < 600);
  }, []);
  return (
    <Box
      sx={{
        height: {xs: "auto", sm: "88vh"},
        overflow: "auto",
        scrollbarWidth: "thin",
      }}
    >
      {listOrders.map((order: any, index : number) => (
        <Box
          key={index}
          sx={{
            backgroundColor: "white",
            padding: 2,
            marginBottom: 2,
            borderRadius: 7,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>
              Ngày đặt: <b>{formatDateTime(order.createdAt)}</b>
            </Typography>
            <Typography>
              Trạng thái: <b>{order.status}</b>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>
              Đơn hàng: #<b>{order._id}</b>
            </Typography>
            <Typography>
              Giá: <b>{order.totalPirce.toLocaleString()}đ</b>
            </Typography>
          </Box>
          <Box
            sx={{
              marginY: 2,
              display: "flex",
              justifyContent: "start",
            }}
          >
            {order.products.slice(0, 3).map((product: any, index: number) => (
              <Box key={index}>
                <img
                  src={product.variation.image}
                  alt={product.variation.name}
                  width={isPhone ? 50 : 100}
                  style={{
                    border: "1px solid #f0f0f0",
                    marginRight: 10,
                  }}
                />
              </Box>
            ))}
            {order.products.length > 3 && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: isPhone ? 50 : 100,
                  height: isPhone ? 50 : 100,
                  border: "1px solid #f0f0f0",
                }}
              >
                <Typography
                  level="h3"
                  color="success"
                  sx={{
                    opacity: 0.5,
                  }}
                >
                  +{order.products.length - 3}
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Link
              href={`/order/${order._id}`}
              underline="none"
              color="success"
              sx={{
                "&:hover": {
                  color: "#81c784",
                },
              }}
            >
              Chi tiết
              <ChevronRightIcon
                sx={{
                  fontSize: 20,
                  paddingTop: "3px",
                  paddingLeft: "-5px",
                }}
              />
            </Link>
          </Box>
        </Box>
      ))}
    </Box>
  );
}