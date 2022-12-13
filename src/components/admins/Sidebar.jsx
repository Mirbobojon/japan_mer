import React, { useEffect } from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { RouteDir } from "../../common";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();

  let targetStr = "";
  const Location = useLocation();
  const targetPath = Location.pathname.substr(
    Location.pathname.indexOf("admin/") + 6
  );
  const targetStrIndex = targetPath.indexOf("/");
  if (targetStrIndex === -1) {
    targetStr = targetPath;
  } else {
    targetStr = targetPath.slice(0, targetStrIndex);
  }

  useEffect(() => {}, []);

  return (
    <aside className={"sidebar"}>
      <ul>
        {/* <li className={targetStr==='home'?'active sidebar_menu_list':'sidebar_menu_list'} onClick={() => dispatch(push(RouteDir+'/admin/home'))} data-name="home">
          <span>ホーム</span>
        </li> */}
        {/* <li className={targetStr==='news'?'active sidebar_menu_list':'sidebar_menu_list'} onClick={() => dispatch(push(RouteDir+'/admin/news/list'))} data-name="items">
          <span>お知らせ一覧</span>
        </li> */}
        <li
          className={
            targetStr === "items"
              ? "active sidebar_menu_list"
              : "sidebar_menu_list"
          }
          onClick={() => dispatch(push(RouteDir + "/admin/items/list"))}
          data-name="home"
        >
          <span>商品一覧</span>
        </li>
        <li
          className={
            targetStr === "orders"
              ? "active sidebar_menu_list"
              : "sidebar_menu_list"
          }
          onClick={() => dispatch(push(RouteDir + "/admin/orders/list"))}
          data-name="home"
        >
          <span>受注・配送一覧</span>
        </li>
        <li
          className={
            targetStr === "members"
              ? "active sidebar_menu_list"
              : "sidebar_menu_list"
          }
          onClick={() => dispatch(push(RouteDir + "/admin/members/list"))}
          data-name="home"
        >
          <span>会員一覧</span>
        </li>
        <li
          className={
            targetStr === "admins"
              ? "active sidebar_menu_list"
              : "sidebar_menu_list"
          }
          onClick={() => dispatch(push(RouteDir + "/admin/admins/list"))}
          data-name="home"
        >
          <span>管理者一覧</span>
        </li>
        <li
          className={
            targetStr === "mails"
              ? "active sidebar_menu_list"
              : "sidebar_menu_list"
          }
          onClick={() => dispatch(push(RouteDir + "/admin/mails/list"))}
          data-name="home"
        >
          <span>メールマガジン一覧</span>
        </li>
        <li
          className={
            targetStr === "mailing_lists" ||
            targetStr === "mailing_list_members"
              ? "active sidebar_menu_list"
              : "sidebar_menu_list"
          }
          onClick={() => dispatch(push(RouteDir + "/admin/mailing_lists/list"))}
          data-name="home"
        >
          <span>メーリングリスト</span>
        </li>
        <li
          className={
            targetStr === "categories"
              ? "active sidebar_menu_list"
              : "sidebar_menu_list"
          }
          onClick={() => dispatch(push(RouteDir + "/admin/categories/list"))}
          data-name="home"
        >
          <span>カテゴリ一覧</span>
        </li>
        <li
          className={
            targetStr === "departments"
              ? "active sidebar_menu_list"
              : "sidebar_menu_list"
          }
          onClick={() => dispatch(push(RouteDir + "/admin/departments/list"))}
          data-name="home"
        >
          <span>担当部署一覧</span>
        </li>
        <li
          className={
            targetStr === "setting"
              ? "active sidebar_menu_list"
              : "sidebar_menu_list"
          }
          onClick={() => dispatch(push(RouteDir + "/admin/setting"))}
          data-name="home"
        >
          <span>各種設定</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
