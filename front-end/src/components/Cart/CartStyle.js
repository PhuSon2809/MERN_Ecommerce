import { Box, Button, InputBase, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BoxEmpty = styled(Box)({
  minHeight: "70vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "20px",
  marginTop: "100px",
  marginBottom: "100px",
});

export const BoxCart = styled(Box)({
  minHeight: "70vh",
  marginTop: "100px",
  marginBottom: "100px",
});

export const BoxHeader = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const BoxCartList = styled(Box)({
  width: "100%",
  padding: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "30px",
  backgroundColor: "#f9f9f9",
});

export const BoxInput = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const InputCustom = styled(InputBase)({
  border: "1.2px solid #ffd90c",
  width: "50px",
  padding: "1.2px 10px",
});

export const ButtonCus = styled(Button)({
  background: "#ffd90c",
  "&:hover": {
    background: "#ffd90c",
  },
  color: "#000000",
  borderRadius: "0px",
  minWidth: "40px !important",
});

export const BoxLine = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const BoxQuantity = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "20px",	
});


export const Red = styled(Typography)({
  color: "red",
  textDecoration: "underline",
  cursor: "pointer",
});

export const TitleCart = styled(Typography)({
  fontWeight: "700"
});

export const Item = styled(Typography)({
  textDecoration: "underline",
});
