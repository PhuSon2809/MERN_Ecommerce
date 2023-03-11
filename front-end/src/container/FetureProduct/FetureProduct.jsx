import React from "react";
import { Grid } from "@mui/material";
import { BoxContent, Text, TextName } from "./FetureProductStyle";
import { Link } from "react-router-dom";

function FetureProduct({ product }) {
  return (
    <Link to={`/product/${product._id}`}>
      <Grid container sx={{ width: "100%" }}>
        <Grid item md={4} sx={{ p: 0 }}>
          <img
            src={product.images[0].url}
            alt={product.name}
            width="60px"
            height="60px"
          />
        </Grid>
        <Grid item md={8} sx={{ p: 0 }}>
          <BoxContent>
            <TextName>{product.name}</TextName>
            <Text>{`${product.price.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}`}</Text>
          </BoxContent>
        </Grid>
      </Grid>
    </Link>
  );
}

export default FetureProduct;
