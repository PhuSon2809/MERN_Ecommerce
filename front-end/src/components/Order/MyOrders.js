import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import LauchIcon from "@material-ui/icons/Launch";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  // const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", maxWidth: 200, flex: 0.2 },
    { field: "userName", headerName: "User Name", maxWidth: 250, flex: 0.2 },

    {
      field: "itemQty",
      headerName: "Item Qty",
      type: "number",
      maxWidth: 203,
      flex: 0.2,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      maxWidth: 203,
      flex: 0.2,
    },
    {
      field: "status",
      headerName: "Status",
      maxWidth: 200,
      flex: 0.2,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      maxWidth: 250,
      flex: 0.2,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LauchIcon />
          </Link>
        );
      },
    },
  ];
  // const orderTest = [
  //   { id: 1, userName: "abc", itemQty: 10, amount: 5, status: "Delivered" },
  //   { id: 2, userName: "bca", itemQty: 10, amount: 2, status: "NotDelivered" },
  //   { id: 3, userName: "bca", itemQty: 10, amount: 2, status: "NotDelivered" },
  //   { id: 4, userName: "bca", itemQty: 10, amount: 2, status: "NotDelivered" },
  //   { id: 5, userName: "bca", itemQty: 10, amount: 2, status: "NotDelivered" },
  //   { id: 6, userName: "bca", itemQty: 10, amount: 2, status: "NotDelivered" },
  //   { id: 7, userName: "bca", itemQty: 10, amount: 2, status: "NotDelivered" },
  //   { id: 8, userName: "bca", itemQty: 10, amount: 2, status: "NotDelivered" },
  //   { id: 9, userName: "bca", itemQty: 10, amount: 2, status: "NotDelivered" },
  //   { id: 10, userName: "bca", itemQty: 10, amount: 2, status: "NotDelivered" },
  //   { id: 11, userName: "bca", itemQty: 10, amount: 2, status: "NotDelivered" },
  // ];
  // const rows = orderTest;
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
        user: item.user.name,
      });
    });
  console.log(orders);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {/* <MetaData title={`${user.name} - Orders`} /> */}
      <MetaData title={`Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          {rows.length === 0 ? (
            <div className="emptyCart">
              <RemoveShoppingCartIcon />
              <Typography>You Have No order</Typography>
              <Link to="/products">View Products</Link>
            </div>
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />
          )}

          {/* <Typography id="myOrdersHeading">{user.name}'s Orders</Typography> */}
          <Typography id="myOrdersHeading">Your Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
