import { Box, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ToolbarBox = styled(Toolbar)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const BoxLogo = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  color: "#000",
});

export const BoxAction = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  gap: "20px",
});

export const BoxMenu = styled(Box)({
  background: "#ffd90c",
  alignItems: "center",
  justifyContent: "center",
});

export const MenuItemCustom = styled(Typography)({
  width: "150px",
  padding: "10px 20px",
  fontWeight: "500 !important",
  color: "black",
  textTransform: "uppercase",
  letterSpacing: "1px",
  textAlign: "center",
  "&:hover": {
    background: "#fff",
  },
});

export const ItemAction = styled(Typography)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  gap: "10px",
  color: "#000",
});
