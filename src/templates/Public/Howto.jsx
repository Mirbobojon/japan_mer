import React from "react"
import DocumentMeta from 'react-document-meta'
import { BreadCrumb } from '../../components'
import { SiteTitle } from './common'

const Howto = () =>
{
  const meta =
  {
    title: SiteTitle,
  }

  const Floors =
  [
    {
      name: 'ご利用について',
      href: '/howto'
    }
  ]

  return(
    <DocumentMeta {...meta}>
      <div id="howto_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="howto_content">
          <h1>ご利用について</h1>
          <section>
            <h2>商品代金以外に必要な費用（送料、手数料、消費税等）</h2>
            <div className="text_area">
              <p>
                商品代金以外に下記料金が別途かかります。
              </p>
              <ul>
                <li>消費税</li>
                <li>送料</li>
              </ul>
            </div>
          </section>
          <section>
            <h2>注文方法</h2>
            <div className="text_area">
              <p>
                パソコン・スマホからのご注文のみ受け付け<br/>
                ※お電話、FAX、E-mailでのご注文は承りかねます。
              </p>
              <ul>
                <li>ご購入されたい商品の「買い物カゴに入れる」をクリックします。</li>
                <li>ショッピングカート画面で「購入手続きへ」をクリックします。</li>
                <li>「お届け先を入力する」選択し、お届け先を入力して「決定」をクリックしてください。</li>
                <li>「発送・支払方法を指定する」をクリックします。</li>
                <li>ご注文内容を確認して頂き「ご注文完了する」を押してください。</li>
                <li>買い物完了後、 ご注文確認メールが届きますのでご確認ください。</li>
              </ul>
            </div>
          </section>
          <section>
            <h2>お支払い方法</h2>
            <div className="text_area">
              <p>
              『クレジットカード決済』は、クレジットカード決済代行の株式会社スクエアの決済代行システムを利用しております。<br/>
              クレジットカード：VISA、MASTER、DINERS、AMEX、JCBがご利用いただけます。<br/>
              お支払回数は1回のみとさせていただいております。
              </p>
            </div>
          </section>
          {/* <section>
            <h2>支払期限</h2>
            <div className="text_area">
              <p>
                お申込み後、1週間以内にお支払ください。
              </p>
            </div>
          </section> */}
          <section>
            <h2>注文からお届けまでの日数</h2>
            <div className="text_area">
              <p>
              ご入金確認後から5営業日以内に発送いたします。<br/>
              土・日・祝とその前日の午前0時以降のご注文は、休日明けから5営業日以内にお発送いたします。<br/>
              ※商品欠品などにより発送に時間のかかる場合がございますので、あらかじめご了承ください。<br/>
              ※北海道、沖縄、離島など一部地域については配送にお時間がかかる場合がありますので、<br/>
              ご予定日に配達できない場合がございます。<br/>
              ※年末年始・ゴールデンウィーク、悪天候、交通事故、繁忙期、ご注文内容の不備などの場合、お届けが遅れることがございます。
              </p>
            </div>
          </section>
          <section>
            <h2>返品・返金について</h2>
            <div className="text_area">
              <p>
              お客様の御都合による返品は不可とさせて頂きます。<br/>
              不良商品の交換は電話かメールにて、商品到着後1週間以内にご連絡下さい。
              </p>
            </div>
          </section>
        </main>
      </div>
    </DocumentMeta>
  )
}

export default Howto