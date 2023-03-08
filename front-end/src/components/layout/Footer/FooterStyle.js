import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FooterCus = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "20px",
  padding: "20px",
  background: "#211A2C",
  marginTop: "50px"
});

export const BoxMenu = styled(Box)({
  alignItems: "center",
  justifyContent: "center",
});

export const BoxContact = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  gap:"20px"
});

export const BoxLogo = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  color: "#000",
});

export const MenuItemFooter = styled(Typography)({
  width: "150px",
  padding: "5px 20px",
  fontWeight: "500",
  color: "white",
  textTransform: "uppercase",
  letterSpacing: "1px",
  borderLeft: "1px solid #ffd90c",
  borderRight: "1px solid #ffd90c",
  textAlign: "center",
});
