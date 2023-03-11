import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

function ButtonCustom({ children, size, variant, onClick, color, width }) {
  const ButtonCus = styled(Button)({
    background: "#ffd90c",
    textTransform: "capitalize",
    "&:hover": {
      background: "#ffd90c",
    },
  });

  return (
    <ButtonCus
      size={size}
      variant={variant}
      onClick={onClick}
      sx={{ color: `${color} !important`, width: { width } }}
    >
      {children}
    </ButtonCus>
  );
}

export default ButtonCustom;
