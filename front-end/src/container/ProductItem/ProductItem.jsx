import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Box, IconButton, Rating, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { BoxAction, BoxCard, BoxContext } from "./ProductItemStyle";

function ProductItem({ product }) {
  const options = {
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link to={`/product/${product._id}`}>
      <BoxCard className="">
        <Box className sx={{ position: "relative", mb: 1 }}>
          <img src={product.images[0].url} alt={product.name} width="100%" />
          <BoxAction>
            <ButtonCustom size="small" variant="contained" color="#000">
              Add to cart
            </ButtonCustom>
            <IconButton sx={{ color: "#ffd90c" }}>
              <FavoriteBorderOutlinedIcon />
            </IconButton>
          </BoxAction>
        </Box>
        <BoxContext>
          <Box sx={{ color: "#ffd90c" }}>
            <Rating {...options} />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>{product.name}</Typography>
            <Typography>{`${product.price.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}`}</Typography>
          </Box>
        </BoxContext>
      </BoxCard>
    </Link>
  );
}

export default ProductItem;
