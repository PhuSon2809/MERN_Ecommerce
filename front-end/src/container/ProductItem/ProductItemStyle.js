import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ButtonAdd = styled(Button)({
  color: "#000",
  background: "#ffd90c",
  textTransform: "capitalize",
  "&:hover": {
    background: "#ffd90c",
  },
});

export const BoxContext = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  flexDirection: "column",
  gap: "2px",
  paddingLeft: "5px",
  paddingRight: "5px",
  color: "#000",
});

export const BoxAction = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "15px",
});

export const BoxCard = styled(Box)({
  width: "90%",
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "40px",
});
