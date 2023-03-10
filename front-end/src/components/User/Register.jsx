import React, { useEffect, useState } from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { Container, IconButton, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, register } from "../../actions/userAction";
import ButtonCustom from "../../container/ButtonCustom/ButtonCustom";
import {
  BoxLogo,
  BoxWrapper,
  FormInput,
  IconWrapper,
  InputWrapper,
  StyledInputBase,
} from "./userStyle";

function Register() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    dispatch(register(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/login");
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
            Register
          </Typography>
        </BoxLogo>
        <Typography>Welcome to Electronic Lyte!</Typography>

        <from>
          <FormInput fullWidth sx={{ mb: 3 }}>
            <label style={{ fontWeight: "600" }}>Name</label>
            <InputWrapper>
              <IconWrapper>
                <AccountCircleIcon sx={{ color: "#000" }} />
              </IconWrapper>
              <StyledInputBase
                fullWidth
                placeholder="Your name"
                inputProps={{ "aria-label": "Name" }}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputWrapper>
          </FormInput>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              to="/password/forgot"
              style={{
                textDecoration: "underline",
                color: "#000",
              }}
            >
              Forgot your password?
            </Link>
          </div>
        </from>
        <ButtonCustom width="100%" onClick={registerSubmit} color="#000">
          Register
        </ButtonCustom>
        <Typography>
          Are you already account?
          <Link
            to="/login"
            style={{
              textDecoration: "underline",
              color: "#000",
              marginLeft: "5px",
            }}
          >
            Sign in
          </Link>
        </Typography>
      </BoxWrapper>
    </Container>
  );
}

export default Register;
