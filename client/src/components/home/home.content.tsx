"use client";
import { Box, Link, Typography } from "@mui/joy";
import React, { useEffect } from "react";
import ListCategories from "./listCategories";
import CategoryPage from "./category/category";

type ListCategoriesProps = {
  listCategories: any[];
};

export default function HomeContent({ listCategories }: ListCategoriesProps) {
  const [modifiedListCategories, setModifiedListCategories] = React.useState<
    any[]
  >([]);
  const listCategories_temp = listCategories || [];
  useEffect(() => {
    setModifiedListCategories(
      listCategories_temp.map((category) => {
        const products = category.products.slice(0, 5);
        products.forEach((product: any) => {
          product.variations = product.variations.slice(0, 1);
        });
        return { ...category, products };
      })
    );
  }, []);
  return (
    <Box sx={{
      height: { xs: "auto", sm: "88vh" },
                overflowX: "auto",
          scrollbarWidth: "thin",
    }}>
      <ListCategories listCategories={listCategories} />
      <Box
      >
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 2,
                  }}
                >
                  <Link
                    href={`/${category._id}`}
                    underline="none"
                    color="neutral"
                    sx={{
                      paddingY: 1,
                    }}
                  >
                    Xem thêm
                    <span
                      style={{
                        fontWeight: "bold",
                        marginLeft: 5,
                        display: "flex",
                      }}
                    >{`${category.products.length} ${category.name} >`}</span>
                  </Link>
                </Box>
              </Box>
            )
        )}
      </Box>
    </Box>
  );
}
