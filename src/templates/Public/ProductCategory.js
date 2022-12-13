import { useState, useEffect } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeliveryBox from "./DeliveryBox/DeliveryBox";

import { useSelector, useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { RouteDir } from "../../common";

import { categories } from "../../_mock_/categories.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid() {
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.items.selectKeyword);

  const [searchNameValue, setSearchName] = useState(keyword);

  useEffect(() => {
    setSearchName(keyword);
  }, [keyword]);

  const selectItemListByCategory = (id) => {
    setSearchName("");
    // dispatch(changeCategory(id))
    dispatch(push(RouteDir + "/item/list?category=" + id));
  };
  return (
    <Box sx={{ flexGrow: 1, mt: 2 }}>
      <Container>
        <Grid sx={{ pl: 2 }} container spacing={1}>
          {categories?.slice(0, 17).map((el) => {
            return (
              <Grid key={el.id} item xs={6} md={3} sm={4} sx={6}>
                <Card
                  sx={{
                    maxWidth: "100%",
                    borderRadius: "0",
                    m: "auto",
                    p: "0",
                    cursor: "pointer",
                  }}
                >
                  <CardMedia
                    onClick={() => selectItemListByCategory(el.id)}
                    component="img"
                    image={el.img}
                    alt="green iguana"
                  />
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
