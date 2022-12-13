import React from "react";
import Router from "./Router";
import DocumentMeta from "react-document-meta";
import { BreadCrumb } from "../../components";
import { Header, Sidebar, Footer } from "../../components/public";
import { useSelector } from "react-redux";
import { SiteTitle } from "./common";
// import Tabs from "./Tabs";
const Temp2 = (props) => {
  const meta = {
    title: SiteTitle,
  };

  const Floors = useSelector((state) => state.pageInfos.floors);
  const Title = useSelector((state) => state.pageInfos.h1);

  return (
    <DocumentMeta {...meta}>
      <div id="public_page">
        <div id="temp_2col">
          {/* <Header /> */}
          <article>
            <div className="subline_1000">
              <BreadCrumb floors={Floors} />
              <h1>{Title}</h1>
              <div className="col_2_wrap">
                <Sidebar />
                {/* <Tabs /> */}
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

export default Temp2;
