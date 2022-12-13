import React, { useEffect, useState } from "react";
import { changeCategory, changeKeyword } from "../../reducks/items/operations";
import { MainContentH2 } from "../../components/UIkit";
import DocumentMeta from "react-document-meta";
import { SiteTitle } from "./common";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ApiDir, ImagesDir, RouteDir, ItemImageDir } from "../../common";
import { calcItemTaxIncludedPrice } from "../../myLib";
import Tabs from "./Tabs";
const Home = () => {
  const dispatch = useDispatch();

  const [recommendItems, setRecommendItems] = useState([]);
  const [status, setStatus] = useState("loading");

  console.log(status);

  const [newsId, setNewsId] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  const [newsBody, setNewsBody] = useState("");
  const [newsdate, setNewsdate] = useState("");
  console.log(recommendItems);

  const [Items, setItems] = useState([]);

  useEffect(() => {
    //おすすめ商品情報の取得
    let params = new URLSearchParams();
    params.append("formkey", "selectkey");
    axios
      .post(ApiDir + "/selectRecommendItemList.php", params)
      .then(function (response) {
        setRecommendItems(response.data);
        setStatus("fulfilled");
      })
      .catch(function (error) {
        setStatus("error");
        console.log(error);
        return;
      });

    //お知らせ情報の取得
    params = new URLSearchParams();
    params.append("limit", "1");
    params.append("formkey", "selectkey");
    axios
      .post(ApiDir + "/selectPublicNewsList.php", params)
      .then(function (response) {
        console.log(response.data[0]);
        //お知らせIDのセット
        setNewsId(response.data[0].id);
        //お知らせタイトルのセット
        setNewsTitle(response.data[0].title);

        //お知らせ内容のHTML整形・セット
        const bodyHtml = new DOMParser().parseFromString(
          response.data[0].body,
          "text/html"
        );
        const maxLength = 100; //文字数上限
        let modStr = "";
        let bodyString = bodyHtml.documentElement.textContent;
        let bodyText = bodyString.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
        if (bodyText.length > maxLength) {
          modStr = bodyText.substr(0, maxLength) + "...";
        } else {
          modStr = bodyText;
        }
        setNewsBody(modStr);

        //お知らせ日付の整形・セット
        const date = new Date(response.data[0].publication_datetime);
        setNewsdate(
          date.getFullYear() +
            "." +
            (date.getMonth() + 1) +
            "." +
            date.getDate()
        );
      })
      .catch(function (error) {
        console.log(error);
        return;
      });

    //商品一覧の取得
    params = new URLSearchParams();
    params.append("limit", "8");
    params.append("formkey", "selectkey");
    axios
      .post(ApiDir + "/selectPublicItemList.php", params)
      .then(function (response) {
        setItems(response.data);
      })
      .catch(function (error) {
        console.log(error);
        return;
      });
  }, [dispatch]);

  const selectItemListByCategory = (id) => {
    dispatch(push(RouteDir + "/item/list?category=" + id));
  };

  return (
    <>
      {" "}
      <Tabs recommendItems={recommendItems} status={status} />{" "}
    </>
    // <DocumentMeta {...meta}>
    //   <main className="top_main_content">
    //     <section className="shop_introduce_area">
    //       <div className="wrap">
    //         <h2 className="h2_title">
    //           ご挨拶<span>Greetings</span>
    //         </h2>
    //         {/* ご挨拶文：変更必要 */}
    //         <div className="text_area">
    //           <img
    //             src={process.env.PUBLIC_URL + "/images/top_introduce_image.jpg"}
    //             alt=""
    //           />
    //           <p>
    //             医療従事者の「医療道徳」の「医」<br></br>
    //             社会サービス精神の「人を思いやる心」の「心」
    //           </p>
    //           <p>
    //             医療道徳を守って、人を思いやる心を持つサービスを提供する理念で、当社2017年10月にアジアの玄関である福岡の地に設立しました。
    //           </p>
    //           <p>
    //             日本に現存する最古の医学書である国宝の「医心方」は中国の多くの医書を引用して病気の原因や治療法を述べて、日本の医療発展に大きな影響を与えました。日中古代の医療情報の共有モデルの代表です。
    //           </p>
    //           <p>
    //             今、我が社は日本の医療の最高な医療サービス環境及び医療理念を日中の両国民に提供できる掛け橋になるように
    //           </p>
    //           <p>皆様の温かい支え及びご指導よろしくお願いします。</p>
    //         </div>
    //       </div>
    //     </section>
    //     <section className="recommend_item_list_area list_area">
    //       <MainContentH2
    //         title={"おすすめ商品"}
    //         title_span={"recommentdation"}
    //         boderColor={"#00584D"}
    //       />
    //       <div className="item_list_area">
    //         {Array.isArray(recommendItems) &&
    //           recommendItems.map((item, i) => (
    //             <div
    //               className={
    //                 i < 3
    //                   ? "recommend_item_card big_card"
    //                   : "recommend_item_card"
    //               }
    //               key={i}
    //               onClick={() =>
    //                 dispatch(push(RouteDir + "/item/detail/" + item.id))
    //               }
    //             >
    //               <div
    //                 className="thumbnail_area"
    //                 style={
    //                   item.path !== null
    //                     ? {
    //                         backgroundImage: `url('${ItemImageDir}${item.path}')`,
    //                       }
    //                     : {
    //                         backgroundImage: `url('${process.env.PUBLIC_URL}/images/noimage.jpg')`,
    //                       }
    //                 }
    //               ></div>
    //               <p className="item_name">{item.name}</p>
    //               <p className="item_price">
    //                 ￥
    //                 {calcItemTaxIncludedPrice(
    //                   item.price,
    //                   item.tax
    //                 ).toLocaleString()}
    //                 (税込)
    //               </p>
    //             </div>
    //           ))}
    //       </div>
    //     </section>
    //     {/* <section className="news_area">
    //       <h2 style={newsH2Style}>一括変更（社名） ECサイトからのお知らせ</h2>
    //       <div className="news_card" onClick={()=>dispatch(push(RouteDir + '/news/detail/'+newsId))}>
    //         <p className="title"><span className="date">{newsdate}</span>{newsTitle}</p>
    //         <p className="content_html" dangerouslySetInnerHTML={{__html: newsBody}}></p>
    //       </div>
    //       <button className="btn_type_1" onClick={()=>dispatch(push(RouteDir+'/news/list'))}>お知らせ一覧へ</button>
    //     </section> */}
    //     <section className="item_list_area list_area">
    //       <MainContentH2
    //         title={"商品一覧"}
    //         title_span={"products list"}
    //         boderColor={"#00584D"}
    //       />
    //       <div className="item_list">
    //         {Array.isArray(Items) &&
    //           Items.map((item, i) => (
    //             <div
    //               className={"item_card"}
    //               key={i}
    //               onClick={() =>
    //                 dispatch(push(RouteDir + "/item/detail/" + item.id))
    //               }
    //             >
    //               <div
    //                 className="thumbnail_area"
    //                 style={
    //                   item.path !== null
    //                     ? {
    //                         backgroundImage: `url('${ItemImageDir}${item.path}')`,
    //                       }
    //                     : {
    //                         backgroundImage: `url('${process.env.PUBLIC_URL}/images/noimage.jpg')`,
    //                       }
    //                 }
    //               ></div>
    //               <p className="item_name">{item.name}</p>
    //               <p className="item_price">
    //                 ￥
    //                 {calcItemTaxIncludedPrice(
    //                   item.price,
    //                   item.tax
    //                 ).toLocaleString()}
    //                 (税込)
    //               </p>
    //             </div>
    //           ))}
    //       </div>
    //       <button
    //         className="btn_type_1"
    //         onClick={() => dispatch(push(RouteDir + "/item/list"))}
    //       >
    //         商品一覧へ
    //       </button>
    //     </section>
    //     {/* <section className="category_list_area">
    //       <MainContentH2
    //         title = {'商品カテゴリ'}
    //         boderColor = {'#00584D'}
    //       />
    //       <div className="category_list">
    //         <div className="category_card">
    //           <img onClick={()=>selectItemListByCategory(10)} src={process.env.PUBLIC_URL + '/images/menu_icon_supplement.jpg'} alt="" />
    //         </div>
    //         <div className="category_card">
    //           <img onClick={()=>selectItemListByCategory(11)} src={process.env.PUBLIC_URL + '/images/menu_icon_kansen.jpg'} alt="" />
    //         </div>
    //         <div className="category_card">
    //           <img onClick={()=>selectItemListByCategory(12)} src={process.env.PUBLIC_URL + '/images/menu_icon_kit.jpg'} alt="" />
    //         </div>
    //       </div>
    //     </section> */}
    //   </main>
    // </DocumentMeta>
  );
};

