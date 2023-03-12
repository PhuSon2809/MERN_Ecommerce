import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import PersonIcon from "@material-ui/icons/Person";
import SideBar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_USER_RESET } from "../../constants/userConstant";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userAction";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Loader from "../layout/Loader/Loader";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const params = useParams();

  const userId = params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="update-product-form"
              onSubmit={updateUserSubmitHandler}
            >
              <h1 className="title">Update User</h1>

              <div className="update-product-control">
                <span className="update-product-label col-sm-3">Name</span>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  className="form-control col-sm-9"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="update-product-control">
                <span className="update-product-label col-sm-3">Email</span>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="form-control col-sm-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="update-product-control">
                <span className="update-product-label col-sm-3">Role</span>
                <select
                  className="form-control col-sm-9"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <div className="update-btn">
                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={
                    updateLoading ? true : false || role === "" ? true : false
                  }
                >
                  Update
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
