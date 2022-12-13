import React from "react";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import logo from "../../assets/logo_color.png";
import ImageListItem from "@mui/material/ImageListItem";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Button from "@mui/material/Button";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { RouteDir } from "../../common";

const Footer = () => {
  const dispatch = useDispatch();

  return (
    <Box>
      <Box
        sx={{ flexGrow: 1, display: { xs: "none", sm: "none", md: "block" } }}
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "3rem 0",
            }}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{ fontSize: "20px", fontWeight: "600", mb: "8px" }}
              >
                R.ホールディングス株式会社
              </Typography>
              <Typography
                variant="p"
                sx={{ fontSize: "15px", fontWeight: "600" }}
              >
                〒266-0031 千葉県千葉市緑区おゆみ野2-15-9
                <Typography
                  variant="span"
                  sx={{ display: "block", fontSize: "15px", fontWeight: "600" }}
                >
                  TEL 000-000-0000
                </Typography>
                <Typography
                  variant="span"
                  sx={{ fontSize: "15px", fontWeight: "600" }}
                >
                  営業時間 00:00 - 00:00　(●●●を除く)
                </Typography>
              </Typography>
            </Box>
            <ImageListItem sx={{ width: 200, height: 20 }}>
              <img src={`${logo}`} alt="" />
            </ImageListItem>
            <Box>
              {/* <Typography variant="p">メールによるお問い合わせ</Typography>
              <TextField
                id="outlined-basic"
                label="コチラから"
                variant="outlined"
                sx={{
                  display: "block",
                  color: "primary.dark",
                  borderColor: "primary.dark",
                }}
              /> */}
              <Typography
                variant="h2"
                sx={{ fontSize: "15px", mb: "8px", fontWeight: "600" }}
              >
                メールによるお問い合わせ
              </Typography>
              <Button
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem 0.2rem",
                  width: "200px",
                  borderRadius: "0",
                  fontSize: "12px",
                }}
                onClick={() => dispatch(push(RouteDir + "/contact"))}
                variant="outlined"
              >
                <EmailIcon />
                コチラから
                <KeyboardArrowRightIcon />
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box sx={{ backgroundColor: "text.primary" }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "3rem 0",
              color: "neutral.100",
            }}
          >
            <Box
              sx={{
                display: { sm: "block", md: "flex" },
                alignItems: "center",
                gap: "3rem",
                lineHeight: "60px",
              }}
            >
              <Typography
                onClick={() => dispatch(push(RouteDir + "/company"))}
                sx={{ color: "white", cursor: "pointer" }}
                variant="subtitle1"
              >
                会社概要
              </Typography>
              <Typography
                onClick={() => dispatch(push(RouteDir + "/howto"))}
                sx={{ color: "white", cursor: "pointer" }}
                variant="subtitle1"
              >
                ご利用ガイド
              </Typography>
              <Typography
                onClick={() =>
                  dispatch(push(RouteDir + "/commercial_transaction"))
                }
                sx={{ color: "white", cursor: "pointer" }}
                variant="subtitle1"
              >
                特定商取引法に基づく表記
              </Typography>
              <Typography
                onClick={() => dispatch(push(RouteDir + "/privacy_policy"))}
                sx={{ color: "white", cursor: "pointer" }}
                variant="subtitle1"
              >
                プライバシーポリシー
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  marginTop: 2,
                }}
              >
                <Button variant="contained" sx={{ borderRadius: "0" }}>
                  公式 SNS
                </Button>
                <FacebookOutlinedIcon style={{ color: "white" }} />
                <InstagramIcon style={{ color: "white" }} />
                <TwitterIcon style={{ color: "white" }} />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;

// import React, { useCallback, useEffect, useState } from "react";
// import { adminLogout } from "../../reducks/admins/operations";
// import { push } from "connected-react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { RouteDir } from "../../common";

// const Header = () => {
//   const dispatch = useDispatch();

//   const telnumberStyle = {
//     backgroundImage: `URL('${process.env.PUBLIC_URL}/images/icon_tel.svg')`,
//   };

//   const mailformStyle = {
//     backgroundImage: `URL('${process.env.PUBLIC_URL}/images/icon_mail.svg')`,
//   };

//   return (
//     <>
//       <footer>
//         <div className="subline_1000">
//           <aside className="footer_menu">
//             {/* <ul>
//             <li onClick={()=>dispatch(push(RouteDir))}>トップページ</li>
//             <li onClick={()=>dispatch(push(RouteDir+'/howto'))}>ご利用について</li>
//             <li onClick={()=>dispatch(push(RouteDir+'/commercial_transaction'))}>特定商取引法に基づく表記</li>
//             <li onClick={()=>dispatch(push(RouteDir+'/privacy_policy'))}>プライバシーポリシー</li>
//           </ul> */}
//             <div className="media_area">
//               {/* <span>公式メディア</span>
//             <a href="https://www.instagram.com/ja_nagasaki_seihi_agriplus/" target="_blank">
//               <img src={process.env.PUBLIC_URL + '/images/icon_instagram.svg'} alt="instagram" />
//             </a>
//             <a href="https://www.youtube.com/channel/UCgA2-pf8uF_jw3yY2vYLFWg" target="_blank">
//               <img src={process.env.PUBLIC_URL + '/images/icon_youtube.svg'} alt="YouTube" />
//             </a> */}
//             </div>
//           </aside>
//           <div className="contact_infomation_area">
//             <div className="telnumber_area">
//               <p>お電話によるお問い合わせ</p>
//               <p className="telnumber" style={telnumberStyle}>
//                 一括変更（電話番号）
//               </p>{" "}
//               {/* 変更必要 */}
//               <p>9:00～16:00（日曜日を除く）</p> {/* 変更必要 */}
//             </div>
//             <div className="logo_image_area">
//               <img
//                 src={process.env.PUBLIC_URL + "/images/logo_big_c.png"}
//                 alt=""
//               />{" "}
//               {/* 一般画面：フッター：ロゴ画像 */}
//             </div>
//             <div className="mailform_area">
//               <p>メールによるお問い合わせ</p>
//               <div className="mailform">
//                 <button
//                   className="btn_type_2"
//                   style={mailformStyle}
//                   onClick={() => dispatch(push(RouteDir + "/contact"))}
//                 >
//                   コチラから
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="fp_menu">
//           <ul>
//             <li onClick={() => dispatch(push(RouteDir + "/howto"))}>
//               ご利用ガイド
//             </li>
//             <li
//               onClick={() =>
//                 dispatch(push(RouteDir + "/commercial_transaction"))
//               }
//             >
//               特定商取引法に基づく表記
//             </li>
//             <li onClick={() => dispatch(push(RouteDir + "/privacy_policy"))}>
//               プライバシーポリシー
//             </li>
//             {/* 一般画面：フッター：SNSリンク */}
//             {/* <li className='official_sns'>
//               <span>公式SNS</span>
//               <a href='' target='_blank'>
//                 <img src={process.env.PUBLIC_URL + '/images/icon_facebook_gray.png'}  alt="" />
//               </a>
//             </li> */}
//           </ul>
//         </div>
//         <div className="copylight_area">
//           <p>Copyright © 2022 一括変更（社名） All rights reserved.</p>{" "}
//           {/* 変更必要 */}
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Header;

/* 

button
  className="btn_type_2"
  style={mailformStyle}
  onClick={() => dispatch(push(RouteDir + "/contact"))}
>
  コチラから
</button>
*/
