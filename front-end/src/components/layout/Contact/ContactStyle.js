import { Box, InputBase, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BoxTitle = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "15px",
  marginBottom: "50px",
});

export const TitlePage = styled(Typography)({
  fontWeight: "600",
});

export const BoxContactItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexDirection: "column",
  gap: "20px",
  padding: "20px",
  background: "#f9f9f9",
  textAlign: "center",
  width: "90%",
  height: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  boxShadow: "2px 2px 2px 2px #ffd90c",
  borderRadius: "5px",
});

export const InputCustom = styled(InputBase)({
  borderRadius: "5px",
  border: "1.2px solid #ffd90c",
  width: "100%",
  padding: "2px 20px",
});
