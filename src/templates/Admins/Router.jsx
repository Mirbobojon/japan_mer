import React from 'react';
import { Route, Switch, useLocation } from "react-router";
import AdminAuth from '../../AdminAuth' //管理ページのログインチェック
import { RouteDir } from "../../common";
import {
  A_Login,
  A_Home,
  A_Item_list,
  A_Item_add,
  A_Item_edit,
  A_Category_list,
  A_Category_add,
  A_Category_edit,
  A_Department_list,
  A_Department_add,
  A_Department_edit,
  A_Setting,
  A_Admin_list,
  A_Admin_add,
  A_Admin_edit,
  A_Member_list,
  A_Member_add,
  A_Member_edit,
  A_News_list,
  A_News_add,
  A_News_edit,
  A_MailingList_list,
  A_MailingList_add,
  A_MailingList_edit,
  A_MailingListMember_list,
  A_Mail_list,
  A_Mail_add,
  A_Mail_edit,
  A_MailingListAdd_list,
  A_Order_list,
  A_Order_edit,
} from "../../templates";

const Router = () => {
  //URLを取得
  const location = useLocation();
  const url = location.pathname

  //URLに「mypage」が含まれるか
  const AdminAuthUrl = url.includes('/admin/')

  return (
    <Switch>
      {AdminAuthUrl && (
        <AdminAuth>
          {/* <Route exact path={`${RouteDir}/admin/home`} component={A_Home} /> */}
          <Route exact path={`${RouteDir}/admin/items/list`} component={A_Item_list} />
          <Route exact path={`${RouteDir}/admin/items/add`} component={A_Item_add} />
          <Route exact path={`${RouteDir}/admin/items/edit/:id`} component={A_Item_edit} />
          <Route exact path={`${RouteDir}/admin/categories/list`} component={A_Category_list} />
          <Route exact path={`${RouteDir}/admin/categories/add`} component={A_Category_add} />
          <Route exact path={`${RouteDir}/admin/categories/edit/:id`} component={A_Category_edit} />
          <Route exact path={`${RouteDir}/admin/departments/list`} component={A_Department_list} />
          <Route exact path={`${RouteDir}/admin/departments/add`} component={A_Department_add} />
          <Route exact path={`${RouteDir}/admin/departments/edit/:id`} component={A_Department_edit} />
          <Route exact path={`${RouteDir}/admin/setting`} component={A_Setting} />
          <Route exact path={`${RouteDir}/admin/admins/list`} component={A_Admin_list} />
          <Route exact path={`${RouteDir}/admin/admins/add`} component={A_Admin_add} />
          <Route exact path={`${RouteDir}/admin/admins/edit/:id`} component={A_Admin_edit} />
          <Route exact path={`${RouteDir}/admin/members/list`} component={A_Member_list} />
          <Route exact path={`${RouteDir}/admin/members/add`} component={A_Member_add} />
          <Route exact path={`${RouteDir}/admin/members/edit/:id`} component={A_Member_edit} />
          {/* <Route exact path={`${RouteDir}/admin/news/list`} component={A_News_list} /> */}
          {/* <Route exact path={`${RouteDir}/admin/news/add`} component={A_News_add} /> */}
          <Route exact path={`${RouteDir}/admin/news/edit/:id`} component={A_News_edit} />
          <Route exact path={`${RouteDir}/admin/mailing_lists/list`} component={A_MailingList_list} />
          <Route exact path={`${RouteDir}/admin/mailing_lists/add`} component={A_MailingList_add} />
          <Route exact path={`${RouteDir}/admin/mailing_lists/edit/:id`} component={A_MailingList_edit} />
          <Route exact path={`${RouteDir}/admin/mailing_list_members/list/:id`} component={A_MailingListMember_list} />
          <Route exact path={`${RouteDir}/admin/mails/list`} component={A_Mail_list} />
          <Route exact path={`${RouteDir}/admin/mails/add`} component={A_Mail_add} />
          <Route exact path={`${RouteDir}/admin/mails/edit/:id`} component={A_Mail_edit} />
          <Route exact path={`${RouteDir}/admin/mailing_list_add/list/:id`} component={A_MailingListAdd_list} />
          <Route exact path={`${RouteDir}/admin/orders/list`} component={A_Order_list} />
          <Route exact path={`${RouteDir}/admin/orders/edit/:id`} component={A_Order_edit} />
        </AdminAuth>
      )}
    </Switch>
  )
}

export default Router

