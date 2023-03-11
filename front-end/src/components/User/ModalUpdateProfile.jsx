import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { clearErrors, updateProfile } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import { CloseButton, SubmitButton, TextTitle } from "./userStyle";
import Loader from "../layout/Loader/Loader";

function ModalUpdateProfile({ isOpen, toogleOpen }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState();

  const updateProfileDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (user) {
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully!");
      // dispatch(loadUser());
      // navigate("/account");
   
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, user, isUpdated]);

  const formik = useFormik({
    initialValues: {
      name: user ? user.name : "",
      email: user ? user.email : "",
      address: user ? user.address : "",
      phone: user ? user.phone : "",
    },
    onSubmit: (values, formikHelpers) => {
      if (user) {
        const myForm = new FormData();
        myForm.set("name", formik.values.name);
        myForm.set("email", formik.values.email);
        myForm.set("address", formik.values.address);
        myForm.set("phone", formik.values.phone);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
      }
      formikHelpers.resetForm();
      toogleOpen();
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().required("Required").email("Email format incorrect!"),
      address: Yup.string()
        .required("Required")
        .min(5, "Must be 5 characters or more"),
      phone: Yup.string().required("Required").min(10, "Must be 10 numbers"),
    }),
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Dialog
          sx={{
            ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
              width: "600px",
              maxWidth: "600px",
            },
          }}
          open={isOpen}
          onClose={toogleOpen}
        >
          <TextTitle>Update profile</TextTitle>
          <form onSubmit={formik.handleSubmit}>
            <DialogContent sx={{ width: "100%" }}>
              <FormControl
                fullWidth
                sx={{
                  mb: "40px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: "10px",
                }}
              >
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "99px",
                    border: "1px solid #ffd90c",
                  }}
                />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProfileDataChange}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: "15px" }}>
                <TextField
                  fullWidth
                  name="name"
                  variant="outlined"
                  color="warning"
                  size="small"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && (
                  <Typography
                    sx={{ ml: "5px", minHeight: "5px" }}
                    variant="caption"
                    color="red"
                  >
                    {formik.errors.name}
                  </Typography>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: "15px" }}>
                <TextField
                  fullWidth
                  name="email"
                  variant="outlined"
                  color="warning"
                  size="small"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && (
                  <Typography
                    sx={{ ml: "5px", minHeight: "5px" }}
                    variant="caption"
                    color="red"
                  >
                    {formik.errors.email}
                  </Typography>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: "15px" }}>
                <TextField
                  name="address"
                  label="Address"
                  variant="outlined"
                  size="small"
                  color="warning"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
                {formik.errors.address && (
                  <Typography sx={{ ml: "5px" }} variant="caption" color="red">
                    {formik.errors.address}
                  </Typography>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: "15px" }}>
                <TextField
                  name="phone"
                  label="Phone Number"
                  variant="outlined"
                  size="small"
                  color="warning"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
                {formik.errors.phone && (
                  <Typography sx={{ ml: "5px" }} variant="caption" color="red">
                    {formik.errors.phone}
                  </Typography>
                )}
              </FormControl>
            </DialogContent>
            <DialogActions>
              <CloseButton
                variant="contained"
                onClick={toogleOpen}
                sx={{ mt: 0 }}
              >
                Close
              </CloseButton>
              <SubmitButton type="submit">Update</SubmitButton>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </>
  );
}

export default ModalUpdateProfile;
