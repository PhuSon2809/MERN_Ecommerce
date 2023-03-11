import {
  Box,
  Button,
  DialogTitle,
  FormControl,
  InputBase,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const BoxWrapper = styled(Box)({
  width: "50%",
  padding: "30px",
  border: "2px solid #000",
  borderRadius: "20px",
  margin: "100px auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "20px",
});

export const FormInput = styled(FormControl)({
  alignItems: "flex-start",
  flexDirection: "cloumn",
  gap: "5px",
});

export const BoxLogo = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  color: "#000",
});

export const InputWrapper = styled("div")(({ theme }) => ({
  height: "60px",
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

export const BoxLeft = styled(Box)({
  width: "100%",
  padding: "10px 10px 10px 0px",
  display: "flex",
  flexDirection: "column",
  gap: "50px",
});

export const BoxInfor = styled(Box)({
  width: "100%",
  padding: "30px 30px 30px 0px",
  border: "2px solid #000",
  borderRadius: "8px",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: "20px",
});

export const BoxAvatar = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "row",
  gap: "10px",
});

export const BoxAction = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  gap: "20px",
});

export const ItemAction = styled(Typography)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexDirection: "row",
  gap: "8px",
  color: "#000",
  padding: "5px",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

export const BoxInforDetail = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  gap: "20px",
});

export const ItemInfor = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  padding: "5px 10px",
  background: "#ffd90c",
});

export const Title = styled(Typography)({
  fontSize: "17px",
  fontWeight: "600",
});

export const CloseButton = styled(Button)({
  marginTop: "10px",
  textTransform: "capitalize",
  fontWeight: "bold",
  height: "fit-content",
});

export const SubmitButton = styled(Button)({
  textTransform: "capitalize",
  fontWeight: "bold",
  color: "#000",
  height: "fit-content",
  backgroundColor: "#ffd90c",
  "&:hover": {
    backgroundColor: "#ffd90c",
  },
});

export const TextTitle = styled(DialogTitle)({
  fontSize: "2rem",
  fontWeight: "600",
  letterSpacing: "2px",
  textTransform: "capitalize",
  color: "#000",
  textDecoration: "underline",
  textDecorationColor: "#ffd90c",
});
