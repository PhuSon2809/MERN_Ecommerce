import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import { IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BoxEmpty, ButtonCustom, TitleCart } from "./CartStyle";

const OrderSuccess = () => {
  return (
    <BoxEmpty>
      <IconButton
        className="transition2"
        sx={{
          background: "#000",
          "&:hover": {
            background: "#000",
          },
        }}
      >
        <CheckIcon sx={{ fontSize: "100px", color: "#ffd90c" }} />
      </IconButton>
      <TitleCart variant="h2">Your Order has been placed successfully</TitleCart>
      <Link to="/orders">
        <ButtonCustom size="large">View Orders</ButtonCustom>
      </Link>
    </BoxEmpty>
  );
};

export default OrderSuccess;
