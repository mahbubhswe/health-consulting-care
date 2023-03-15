import Head from "next/head";
import React from "react";
import LatestUpdate from "./LatestUpdate";
import Navbar from "./Navbar";

export default function SiteLayout({ pageTitle, children }) {
  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle ? pageTitle : "Welcome to Our Website"}</title>
      </Head>
      <LatestUpdate />
      <nav>
        <Navbar />
      </nav>
      <main>{children}</main>
    </React.Fragment>
  );
}
