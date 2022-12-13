/* 参考URL
  https://developer.squareup.com/docs/web-payments/take-card-payment
*/

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { changeLoading } from '../../reducks/pageInfos/operations'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import 'react-square-payment-form/lib/default.css'
import axios from 'axios'
import { HomeDir, ApiDir, RouteDir, sqAppId, sqLocationId, isThreeDSecureActivated } from '../../common'


const PaymentPage = (props) => {
  const dispatch = useDispatch()

  const appId = sqAppId;
  const locationId = sqLocationId;

  async function initializeCard(payments) {
    const card = await payments.card();
    await card.attach("#card-container");
    return card;
  }

  /* 
    現状buyerVerificationTokenはなくても決済可能　3Dセキュアでは必要？
    verifyBuyerの引数が足りない
    https://developer.squareup.com/reference/sdks/web/payments/objects/Payments#Payments.verifyBuyer
  */
  // const verifyBuyerProcess = async (payments, token) => {
  //   const verificationResult = await payments.verifyBuyer(token);
  //   return verificationResult.token;
  // }

  // Call this function to send a payment token, buyer name, and other details
  // to the project server code so that a payment can be created with 
  // Payments API
  async function createPayment(token, verificationToken) {
    const data = {
      procedure: props.procedure,
      total_price: props.totalPrice,
      location_id: locationId,
      member_id: props.memberId,
      nonce: token,
      items: props.items,
      delivery_family_name: props.deliveryFamilyName,
      delivery_first_name: props.deliveryFirstName,
      delivery_family_name_furigana: props.deliveryFamilyNameFurigana,
      delivery_first_name_furigana: props.deliveryFirstNameFurigana,
      delivery_postal_code: props.deliveryPostalCode,
      delivery_address: props.deliveryAddress,
      delivery_telnumber: props.deliveryTelnumber
    }
    if (verificationToken !== undefined) {
      data.verificationToken = verificationToken
    }

    let params = new URLSearchParams();
    params.append('data', JSON.stringify(data));
    // console.log("totalPrice", props.totalPrice)

    const paymentResponse = await axios.post(ApiDir + '/sendPayment.php', params)
    // console.log(paymentResponse.data)
    return paymentResponse.data;
    // if (paymentResponse.ok) {
    //   return paymentResponse.json();
    // }
    // const errorBody = await paymentResponse.text();
    // throw new Error(errorBody);
  }

  // This function tokenizes a payment method. 
  // The ‘error’ thrown from this async function denotes a failed tokenization,
  // which is due to buyer error (such as an expired card). It is up to the
  // developer to handle the error and provide the buyer the chance to fix
  // their mistakes.
  async function tokenize(paymentMethod) {
    const tokenResult = await paymentMethod.tokenize();
    if (tokenResult.status === 'OK') {
      return tokenResult.token;
    } else {
      let errorMessage = `Tokenization failed-status: ${tokenResult.status}`;
      if (tokenResult.errors) {
        errorMessage += ` and errors: ${JSON.stringify(
          tokenResult.errors
        )}`;
      }
      throw new Error(errorMessage);
    }
  }

  /* 
    3D Secure用関数
    https://developer.squareup.com/docs/web-payments/sca
  */
  async function verifyBuyer(payments, token) {
    /* 
      verificationDetailsの項目
      https://developer.squareup.com/reference/sdks/web/payments/objects/ChargeVerifyBuyerDetails
    */
    const verificationDetails = {
      amount: String(props.totalPrice),
      /* collected from the buyer */
      billingContact: {
        // addressLines: ['', ''],
        familyName: props.deliveryFamilyName,
        givenName: props.deliveryFirstName,
        // email: '',
        country: 'JP',
        phone: props.deliveryTelnumber,
        // region: '',
        // city: '',
      },
      currencyCode: 'JPY',
      intent: 'CHARGE',
    };
    // console.log(verificationDetails)

    const verificationResults = await payments.verifyBuyer(
      token,
      verificationDetails
    );
    return verificationResults.token;
  }


  // Helper method for displaying the Payment Status on the screen.
  // status is either SUCCESS or FAILURE;
  // function displayPaymentResults(status) {
  //   const statusContainer = document.getElementById(
  //     'payment-status-container'
  //   );
  //   if (status === 'SUCCESS') {
  //     statusContainer.classList.remove('is-failure');
  //     statusContainer.classList.add('is-success');
  //   } else {
  //     statusContainer.classList.remove('is-success');
  //     statusContainer.classList.add('is-failure');
  //   }

  //   statusContainer.style.visibility = 'visible';
  // }

  // エラーコードからエラーメッセージを生成
  const genErrMsg = (errCodeArray) => {
    let errMsg = "決済処理に失敗しました。\n\n";
    errMsg += "[詳細]\n";
    for (let i = 0; i < errCodeArray.length; i++) {
      const errCode = errCodeArray[i];
      console.error("square-error-code: ", errCode)
      if (i === errCodeArray.length) {
        errMsg += getErrMsgForErrCode(errCode);
      } else {
        errMsg += getErrMsgForErrCode(errCode) + "\n";
      }
    }
    return errMsg;
  }

  // エラーコードに対応するエラーメッセージを返す
  const getErrMsgForErrCode = (errCode) => {
    /* 
      エラーコード一覧
      https://developer.squareup.com/reference/square_2022-09-21/payments-api/create-payment
    */

    switch (errCode) {
      // 入力エラー
      case "EXPIRATION_FAILURE":
      case "INVALID_EXPIRATION":
      case "BAD_EXPIRATION":
        return "正しい有効期限を入力してください。"
      case "CVV_FAILURE":
        return "正しいCVV（セキュリティコード）を入力してください。"
      case "ADDRESS_VERIFICATION_FAILURE":
      case "INVALID_POSTAL_CODE":
        return "正しい郵便番号（ZIP）を入力してください。"

      // カード利用限度額超過
      case "INSUFFICIENT_FUNDS":
        return "カードの利用限度額を超えています。"

      // カード有効期限切れ
      case "CARD_EXPIRED":
        return "カードの有効期限が切れています。"

      // 認証エラー
      case "INVALID_EMAIL_ADDRESS":
        return "正しいメールアドレスを入力してください。"
      case "INVALID_PIN":
        return "正しいPINを入力してください。"
      case "ALLOWABLE_PIN_TRIES_EXCEEDED":
        return "PINの入力回数が上限に達しました。\n利用制限を解除するには、カード発行元に問い合わせてください。"
      case "CARD_DECLINED_VERIFICATION_REQUIRED":
        return "カードの認証に失敗しました。"

      // 何らかの理由で使用できないカード
      case "CARDHOLDER_INSUFFICIENT_PERMISSIONS":
      case "CARD_NOT_SUPPORTED":
      case "GENERIC_DECLINE":
      case "GIFT_CARD_AVAILABLE_AMOUNT":
      case "INSUFFICIENT_PERMISSIONS":
      case "INVALID_ACCOUNT":
      case "INVALID_CARD":
      case "INVALID_CARD_DATA":
      case "INVALID_LOCATION":
      case "PAN_FAILURE":
      case "TRANSACTION_LIMIT":
      case "VOICE_FAILURE":
      case "CHIP_INSERTION_REQUIRED":
        return "このカードは使用できません。"

      // メルカドサーバまたはSquare側のエラー
      case "CARD_TOKEN_EXPIRED":
      case "CARD_TOKEN_USED":
      case "INVALID_FEES":
      case "MANUALLY_ENTERED_PAYMENT_NOT_SUPPORTED":
      case "PAYMENT_AMOUNT_MISMATCH":
      case "PAYMENT_LIMIT_EXCEEDED":
      case "CARD_PROCESSING_NOT_ENABLED":
      case "TEMPORARY_ERROR":
      default:
        return "サーバーに問題があります。"
    }
  }

  useEffect(async () => {
    if (!window.Square) {
      throw new Error("Square.js failed to load properly");
    }

    const payments = window.Square.payments(appId, locationId);
    let card;
    try {
      card = await initializeCard(payments);
    } catch (e) {
      console.error("Initializing Card failed", e);
      return;
    }

    async function handlePaymentMethodSubmission(event, paymentMethod, shouldVerify) {
      event.preventDefault();

      try {
        // disable the submit button as we await tokenization and make a
        // payment request.
        // ボタン無効化（連打対策）
        cardButton.disabled = true;

        // カード情報をトークン化
        const token = await tokenize(paymentMethod);

        // 3Dセキュア用認証トークンを生成
        let verificationToken;
        if (shouldVerify) {
          verificationToken = await verifyBuyer(payments, token);
          console.log('Verification Token:', verificationToken);
        }

        // Square決済処理実行
        const paymentResults = await createPayment(token, verificationToken);
        // console.log(paymentResults);
        if (paymentResults.result === true) {
          dispatch(push(RouteDir + '/mypage/order_completed'));
          // displayPaymentResults('SUCCESS');
          // console.log('Payment Success', paymentResults);
        } else {
          if (paymentResults.errors) {
            const errMsg = genErrMsg(paymentResults.errors)
            alert(errMsg);
          } else if (paymentResults.details) {
            console.error(paymentResults.details)
            alert("プログラムエラーにより決済処理に失敗しました。")
          } else {
            alert("プログラムエラーにより決済処理に失敗しました。")
          }
          cardButton.disabled = false;
        }
      } catch (e) {
        cardButton.disabled = false;
        // displayPaymentResults('FAILURE');
        alert("決済処理に失敗しました。")
        console.error(e.message);
      }
    }

    const cardButton = document.getElementById(
      'card-button'
    );
    cardButton.addEventListener('click', async function (event) {
      dispatch(changeLoading(true))
      await handlePaymentMethodSubmission(event, card, isThreeDSecureActivated);
      dispatch(changeLoading(false))
    });

  }, []);

  return (
    <div>
      <form id="payment-form">
        <div id="card-container"></div>
        <div className="payment_btn_area">
          <button id="card-button" className="order_decide_btn" type="button">
            注文する
          </button>
        </div>
      </form>
      {/* <div id="payment-status-container"></div> */}
    </div>
  )
}

export default PaymentPage;