"use client";
import { Box, Link, Typography } from "@mui/joy";
import React from "react";
import ListCategories from "./listCategories";
import CategoryPage from "./category/category";

type ListCategoriesProps = {
  listCategories: any[];
};

export default function HomeContent({ listCategories }: ListCategoriesProps) {
  const modifiedListCategories = listCategories.map((category) => {
    const products = category.products.slice(0, 5);
    products.forEach((product : any) => {
      product.variations = product.variations.slice(0, 1);
    });
    return { ...category, products };
  });
  return (
    <Box>
      <ListCategories listCategories={listCategories} />
      {modifiedListCategories.map(
        (category) =>
          category.products.length > 0 && (
            <Box
              key={category._id}
              sx={{
                backgroundColor: "#e8f5e9",
                borderTop: "1px solid #00AC5B",
                marginBottom: 2,
                paddingLeft: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 1,
                }}
              >
                <Typography
                  level="h4"
                  sx={{
                    paddingX: 2,
                    backgroundColor: "#00AC5B",
                    color: "#fff",
                    borderRadius: "0 0 5px 5px",
                  }}
                >
                  {category.name}
                </Typography>
              </Box>
                 
              <CategoryPage data={category} />
              <Box sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 2,
              }}>
                <Link href={`/${category._id}`} underline="none" color="neutral" sx={{
                  paddingY: 1,
                }}>
                  Xem thêm<span style={{
                    fontWeight: "bold",
                    marginLeft: 5,
                    display: "flex",
                  }}>{`${category.products.length} ${category.name} >`}</span>
                </Link>
              </Box>
            </Box>
          )
      )}
    </Box>
  );
}
