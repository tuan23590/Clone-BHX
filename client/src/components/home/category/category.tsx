"use client";
import { Box, Button, Link, Stack, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";
import React from "react";

type CategoryProps = {
  data: {
    _id: string;
    name: string;
    description: string;
    image: string;
    products: {
      _id: string;
      productName: string;
      description: string;
      image: string;
      price: number;
      countInStock: number;
      rating: number;
      numReviews: number;
      listImage: string[];
      category: string;
    }[];
  };
};

export default function CategoryPage({ data }: CategoryProps) {
  const router = useRouter();
  return (
    <Box>
      <Stack direction="row" spacing={0.5} useFlexGap sx={{ flexWrap: "wrap" }}>
        {data?.products.map((product) => (
          <Box
            key={product._id}
            width={170}
            height="100%"
            onClick={() => {
              router.push(`/${product.category}/${product._id}`);
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
            }}
          >
            <Box>
              <img
                src={product.image}
                alt={product.productName}
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
                {product.productName}
              </Typography>
            </Box>
            <Box width="100%" height="100%">
              <Typography fontSize={"1rem"} level="h4">
                {product.price.toLocaleString()}đ
              </Typography>
            </Box>
            <Box width="100%" height="100%">
              <Button
                variant="outlined"
                color="success"
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Mua hàng
              </Button>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
