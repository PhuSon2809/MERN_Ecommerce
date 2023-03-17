import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import LauchIcon from "@material-ui/icons/Launch";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Container, IconButton } from "@mui/material";
import moment from "moment";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, myOrders } from "../../actions/orderAction";
import { BoxEmpty, ButtonCustom, TitleCart } from "../Cart/CartStyle";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
console.log(orders);
  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      maxWidth: 100,
      flex: 0.2,
      hide: true,
    },
    { field: "STT", headerName: "STT", flex: 1 },
    { field: "userName", headerName: "User Name", flex: 1 },

    {
      field: "itemQty",
      headerName: "Item Quantity",
      type: "number",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      flex: 1,
    },
    {
      field: "createDate",
      headerName: "Create Date",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
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

  const rows = [];

  let count = 1;

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        STT: count++,
        itemQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
        userName: item.user.name,
        createDate: moment(item.createdAt).format("hh:mm - DD/MM/YYYY") ,
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
      <MetaData title={`Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <Container sx={{ mt: 10, mb: 10 }}>
          {rows.length === 0 ? (
            <BoxEmpty>
              <IconButton
                className="transition2"
                sx={{
                  background: "#000",
                  "&:hover": {
                    background: "#000",
                  },
                }}
              >
                <ListAltIcon sx={{ fontSize: "100px", color: "#ffd90c" }} />
              </IconButton>
              <TitleCart variant="h3">You Have No order</TitleCart>
              <Link to="/products">
                <ButtonCustom>View Products</ButtonCustom>
              </Link>
            </BoxEmpty>
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
        </Container>
      )}
    </Fragment>
  );
};

export default MyOrders;
