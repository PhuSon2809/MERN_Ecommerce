import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "50vh",
      }}
    >
      <CircularProgress sx={{ color: " #ffd90c" }} size={70} />
    </Box>
  );
};

export default Loader;
