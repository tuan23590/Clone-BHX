"use client";
import { Box, Button, Typography } from "@mui/joy";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddressForm from "./addressForm";

type CartPageProps = {
  tinhs: any[];
};

export default function CartPage({ tinhs }: CartPageProps) {
  const [openAddressForm, setOpenAddressForm] = React.useState<boolean>(false);
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          textAlign: "center",
          py: 1,
          mb: 1,
        }}
      >
        <Typography level="h3">Giỏ hàng</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          padding: 1,
        }}
      >
        <Typography mb={2} textAlign={"center"} level="title-lg">
          Địa chỉ giao hàng
        </Typography>
        {openAddressForm ? (
          <AddressForm
            tinhs={tinhs}
            setOpenAddressForm={setOpenAddressForm}
          />
        ):(
          <Button
          color="success"
          variant="soft"
          fullWidth
          onClick={() => setOpenAddressForm(true)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <AddCircleOutlineIcon />
          Thêm địa chỉ
        </Button>
        )}
      </Box>
    </Box>
  );
}
