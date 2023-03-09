import { Box, FormControl, InputBase, Typography } from "@mui/material";
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
  padding: "30px",
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
  justifyContent: "center",
  flexDirection: "row",
  gap: "8px",
  color: "#000",
  padding: "5px",
  "&:hover":{
    transform: "scale(1.05)"
  }
});
