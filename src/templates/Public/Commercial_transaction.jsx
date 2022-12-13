import React from "react"
import DocumentMeta from 'react-document-meta'
import { BreadCrumb } from '../../components'
import { SiteTitle } from './common'

const CommercialTransaction = () =>
{
  const meta =
  {
    title: SiteTitle,
  }
  const Floors =
  [
    {
      name: '特定商取引法に基づく表記',
      href: '/commercial_transaction'
    }
  ]

  return(
    <DocumentMeta {...meta}>
      <div id="commercial_transaction_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="commercial_transaction_content">
          <h1>特定商取引に関する法律に基づく表記</h1>
          <section>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <th>販売業者</th>
                  {/* 変更必要 */}
                  <td>一括変更（社名）</td>
                </tr>
                {/* <tr>
                  <th>運営責任者</th>
                  <td>山川　重幸</td>
                </tr> */}
                <tr>
                  <th>住所</th>
                  {/* 変更必要 */}
                  <td>
                    〒 一括変更（郵便番号）<br/>
                    一括変更（住所）
                  </td>
                </tr>
                <tr>
                  <th>電話番号</th>
                  {/* 変更必要 */}
                  <td>一括変更（電話番号）</td>
                </tr>
                <tr>
                  <th>メールアドレス</th>
                  {/* 変更必要 */}
                  <td>一括変更（メールアドレス）</td>
                </tr>
                <tr>
                  <th>URL</th>
                  <td>一括変更（URL）</td>  {/* 変更必要 */}
                </tr>
                {/* <tr>
                  <th>許認可種別</th>
                  <td></td>
                </tr> */}
                <tr>
                  <th>商品以外の必要代金</th>
                  <td>
                  商品代金以外に下記料金が別途かかります。
                  <ul>
                    <li>消費税</li>
                    <li>送料</li>
                  </ul>
                  </td>
                </tr>
                <tr>
                  <th>注文方法</th>
                  <td>
                    パソコン・スマホからのご注文のみ受け付け<br/>
                    ※お電話、FAX、E-mailでのご注文は承りかねます。
                  </td>
                </tr>
                <tr>
                  <th>支払方法</th>
                  <td>
                    『クレジットカード決済』は、クレジットカード決済代行の株式会社スクエアの決済代行システムを利用しております。<br/>
                    安心してお支払いをしていただくために、お客様の情報がスクエアサイト経由で送信される際にはSSL(128bit)による暗号化通信で行い、クレジットカード情報は当サイトでは保有せず、同社で厳重に管理しております。
                  </td>
                </tr>
                {/* <tr>
                  <th>支払期限</th>
                  <td>お申込み後、1週間以内にお支払いください。</td>
                </tr> */}
                <tr>
                  <th>引渡し時期</th>
                  <td>
                    ご入金確認後から5営業日以内に発送いたします。<br/>
                    土・日・祝とその前日の午前0時以降のご注文は、休日明けから5営業日以内にご発送いたします。<br/>
                    ※商品欠品などにより発送に時間のかかる場合がございますので、あらかじめご了承ください。<br/>
                    ※北海道、沖縄、離島など一部地域については配送にお時間がかかる場合がありますので、ご予定日に配達できない場合がございます。<br/>
                    ※年末年始・ゴールデンウィーク、悪天候、交通事故、繁忙期、ご注文内容の不備などの場合、お届けが遅れることがございます。
                  </td>
                </tr>
                <tr>
                  <th>返品・交換について</th>
                  <td>
                    お客様の御都合による返品は不可とさせて頂きます。<br/>
                    不良商品の交換は電話かメールにて商品到着後1週間以内にご連絡下さい。
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </DocumentMeta>
  )
}

export default CommercialTransaction