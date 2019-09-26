import React from 'react';
import Head from 'next/head';

const SEO = props => {
  return (
    <Head>
      <title>LoLHero - Boosting</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1, minimum-scale=1, width=device-width" />
      <meta name="description" content="LoL - League Of Legends Boosting" />
      <link async href="/static/styles/global.css" rel="stylesheet" />
      <link
        async
        href="/static/styles/braintree.css"
        rel="stylesheet"
        media="print"
        onLoad="this.media='all'"
      />
      {/* <script src="//code.tidio.co/i4tp3ur4r5c93thomdqgluh8fcvzexqf.js" /> */}
    </Head>
  );
};

export default SEO;