export default Home;

// import React, { useEffect, useState } from "react"
// import { changeCategory, changeKeyword } from '../../reducks/items/operations'
// import { MainContentH2 } from '../../components/UIkit'
// import DocumentMeta from 'react-document-meta'
// import { SiteTitle } from './common'
// import { push } from 'connected-react-router'
// import { useDispatch } from 'react-redux'
// import axios from 'axios'
// import { ApiDir, ImagesDir, RouteDir, ItemImageDir } from '../../common'
// import { calcItemTaxIncludedPrice } from '../../myLib'

// const Home = () =>
// {
//   const dispatch = useDispatch()

//   const [recommendItems, setRecommendItems] = useState([])

//   const [newsId, setNewsId] = useState('')
//   const [newsTitle, setNewsTitle] = useState('')
//   const [newsBody, setNewsBody] = useState('')
//   const [newsdate, setNewsdate] = useState('')

//   const [Items, setItems] = useState([])

//   useEffect(()=>
//   {
//     //おすすめ商品情報の取得
//     let params = new URLSearchParams();
//     params.append('formkey','selectkey');
//     axios.post(ApiDir+'/selectRecommendItemList.php',params)
//     .then(function(response){
//       setRecommendItems(response.data)
//     })
//     .catch(function(error){
//       console.log(error)
//       return
//     })

