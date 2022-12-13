import React from "react";
import { Route, Switch, useLocation } from "react-router";
import { RouteDir } from "./common";
import MemberAuth from "./MemberAuth"; //マイページのログインチェック
import CheckSignupMember from "./CheckSignupMember"; //新規会員登録の有効期限チェック
import CheckReissue from "./CheckReissue"; //パスワード再設定の有効期限チェック
import CheckReissueAdmin from "./CheckReissueAdmin"; //管理者パスワード再設定の有効期限チェック
import LoginCheckMember from "./LoginCheckMember"; //一般画面のログインチェック
import {
  Top,
  Temp1col,
  Temp2col,
  A_TempAdmin,
  A_Login,
  A_Reissue_application,
  A_Reissue,
  A_Reissue_overtime,
  Page404,
} from "./templates";
import Navbar from "./components/admins/Navbar";

const Router = () => {
  //URLを取得
  const location = useLocation();
  const url = location.pathname;

  //URLに「mypage」が含まれるか
  const MemberAuthUrl = url.includes("/mypage/");

  //URLに「signup/」が含まれるか
  const SignupUrl = url.includes("/signup/");

  //URLに「reissue/」が含まれるか
  const ReissueUrl = url.includes("/reissue/");

  //URLに「/admin_reissue/」が含まれるか
  const AdminReissueUrl = url.includes("/admin_reissue/");

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path={`${RouteDir}/admin/login`} component={A_Login} />
        <Route
          exact
          path={`${RouteDir}/admin/admin_reissue_application`}
          component={A_Reissue_application}
        />
        {AdminReissueUrl && (
          <CheckReissueAdmin>
            <Route
              exact
              path={`${RouteDir}/admin/admin_reissue/:serial`}
              component={A_Reissue}
            />
          </CheckReissueAdmin>
        )}
        <Route
          exact
          path={`${RouteDir}/admin/admin_reissue_overtime/`}
          component={A_Reissue_overtime}
        />
        <Route exact path={`${RouteDir}/admin*`} component={A_TempAdmin} />

        <LoginCheckMember>
          <Switch>
            {/** web決済テストページ */}
            <Route exact path={`${RouteDir}/paytest`} component={Temp1col} />
            <Route exact path={`${RouteDir}(/)?`} component={Top} />

            {/** 1カラムテンプレート */}
            <Route
              exact
              path={`${RouteDir}/commercial_transaction`}
              component={Temp1col}
            />
            <Route exact path={`${RouteDir}/howto`} component={Temp1col} />
            <Route
              exact
              path={`${RouteDir}/privacy_policy`}
              component={Temp1col}
            />
            <Route exact path={`${RouteDir}/contact`} component={Temp1col} />
            <Route
              exact
              path={`${RouteDir}/contact_done`}
              component={Temp1col}
            />
            <Route
              exact
              path={`${RouteDir}/signup_application`}
              component={Temp1col}
            />
            <Route
              exact
              path={`${RouteDir}/signup_application_done`}
              component={Temp1col}
            />
            {SignupUrl && (
              <CheckSignupMember>
                <Route
                  exact
                  path={`${RouteDir}/signup/:serial`}
                  component={Temp1col}
                />
              </CheckSignupMember>
            )}
            <Route
              exact
              path={`${RouteDir}/signup_done`}
              component={Temp1col}
            />
            <Route
              exact
              path={`${RouteDir}/signup_overtime`}
              component={Temp1col}
            />
            <Route exact path={`${RouteDir}/login`} component={Temp1col} />
            <Route
              exact
              path={`${RouteDir}/reissue_application`}
              component={Temp1col}
            />
            {ReissueUrl && (
              <CheckReissue>
                <Route
                  exact
                  path={`${RouteDir}/reissue/:serial`}
                  component={Temp1col}
                />
              </CheckReissue>
            )}
            <Route
              exact
              path={`${RouteDir}/reissue_overtime`}
              component={Temp1col}
            />
            <Route
              exact
              path={`${RouteDir}/reissue_application_done`}
              component={Temp1col}
            />
            {/** マイページ */}
            {MemberAuthUrl && (
              <MemberAuth>
                <Switch>
                  <Route
                    exact
                    path={`${RouteDir}/mypage/member_edit`}
                    component={Temp1col}
                  />
                  <Route
                    exact
                    path={`${RouteDir}/mypage/delivery_address_list`}
                    component={Temp1col}
                  />
                  <Route
                    exact
                    path={`${RouteDir}/mypage/delivery_address_add`}
                    component={Temp1col}
                  />
                  <Route
                    exact
                    path={`${RouteDir}/mypage/delivery_address_edit/:id`}
                    component={Temp1col}
                  />
                  <Route
                    exact
                    path={`${RouteDir}/mypage/favorite_list`}
                    component={Temp2col}
                  />
                  <Route
                    exact
                    path={`${RouteDir}/mypage/cart_list`}
                    component={Temp1col}
                  />
                  <Route
                    exact
                    path={`${RouteDir}/mypage/order_post_info`}
                    component={Temp1col}
                  />
                  <Route
                    exact
                    path={`${RouteDir}/mypage/add_order_post_address`}
                    component={Temp1col}
                  />
                  <Route
                    exact
                    path={`${RouteDir}/mypage/post_address_list`}
                    component={Temp1col}
                  />
                  <Route
                    exact
                    path={`${RouteDir}/mypage/order_info`}
                    component={Temp1col}
                  />
                  <Route
                    exact
                    path={`${RouteDir}/mypage/order_confirm`}
                    component={Temp1col}
                  />
                  <Route
                    exact
                    path={`${RouteDir}/mypage/order_history`}
                    component={Temp1col}
                  />
                  <Route
                    exact
                    path={`${RouteDir}/mypage/order_completed`}
                    component={Temp1col}
                  />
                  <Route component={Temp1col} />
                </Switch>
              </MemberAuth>
            )}
            {/** 2カラムテンプレート */}
            <Route exact path={`${RouteDir}/item/list`} component={Temp2col} />
            <Route
              exact
              path={`${RouteDir}/item/detail/:id`}
              component={Temp2col}
            />
            <Route exact path={`${RouteDir}/news/list`} component={Temp2col} />
            <Route
              exact
              path={`${RouteDir}/news/detail/:id`}
              component={Temp2col}
            />

            <Route component={Temp1col} />
          </Switch>
        </LoginCheckMember>
        {/** 404ページ */}
      </Switch>
    </>
  );
};

export default Router;
