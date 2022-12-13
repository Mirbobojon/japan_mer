//開発環境
export const HomeUrl = 'http://localhost:3000/mercado_dev/react/'  //変更必要
export const HomeDir = '/mercado_dev'  //変更必要
export const ApiDir = '/mercado_dev/api'  //変更必要
export const JsDir = '/mercado_dev/js'  //変更必要
export const ImagesDir = '/mercado_dev/images'  //変更必要
export const RouteDir = '/mercado_dev/react'  //変更必要
export const PublicImageDir = '/mercado_dev/react/images'  //変更必要
export const AdminsDir = '/mercado_dev/react/admin'  //変更必要
export const MypageDir = '/mercado_dev/react/mypage'  //変更必要
export const NewsImageDir = '/mercado_dev/images/news'  //変更必要
export const ItemImageDir = '/mercado_dev/images/items'  //変更必要

// オンライン決済

// Squareテスト決済環境
export const sqAppId = 'sandbox-sq0idb-TX7Er3KW4cxyfAUBzxznIw' /* 変更必要 */
export const sqLocationId = 'L9PS7Y0F82N8F' /* 変更必要 */

// 3Dセキュア　変更必要
export const isThreeDSecureActivated = false /* 無効 */
// export const isThreeDSecureActivated = true /* 有効 */

// 離島配送料
export const ADDITIONAL_SHIPPING_FEE = 2000  /* 変更必要 */


//エラー回避用古い情報
export const postUrl = ''
export const merchantId = ''
export const merchantName = ''

// パスワード検証用正規表現
export const REGEX_PASSWORD = /^[a-zA-Z0-9!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~]{10,20}$/;

// メールアドレス検証用正規表現
// 参考：https://www.javadrive.jp/regex-basic/sample/index13.html#section2
export const REGEX_MAIL_ADDRESS = /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;


// 入力制限用　ここから
export const REGEX_ITEM_PRICE = /^[0-9]{1,8}$/;  // 商品価格（8桁）
export const REGEX_POSTAGE = /^[0-9]{1,8}$/; // 送料（8桁）
export const REGEX_STOCK_QUANTITY = /^[-]?[0-9]{1,8}$/; // 在庫数（8桁）
// export const REGEX_STOCK_QUANTITY = /^(([-]?[1-9][0-9]{,7})|0)$/; // 在庫数（8桁）
export const REGEX_TAX_RATE = /^[0-9]{1,3}$/; // 税率

// 電話番号
// 参考：https://rapicro.com/%E9%9B%BB%E8%A9%B1%E7%95%AA%E5%8F%B7%E3%81%AE%E6%AD%A3%E8%A6%8F%E8%A1%A8%E7%8F%BE%E3%81%AF%EF%BC%9F/
export const REGEX_TEL_NUMBER = /^0[-0-9]{9,12}$/

// 生年月日
export const REGEX_BIRTHDAY = /^(19[0-9]{2}|20[0-9]{2})-(0?[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/


// 入力制限用　ここまで