"use client";

import { Box, Grid } from "@mui/joy";
import { useState, useEffect } from "react";

type ProductProps = {
  data: {
    _id: string;
    productName: string;
    price: number;
    description: string;
    category: string;
    image: string;
    listImage: string[];
  };
};

export default function ProductPage({ data }: ProductProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  console.log(data);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === data.listImage.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [data.listImage.length]);

  return (
    <Box sx={{ position: "relative" }}>
      <Grid container>
        <Grid xs={8}>
          <Box sx={{ position: "relative", overflow: "hidden" }}>
            <img
              src={data.listImage[currentImageIndex]}
              alt={data.productName}
              style={{
                width: "100%",
                height: "auto",
                transition: "transform 0.5s ease-in-out",
              }}
            />
          </Box>
        </Grid>
        <Grid xs={4}>
          <Box>
            <h1>{data.productName}</h1>
            <h2>{data.price}</h2>
            <p>{data.description}</p>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
