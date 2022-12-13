import React from "react";
import { Box, Container } from "@mui/system";
import Typography from "@mui/material/Typography";
const Recomindation = () => {
  return (
    <Box
      sx={{
        my: 4,
        borderLeft: "5px solid #bfa000",
        borderBottom: "3px solid #EDDF9A",
        padding: "10px 10px",
        backgroundColor: "primary.light",
        display: "flex",
        gap: 4,
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontSize: "25px", fontFamily: "SourceHanSans" }}
      >
        おすすめ商品
      </Typography>
      <Typography variant="p" sx={{ color: "primary.dark" }}>
        recommendation
      </Typography>
    </Box>
  );
};

export default Recomindation;
