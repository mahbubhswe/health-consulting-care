import Head from "next/head";
import React from "react";
export default function AdminLayout({ pageTitle, children }) {
  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle ? pageTitle : "View Report"}</title>
      </Head>
      {children}
    </React.Fragment>
  );
}
