import { Box, FormControl, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BoxWrapper = styled(Box)({
  width: "50%",
  padding: "30px 30px",
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
  width: "100%",
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
  },
}));
