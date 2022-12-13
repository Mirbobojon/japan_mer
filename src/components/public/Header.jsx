import React, { useCallback, useEffect, useState } from "react";

import { Box, Typography, Grid } from "@mui/material";
import bacgroud1 from "../../assets/bg/hedaer1.png";
import bacgroud2 from "../../assets/bg/hedaer2.png";

import {
  LoginCheckMember,
  logoutMember,
} from "../../reducks/members/operations";
import { itemListLink } from "../../reducks/items/operations";
import { changeKeyword } from "../../reducks/items/operations";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { RouteDir } from "../../common";

const Header = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.members.loginStatus);
  const memberName = useSelector((state) => state.members.name);
  const favoriteList = useSelector((state) => state.favorites.list);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const cartList = useSelector((state) => state.carts.list);
  const [cartCount, setCartCount] = useState(0);

  const [searchNameValue, setSearchName] = useState("");
  const inputSearchName = useCallback(
    (event) => {
      setSearchName(event.target.value);
    },
    [setSearchName]
  );

  useEffect(() => {
    //お気に入り数のセット
    setFavoriteCount(favoriteList.length);

    //カート数のセット
    setCartCount(cartList.length);
  }, [favoriteList, cartList]);

  const openSidemenu = () => {
    const sidemenuElement = document.getElementById("sidemenu_area");
    sidemenuElement.classList.add("active");
  };

  const closeSidemenu = () => {
    const sidemenuElement = document.getElementById("sidemenu_area");
    sidemenuElement.classList.remove("active");
  };

  const selectItemListByKeyword = (searchNameValue) => {
    dispatch(changeKeyword(searchNameValue));
    closeSidemenu();
  };

  const openSubmenu = () => {
    const submenuElement = document.getElementById("member_submenu");
    if (submenuElement) {
      submenuElement.classList.toggle("active");
    }
  };
  const closeSubmenu = () => {
    const submenuElement = document.getElementById("member_submenu");
    if (submenuElement) {
      submenuElement.classList.remove("active");
    }
  };

  const styles = {
    paperContainer: {
      backgroundImage: `url(${bacgroud1})`,
      height: "100vh",
      width: "100%",
    },
  };
  const styles2 = {
    paperContainer2: {
      backgroundImage: `url(${bacgroud2})`,
      height: "100vh",
      width: "100%",
    },
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Box
            style={styles.paperContainer}
            sx={{ height: "60vh", cursor: "pointer" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                height: "90vh",
                color: "neutral.100",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  position: "relative",
                  color: "white",
                  fontSize: "40px",
                  fontWeight: "light",
                  zIndex: 2,
                  fontFamily: "kozuka-gothic-pr6n",
                  "&::before": {
                    content: "''",
                    display: "inline-block",
                    width: "100%",
                    height: "13px",
                    position: "absolute",
                    bottom: 10,
                    left: 0,
                    zIndex: -1,
                    background: "#d84416",
                  },
                }}
              >
                不要在庫を何でも買い取り
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  position: "relative",
                  color: "white",
                  fontSize: "40px",
                  fontWeight: "light",
                  zIndex: 2,
                  fontFamily: "kozuka-gothic-pr6n",
                  "&::before": {
                    content: "''",

                    display: "inline-block",
                    width: "100%",
                    height: "13px",
                    position: "absolute",
                    bottom: 10,

                    left: 0,
                    zIndex: -1,
                    background: "#d84416",
                  },
                }}
              >
                お客様の経営を
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  position: "relative",
                  color: "white",
                  fontSize: "40px",
                  fontWeight: "light",
                  zIndex: 2,
                  fontFamily: "kozuka-gothic-pr6n",
                  "&::before": {
                    content: "''",

                    display: "inline-block",
                    width: "100%",
                    height: "13px",
                    position: "absolute",
                    bottom: 10,

                    left: 0,
                    zIndex: -1,
                    background: "#d84416",
                  },
                }}
              >
                サポートいたします！
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box style={styles2.paperContainer2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                height: "90vh",
                color: "neutral.100",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  position: "relative",
                  color: "white",
                  fontSize: "40px",
                  fontWeight: "light",
                  zIndex: 2,
                  fontFamily: "kozuka-gothic-pr6n",
                  "&::before": {
                    content: "''",
                    display: "inline-block",
                    width: "100%",
                    height: "13px",
                    position: "absolute",
                    bottom: 10,
                    left: 0,
                    zIndex: -1,
                    background: "#d84416",
                  },
                }}
              >
                不要在庫を何でも買い取り
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  position: "relative",
                  color: "white",
                  fontSize: "40px",
                  fontWeight: "light",
                  zIndex: 2,
                  fontFamily: "kozuka-gothic-pr6n",
                  "&::before": {
                    content: "''",
                    display: "inline-block",
                    width: "100%",
                    height: "13px",
                    position: "absolute",
                    bottom: 10,
                    left: 0,
                    zIndex: -1,
                    background: "#d84416",
                  },
                }}
              >
                お客様の経営を
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  position: "relative",
                  color: "white",
                  fontSize: "40px",
                  fontWeight: "light",
                  zIndex: 2,
                  fontFamily: "kozuka-gothic-pr6n",
                  "&::before": {
                    content: "''",
                    display: "inline-block",
                    width: "100%",
                    height: "13px",
                    position: "absolute",
                    bottom: 10,
                    left: 0,
                    zIndex: -1,
                    background: "#d84416",
                  },
                }}
              >
                サポートいたします！
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;

