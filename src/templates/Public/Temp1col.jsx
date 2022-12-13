import React from "react";
import Router from "./Router";
import DocumentMeta from "react-document-meta";
import { Header, Footer } from "../../components/public";
import { SiteTitle } from "./common";

const Temp1 = () => {
  const meta = {
    title: SiteTitle,
  };
  console.log("temp1");

  return (
    <DocumentMeta {...meta}>
      <div id="public_page">
        <div id="temp_1col">
          {/* <Header /> */}
          <article>
            <div className="subline_1000">
              <div className="col_1_wrap">
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

export default Temp1;
