import React, { useCallback, useEffect, useState } from "react";
import { changeCategory, changeKeyword } from "../../reducks/items/operations";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { RouteDir } from "../../common";
import { Typography, InputAdornment, TextField } from "@mui/material";
import { categories, content } from "../../_mock_/categories";
import { Box } from "@mui/system";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Search,
  Twitter,
} from "@mui/icons-material";
const Sidebar = () => {
  const dispatch = useDispatch();

  const keyword = useSelector((state) => state.items.selectKeyword);
  const loginStatus = useSelector((state) => state.members.loginStatus);

  //検索商品名の入力
  const [searchNameValue, setSearchName] = useState(keyword);
  const inputSearchName = useCallback(
    (event) => {
      setSearchName(event.target.value);
    },
    [setSearchName]
  );

  useEffect(() => {
    setSearchName(keyword);
  }, [keyword]);

  const menuListFruitStyle = {
    backgroundImage: `URL('${process.env.PUBLIC_URL}/images/menu_icon_fruit.png')`,
  };

  const menuListMeatStyle = {
    backgroundImage: `URL('${process.env.PUBLIC_URL}/images/menu_icon_meat.png')`,
  };

  const menuListVegetableStyle = {
    backgroundImage: `URL('${process.env.PUBLIC_URL}/images/menu_icon_vegetable.png')`,
  };

  const menuListProcessedGoodsStyle = {
    backgroundImage: `URL('${process.env.PUBLIC_URL}/images/menu_icon_Processed_goods.png')`,
  };

  const menuListFlowerArrangementStyle = {
    backgroundImage: `URL('${process.env.PUBLIC_URL}/images/menu_icon_flower_arrangement.png')`,
    backgroundSize: "25px",
    backgroundPosition: "right 37px center",
  };

  const menuListOtherStyle = {
    backgroundImage: `URL('${process.env.PUBLIC_URL}/images/menu_icon_other.png')`,
  };

  const searchInputStyle = {
    // backgroundImage: `URL('${process.env.PUBLIC_URL}/images/icon_search.svg')`
  };

  const arrowStyle = {
    backgroundImage: `URL('${process.env.PUBLIC_URL}/images/sidelogo_arrow.svg')`,
    backgroundSize: "7px",
    backgroundPosition: "left 0px center",
    backgroundRepeat: "no-repeat",
  };

  const selectItemListByCategory = (id) => {
    setSearchName("");
    // dispatch(changeCategory(id))
    dispatch(push(RouteDir + "/item/list?category=" + id));
  };

  const selectItemListByKeyword = (searchNameValue) => {
    // dispatch(changeKeyword(searchNameValue))
    dispatch(push(RouteDir + "/item/list?keyword=" + searchNameValue));
  };

  const sidebarItems = categories.map((item) => {
    return (
      <Box
        key={item.id}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "sizeLarge",
          pl: "15px",
          "&:hover": {
            color: "white",
            backgroundColor: "primary.main",
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            my: "",
            py: "18px",
            px: "10px",
            borderRadius: "",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
          }}
          onClick={() => selectItemListByCategory(item.id)}
        >
          {item.name}
        </Typography>
        <ArrowRight
          sx={{
            color: "primary.main",
          }}
        />
      </Box>
    );
  });
  return (
    <aside className={"sidebar"}>
      <div className="search_area">
        <h2 sx={{ fontSize: "20px", fontWeight: 400 }}>商品検索</h2>
        <TextField
          onChange={inputSearchName}
          value={searchNameValue}
          placeholder={"キーワード検索"}
          sx={{
            width: "100%",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search
                  sx={{
                    color: "primary.main",
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
        {/* <button onClick={() => selectItemListByKeyword(searchNameValue)}>
          検索
        </button> */}
      </div>
      {/* <div className="menu_list">
        <h2>カテゴリ</h2>
        <ul>
          <li onClick={() => selectItemListByCategory(10)}>
            <p>サプリメント</p>
          </li>
          <li onClick={() => selectItemListByCategory(11)}>
            <p>感染対策商品</p>
          </li>
          <li onClick={() => selectItemListByCategory(12)}>
            <p>抗原/抗体検査キット</p>
          </li>
        </ul>
      </div> */}
      {sidebarItems}
      <div className="menu_list2">
        <h2>
          コンテンツ<span>contents</span>
        </h2>
        <ul>
          <li
            style={arrowStyle}
            onClick={() => dispatch(push(RouteDir + "/mypage/favorite_list"))}
          >
            <p>お気に入り商品</p>
          </li>
          <li
            style={arrowStyle}
            onClick={() => dispatch(push(RouteDir + "/mypage/cart_list"))}
          >
            <p>買い物カゴ</p>
          </li>
          <li
            style={arrowStyle}
            onClick={() => dispatch(push(RouteDir + "/contact"))}
          >
            <p>お問い合わせ</p>
          </li>
          {!loginStatus && (
            <>
              <li
                style={arrowStyle}
                onClick={() => dispatch(push(RouteDir + "/signup_application"))}
              >
                <p>新規会員登録</p>
              </li>
              <li
                style={arrowStyle}
                onClick={() => dispatch(push(RouteDir + "/login"))}
              >
                <p>ログイン</p>
              </li>
            </>
          )}
        </ul>
      </div>

      <Box
        sx={{
          backgroundColor: "#d2145a",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: "12px",
          px: "25px",
          mb: "10px",
        }}
      >
        <Instagram sx={{ fontSize: "45px" }} />
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: "10px" }} variant="p">
            Yorozuya公式
          </Typography>
          <Typography variant="h6">Instagram</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "info.main",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: "12px",
          px: "25px",
          mb: "10px",
        }}
      >
        <Twitter sx={{ fontSize: "45px" }} />
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: "10px" }} variant="p">
            Yorozuya公式
          </Typography>
          <Typography variant="h6">Twitter</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "info.dark",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: "12px",
          px: "25px",
          mb: "10px",
        }}
      >
        <Facebook sx={{ fontSize: "45px" }} />
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: "10px" }} variant="p">
            Yorozuya公式
          </Typography>
          <Typography variant="h6">Facebook</Typography>
        </Box>
      </Box>
      {/* <div className='menu_list3'>
        <a href='https://www.f-yishin.com/' target='_blank'><img src={process.env.PUBLIC_URL + '/images/web_banner.jpg'} alt="" /></a>
      </div> */}
    </aside>
  );
};

export default Sidebar;
