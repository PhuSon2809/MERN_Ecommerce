import React, { Fragment, useEffect, useState } from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { Container, IconButton, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import ButtonCustom from "../../container/ButtonCustom/ButtonCustom";
import Loader from "../layout/Loader/Loader";
import {
  BoxLogo,
  BoxWrapper,
  FormInput,
  IconWrapper,
  InputWrapper,
  StyledInputBase,
} from "./userStyle";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password Updated Successfully!");
      navigate("/");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Container sx={{ minHeight: "60vh" }}>
          <BoxWrapper>
            <BoxLogo sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton sx={{ background: "#242424", mr: 1 }}>
                <BoltIcon sx={{ fontSize: "30px", color: "#ffd90c" }} />
              </IconButton>
              <Typography
                variant="h4"
                sx={{
                  color: "#000",
                  fontWeight: 800,
                  letterSpacing: "4px",
                }}
              >
                Change Password
              </Typography>
            </BoxLogo>

            <from>
              <FormInput fullWidth sx={{ mb: 3 }}>
                <label style={{ fontWeight: "600" }}>Old password</label>
                <InputWrapper>
                  <IconWrapper>
                    <VpnKeyIcon sx={{ color: "#000" }} />
                  </IconWrapper>
                  <StyledInputBase
                    fullWidth
                    placeholder="old password"
                    inputProps={{ "aria-label": "Name" }}
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </InputWrapper>
              </FormInput>

              <FormInput fullWidth sx={{ mb: 3 }}>
                <label style={{ fontWeight: "600" }}>New password</label>
                <InputWrapper>
                  <IconWrapper>
                    <LockOpenIcon sx={{ color: "#000" }} />
                  </IconWrapper>
                  <StyledInputBase
                    fullWidth
                    placeholder="new password"
                    inputProps={{ "aria-label": "Email" }}
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </InputWrapper>
              </FormInput>

              <FormInput fullWidth sx={{ mb: 3 }}>
                <label style={{ fontWeight: "600" }}>Confirm Password</label>
                <InputWrapper>
                  <IconWrapper>
                    <HttpsOutlinedIcon sx={{ color: "#000" }} />
                  </IconWrapper>
                  <StyledInputBase
                    fullWidth
                    placeholder="confirm password"
                    inputProps={{ "aria-label": "Password" }}
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </InputWrapper>
              </FormInput>
            </from>
            <ButtonCustom
              width="100%"
              onClick={updatePasswordSubmit}
              color="#000"
            >
              Change password
            </ButtonCustom>
          </BoxWrapper>
        </Container>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
