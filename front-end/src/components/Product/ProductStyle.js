import {
  Box,
  Button,
  InputBase,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const BoxCategory = styled(Box)({
  width: "100%",
  padding: "10px",
  background: "white",
  border: "2px solid #ffd90c",
  borderRadius: "8px",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: "10px",
  flexDirection: "column",
});

export const CategoryItem = styled(Box)({
  width: "100%",
  padding: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "10px",
  cursor: "pointer",

  "&:hover": {
    background: "#ffdb0c85",
  },
});

export const NameTag = styled(Typography)({
  fontSize: "20px !important",
  fontWeight: "500 !important",
  textDecoration: "underline",
  textDecorationColor: "#ffd90c",
});

export const BoxRating = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "20px",
});

export const BoxContent = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  flexDirection: "column",
  gap: "25px",
});

export const Green = styled(Typography)({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  color: "#fff",
  gap: "8px",
});

export const Tag = styled(Typography)({
  padding: "0.5px 10px",
  background: "#198754",
  color: "#fff",
});

export const Stock = styled(Typography)({
  display: "flex",
  alignItems: "center",
  color: "#198754",
  gap: "5px",
});

export const BoxQuantity = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "25px",
});

export const BoxInput = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
});

export const InputCustom = styled(InputBase)({
  borderRadius: "5px",
  border: "1.2px solid #ffd90c",
  width: "63px",
  padding: "1px 20px",
  fontSize: "18px",
});

export const ButtonCustom = styled(Button)({
  background: "#ffd90c",
  textTransform: "capitalize",
  "&:hover": {
    background: "#ffd90c",
  },
  color: "#000000",
});

export const Title = styled(Typography)({
  textAlign: "left",
  padding: "3px 15px",
  fontWeight: "500",
  letterSpacing: "1px",
  borderLeft: "1px solid #ffd90c",
});

export const BoxCommnet = styled(Box)({
  padding: "20px",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  flexDirection: "column",
  gap: "15px",
  backgroundColor: "#f9f9f9",
  marginTop: "20px",
  borderRadius: "10px",
});

export const InputComment = styled(InputBase)({
  borderRadius: "8px",
  border: "1.2px solid #000",
  padding: "1px 20px",
  fontSize: "18px",
});

export const BoxReview = styled(Box)({
  padding: "15px",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: "15px",
  backgroundColor: "#f9f9f9",
  marginTop: "20px",
  borderRadius: "10px",
});

export const BoxContentRe = styled(Box)({
  padding: "10px",
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: "10px",
  marginTop: "10px",
});

