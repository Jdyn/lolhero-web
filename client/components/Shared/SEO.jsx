import React from "react";
import Head from "next/head";

const SEO = props => {
  return (
    <Head>
      <title>LoLHero - Boosting</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="initial-scale=1, minimum-scale=1, width=device-width"
      />
      <meta name="description" content="LoL - League Of Legends Boosting" />
      <script src="https://js.stripe.com/v3/" />
      <link href="../../static/styles/global.css" rel="stylesheet" />
    </Head>
  );
};

export default SEO;
