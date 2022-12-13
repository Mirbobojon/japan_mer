import React, { useState, useCallback } from "react";

import {
  Drawer,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  ImageListItem,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

import { changeKeyword } from "../../reducks/items/operations";
import {
  LoginCheckMember,
  logoutMember,
} from "../../reducks/members/operations";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { RouteDir } from "../../common";
// import {
//   openDrawer,
//   closeDrawer,
// } from "../features/siteFeatures/localFeaturesSlice";
import img from "../../assets/black_white_logo.png";
import { Close } from "@mui/icons-material";
import { Link } from "react-router-dom";
export const MuiDrawer = ({ isDrawerOpen, closeDrawer, openDrawer }) => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.members.loginStatus);
  const memberName = useSelector((state) => state.members.name);

  const cartList = useSelector((state) => state.carts.list);
  const [cartCount, setCartCount] = useState(0);

  const [searchNameValue, setSearchName] = useState("");
  const inputSearchName = useCallback(
    (event) => {
      setSearchName(event.target.value);
    },
    [setSearchName]
  );

  const selectItemListByKeyword = (searchNameValue) => {
    dispatch(changeKeyword(searchNameValue));
  };

  const style = {
    textAlign: "center",
    width: "100%",
    maxWidth: 1000,
    color: "white",
    bgcolor: "background.black",
    height: "100vh",
  };

  const drawerData = [
    {
      id: 1,
      title: "トップページ",
      link: "/",
    },
    {
      id: 2,
      title: "商品一覧",
      link: "/item/list",
    },
    {
      id: 3,
      title: "お気に入り",
      link: "/mypage/favorite_list",
    },
    {
      id: 4,
      title: "買い物カゴ",
      link: "/mypage/cart_list",
    },
    {
      id: 5,
      title: "ご利用ガイド",
      link: "/howto",
    },
    {
      id: 6,
      title: "特定商取引法に基づく表記",
      link: "/commercial_transaction",
    },
    {
      id: 7,
      title: "お問い合わせ",
      link: "/contact",
    },
    {
      id: 8,
      title: "お問い合わせ",
    },
  ];

  const list = drawerData.map((text) => {
    return (
      <Box variant="div" key={text.id}>
        <ListItem key="text" sx={{ textAlign: "center", p: 2 }} button>
          <Link
            style={{ textAlign: "center" }}
            onClick={() => dispatch(push(RouteDir + text.link))}
          >
            <ListItemText sx={{ textAlign: "center" }} primary={text.title} />
          </Link>
        </ListItem>
        <Divider />
      </Box>
    );
  });

  return (
    <Box
      sx={{
        position: "absolute",
        top: -1200,
        backgroundColor: "background.black",
        overflow: "hidden!important",
      }}
    >
      <IconButton
        onClick={() => openDrawer()}
        size="large"
        edge="start"
        color="inherit"
        aria-label="logo"
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => closeDrawer()}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor: "background.black",
            p: 2,
            color: "white",
          }}
        >
          <Close
            onClick={() => closeDrawer()}
            sx={{
              fontSize: "3rem",
            }}
          />
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: 300,
              md: 450,
              lg: 450,
              xl: 450,
            },
            backgroundColor: "background.black",
          }}
          role="presentation"
          textAlign="center"
        >
          <List sx={style} component="nav" aria-label="mailbox folders">
            {list}

            <Box sx={{ mt: 4, width: "90%", mx: "auto" }}>
              <TextField
                value={searchNameValue}
                onChange={inputSearchName}
                sx={{
                  width: "90%",
                  mb: 4,
                  p: 0.5,
                  color: "white",
                  backgroundColor: "white",
                }}
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search
                        sx={{
                          my: 4,
                          color: "primary.main",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              {loginStatus ? (
                <Box sx={{ textAlign: "center" }}>
                  <Button
                    sx={{
                      width: "90%",
                      mb: 4,
                      p: 0.5,
                      color: "white",
                      backgroundColor: "primary.main",
                    }}
                    variant="contained"
                    onClick={() => selectItemListByKeyword(searchNameValue)}
                  >
                    {" "}
                    {`ようこそさん`}
                  </Button>

                  <Button
                    onClick={() => {
                      dispatch(logoutMember());
                    }}
                    sx={{
                      width: "40%",
                      mb: 4,
                      p: 0.5,
                      backgroundColor: "primary.main",
                      color: " white",
                    }}
                    variant="text"
                  >
                    {" "}
                    ログアウト
                  </Button>
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "90%",
                    mx: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    onClick={() =>
                      dispatch(push(RouteDir + "/signup_application"))
                    }
                    sx={{ width: "49%" }}
                    variant="contained"
                  >
                    新規会員登録
                  </Button>
                  <Button
                    onClick={() => dispatch(push(RouteDir + "/login"))}
                    sx={{
                      width: "49%",
                      background: "white",
                      color: "primary.main",
                      "&:hover": {
                        background: "white",
                        color: "primary.main",
                      },
                    }}
                    variant="contained"
                  >
                    ログイン
                  </Button>
                </Box>
              )}
            </Box>
            <ImageListItem
              sx={{
                width: "50%",
                mx: "auto",
                my: 8,
              }}
            >
              <img src={img} alt={"some title"} loading="lazy" />
            </ImageListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};
export default MuiDrawer;
