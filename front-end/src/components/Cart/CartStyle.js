import { Box, Button, Chip, FormControl, InputBase, Typography } from "@mui/material";
import { emphasize, styled } from "@mui/material/styles";

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
  padding: "15px 0",
  justifyContent: "space-between",
  borderTop: "1px solid #d9d9db",
  borderBottom: "1px solid #d9d9db",
});

export const BoxCartList = styled(Box)({
  width: "100%",
  padding: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "30px",
  boxShadow: "2px 2px 2px 2px #ffd90c",
  borderRadius: "5px",
});

export const BoxInput = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const InputCustom = styled(InputBase)({
  border: "1.2px solid #ffd90c",
  width: "70px",
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
  gap: "15px",
});

export const Red = styled(Typography)({
  color: "red",
  textDecoration: "underline",
  cursor: "pointer",
});

export const TitleCart = styled(Typography)({
  fontWeight: "800 !important",
});

export const Item = styled(Typography)({
  textDecoration: "underline",
  letterSpacing: "1.5px !important",
  fontSize: "18px !important",
});

export const ContentFooter = styled(Typography)({
  textDecoration: "underline",
  letterSpacing: "1px",
  color: "#000 !important",
  cursor: "pointer",
});

export const BoxItem = styled(Box)({
  padding: "10px 0",
  width: "fit-content",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
});

export const BoxContentItem = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  flexDirection: "column",
  gap: "5px",
  color: "#000 !important",
});

export const StyledBreadcrumbActive = styled(Chip)(({ theme }) => {
  const backgroundColor = "#ffd90c";
  return {
    backgroundColor,
    height: theme.spacing(4),
    fontSize: "15px",
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[2],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

export const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(4),
    fontSize: "15px",
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

export const BoxItemAcep = styled(Box)({
  padding: "10px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const BoxItemAcepContent = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

export const BoxCartItems = styled(Box)({
  padding: "10px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "10px",
  borderBottom: "1px solid #ffd90c",
});

export const BoxPrice = styled(Box)({
  width: "100%",
  padding: "10px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const FormInput = styled(FormControl)({
  alignItems: "flex-start",
  flexDirection: "cloumn",
  gap: "5px",
});

export const InputWrapper = styled("div")(({ theme }) => ({
  height: "50px",
  width: "100%",
  border: "1.5px solid #ffd90c",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
}));

export const IconWrapper = styled("div")(({ theme }) => ({
  padding: "5px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,

  color: "#000",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    width: "100%",
  },
}));

export const ButtonCustom = styled(Button)({
  background: "#ffd90c",
  textTransform: "capitalize",
  "&:hover": {
    background: "#ffd90c",
  },
  color: "#000000",
});

export const BoxPriceTotal = styled(Box)({
  width: "100%",
  padding: "20px 20px 10px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderTop: "1.5px solid #ffd90c",
});