import React from "react";
import Router from "./Router";
import { Header, Sidebar } from "../../components/admins";
import DocumentMeta from "react-document-meta";
import { SiteTitle } from "./common";

const Top = () => {
  const meta = {
    title: SiteTitle,
  };

  return (
    <DocumentMeta {...meta}>
      <div id="admins_page">
        {/* <Header /> */}
        <div className={"content_area"}>
          <Sidebar />
          <Router />
        </div>
      </div>
    </DocumentMeta>
  );
};

export default Top;
