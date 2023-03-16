import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { BoxContentItem, BoxItem, BoxQuantity } from "./CartStyle";

const CartItemCard = ({ item }) => {
  return (
    <Link to={`/product/${item.product}`}>
      <BoxItem>
        <img src={item.image} width="120px" alt="image" />
        <BoxContentItem>
          <Typography variant="h6">{item.name}</Typography>
          <span>{`${item.price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}`}</span>
        </BoxContentItem>
      </BoxItem>
    </Link>
  );
};

export default CartItemCard;
