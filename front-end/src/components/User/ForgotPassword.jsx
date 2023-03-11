import React, { useEffect, useState } from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Container, IconButton, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import ButtonCustom from "../../container/ButtonCustom/ButtonCustom";
import {
  BoxLogo,
  BoxWrapper,
  FormInput,
  IconWrapper,
  InputWrapper,
  StyledInputBase,
} from "./userStyle";

function ForgotPassword() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <Container sx={{ minHeight: "60vh" }}>
      <BoxWrapper>
        <Link to="/login" style={{ marginRight: "auto" }}>
          <IconButton sx={{ color: "#000" }}>
            <KeyboardBackspaceIcon />
          </IconButton>
        </Link>
        <BoxLogo sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton sx={{ background: "#242424", mr: 1 }}>
            <BoltIcon sx={{ fontSize: "40px", color: "#ffd90c" }} />
          </IconButton>
          <Typography
            variant="h4"
            sx={{
              color: "#000",
              fontWeight: 800,
              letterSpacing: "4px",
            }}
          >
            Forgot Password
          </Typography>
        </BoxLogo>

        <from style={{ width: "80%" }}>
          <FormInput fullWidth sx={{ mb: 3, mt: 3 }}>
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
        </from>
        <ButtonCustom width="50%" onClick={forgotPasswordSubmit} color="#000">
          Send
        </ButtonCustom>
      </BoxWrapper>
    </Container>
  );
}

export default ForgotPassword;
