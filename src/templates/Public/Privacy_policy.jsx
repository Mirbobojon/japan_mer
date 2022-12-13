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
      name: 'プライバシーポリシー',
      href: '/privacy_policy'
    }
  ]

  return(
    <DocumentMeta {...meta}>
      <div id="privacy_policy_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="privacy_policy_content">
          <h1>プライバシーポリシー</h1>
          <section className="introduction">
            <div className="text_area">
              {/* 変更必要 */}
              <p>
              一括変更（社名）ウェブサイトでは、個人の人格を尊重する、という理念のもと、個人情報の取り扱いに最大限の注意を払っております。当ウェブサイトをご利用の方からご提供いただいた個人情報については、厳しい管理体制の下にその保護・管理に務めます。
              </p>
            </div>
          </section>
          <section>
            <h2>１．掲載内容について </h2>
            {/* 変更必要 */}
            <p className="text_area">
            このサイトは、一括変更（社名）の公式ECサイトです。
            </p>
          </section>
          <section>
            <h2>２．著作権について</h2>
            <p className="text_area">
            このサイトで提供している文書や写真、イラスト及びその他資料等に関する著作権、その他の権利は、原則として当法人にあり、著作権法及びその他の法律で保護されます。法令上使用を認められている場合を除き、当法人の許可無くコピー、転用など二次的に利用することは禁じます。
            </p>
          </section>
          <section>
            <h2>３．個人情報のご提供を受ける場合</h2>
            <p className="text_area">
            当サイトでは、通常のアクセスにおいて、個人情報をご入力、通知いただくことはございません。ただし、お問い合わせをいただく場合にのみ、個人情報のご提供をいただく場合がございます。
            </p>
          </section>
          <section>
            <h2>４．個人情報の利用について</h2>
            <p className="text_area">
            当サイト内にあるサービスの利用やその他のお問い合わせにおいて、ご提供いただいた個人情報を、ご利用者に同意いただいた目的以外に利用することはいたしません。<br />また、いただいた情報・お問い合わせの内容によっては、当該メールアドレスに当方からのお問い合わせやその他のご案内をお送りする場合もございます。
            </p>
          </section>
          <section>
            <h2>５．第三者への個人情報の提供について</h2>
            <p className="text_area">
            ご提供いただいた個人情報を、第三者に預託、提供することはいたしません。<br />ただし、以下の場合はのぞきます。<br />
            1. 利用者の同意があった場合。<br/>
            2. 裁判所や警察などの公的機関から、法律に基づく正式な照会要請を受けた場合。<br />
            3. 利用者にサービスをご提供する目的で、当社からの委託を受けた会社が情報を必要とする場合。<br />
            </p>
          </section>
          <section>
            <h2>６．個人情報の開示・修正・削除について</h2>
            <p className="text_area">
            ご提供いただいた個人情報は、ご本人から下記の要請を受けた場合、速やかに対応いたします。<br />
            1. ご提供いただいた情報の内容確認<br />
            2. 修正・更新・削除<br />
            3. 個人情報の利用に関する同意の撤回
            </p>
          </section>
        </main>
      </div>
    </DocumentMeta>
  )
}

export default Howto