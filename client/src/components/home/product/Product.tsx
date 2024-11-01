"use client";

import { Box, Button, Grid, Radio, RadioGroup, Typography } from "@mui/joy";
import SlideShow from "./SlideShow";
import { useContext, useState } from "react";
import { handleAddCartAction } from "@/action/cartAction";
import { AppContext } from "@/context/AppProvider";

type ProductProps = {
  data: {
    _id: string;
    productBio: {
      featureSpecification: string;
      productArticle: string;
      shortDescription: string;
    };
    variations: {
      _id: string;
      image: string;
      listImage: string[];
      name: string;
      price: number;
      size: string;
    }[];
  };
  _id: string;
};

export default function ProductPage({ data, _id }: ProductProps) {
  const { openSnackbar } = useContext(AppContext);
  const [selectedvariation, setSelectedVariation] = useState(
    data?.variations.find((item) => item._id === _id)
  );
  const handleAddCart = async () => {
    const res = await handleAddCartAction(data._id, 1, selectedvariation?._id as string);
    if (res.data) {
      openSnackbar({
        message: "Thêm vào giỏ hàng thành công",
        color: "success",
      });
    } else {
      console.log(res);
      openSnackbar({ message: "Thêm vào giỏ hàng thất bại", color: "danger" });
    }
  };
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
        <SlideShow listImage={selectedvariation?.listImage || []} />
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
          <Typography level="title-lg" mb={2}>
            {selectedvariation?.name}
          </Typography>
        </Box>
        <Box>
          <RadioGroup>
            {data.variations.map((variation, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 1,
                  border:
                    selectedvariation?._id === variation._id
                      ? "1px solid #81c784"
                      : "1px solid #e0e0e0",
                  borderRadius: 5,
                  marginBottom: 1,
                  paddingBottom: 3,
                  minWidth: 200,
                  cursor: "pointer",
                  position: "relative",
                  "&:hover": { border: "1px solid #81c784" },
                }}
                onClick={() => setSelectedVariation(variation)}
              >
                <img src={variation.image} alt={variation.name} width={150} />
                <Radio
                  value={variation}
                  color="success"
                  checked={selectedvariation?._id === variation._id}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "15%",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    backgroundColor: "#43a047",
                  }}
                >
                  <Typography
                    sx={{ color: "white" }}
                    level="title-md"
                  >{`${variation.size} - ${variation.price}đ`}</Typography>
                </Box>
              </Box>
            ))}
          </RadioGroup>
        </Box>
        <Button
          variant="solid"
          color="success"
          fullWidth
          sx={{
            fontSize: 20,
            backgroundImage:
              "radial-gradient(circle, #98c230 0%, #59a646 49%, #22994f 75%, #007e42 100%)",
            backgroundSize: "200% 200%",
            animation: "gradientAnimation 5s ease infinite", // Thời gian và kiểu lặp
            color: "#fff",
            "@keyframes gradientAnimation": {
              "0%": {
                backgroundPosition: "0% 0%",
              },
              "50%": {
                backgroundPosition: "100% 100%",
              },
              "100%": {
                backgroundPosition: "0% 0%",
              },
            },
          }}
          onClick={handleAddCart}
        >
          Mua
        </Button>
      </Grid>
    </Grid>
  );
}
