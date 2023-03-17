import React, { useEffect, useRef } from "react";
import { Typography } from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Breadcrumbs, Container, Grid } from "@mui/material";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeAllFromCart } from "../../actions/cartAction";
import { clearErrors, createOrder } from "../../actions/orderAction";
import MetaData from "../layout/MetaData";
import CartItemAcep from "./CartItemAcep";
import {
  BoxCartItems,
  BoxPrice,
  BoxPriceTotal,
  ButtonCustom,
  StyledBreadcrumb,
  StyledBreadcrumbActive,
  TitleCart,
} from "./CartStyle";
import "./Payment.scss";

function formatCurrency(currency) {
  return currency.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              state: shippingInfo.state,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          dispatch(removeAllFromCart());
          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  return (
    <Container sx={{ mt: 10, mb: 10 }} className="payment-outline">
      <MetaData title="Payment" />
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <StyledBreadcrumb label="Information" />
        <StyledBreadcrumb label="Confirm order" />
        <StyledBreadcrumbActive label="Payment" />
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
            <Typography>{formatCurrency(orderInfo.subtotal)}</Typography>
          </BoxPrice>
          <BoxPrice>
            <Typography variant="h6">Shipping Charges:</Typography>
            <Typography>{formatCurrency(orderInfo.shippingCharges)}</Typography>
          </BoxPrice>
          <BoxPrice>
            <Typography variant="h6">GST:</Typography>
            <Typography>{formatCurrency(orderInfo.tax)}</Typography>
          </BoxPrice>
          <BoxPriceTotal>
            <Typography variant="h6">Total:</Typography>
            <Typography>{formatCurrency(orderInfo.totalPrice)}</Typography>
          </BoxPriceTotal>
        </Grid>
        <Grid item md={7} sx={{ pl: 8 }}>
          <Box>
            <TitleCart variant="h4">Payment</TitleCart>
            <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
              <div>
                <CreditCardIcon />
                <CardNumberElement className="paymentInput" />
              </div>
              <div>
                <EventIcon />
                <CardExpiryElement className="paymentInput" />
              </div>
              <div>
                <VpnKeyIcon />
                <CardCvcElement className="paymentInput" />
              </div>
              <ButtonCustom fullWidth type="submit" ref={payBtn}>
                Payment
              </ButtonCustom>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Payment;
