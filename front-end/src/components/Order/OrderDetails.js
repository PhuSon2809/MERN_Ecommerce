import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

function formatCurrency(currency) {
  return currency.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  // const orderTest = {
  //   _id: 1,
  //   user: {
  //     name: "abc",
  //   },
  //   shippingInfo: {
  //     phoneNo: "123",
  //     address: "address",
  //     city: "city",
  //     state: "state",
  //     pinCode: "pinCode",
  //     country: "country",
  //   },
  //   paymentInfo: {
  //     status: "succeeded",
  //   },
  //   totalPrice: "123",
  //   orderStatus: "Delivered",
  //   orderItems: [
  //     {
  //       product: "product1",
  //       image: "image1",
  //       name: "name1",
  //       quantity: 1,
  //       price: 10,
  //     },
  //     {
  //       product: "product2",
  //       image: "image2",
  //       name: "name2",
  //       quantity: 1,
  //       price: 10,
  //     },
  //   ],
  // };

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
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage row">
            <div className="col-lg-6">
              <div className="orderDetailsContainer">
                <Typography component="h1">
                  Order #{order && order._id}
                </Typography>
                <Typography>Shipping Info</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name: </p>
                    <span>
                      {order?.user && (order?.user.name ? order.user.name : "")}
                    </span>
                  </div>
                  <div>
                    <p>Phone: </p>
                    <span>
                      {order?.shippingInfo &&
                        (order?.shippingInfo.phoneNo
                          ? order.shippingInfo.phoneNo
                          : "")}
                    </span>
                  </div>
                  <div>
                    <p>Address: </p>
                    <span>
                      {order?.shippingInfo &&
                        `${
                          order?.shippingInfo.address
                            ? order.shippingInfo.address
                            : ""
                        }, ${
                          order?.shippingInfo.city
                            ? order.shippingInfo.city
                            : ""
                        }, ${
                          order?.shippingInfo.state
                            ? order.shippingInfo.state
                            : ""
                        }, ${
                          order?.shippingInfo.pinCode
                            ? order.shippingInfo.pinCode
                            : ""
                        }, ${
                          order?.shippingInfo.country
                            ? order.shippingInfo.country
                            : ""
                        }`}
                    </span>
                  </div>
                </div>
                <Typography>Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order?.paymentInfo &&
                        (order?.paymentInfo.status
                          ? order.paymentInfo.status
                          : "") === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order?.paymentInfo &&
                      (order?.paymentInfo.status
                        ? order.paymentInfo.status
                        : "") === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>
                  <div>
                    <p>Amount: </p>
                    <span>
                      {order?.totalPrice &&
                        formatCurrency(
                          order?.totalPrice ? order.totalPrice : ""
                        )}
                    </span>
                  </div>
                </div>
                <Typography>Order Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order?.orderStatus &&
                        (order?.orderStatus ? order.orderStatus : "") ===
                          "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order?.orderStatus &&
                        (order?.orderStatus ? order.orderStatus : "")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="orderDetailsCartItems">
                <Typography>Order Items:</Typography>
                <div className="orderDetailsCartItemsContainer">
                  {order?.orderItems &&
                    order?.orderItems.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>{" "}
                        <span>
                          {item.quantity} X {formatCurrency(item.price)} ={" "}
                          <b>{formatCurrency(item.price * item.quantity)}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
