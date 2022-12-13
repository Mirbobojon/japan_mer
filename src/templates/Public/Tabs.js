import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeliveryBox from "./DeliveryBox/DeliveryBox";
import Recomendation from "./Recomendation";
import { ImageListItem } from "@mui/material";
import { wantToSellCards, wantToBuyCards } from "../../_mock_/deliveryCardInfo";
import ProductsContainer from "./Products/ProductsContainer";
import ProductCategory from "./ProductCategory";
import { useSelector } from "react-redux";

import ServicesContainer from "./Services/ServicesContainer";
import { buySteps, howToBuy, servicesSteps } from "../../_mock_/howToWork";

import buy_title from "../../assets/buy_title.png";
import sell_title from "../../assets/sell_title.png";
import sell_banner from "../../assets/sell_banner.jpg";
import buy_banner from "../../assets/buy_banner.jpg";
import free_appraisal from "../../assets/free_appraisal.png";
import problem from "../../assets/problem.png";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ overflow: "visible!important" }}
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ mt: 3, overflow: "visible!important" }}>
          <Typography sx={{ overflow: "visible!important" }}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `indicator-${index}`,
    "aria-controls": `indicator-${index}`,
  };
}

export default function BasicTabs({ recommendItems, status }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(`value: ${newValue}`);
  };

  //Use handleChange on Tabs, not handleClick on Tab
  const handleClick = (event) => {
    //setValue(event);
    console.log(event);
  };
  //   const productsData = useSelector(selectAllProducts);
  //   const status = useSelector(selectProductStatus);

  return (
    <Box
      sx={{
        width: "100%",
        pl: {
          xs: 0,
          sm: 0,
          md: 2,
          lg: 2,
        },
        pt: 2,
        overflow: "visible!important",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          overflow: "visible!important",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          // initialSelectedIndex={0}
          aria-label="indicator example"
          TabIndicatorProps={{
            hidden: false,
            sx: {
              overflow: "visible!important",
              backgroundColor: "red",
              height: 10,
              position: "absolute",
              bottom: "-10px",
              zIndex: 10,
              clipPath: "polygon(0 0, 48% 63%, 100% 0)",
            }, //width: "25% !important"
          }}
          sx={{
            overflow: "visible!important",
            width: "100%",
            "& button": {
              color: "secondary.light",
              borderRadius: {
                border: "1px solid #d84416",
              },
            },
            "& button:focus": {
              backgroundColor: "secondary.light",
              color: "white!important",
            },
          }}
        >
          <Tab
            style={{
              overflow: "visible!important",
              fontSize: "20px",
              fontWeight: "light",

              minWidth: "50%",
              marginRight: 10,
              padding: "15px",
              "&:hover": {
                backgroundColor: "secondary.light",
              },
            }}
            onClick={handleClick}
            label="買いたい"
            {...a11yProps(0)}
          />
          <Tab
            style={{
              fontSize: "20px",
              fontWeight: "light",
              minWidth: "48.5%",
              color: "secondary.light",
            }}
            onClick={handleClick}
            label="売りたい"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel
        classes={{
          "& .MuiBox-root": {
            padding: "0px",
          },
        }}
        value={value}
        index={0}
      >
        <Box>
          <DeliveryBox sz={1} title={buy_title} data={wantToSellCards} />
          <Recomendation />

          <ProductsContainer
            data={recommendItems.slice(0, 9)}
            status={status}
          />
          <ServicesContainer title="ご利用ステップ" data={buySteps} />

          <ServicesContainer />
          <DeliveryBox sz={3} title="お取り扱い商品カテゴリー">
            <ProductCategory />
          </DeliveryBox>
          <ImageListItem
            sx={{
              width: "100%",
              mx: "auto",
              my: 8,
              // display: { sm: "none", xs: "none" },
            }}
          >
            <img src={buy_banner} alt={"some title"} loading="lazy" />
          </ImageListItem>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DeliveryBox sz={2} title={sell_title} data={wantToBuyCards} />
        <ImageListItem sx={{ width: "100%", mx: "auto", my: 8 }}>
          <img src={free_appraisal} alt={"some title"} loading="lazy" />
        </ImageListItem>

        <ImageListItem sx={{ width: "100%", mx: "auto", my: 8 }}>
          <img src={problem} alt={"some title"} loading="lazy" />
        </ImageListItem>

        <ServicesContainer
          title="在庫買取サービスで解決!!"
          data={servicesSteps}
        />

        <DeliveryBox
          sz={3}
          title="買取商品カテゴリー
"
        >
          <ProductCategory />
        </DeliveryBox>
        <ServicesContainer title="買取ステップ" sz={1} data={howToBuy} />
        <ImageListItem
          sx={{
            width: "100%",
            mx: "auto",
            display: { sm: "none", xs: "none" },
          }}
        >
          <img src={free_appraisal} alt={"some title"} loading="lazy" />
        </ImageListItem>
        <ImageListItem sx={{ width: "100%", mx: "auto", my: 8 }}>
          <img src={free_appraisal} alt={"some title"} loading="lazy" />
        </ImageListItem>
        <ImageListItem
          sx={{
            width: "100%",
            mx: "auto",
            my: 8,
            // display: { md: "block", xs: "none" },
          }}
        >
          <img src={sell_banner} alt={"some title"} loading="lazy" />
        </ImageListItem>
      </TabPanel>
    </Box>
  );
}