//     //お知らせ情報の取得
//     params = new URLSearchParams();
//     params.append('limit','1');
//     params.append('formkey','selectkey');
//     axios.post(ApiDir+'/selectPublicNewsList.php',params)
//     .then(function(response){
//       console.log(response.data[0])
//       //お知らせIDのセット
//       setNewsId(response.data[0].id)
//       //お知らせタイトルのセット
//       setNewsTitle(response.data[0].title)

//       //お知らせ内容のHTML整形・セット
//       const bodyHtml = new DOMParser().parseFromString(response.data[0].body, 'text/html')
//       const maxLength = 100 //文字数上限
//       let modStr = ''
//       let bodyString = bodyHtml.documentElement.textContent
//       let bodyText = bodyString.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')
//       if(bodyText.length > maxLength){
//         modStr = bodyText.substr(0, maxLength) + '...'
//       }
//       else
//       {
//         modStr = bodyText
//       }
//       setNewsBody(modStr)

//       //お知らせ日付の整形・セット
//       const date = new Date(response.data[0].publication_datetime)
//       setNewsdate(date.getFullYear()+ '.' + (date.getMonth() + 1) + '.' + date.getDate())
//     })
//     .catch(function(error){
//       console.log(error)
//       return
//     })

//     //商品一覧の取得
//     params = new URLSearchParams();
//     params.append('limit','8');
//     params.append('formkey','selectkey');
//     axios.post(ApiDir+'/selectPublicItemList.php',params)
//     .then(function(response){
//       setItems(response.data)
//     })
//     .catch(function(error){
//       console.log(error)
//       return
//     })

//   },[dispatch])

//   const newsH2Style =
//   {
//     backgroundImage: `URL('${process.env.PUBLIC_URL}/images/top_news_h2_background_image.png')`
//   }

//   const menuListFruitStyle =
//   {
//     backgroundImage: `URL('${process.env.PUBLIC_URL}/images/menu_icon_supplement.jpg')`
//   }

//   const menuListMeatStyle =
//   {
//     backgroundImage: `URL('${process.env.PUBLIC_URL}/images/menu_icon_kansen.jpg')`
//   }

//   const menuListVegetableStyle =
//   {
//     backgroundImage: `URL('${process.env.PUBLIC_URL}/images/menu_icon_vegetable.png')`
//   }

//   const menuListProcessedGoodsStyle =
//   {
//     backgroundImage: `URL('${process.env.PUBLIC_URL}/images/menu_icon_Processed_goods.png')`
//   }

//   const menuListFlowerArrangementStyle =
//   {
//     backgroundImage: `URL('${process.env.PUBLIC_URL}/images/menu_icon_flower_arrangement.png')`,
//     backgroundSize: '35px',
//     backgroundPosition: 'right 37px center'
//   }

//   const menuListOtherStyle =
//   {
//     backgroundImage: `URL('${process.env.PUBLIC_URL}/images/menu_icon_other.png')`
//   }

//   const meta =
//   {
//     title: SiteTitle,
//   }

//   const selectItemListByCategory = (id)=>
//   {
//     dispatch(push(RouteDir + '/item/list?category=' + id))
//   }

