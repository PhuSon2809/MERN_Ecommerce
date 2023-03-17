import React, { Fragment, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { Container } from "@mui/material";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getOrderDetails } from "../../actions/orderAction";
import CartItemAcep from "../Cart/CartItemAcep";
import {
  BoxCartItems,
  BoxRow,
  GreenStatus,
  RedStatus,
  TitleCart
} from "../Cart/CartStyle";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

function formatCurrency(currency) {
  return currency.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  console.log(order);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Container sx={{ mt: 10, mb: 10 }}>
          <MetaData title="Order Details" />
          <TitleCart variant="h3">My Cart</TitleCart>
          <div className="row mt-5">
            <div className="col-lg-6">
              <div>
                <TitleCart variant="h6">Shipping Info</TitleCart>
                <div className="orderDetailsContainerBox">
                  <BoxRow>
                    <Typography>Name:</Typography>
                    <Typography>
                      {order?.user && (order?.user.name ? order.user.name : "")}
                    </Typography>
                  </BoxRow>
                  <BoxRow>
                    <Typography>Phone:</Typography>
                    <Typography>
                      {order?.shippingInfo &&
                        (order?.shippingInfo.phoneNo
                          ? order.shippingInfo.phoneNo
                          : "")}
                    </Typography>
                  </BoxRow>
                  <BoxRow>
                    <Typography>Address:</Typography>
                    <Typography>
                      {order?.shippingInfo &&
                        `${
                          order?.shippingInfo.address
                            ? order.shippingInfo.address
                            : ""
                        }, ${
                          order?.shippingInfo.districtName
                            ? order.shippingInfo.districtName
                            : ""
                        }, ${
                          order?.shippingInfo.provinceName
                            ? order.shippingInfo.provinceName
                            : ""
                        }`}
                    </Typography>
                  </BoxRow>
                </div>
                <div className="orderDetailsContainerBox">
                  <BoxRow>
                    <TitleCart variant="h6">Payment:</TitleCart>
                    {order?.paymentInfo &&
                    (order?.paymentInfo.status
                      ? order.paymentInfo.status
                      : "") === "succeeded" ? (
                      <GreenStatus>PAID</GreenStatus>
                    ) : (
                      <RedStatus>UNPAID</RedStatus>
                    )}
                  </BoxRow>
                  <BoxRow>
                    <Typography>Amount:</Typography>
                    <Typography>
                      {order?.totalPrice &&
                        formatCurrency(
                          order?.totalPrice ? order.totalPrice : ""
                        )}
                    </Typography>
                  </BoxRow>
                </div>
                <BoxRow>
                  <TitleCart variant="h6">Order Status: </TitleCart>
                  <div className="orderDetailsContainerBox">
                    {order?.orderStatus &&
                    (order?.orderStatus ? order.orderStatus : "") ===
                      "Delivered" ? (
                      <GreenStatus>{order?.orderStatus}</GreenStatus>
                    ) : (
                      <RedStatus>{order?.orderStatus}</RedStatus>
                    )}
                  </div>
                </BoxRow>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="orderDetailsCartItems">
                <TitleCart variant="h6">Order Items:</TitleCart>
                <BoxCartItems>
                  {order?.orderItems &&
                    order?.orderItems.map((item) => (
                      <CartItemAcep key={item.product} cartItem={item} />
                    ))}
                </BoxCartItems>
              </div>
            </div>
          </div>
        </Container>
      )}
    </Fragment>
  );
};

export default OrderDetails;
