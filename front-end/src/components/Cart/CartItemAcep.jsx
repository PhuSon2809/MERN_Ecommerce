import { Badge, Box, Typography } from "@mui/material";
import React from "react";
import { BoxContentItem, BoxItemAcep, BoxItemAcepContent } from "./CartStyle";

function formatCurrency(currency) {
  return currency.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}

function CartItemAcep({ cartItem }) {
  return (
    <BoxItemAcep>
      <BoxItemAcepContent>
        <Badge badgeContent={cartItem.quantity} color="info">
          <img className="image-style" src={cartItem.image} alt="img-cart" />
        </Badge>
        <BoxContentItem>
          <Typography variant="h6">{cartItem.name}</Typography>
          <Typography>{formatCurrency(cartItem.price)}</Typography>
        </BoxContentItem>
      </BoxItemAcepContent>
      <Typography>
        {formatCurrency(cartItem.quantity * cartItem.price)}
      </Typography>
    </BoxItemAcep>
  );
}

export default CartItemAcep;
