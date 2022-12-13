import {
  selectAdminListAction,
  loginAdminAction,
  logoutAdminAction,
  changeReissueMailAddressAction,
} from "../admins/actions";
import { changeLoadingAction } from "../pageInfos/actions";
import { push } from "connected-react-router";
import axios from "axios";
import { AdminsDir, RouteDir, ApiDir } from "../../common";

//管理者情報一覧取得
export const selectAdminList = (props) => {
  return async (dispatch) => {
    let params = new URLSearchParams();
    params.append("limit", props.Limit);
    params.append("offset", props.Offset);
    params.append("sort", props.Sort);
    params.append("formkey", "selectkey");

    axios
      .post(ApiDir + "/selectAdminList.php", params)
      .then(function (response) {
        console.log(response.data);
        dispatch(selectAdminListAction(response.data));
      })
      .catch(function (error) {
        console.log(error);
        return;
      })
      .finally(function () {
        return;
      });
  };
};

//管理者情報一括操作
export const bulkOperationAdmin = (selectValue, selectCheckboxValue) => {
  return async (dispatch) => {
    let params = new URLSearchParams();
    params.append("select_value", selectValue);
    params.append("select_checkbox_value", JSON.stringify(selectCheckboxValue));
    params.append("formkey", "bulk_operationkey");
    axios
      .post(ApiDir + "/bulkOperationAdmin.php", params)
      .then(function (response) {
        if (response) {
          console.log(response.data);
          window.location.reload();
        } else {
          window.alert("商品情報操作に失敗しました。");
        }
      })
      .catch(function (error) {
        console.log(error);
        return;
      });
  };
};

//管理者登録
export const insertAdmin = (formData) => {
  return async (dispatch) => {
    // const password = formData.get('password')
    // const re_password = formData.get('re_password')

    // //バリデーション
    // if(password !== re_password)
    // {
    //   alert('パスワードが一致しません')
    //   return false
    // }

    axios
      .post(ApiDir + "/insertAdmin.php", formData)
      .then(function (response) {
        if (response.data.result) {
          window.alert("管理者情報を追加しました。");
          dispatch(push(AdminsDir + "/admins/list"));
        } else {
          window.alert(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
        return;
      })
      .finally(function () {
        return;
      });
  };
};

//管理者情報更新
export const updateAdmin = (formData) => {
  return async (dispatch) => {
    axios
      .post(ApiDir + "/updateAdmin.php", formData)
      .then(function (response) {
        if (response.data.result) {
          window.alert("管理者情報を変更しました。");
          dispatch(push(AdminsDir + "/admins/list"));
        } else {
          window.alert(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
        return;
      })
      .finally(function () {
        return;
      });
  };
};

//管理者情報削除
export const deleteAdmin = (id) => {
  return async (dispatch) => {
    let params = new URLSearchParams();
    params.append("admin_id", id);
    params.append("formkey", "deletekey");

    axios
      .post(ApiDir + "/deleteAdmin.php", params)
      .then(function (response) {
        if (response) {
          window.alert("管理者情報を削除しました。");
          window.location.reload();
        } else {
          window.alert("管理者情報を削除に失敗しました。");
        }
      })
      .catch(function (error) {
        console.log(error);
        return;
      });
  };
};

//管理者ログイン処理
export const loginAdmin = (formData, props) => {
  return async (dispatch) => {
    axios
      .post(ApiDir + "/loginAdmin.php", formData)
      .then(function (response) {
        if (response.data.length !== 0 && response.data !== "error") {
          console.log(response.data);
          dispatch(loginAdminAction(response.data[0]));
          dispatch(push(AdminsDir + "/items/list"));
        } else {
          window.alert(
            "ログインに失敗しました。メールアドレス、パスワードをお確かめください。"
          );
        }
      })
      .catch(function (error) {
        console.log(error);
        return;
      })
      .finally(function () {
        return;
      });
  };
};

//管理者ログインチェック
export const LoginCheckAdmin = () => {
  return async (dispatch) => {
    let params = new URLSearchParams();
    params.append("formkey", "checkkey");
    axios
      .post(ApiDir + "/loginCheckAdmin.php", params)
      .then(function (response) {
        console.log(response.data);
        if (
          response.data.length !== 0 &&
          response.data !== "nologin" &&
          response.data !== "error"
        ) {
          dispatch(loginAdminAction(response.data[0]));
        } else {
          dispatch(logoutAdminAction());
        }
      })
      .catch(function (error) {
        console.log(error);
        return;
      })
      .finally(function () {
        return;
      });
  };
};

//管理者ログアウト処理
export const logoutAdmin = () => {
  return async (dispatch) => {
    let params = new URLSearchParams();
    params.append("formkey", "logoutkey");
    axios
      .post(ApiDir + "/logoutAdmin.php", params)
      .then(function (response) {
        console.log(response.data);
        dispatch(logoutAdminAction());
        dispatch(push(AdminsDir + "/login"));
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        return;
      })
      .finally(function () {
        return;
      });
  };
};

//管理者パスワード再発行申請
export const insertReissueApplication = (FormData) => {
  return async (dispatch) => {
    axios
      .post(ApiDir + "/insertReissueApplicationByAdmin.php", FormData)
      .then(function (response) {
        // console.log(response.data)
        if (response.data === true) {
          dispatch(changeLoadingAction(false));
          window.alert(
            "パスワード再発行用URLを入力されたメールアドレスに送信しました。"
          );
        } else if (response.data === "not_registered") {
          dispatch(changeLoadingAction(false));
          window.alert("このメールアドレスは登録されていません。");
        } else {
          dispatch(changeLoadingAction(false));
          window.alert("エラー");
        }
      })
      .catch(function (error) {
        console.log(error);
        dispatch(changeLoadingAction(false));
        window.alert("エラー");
        return;
      })
      .finally(function () {
        return;
      });
  };
};

//管理者パスワード変更時のシリアルチェック
export const reissueCheck = (serial) => {
  return async (dispatch) => {
    let params = new URLSearchParams();
    params.append("serial", serial);
    params.append("formkey", "checkkey");
    axios
      .post(ApiDir + "/checkReissue.php", params)
      .then(function (response) {
        if (response.data === "overtime") {
          dispatch(push(AdminsDir + "/admin_reissue_overtime"));
        } else {
          dispatch(changeReissueMailAddressAction(response.data));
        }
      })
      .catch(function (error) {
        console.log(error);
        return;
      })
      .finally(function () {
        return;
      });
  };
};

//管理者パスワード変更
export const updateAdminPassword = (FormData) => {
  return async (dispatch) => {
    axios
      .post(ApiDir + "/updateAdminPassword.php", FormData)
      .then(function (response) {
        if (response.data === true) {
          window.alert(
            "パスワードを変更しました。\n新しいパスワードでログインしてください。"
          );
          dispatch(push(AdminsDir + "/login"));
        } else {
          window.alert(
            "パスワード変更に失敗しました。\nもう一度再発行手続きを行ってください。"
          );
          dispatch(push(AdminsDir + "/admin_reissue_application"));
        }
      })
      .catch(function (error) {
        console.log(error);
        return;
      })
      .finally(function () {
        return;
      });
  };
};
