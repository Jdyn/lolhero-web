import React from 'react';
import Head from 'next/head';

const SEO = (): JSX.Element => {
  return (
    <Head>
      <title>LoLHero - Boosting</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      {/* <script src="//code.tidio.co/i4tp3ur4r5c93thomdqgluh8fcvzexqf.js" /> */}
      <link rel="icon" href="/static/favicon.ico" />
      <meta property="og:title" content="LoLHero" />
      <meta property="og:site_name" content="LoLHero" />
      <meta property="og:url" content="https://lolhero.gg" />
      <meta property="og:type" content="website" />
    </Head>
  );
};

export default SEO;
