import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/system";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/logo_color.png";
import contact from "../../assets/contact.png";
import favorite from "../../assets/favorite.png";
import shopping from "../../assets/shoppingcart.png";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MoreIcon from "@mui/icons-material/MoreVert";

import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { push } from "connected-react-router";
import { RouteDir } from "../../common";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// redux
import { useSelector, useDispatch } from "react-redux";
// import { openDrawer } from "../features/siteFeatures/localFeaturesSlice";
import { Link } from "react-router-dom";

import Drawer from "./Drawer";

const Navbar = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.members.loginStatus);
  const memberName = useSelector((state) => state.members.name);
  const favoriteList = useSelector((state) => state.favorites.list);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const cartList = useSelector((state) => state.carts.list);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    //お気に入り数のセット
    setFavoriteCount(favoriteList.length);

    //カート数のセット
    setCartCount(cartList.length);
  }, [favoriteList, cartList]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  function openDrawer() {
    setIsDrawerOpen(true);
  }
  function closeDrawer() {
    setIsDrawerOpen(false);
  }

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => dispatch(push(RouteDir + "/mypage/favorite_list"))}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <IconButton size="small" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={favoriteCount} color="error">
            <GradeRoundedIcon color="primary" />
          </Badge>
        </IconButton>
        <Typography
          variant="p"
          sx={{ fontSize: 12, fontWeight: "bold", mt: "-2px" }}
        >
          お気に入り
        </Typography>
      </MenuItem>
      <MenuItem
        onClick={() => dispatch(push(RouteDir + "/mypage/cart_list"))}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <IconButton size="small" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={cartCount} color="error">
            <ShoppingCartOutlinedIcon color="primary" />
          </Badge>
        </IconButton>
        <Typography
          variant="p"
          sx={{ fontSize: 12, fontWeight: "bold", mt: "-2px" }}
        >
          買い物カゴ
        </Typography>
      </MenuItem>
      <MenuItem
        onClick={() => dispatch(push(RouteDir + "/contact"))}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <IconButton size="small" aria-label="show 4 new mails" color="inherit">
          <Badge color="error">
            <EmailOutlinedIcon color="primary" />
          </Badge>
        </IconButton>
        <Typography
          variant="p"
          sx={{ fontSize: 12, fontWeight: "bold", mt: "-2px" }}
        >
          お問い合わせ
        </Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ padding: "1rem 0" }}>
      <Drawer
        isDrawerOpen={isDrawerOpen}
        closeDrawer={closeDrawer}
        openDrawer={openDrawer}
      />
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <IconButton
              onClick={() => openDrawer()}
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2, color: "gray.dark" }}
            >
              <MenuIcon />
              <IconButton />
            </IconButton>
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                  alignItems: "center",
                  gap: "1rem",
                },
              }}
            >
              <FacebookOutlinedIcon />
              <InstagramIcon />
              <TwitterIcon />
            </Box>
          </Box>
          <Box>
            <Link to="/">
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={logo}
                alt="Live from space album cover"
              />
            </Link>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Toolbar>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem
                  onClick={() =>
                    dispatch(push(RouteDir + "/mypage/favorite_list"))
                  }
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    size="small"
                    aria-label="show 4 new mails"
                    color="inherit"
                  >
                    <Badge badgeContent={favoriteCount} color="error">
                      <GradeRoundedIcon color="primary" />
                    </Badge>
                  </IconButton>
                  <Typography
                    variant="p"
                    sx={{ fontSize: 12, fontWeight: "bold", mt: "-2px" }}
                  >
                    お気に入り
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => dispatch(push(RouteDir + "/mypage/cart_list"))}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    size="small"
                    aria-label="show 4 new mails"
                    color="inherit"
                  >
                    <Badge badgeContent={cartCount} color="error">
                      <ShoppingCartOutlinedIcon color="primary" />
                    </Badge>
                  </IconButton>
                  <Typography
                    variant="p"
                    sx={{ fontSize: 12, fontWeight: "bold", mt: "-2px" }}
                  >
                    買い物カゴ
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => dispatch(push(RouteDir + "/contact"))}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    size="small"
                    aria-label="show 4 new mails"
                    color="inherit"
                  >
                    <Badge color="error">
                      <EmailOutlinedIcon color="primary" />
                    </Badge>
                  </IconButton>
                  <Typography
                    variant="p"
                    sx={{ fontSize: 12, fontWeight: "bold", mt: "-2px" }}
                  >
                    お問い合わせ
                  </Typography>
                </MenuItem>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Toolbar>
            {renderMobileMenu}
            {renderMenu}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
