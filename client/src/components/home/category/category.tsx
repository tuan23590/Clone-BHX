"use client";
import { handleAddCartAction } from "@/action/cartAction";
import { AppContext } from "@/context/AppProvider";
import { Box, Button, Stack, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

type CategoryProps = {
  data: {
    _id: string;
    name: string;
    description: string;
    image: string;
    products: {
      _id: string;
      category:string;
      variations: {
        _id: string;
        name: string;
        price: number;
        image: string;
        listImage: string[];
      }[];
    }[];
  };
};

export default function CategoryPage({ data }: CategoryProps) {
  const { openSnackbar } = useContext(AppContext);
  const router = useRouter();
  const handleAddCart = async (
    productId: string,
    quantity: number,
    variationId: string
  ) => {
    const res = await handleAddCartAction(
      productId,
      quantity,
      variationId
    );
    if (res.data) {
      openSnackbar({
        message: "Thêm vào giỏ hàng thành công",
        color: "success",
      });
    } else {
      openSnackbar({ message: "Thêm vào giỏ hàng thất bại", color: "danger" });
    }
  };
  return (
    <Box sx={{
      maxHeight: '88vh',
      overflow: 'auto',
      scrollbarWidth: 'thin',
    }}>
      <Stack direction="row" spacing={0.5} useFlexGap sx={{ flexWrap: "wrap" }}>
        {data?.products.map((product) => (
          product?.variations?.map((variation) => (
            <Box
              key={product._id}
              width={170}
              height="100%"
              onClick={() => {
                router.push(`${product.category}/${variation._id}`);
              }}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 4,
                height: 300,
                "&:hover": {
                  border: "1px solid #81c784",
                  cursor: "pointer",
                },
                backgroundColor: "#fff",
              }}
            >
              <Box>
                <img
                  src={variation.image}
                  alt={variation.name}
                  width={150}
                  height={150}
                />
              </Box>
              <Box width="100%" height="100%">
                <Typography
                  level="body-sm"
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2, // Giới hạn hiển thị 2 hàng
                    textOverflow: "ellipsis", // Hiển thị dấu 3 chấm khi vượt quá
                  }}
                >
                  {variation.name}
                </Typography>
              </Box>
              <Box width="100%" height="100%">
                <Typography fontSize={"1rem"} level="h4">
                  {variation.price.toLocaleString()}đ
                </Typography>
              </Box>
              <Box width="100%" height="100%">
                <Button
                  variant="outlined"
                  color="success"
                  fullWidth
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddCart(product._id, 1, variation._id);
                  }}
                >
                  Mua hàng
                </Button>
              </Box>
            </Box>
          ))
        ))}
      </Stack>
    </Box>
  );
}
