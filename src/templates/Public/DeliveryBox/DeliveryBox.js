import React from "react";

import { Box, Typography, ImageListItem } from "@mui/material";
import DeliveryBoxItem from "./DeliveryBoxItem";
import { Grid } from "@mui/material";
const DeliveryBox = ({ sz, title, data = [], children }) => {
  const boxes = data.map((item) => {
    return <DeliveryBoxItem key={item.id} item={item} />;
  });
  return (
    <Box sx={{ textAlign: "center", backgroundColor: "divider", p: 2 }}>
      {sz === 3 ? (
        <Typography
          variant="h6"
          sx={{ mb: 2, fontSize: "25px", fontWeight: "600" }}
        >
          {title}
        </Typography>
      ) : (
        <ImageListItem
          sx={{
            width: sz === 1 ? 300 : 200,
            mx: "auto",
            my: 2,
          }}
        >
          <img src={title} alt={"some title"} loading="lazy" />
        </ImageListItem>
      )}

      <Box sx={{ borderBottom: "1px dotted gray", mb: 2 }}></Box>
      <Grid container spacing={2}>
        {boxes}
        {children}
      </Grid>
    </Box>
  );
};

export default DeliveryBox;
