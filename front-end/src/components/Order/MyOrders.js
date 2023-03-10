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
    { field: "id", headerName: "Order ID", minWidth: 250 },
    // { field: "name", headerName: "Order Name", minWidth: 300 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 250,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemQty",
      headerName: "Item Qty",
      type: "number",
      minWidth: 253 + 25,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 253 + 25,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 250,
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
  const orderTest = [
    { id: 1, status: "Delivered", itemQty: 10, amount: 5 },
    { id: 2, status: "Delivered", itemQty: 10, amount: 2 },
  ];
  const rows = orderTest;

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

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
