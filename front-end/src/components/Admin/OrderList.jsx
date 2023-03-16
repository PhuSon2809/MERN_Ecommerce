import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { getAllOrders, deleteOrder, clearErrors } from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector(state => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  }

  const [open, setOpen] = React.useState(false);
  const [idDelete, setIdDelete] = React.useState("");

  const handleClickOpen = (id) => {
    setOpen(true);
    setIdDelete(id)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () =>{
    deleteOrderHandler(idDelete)
    setOpen(false);

 }

  useEffect(() => {
    if (error) {
        alert.error(error);
        dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllOrders());
  }, [dispatch, navigate, error, alert, deleteError, isDeleted])

  const columns = [
    { field: "id", headerName: "Order ID", flex: 1.5, hide: true },
    { field: "STT", headerName: "STT", flex: 1.5 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
        ? "greenColor"
        : "redColor"
      },
    },
    {
      field: "itemQty",
      headerName: "Item Qty",
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
      field: "actions",
      flex: 1,
      headerName: "Actions",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => handleClickOpen(params.getValue(params.id, "id"))
              // deleteOrderHandler(params.getValue(params.id, "id"))
              }>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];
  let count = 1;

  orders &&
    orders.forEach((item) => {
      rows.push({
        STT: count++,
        id: item._id,
        itemQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure to delete this order?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleAgree} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fragment>

    
  );
};

export default OrderList;
