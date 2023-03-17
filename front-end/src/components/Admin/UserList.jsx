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
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstant";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const UserList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

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
    deleteUserHandler(idDelete)
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
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [dispatch, navigate, error, alert, deleteError, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID",  flex: 1.5, hide: true },
    { field: "STT", headerName: "STT",  flex: 0.5 },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      type: "number",
      flex: 1,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      flex: 1,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() => handleClickOpen(params.getValue(params.id, "id"))
                // deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];
  let count = 1;

  users &&
    users.forEach((item) => {
      rows.push({
        STT: count++,
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });
  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

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
            {"Are you sure to delete this user?"}
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

export default UserList;
