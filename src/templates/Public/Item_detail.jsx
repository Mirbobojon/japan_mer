import React, { useCallback, useEffect, useState } from "react";
import { insertFloor, insertH1 } from "../../reducks/pageInfos/operations";
import {
  insertFavorite,
  deleteFavorite,
} from "../../reducks/favorites/operations";
import { insertCart } from "../../reducks/carts/operations";
import { Paging } from "../../components/UIkit";
import DocumentMeta from "react-document-meta";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SiteTitle } from "./common";
import { ApiDir, ImagesDir, RouteDir, ItemImageDir } from "../../common";
import { calcItemTaxIncludedPrice } from "../../myLib";

// mine
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import CardMedia from "@mui/material/CardMedia";
import BoxBorder from "./BoxBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CircularProgress from "@mui/material/CircularProgress";

// import Layout from "./Layout";
// import { fetchProduct, selectProduct } from "../features/api/productsSlice";
import { useParams } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ItemList = (props) => {
  //商品IDをURLパラメータから取得
  const pageItemId = props.match.params.id;

  const dispatch = useDispatch();

  const [itemInfo, setItemInfo] = useState([]); //商品情報
  const [itemImages, setItemImages] = useState([]); //商品画像情報

  console.log("itemInfo", itemInfo);
  const favoriteList = useSelector((state) => state.favorites.list);
  const [favoriteState, setFavoriteState] = useState(false); //お気に入り登録フラグ

  const [quantity, setQuantity] = useState(1); //商品個数
  const inputQuantity = useCallback(
    (event) => {
      // console.log(Number(event.target.value))
      setQuantity(event.target.value);
      // if(Number(event.target.value) > 0) {
      //   setQuantity(event.target.value)
      // } else {
      //   alert("1以上の数量を入力してください。")
      //   setQuantity(1)
      // }
    },
    [setQuantity]
  );

  useEffect(() => {
    //商品情報を取得
    let params = new URLSearchParams();
    params.append("item_id", pageItemId);
    params.append("formkey", "selectkey");
    axios
      .post(ApiDir + "/selectPublicItem.php", params)
      .then(function (response) {
        console.log(response.data);
        setItemInfo(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
        return;
      });

    //商品画像情報を取得
    params = new URLSearchParams();
    params.append("item_id", pageItemId);
    params.append("kinds", 2);
    params.append("formkey", "selectkey");
    axios
      .post(ApiDir + "/selectPublicItemImage.php", params)
      .then(function (response) {
        console.log(response.data);
        setItemImages(response.data);
      })
      .catch(function (error) {
        console.log(error);
        return;
      });

    //お気に入り一覧の中にあるか調べる
    const favoriteLength = favoriteList.length;
    let favoriteFlag = false;
    for (let i = 0; i < favoriteLength; i++) {
      if (favoriteList[i]["item_id"] === pageItemId) {
        favoriteFlag = true;
      }
    }
    if (favoriteFlag) {
      setFavoriteState(true);
    } else {
      setFavoriteState(false);
    }
  }, [pageItemId, favoriteList]);
  // }, [dispatch, itemInfo.id, itemInfo.name, pageItemId, favoriteList])

  useEffect(() => {
    if (!itemInfo) {
      return;
    }

    //パンくずリストをセット
    const Floors = [
      {
        name: itemInfo.name,
        href: "/item/edit" + itemInfo.id,
      },
    ];
    dispatch(insertFloor(Floors));

    //h1をセット
    dispatch(insertH1(itemInfo.name));
  }, [itemInfo]);

  // useEffect(() => {
  //   // 商品数量の手動入力を禁止する
  //   const itemQuantityInputElem = document.getElementById("item_quantity_input");
  //   const onItemQuantityInputKeypress = (e) => {
  //     alert("右側の▲▼で数量を調整してください。")
  //     e.preventDefault();
  //   }
  //   itemQuantityInputElem.addEventListener("keypress", onItemQuantityInputKeypress)

  //   return () => {
  //     itemQuantityInputElem.removeEventListener("keypress", onItemQuantityInputKeypress)
  //   }
  // }, [])

  const insertCartStyle = {
    backgroundImage: `URL('${process.env.PUBLIC_URL}/images/icon_cart_w.svg')`,
  };

  const insertFavoriteStyle = {
    backgroundImage: `URL('${process.env.PUBLIC_URL}/images/icon_favorite_g.svg')`,
  };

  const meta = {
    title: SiteTitle,
  };

  //お気に入り追加ボタン押下時
  const insertFavoriteBtn = (itemId) => {
    dispatch(insertFavorite(itemId));
  };

  //お気に入り削除ボタン押下時
  const deleteFavoriteBtn = (itemId) => {
    dispatch(deleteFavorite(itemId));
  };

  //買い物カゴに入れるボタン押下時
  const insertCartBtn = (itemId) => {
    console.log(quantity);
    if (
      Number.isInteger(Number(quantity)) &&
      Number(quantity) > 0 &&
      String(quantity).indexOf(".") === -1
    ) {
      if (Number(quantity) > Number(itemInfo.stock_quantity)) {
        window.alert("数量は在庫数以下で入力してください。");
      } else {
        dispatch(insertCart(itemId, quantity));
      }
    } else {
      window.alert("数量を正しく入力してください。");
    }
  };

  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  if (!itemInfo) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          // background: "red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={100} />
      </Box>
    );
  }
  return (
    <DocumentMeta {...meta}>
      <Box sx={{ width: "100%" }}>
        <Container>
          <Box sx={{ my: 4 }}>
            <div
              className="thumbnail_area"
              style={
                itemInfo.path !== null
                  ? {
                      background: `url('${ItemImageDir}${itemInfo.path}') no-repeat center center/cover`,
                      height: "350px",
                      maxWidth: "450px",
                      margin: "0 auto",
                    }
                  : {
                      background: `url('${process.env.PUBLIC_URL}/images/noimage.jpg') no-repeat center center/cover`,
                      height: "350px",
                      maxWidth: "450px",
                      margin: "0 auto",
                    }
              }
            ></div>
          </Box>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item md={7} sx={{ display: "flex", alignItems: "center" }}>
              <Item
                sx={{
                  background: "none",
                  boxShadow: "none",
                  borderRadius: "0",
                }}
              >
                <Box align="left">
                  <Typography variant="subtitle">
                    商品番号：{itemInfo.item_serial}　　商品コード：
                    {itemInfo.standard}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "error.main", my: 1 }}
                  >
                    メーカー：テキストテキスト
                  </Typography>
                  <Typography variant="h3">
                    {itemInfo.title}
                    {/* テキストテキストテキスト */}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ my: 2 }}>
                    商品状態：良い
                  </Typography>

                  <Typography variant="p">
                    {String(itemInfo.description)
                      .split(/\r\n|\r|\n/)
                      .map((value, index) => {
                        return <>{value}</>;
                      })}
                    {/* テキストテキストテキストテキストテキストテキストテキストテキス
                    トテキストテキストテキストテキストテキストテキストテキストテキ
                    ストテキストテキストテキストテキストテキストテキストテキストテ
                    キストテキストテキストテキストテキストテキストテキストテキスト
                    テキストテキストテキストテキストテキストテキスト */}
                  </Typography>
                </Box>
              </Item>
            </Grid>
            <Grid item md={5} sx={{ width: "100%" }}>
              <Item sx={{ backgroundColor: "neutral.200", borderRadius: "0" }}>
                <Box sx={{ padding: "2rem 1rem" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "30px",
                      width: "300px",
                    }}
                  >
                    <Typography variant="p">価格</Typography>
                    <Typography variant="h5" sx={{ color: "error.main" }}>
                      ￥
                      {itemInfo &&
                        calcItemTaxIncludedPrice(
                          itemInfo.price,
                          itemInfo.tax_value
                        ).toLocaleString()}
                      （税込）
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "30px",
                      padding: "1rem 0",
                    }}
                  >
                    <Typography variant="p">送料</Typography>
                    <Typography variant="h6">
                      送料：￥
                      {itemInfo && Number(itemInfo.postage).toLocaleString()}
                      (税込)
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "30px",
                    }}
                  >
                    <Typography sx={{ width: "30px" }} variant="p">
                      数量
                    </Typography>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <TextField
                          sx={{
                            width: "100%",
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            "& label.Mui-focused": {
                              color: "white",
                            },
                          }}
                          id="outlined-number"
                        />
                      </FormControl>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "30px",
                      padding: "1rem 0",
                    }}
                  >
                    <Typography variant="p">在庫数</Typography>
                    <Typography variant="h6">
                      {itemInfo.stock_quantity === "0" ? (
                        <span className="sold_out">売り切れ中</span>
                      ) : (
                        itemInfo.stock_quantity
                      )}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    {/* shop button */}
                    {itemInfo.stock_quantity &&
                      (Number(itemInfo.stock_quantity) > 0 ? (
                        <Button
                          onClick={() => insertCartBtn(itemInfo.id)}
                          variant="contained"
                          sx={{
                            borderRadius: "0",
                            backgroundColor: "secondary.light",
                            color: "neutral.100",
                          }}
                        >
                          <ShoppingCartOutlinedIcon /> 買い物かごに入れる
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          sx={{
                            borderRadius: "0",
                            backgroundColor: "secondary.light",
                            color: "neutral.100",
                          }}
                          disabled
                        >
                          <ShoppingCartOutlinedIcon /> 売り切れ中
                        </Button>
                      ))}

                    {/* add to favorite button */}
                    {/* {favoriteState === true ?
                      <button className="insert_favorite_btn" style={insertFavoriteStyle} onClick={() => deleteFavoriteBtn(itemInfo.id)}>お気に入りから削除</button> :
                      <button className="insert_favorite_btn" style={insertFavoriteStyle} onClick={() => insertFavoriteBtn(itemInfo.id)}>お気に入りに追加</button>
                    } */}
                    {favoriteState === true ? (
                      <Button
                        variant="outlined"
                        sx={{
                          borderRadius: "0",
                          borderColor: "warning.dark",
                          color: "warning.dark",
                        }}
                        onClick={() => deleteFavoriteBtn(itemInfo.id)}
                      >
                        <StarIcon /> お気に入りから削除
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        sx={{
                          borderRadius: "0",
                          borderColor: "warning.dark",
                          color: "warning.dark",
                        }}
                        onClick={() => insertFavoriteBtn(itemInfo.id)}
                      >
                        <StarBorderIcon />
                        お気に入りに追加
                      </Button>
                    )}
                  </Box>
                </Box>
              </Item>
            </Grid>
          </Grid>
          <BoxBorder />
          <Typography variant="h6">
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキスト
          </Typography>
          <Box sx={{ flexGrow: 1, my: 4 }}>
            <Grid container spacing={2} columns={16}>
              {Array.isArray(itemImages) &&
                itemImages.map((image, i) => (
                  <Grid key={i} item xs={i == 0 ? 16 : 8}>
                    <Item>
                      <div
                        className="thumbnail_area"
                        style={
                          itemInfo.path !== null
                            ? {
                                background: `url('${ItemImageDir}${itemInfo.path}') no-repeat center center/cover`,
                                height: "350px",
                                maxWidth: "100%",
                                margin: "0 auto",
                              }
                            : {
                                background: `url('${process.env.PUBLIC_URL}/images/noimage.jpg') no-repeat center center/cover`,
                                height: "350px",
                                maxWidth: "450px",
                                margin: "0 auto",
                              }
                        }
                      ></div>
                    </Item>
                  </Grid>
                ))}
              {/* <Grid item xs={8}>
                <Item>
                  <CardMedia
                    component="img"
                    image="https://i.postimg.cc/Lssnb2TT/product1.jpg"
                    alt="green iguana"
                  />
                </Item>
              </Grid>
              <Grid item xs={8}>
                <Item>
                  <CardMedia
                    component="img"
                    image="https://i.postimg.cc/Lssnb2TT/product1.jpg"
                    alt="green iguana"
                  />
                </Item>
              </Grid>
              <Grid item xs={16}>
                <Item>
                  <CardMedia
                    component="img"
                    image="https://i.postimg.cc/Lssnb2TT/product1.jpg"
                    alt="green iguana"
                  />
                </Item>
              </Grid> */}
            </Grid>
          </Box>
        </Container>
      </Box>
      {!itemInfo && <p>この商品は現在販売しておりません。</p>}
    </DocumentMeta>
  );
};

export default ItemList;
