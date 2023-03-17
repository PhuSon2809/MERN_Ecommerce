import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";
import "./ProcessOrder.css";

function formatCurrency(currency) {
  return currency.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}

const ProcessOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const { id } = useParams();

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              style={{
                display: order?.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div className="confirmOrderPage">
                {/* Shipping Info */}
                <div>
                  {/* Payment */}
                  <div className="process-order-payment">
                    <div>
                      <h1>Payment: </h1>
                      <p
                        className={
                          order?.paymentInfo &&
                          order?.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order?.paymentInfo &&
                        order?.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>
                    <div className="process-order-payment_amount">
                      <p>Amount:</p>
                      <span>{order?.totalPrice && order?.totalPrice}</span>
                    </div>
                  </div>

                  {/* Oder status */}
                  <div className="process-order-status">
                    <h1>Order Status: </h1>
                    <p
                      className={
                        order?.orderStatus && order?.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order?.orderStatus && order?.orderStatus}
                    </p>
                  </div>

                  <div className="process-order-shipping-info">
                    <h1 className="process-order-shipping-info-name">
                      Shipping Information
                    </h1>
                    <div>
                      <p>Name:</p>
                      <span>{order?.user && order?.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order?.shippingInfo && order?.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order?.shippingInfo &&
                          `${order?.shippingInfo.address}, ${order?.shippingInfo.districtName}, ${order?.shippingInfo.provinceName}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="process-order-cart-item">
                  <h1>Your Cart Items</h1>
                  {order?.orderItems &&
                    order?.orderItems.map((item) => (
                      <div key={item.product}>
                        <img
                          className="process-product-image"
                          src={item.image}
                          alt="Product"
                        />
                        <Link
                          className="process-product-link"
                          to={`/product/${item.product}`}
                          style={{ color: "#000" }}
                        >
                          {item.name}
                        </Link>
                        <span>
                          {item.quantity} X {formatCurrency(item.price)} ={" "}
                          <b>{formatCurrency(item.price * item.quantity)}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display:
                    order?.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <div>
                    <h1>Process Order</h1>
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order?.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order?.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>

                    <Button
                      id="createProductBtn"
                      type="submit"
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                    >
                      Process
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
