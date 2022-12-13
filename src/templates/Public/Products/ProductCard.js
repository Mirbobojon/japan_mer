import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { ApiDir, ImagesDir, RouteDir, ItemImageDir } from "../../../common";
import { calcItemTaxIncludedPrice } from "../../../myLib";
export default function ActionAreaCard({ product, i }) {
  const { name, price, path, stock_quantity, tax, id } = product;

  const dispatch = useDispatch();

  return (
    <Grid
      justifyContent="center"
      // alignItems="center"
      item
      xs={12}
      sm={6}
      md={4}
      lg={4}
    >
      <Box
        sx={{ mx: "auto" }}
        variant="div"
        onClick={() => dispatch(push(RouteDir + "/item/detail/" + id))}
      >
        <Card
          sx={{
            border: "none",
            borderRadius: "0",
            boxShadow: "none",
            backgroundColor: "transparent",
          }}
        >
          <CardActionArea>
            {/* <CardMedia
              component="img"
              height="280"
              image={
                path !== null
                  ? `${ItemImageDir}${path})`
                  : `${process.env.PUBLIC_URL}/images/noimage.jpg)`
              }
              alt="green iguana"
            /> */}
            <div
              className="thumbnail_area"
              style={
                path !== null
                  ? {
                      background: `url('${ItemImageDir}${path}') no-repeat center center/cover`,
                      height: "280px",
                    }
                  : {
                      background: `url('${process.env.PUBLIC_URL}/images/noimage.jpg') no-repeat center center/cover`,
                      height: "280px",
                    }
              }
            ></div>

            <CardContent sx={{ backgroundColor: "none", padding: "10px" }}>
              <Typography
                gutterBottom
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "SourceHanSans",
                  fontSize: "15px",
                }}
                component="div"
              >
                {name}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "SourceHanSans",
                  fontSize: "15px",
                }}
                color="secondary"
              >
                ￥{calcItemTaxIncludedPrice(price, tax).toLocaleString()}
                (税込)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Grid>
  );
}
