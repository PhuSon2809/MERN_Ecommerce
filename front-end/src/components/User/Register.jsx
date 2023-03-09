import React, { useEffect, useState } from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { Container, IconButton, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, login } from "../../actions/userAction";
import ButtonCustom from "../../container/ButtonCustom/ButtonCustom";
import {
  BoxLogo,
  BoxWrapper,
  FormInput,
  IconWrapper,
  InputWrapper,
  StyledInputBase,
} from "./LoginSignupStyle";

function Register() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, navigate, error, alert, isAuthenticated]);

  return (
    <Container sx={{ minHeight: "60vh" }}>
      <BoxWrapper>
        <BoxLogo sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton sx={{ background: "#242424", mr: 1 }}>
            <BoltIcon sx={{ fontSize: "40px", color: "#ffd90c" }} />
          </IconButton>
          <Typography
            variant="h3"
            sx={{
              color: "#000",
              fontWeight: 800,
              letterSpacing: "4px",
            }}
          >
            Login
          </Typography>
        </BoxLogo>
        <Typography>Welcome to Electronic Lyte!</Typography>

        <from>
          <FormInput fullWidth sx={{ mb: 3 }}>
            <label style={{ fontWeight: "600" }}>Email</label>
            <InputWrapper>
              <IconWrapper>
                <EmailOutlinedIcon sx={{ color: "#000" }} />
              </IconWrapper>
              <StyledInputBase
                fullWidth
                placeholder="Your email"
                inputProps={{ "aria-label": "Email" }}
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </InputWrapper>
          </FormInput>

          <FormInput fullWidth sx={{ mb: 3 }}>
            <label style={{ fontWeight: "600" }}>Password</label>
            <InputWrapper>
              <IconWrapper>
                <HttpsOutlinedIcon sx={{ color: "#000" }} />
              </IconWrapper>
              <StyledInputBase
                fullWidth
                placeholder="Your password"
                inputProps={{ "aria-label": "Password" }}
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </InputWrapper>
          </FormInput>

          <div
            style={{
              width: "100%",
              textAlign: "right",
            }}
          >
            <Link
              to="/register"
              style={{
                textDecoration: "underline",
                color: "#000",
              }}
            >
              Forgot your password?
            </Link>
          </div>
        </from>
        <ButtonCustom width="100%" onClick={loginSubmit} color="#000">
          Login
        </ButtonCustom>
        <Typography>
          Don’t have an account?
          <Link
            to="/register"
            style={{ textDecoration: "underline", color: "#000" }}
          >
            Sign up
          </Link>
        </Typography>
      </BoxWrapper>
    </Container>
  );
}

export default Register;
