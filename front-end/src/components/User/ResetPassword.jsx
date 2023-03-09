import React, { Fragment, useEffect, useState } from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Container, IconButton, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, resetPassword } from "../../actions/userAction";
import ButtonCustom from "../../container/ButtonCustom/ButtonCustom";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import {
  BoxLogo,
  BoxWrapper,
  FormInput,
  IconWrapper,
  InputWrapper,
  StyledInputBase,
} from "./userStyle";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { token } = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully!");
      navigate("/login");
    }
  }, [dispatch, error, alert, navigate, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Container sx={{ minHeight: "60vh", mb: 10 }}>
          <MetaData title="Reset Password" />
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              onClick={resetPasswordSubmit}
              color="#000"
            >
              Reset password
            </ButtonCustom>
          </BoxWrapper>
        </Container>
      )}
    </Fragment>
  );
};

export default ResetPassword;
