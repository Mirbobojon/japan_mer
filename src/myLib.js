import { REGEX_MAIL_ADDRESS, REGEX_PASSWORD } from "./common";

// 小数点第2位以下を切り捨て（JavaScript小数誤差対策）
export const truncateDecimal = (decimalNum) => {
  // console.log(decimalNum);
  let tmpNum = decimalNum * 10;
  tmpNum = Math.floor(tmpNum);
  return tmpNum / 10;
}

// 商品税込価格を指定の計算方式で計算した値を返す
export const calcItemTaxIncludedPrice = (itemPrice, taxRate) => {
  // 税込金額計算後、小数点第2位以下切り捨て
  const tmpNum = truncateDecimal(Number(itemPrice) * (1 + (Number(taxRate) / 100)))

  // 変更必要
  return Math.floor(tmpNum)  /* 切り捨て */
  // return Math.round(tmpNum)  /* 四捨五入 */
  // return Math.ceil(tmpNum) /* 切り上げ */
}

// パスワード要件を満たしているか検証
export const isPasswordValid = (password) => {
  if(!password) {
    return false
  }
  
  return REGEX_PASSWORD.test(password)
}

// メールアドレス要件を満たしているか検証
export const isMailAddressValid = (mailAddress) => {
  if(!mailAddress) {
    return false
  }
  
  return REGEX_MAIL_ADDRESS.test(mailAddress)
}
