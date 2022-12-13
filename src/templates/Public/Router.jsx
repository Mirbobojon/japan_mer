import React from 'react';
import {Route, Switch} from "react-router";
import {RouteDir} from "../../common";
import {
  Paytest,  //web決済テストページ
  Home,
  Commercial_transaction,
  Howto,
  Privacy_policy,
  Item_list,
  Item_detail,
  News_list,
  News_detail,
  Contact,
  Contact_done,
  Signup_application,
  Signup_application_done,
  Signup,
  Signup_done,
  Signup_overtime,
  Member_edit,
  Delivery_address_list,
  Delivery_address_add,
  Delivery_address_edit,
  Login,
  Favorite_list,
  Cart_list,
  Order_post_info,
  Add_order_post_address,
  Post_address_list,
  Order_info,
  Order_confirm,
  Order_completed,
  Order_history,
  Reissue_application,
  Reissue,
  Reissue_overtime,
  Reissue_application_done,
  Page404,
  About
} from "../../templates";

const Router = () =>
{
  return(
    <Switch>
      {/** web決済テストページ */}
      <Route exact path={`${RouteDir}/paytest`} component={Paytest} />

      {/** トップページテンプレート */}
      <Route exact path={`${RouteDir}/`} component={Home} />

      {/** 1カラムテンプレート */}
      <Route exact path={`${RouteDir}/commercial_transaction`} component={Commercial_transaction} />
      <Route exact path={`${RouteDir}/howto`} component={Howto} />
      <Route exact path={`${RouteDir}/privacy_policy`} component={Privacy_policy} />
      <Route exact path={`${RouteDir}/contact`} component={Contact} />
      <Route exact path={`${RouteDir}/contact_done`} component={Contact_done} />
      <Route exact path={`${RouteDir}/signup_application`} component={Signup_application} />
      <Route exact path={`${RouteDir}/signup_application_done`} component={Signup_application_done} />
      <Route exact path={`${RouteDir}/signup/:serial`} component={Signup} />
      <Route exact path={`${RouteDir}/signup_done`} component={Signup_done} />
      <Route exact path={`${RouteDir}/signup_overtime`} component={Signup_overtime} />
      <Route exact path={`${RouteDir}/login`} component={Login} />
      <Route exact path={`${RouteDir}/reissue_application`} component={Reissue_application} />
      <Route exact path={`${RouteDir}/reissue/:serial`} component={Reissue} />
      <Route exact path={`${RouteDir}/reissue_overtime`} component={Reissue_overtime} />
      <Route exact path={`${RouteDir}/reissue_application_done`} component={Reissue_application_done} />
      <Route exact path={`${RouteDir}/company`} component={About} />

      <Route exact path={`${RouteDir}/mypage/member_edit`} component={Member_edit} />
      <Route exact path={`${RouteDir}/mypage/delivery_address_list`} component={Delivery_address_list} />
      <Route exact path={`${RouteDir}/mypage/delivery_address_add`} component={Delivery_address_add} />
      <Route exact path={`${RouteDir}/mypage/delivery_address_edit/:id`} component={Delivery_address_edit} />
      <Route exact path={`${RouteDir}/mypage/favorite_list`} component={Favorite_list} />
      <Route exact path={`${RouteDir}/mypage/cart_list`} component={Cart_list} />
      <Route exact path={`${RouteDir}/mypage/order_post_info`} component={Order_post_info} />
      <Route exact path={`${RouteDir}/mypage/add_order_post_address`} component={Add_order_post_address} />
      <Route exact path={`${RouteDir}/mypage/order_completed`} component={Order_completed} />
      <Route exact path={`${RouteDir}/mypage/post_address_list`} component={Post_address_list} />
      <Route exact path={`${RouteDir}/mypage/order_info`} component={Order_info} />
      <Route exact path={`${RouteDir}/mypage/order_confirm`} component={Order_confirm} />
      <Route exact path={`${RouteDir}/mypage/order_history`} component={Order_history} />

      {/** 2カラムテンプレート */}
      <Route exact path={`${RouteDir}/item/list`} component={Item_list} />
      <Route exact path={`${RouteDir}/item/detail/:id`} component={Item_detail} />
      <Route exact path={`${RouteDir}/news/list`} component={News_list} />
      <Route exact path={`${RouteDir}/news/detail/:id`} component={News_detail} />

      {/** 404ページ */}
      <Route component={Page404} />
    </Switch>
  )
}

export default Router

