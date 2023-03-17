import React from "react";
import { Box, Rating, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemsToCart } from "../../actions/cartAction";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { BoxAction, BoxCard, BoxContext } from "./ProductItemStyle";
import { useAlert } from "react-alert";

function ProductItem({ product }) {
  const alert = useAlert();
  const dispatch = useDispatch();

  const options = {
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(product._id, 1));
    alert.success("Item Added To Cart");
  };

  return (
    <BoxCard className="">
      <Box className sx={{ position: "relative", mb: 1 }}>
        <Link to={`/product/${product._id}`}>
          <img
            src={product.images[0].url}
            alt={product.name}
            width="100%"
            style={{ height: "295px" }}
          />
        </Link>
        <BoxAction sx={{ mt: 2, mb: 1 }}>
          {product.Stock < 1 ? (
            <Button color="error" variant="contained">
              Out of stock
            </Button>
          ) : (
            <ButtonCustom
              size="small"
              variant="contained"
              color="#000"
              onClick={addToCartHandler}
            >
              Add to cart
            </ButtonCustom>
          )}
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
  );
}

export default ProductItem;