// import React, { useCallback, useEffect, useState } from "react";
// import {
//   LoginCheckMember,
//   logoutMember,
// } from "../../reducks/members/operations";
// import { itemListLink } from "../../reducks/items/operations";
// import { changeKeyword } from "../../reducks/items/operations";
// import { push } from "connected-react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { RouteDir } from "../../common";

// const Header = () => {
//   const dispatch = useDispatch();
//   const loginStatus = useSelector((state) => state.members.loginStatus);
//   const memberName = useSelector((state) => state.members.name);
//   const favoriteList = useSelector((state) => state.favorites.list);
//   const [favoriteCount, setFavoriteCount] = useState(0);

//   const cartList = useSelector((state) => state.carts.list);
//   const [cartCount, setCartCount] = useState(0);

//   const headerStyle = {
//     // backgroundImage: `URL('${process.env.PUBLIC_URL}/images/header_logo_w')`
//   };

//   const searchInputStyle = {
//     // backgroundImage: `URL('${process.env.PUBLIC_URL}/images/icon_search.png')`
//   };

//   const sidemenuAreaStyle = {
//     // backgroundImage: `URL('${process.env.PUBLIC_URL}/images/logo_big_w.png')`  //一般画面：ハンバーガーメニュー：ロゴ
//   };

//   //検索商品名の入力
//   const [searchNameValue, setSearchName] = useState("");
//   const inputSearchName = useCallback(
//     (event) => {
//       setSearchName(event.target.value);
//     },
//     [setSearchName]
//   );

//   useEffect(() => {
//     //お気に入り数のセット
//     setFavoriteCount(favoriteList.length);

//     //カート数のセット
//     setCartCount(cartList.length);
//   }, [favoriteList, cartList]);

//   const openSidemenu = () => {
//     const sidemenuElement = document.getElementById("sidemenu_area");
//     sidemenuElement.classList.add("active");
//   };

//   const closeSidemenu = () => {
//     const sidemenuElement = document.getElementById("sidemenu_area");
//     sidemenuElement.classList.remove("active");
//   };

//   const selectItemListByKeyword = (searchNameValue) => {
//     dispatch(changeKeyword(searchNameValue));
//     closeSidemenu();
//   };

//   const openSubmenu = () => {
//     const submenuElement = document.getElementById("member_submenu");
//     if (submenuElement) {
//       submenuElement.classList.toggle("active");
//     }
//   };
//   const closeSubmenu = () => {
//     const submenuElement = document.getElementById("member_submenu");
//     if (submenuElement) {
//       submenuElement.classList.remove("active");
//     }
//   };

