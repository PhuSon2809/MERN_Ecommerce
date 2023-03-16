import React from "react";
import { Typography } from "@material-ui/core";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Breadcrumbs, Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CartItemAcep from "./CartItemAcep";
import {
  BoxCartItems,
  BoxPrice,
  BoxPriceTotal,
  ButtonCustom,
  StyledBreadcrumb,
  StyledBreadcrumbActive,
} from "./CartStyle";

function formatCurrency(currency) {
  return currency.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 100000 ? 0 : 15000;

  const tax = subtotal * 0.1;

  const totalPrice = subtotal + tax + shippingCharges;

  // const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  const address = `${shippingInfo.address}, ${shippingInfo.districtName}, ${shippingInfo.provinceName}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };
  
  return (
    <Container sx={{ mt: 10, mb: 10 }}>
      <MetaData title="Confirm Order" />
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <StyledBreadcrumb label="Information" />
        <StyledBreadcrumbActive label="Confirm order" />
        <StyledBreadcrumb label="Payment" />
      </Breadcrumbs>
      <Grid container sx={{ mt: 5 }}>
        <Grid item md={5}>
          <BoxCartItems>
            {cartItems &&
              cartItems.map((item) => (
                <CartItemAcep key={item.product} cartItem={item} />
              ))}
          </BoxCartItems>
          <BoxPrice>
            <Typography variant="h6">Subtotal:</Typography>
            <Typography>{formatCurrency(subtotal)}</Typography>
          </BoxPrice>
          <BoxPrice>
            <Typography variant="h6">Shipping Charges:</Typography>
            <Typography>{formatCurrency(shippingCharges)}</Typography>
          </BoxPrice>
          <BoxPrice>
            <Typography variant="h6">GST:</Typography>
            <Typography>{formatCurrency(tax)}</Typography>
          </BoxPrice>
          <BoxPriceTotal>
            <Typography variant="h6">Total:</Typography>
            <Typography>{formatCurrency(totalPrice)}</Typography>
          </BoxPriceTotal>
        </Grid>
        <Grid item md={7} sx={{ pl: 8 }}>
          <Box>
            <Typography>Shipping Info</Typography>
            <Box className="confirmshippingAreaBox">
              <Box>
                <Typography>Name:</Typography>
                <Typography>{user.name}</Typography>
              </Box>
              <Box>
                <Typography>Phone:</Typography>
                <Typography>{shippingInfo.phoneNo}</Typography>
              </Box>
              <Box>
                <Typography>Address:</Typography>
                <Typography>{address}</Typography>
              </Box>
            </Box>
          </Box>
          <ButtonCustom onClick={proceedToPayment}>
            Proceed To Payment
          </ButtonCustom>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ConfirmOrder;
