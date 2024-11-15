"use client";
import { Box, Link, Stack, Typography } from "@mui/joy";
import React from "react";

type ListCategoriesProps = {
  listCategories: {
    _id: string;
    name: string;
    description: string;
    image: string;
  }[];
};

export default function ListCategories({
  listCategories,
}: ListCategoriesProps) {
  const [categories, setCategories] = React.useState<any>([]);
  React.useEffect(() => {
    setCategories(listCategories);
  }, []);
  return (
    <Stack
      direction={"row"}
      sx={{
        overflow: "auto",
        backgroundColor: "white",
        borderRadius: "5%",
        gap: "0.3rem",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        marginBottom: "1rem",
        display: "flex",
        scrollbarWidth: "thin",
      }}
    >
      {categories.map((category: any) => (
        <Box
          key={category._id}
          sx={{
            width: 80,
            height: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.5rem",
            "&:hover": {
              backgroundColor: "#e8f5e9",
            },
          }}
        >
          <Link
            href={`/${category._id}`}
            sx={{
              textDecoration: "none !important",
              color: "black",
            }}
          >
            <Stack direction="column" alignItems="center">
              <img
                src={category.image}
                alt={category.name}
                width={50}
                height={50}
              />
              <Typography
                level="body-sm"
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2, // Giới hạn hiển thị 2 hàng
                  textOverflow: "ellipsis", // Hiển thị dấu 3 chấm khi vượt quá
                  width: 80, // Độ rộng của phần tử
                  textAlign: "center",
                }}
              >
                {category.name}
              </Typography>
            </Stack>
          </Link>
        </Box>
      ))}
    </Stack>
  );
}