//   return(
//     <DocumentMeta {...meta}>
//       <main className="top_main_content">
//         <section className="shop_introduce_area">
//           <div className="wrap">
//             <h2 className="h2_title">ご挨拶<span>Greetings</span></h2>
//             {/* ご挨拶文：変更必要 */}
//             <div className="text_area">
//               <img src={process.env.PUBLIC_URL + '/images/top_introduce_image.jpg'} alt="" />
//               <p>医療従事者の「医療道徳」の「医」<br></br>社会サービス精神の「人を思いやる心」の「心」</p>
//               <p>医療道徳を守って、人を思いやる心を持つサービスを提供する理念で、当社2017年10月にアジアの玄関である福岡の地に設立しました。</p>
//               <p>日本に現存する最古の医学書である国宝の「医心方」は中国の多くの医書を引用して病気の原因や治療法を述べて、日本の医療発展に大きな影響を与えました。日中古代の医療情報の共有モデルの代表です。</p>
//               <p>今、我が社は日本の医療の最高な医療サービス環境及び医療理念を日中の両国民に提供できる掛け橋になるように</p>
//               <p>皆様の温かい支え及びご指導よろしくお願いします。</p>
//             </div>
//           </div>
//         </section>
//         <section className="recommend_item_list_area list_area">
//           <MainContentH2
//             title = {'おすすめ商品'}
//             title_span = {'recommentdation'}
//             boderColor = {'#00584D'}
//           />
//           <div className="item_list_area">
//             {Array.isArray(recommendItems) && recommendItems.map((item, i) => (
//               <div className={i<3?"recommend_item_card big_card":"recommend_item_card"} key={i} onClick={()=>dispatch(push(RouteDir+'/item/detail/'+item.id))}>
//                 <div className="thumbnail_area" style={item.path!==null?{backgroundImage:`url('${ItemImageDir}${item.path}')`}:{backgroundImage:`url('${process.env.PUBLIC_URL}/images/noimage.jpg')`}}></div>
//                 <p className="item_name">{item.name}</p>
//                 <p className="item_price">￥{calcItemTaxIncludedPrice(item.price, item.tax).toLocaleString()}(税込)</p>
//               </div>
//             ))}
//           </div>
//         </section>
//         {/* <section className="news_area">
//           <h2 style={newsH2Style}>一括変更（社名） ECサイトからのお知らせ</h2>
//           <div className="news_card" onClick={()=>dispatch(push(RouteDir + '/news/detail/'+newsId))}>
//             <p className="title"><span className="date">{newsdate}</span>{newsTitle}</p>
//             <p className="content_html" dangerouslySetInnerHTML={{__html: newsBody}}></p>
//           </div>
//           <button className="btn_type_1" onClick={()=>dispatch(push(RouteDir+'/news/list'))}>お知らせ一覧へ</button>
//         </section> */}
//         <section className="item_list_area list_area">
//           <MainContentH2
//             title = {'商品一覧'}
//             title_span = {'products list'}
//             boderColor = {'#00584D'}
//           />
//           <div className="item_list">
//             {Array.isArray(Items) && Items.map((item, i) => (
//               <div className={"item_card"} key={i} onClick={()=>dispatch(push(RouteDir+'/item/detail/'+item.id))}>
//                 <div className="thumbnail_area" style={item.path!==null?{backgroundImage:`url('${ItemImageDir}${item.path}')`}:{backgroundImage:`url('${process.env.PUBLIC_URL}/images/noimage.jpg')`}}></div>
//                 <p className="item_name">{item.name}</p>
//                 <p className="item_price">￥{calcItemTaxIncludedPrice(item.price, item.tax).toLocaleString()}(税込)</p>
//               </div>
//             ))}
//           </div>
//           <button className="btn_type_1" onClick={()=>dispatch(push(RouteDir+'/item/list'))}>商品一覧へ</button>
//         </section>
//         {/* <section className="category_list_area">
//           <MainContentH2
//             title = {'商品カテゴリ'}
//             boderColor = {'#00584D'}
//           />
//           <div className="category_list">
//             <div className="category_card">
//               <img onClick={()=>selectItemListByCategory(10)} src={process.env.PUBLIC_URL + '/images/menu_icon_supplement.jpg'} alt="" />
//             </div>
//             <div className="category_card">
//               <img onClick={()=>selectItemListByCategory(11)} src={process.env.PUBLIC_URL + '/images/menu_icon_kansen.jpg'} alt="" />
//             </div>
//             <div className="category_card">
//               <img onClick={()=>selectItemListByCategory(12)} src={process.env.PUBLIC_URL + '/images/menu_icon_kit.jpg'} alt="" />
//             </div>
//           </div>
//         </section> */}
//       </main>
//     </DocumentMeta>
//   )
// }

// export default Home
