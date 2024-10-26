"use client";

import { Box, Grid, Typography } from "@mui/joy";
import SlideShow from "./SlideShow";

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
  return (
    <Grid container columnGap={1}>
      <Grid
        xs={8}
        sx={{
          backgroundColor: "white",
          padding: 2,
          borderRadius: 5,
        }}
      >
        <SlideShow listImage={data.listImage || []} />
      </Grid>
      <Grid
        xs={3.8}
        sx={{
          backgroundColor: "white",
          padding: 2,
          borderRadius: 5,
        }}
      >
        <Box>
          <Typography level="title-lg">{data.productName}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
