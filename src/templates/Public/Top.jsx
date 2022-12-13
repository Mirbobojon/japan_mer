import React from "react";
import Router from "./Router";
import DocumentMeta from "react-document-meta";
import { Header, TopSlider, Sidebar, Footer } from "../../components/public";
import { SiteTitle } from "./common";

const Top = () => {
  const meta = {
    title: SiteTitle,
  };

  return (
    <DocumentMeta {...meta}>
      <div id="public_page">
        <div id="top_page">
          <Header />
          {/* <TopSlider /> */}
          <article>
            <div className="subline_1000">
              <div className="col_2_wrap">
                <Sidebar />
                <Router />
              </div>
            </div>
          </article>
          <Footer />
        </div>
      </div>
    </DocumentMeta>
  );
};

export default Top;