//   return (
//     <>
//       <header style={headerStyle}>
//         <div className="subline_1200">
//           <div className="header">
//             {/* 一般画面：ヘッダー：ロゴ */}
//             <div className="header_logo">
//               <img
//                 src={process.env.PUBLIC_URL + "/images/header_logo_w.png"}
//                 alt=""
//                 onClick={() => {
//                   dispatch(push(RouteDir));
//                 }}
//               />
//             </div>
//             <div className="left_area">
//               <div className="menu_toggle_btn" onClick={() => openSidemenu()}>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//               </div>
//               {/* <div className='header_sns'>
//               <a href='https://www.facebook.com/profile.php?id=100040149080908' target='_blank'>
//                 <img src={process.env.PUBLIC_URL + '/images/icon_facebook_white.png'}  alt="" />
//               </a>
//             </div> */}
//             </div>
//             <div className="right_area pc_show">
//               <button
//                 className="header_menu_btn"
//                 onClick={() =>
//                   dispatch(push(RouteDir + "/mypage/favorite_list"))
//                 }
//               >
//                 {favoriteCount !== 0 && (
//                   <span className="badge">{favoriteCount}</span>
//                 )}
//                 <img
//                   src={process.env.PUBLIC_URL + "/images/icon_favorite.png"}
//                   alt="お気に入り"
//                 />
//                 <br />
//               </button>
//               <button
//                 className="header_menu_btn"
//                 onClick={() => dispatch(push(RouteDir + "/mypage/cart_list"))}
//               >
//                 {cartCount !== 0 && <span className="badge">{cartCount}</span>}
//                 <img
//                   src={process.env.PUBLIC_URL + "/images/icon_cart.png"}
//                   alt="買い物カゴ"
//                 />
//                 <br />
//               </button>
//               <button
//                 className="header_menu_btn"
//                 onClick={() => dispatch(push(RouteDir + "/contact"))}
//               >
//                 <img
//                   src={process.env.PUBLIC_URL + "/images/icon_qa.png"}
//                   alt="お問い合わせ"
//                 />
//                 <br />
//               </button>
//             </div>
//           </div>
//           {loginStatus === true ? (
//             <div className="member_menu_btn_area pc_show">
//               <button className="member_menu_btn" onClick={() => openSubmenu()}>
//                 {memberName}様<span className="arrow"></span>
//               </button>
//               <div id="member_submenu" className="submenu_area">
//                 <ul>
//                   <li
//                     onClick={() => {
//                       closeSubmenu();
//                       dispatch(push(RouteDir + "/mypage/member_edit"));
//                     }}
//                   >
//                     会員情報編集
//                   </li>
//                   <li
//                     onClick={() => {
//                       closeSubmenu();
//                       dispatch(push(RouteDir + "/mypage/order_history"));
//                     }}
//                   >
//                     購入履歴
//                   </li>
//                   <li
//                     onClick={() => {
//                       closeSubmenu();
//                       dispatch(logoutMember());
//                     }}
//                   >
//                     ログアウト
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           ) : (
//             <div className="login_btn_area pc_show">
//               <button
//                 className="add_member_btn"
//                 onClick={() => dispatch(push(RouteDir + "/signup_application"))}
//               >
//                 新規会員登録
//               </button>
//               <button
//                 className="login_btn"
//                 onClick={() => dispatch(push(RouteDir + "/login"))}
//               >
//                 ログイン
//               </button>
//             </div>
//           )}
//         </div>
//       </header>
//       <aside id="sidemenu_area" style={sidemenuAreaStyle}>
//         <div className="close_btn" onClick={() => closeSidemenu()}>
//           <span></span>
//           <span></span>
//         </div>
//         <div className="menu_area">
//           <ul>
//             <li
//               onClick={() => {
//                 closeSidemenu();
//                 dispatch(push(RouteDir));
//               }}
//             >
//               トップページ
//             </li>
//             <li
//               onClick={() => {
//                 closeSidemenu();
//                 dispatch(push(RouteDir + "/item/list"));
//               }}
//             >
//               商品一覧
//             </li>
//             <li
//               onClick={() => {
//                 closeSidemenu();
//                 dispatch(push(RouteDir + "/mypage/favorite_list"));
//               }}
//             >
//               お気に入り
//             </li>
//             <li
//               onClick={() => {
//                 closeSidemenu();
//                 dispatch(push(RouteDir + "/mypage/cart_list"));
//               }}
//             >
//               買い物カゴ
//             </li>
//             <li
//               onClick={() => {
//                 closeSidemenu();
//                 dispatch(push(RouteDir + "/howto"));
//               }}
//             >
//               ご利用ガイド
//             </li>
//             <li
//               onClick={() => {
//                 closeSidemenu();
//                 dispatch(push(RouteDir + "/commercial_transaction"));
//               }}
//             >
//               特定商取引法に基づく表記
//             </li>
//             <li
//               onClick={() => {
//                 closeSidemenu();
//                 dispatch(push(RouteDir + "/contact"));
//               }}
//             >
//               お問い合わせ
//             </li>
//           </ul>
//         </div>
//         <div className="search_login_btn_area">
//           <div className="search_area">
//             <input
//               type="text"
//               name="search_name"
//               style={searchInputStyle}
//               value={searchNameValue}
//               onChange={inputSearchName}
//               placeholder={"キーワード検索"}
//             />
//             <button onClick={() => selectItemListByKeyword(searchNameValue)}>
//               検索
//             </button>
//           </div>
//           {loginStatus === true ? (
//             <div className="logout_btn_area">
//               <button
//                 className="logout_btn"
//                 onClick={() => dispatch(logoutMember())}
//               >
//                 ログアウト
//               </button>
//             </div>
//           ) : (
//             <div className="login_btn_area">
//               <button
//                 className="add_member_btn"
//                 onClick={() => dispatch(push(RouteDir + "/signup_application"))}
//               >
//                 新規会員登録
//               </button>
//               <button
//                 className="login_btn"
//                 onClick={() => dispatch(push(RouteDir + "/login"))}
//               >
//                 ログイン
//               </button>
//             </div>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Header;
