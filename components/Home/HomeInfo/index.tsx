import React from 'react';
import Link from 'next/link';
import styles from './index.module.css';

const HomeInfo = (): JSX.Element => {
  return (
    <section className={styles.root}>
      <div className={styles.primary}>
        <div className={styles.hero}>
          <h1>Stuck in elo hell?</h1>
          <p>
            If you’re stuck in elo hell and your teammates are holding you back, we are here to
            help. Getting unlucky teammates is frustrating and makes it feel impossible to climb. we
            will give you a slight push in the right direction!
          </p>
          <div>What we offer: </div>
          <ul>
            <li>Free Role / Champion Selection</li>
            <li>In-Depth Order Customization</li>
            <li>Solo / Duo Placement Games</li>
            <li>Solo / Duo Divison Climbing</li>
            <li>Solo / Duo Net Win Boosts</li>
          </ul>
          <Link href="/boost">
            <span>Check it out</span>
          </Link>
        </div>
        <div className={styles.content} />
      </div>
      <section className={styles.secondary}>
        <div className={styles.secondaryRoot}>
          <div className={styles.secondaryContainer}>
            <h1>We are a service worthy of your trust</h1>
            <p>
              We have been playing the game since the beginning, so we understand all of your needs
              and frustrations, because we’ve been there. The necessity of your order’s privacy and
              anonymity is our top priority. Our team consists of only the most skilled and
              well-trained players and our goal is to get your boost done quickly, securely and
              without hassle.
            </p>
            <div className={styles.cards}>
              <div className={styles.card}>
                <h1>high level heroes</h1>
                <p>
                  Joining our team is not easy. We employ a very rigorous application process to
                  ensure we only bring in the best. The minimum rank we accept is around Master tier
                  and we are willing to replace any underperforming members which makes our team
                  constantly evolving and up-to-date with the meta.
                </p>
              </div>
              <div className={styles.card}>
                <h1>safety and security</h1>
                <p>
                  We ensure every order is handled with immense care. We operate with a VPN on
                  request and play league in offline mode. We make it a huge point to follow any
                  instructions given to us by our customers. Your champion preferences, roles, and
                  the time slots you want us to play are followed strictly by our heroes.
                </p>
              </div>
              <div className={styles.card}>
                <h1>pricing strategy</h1>
                <p>
                  Low prices prevent us from maintaining the highest level players, leads to lower
                  quality work, and lowers your account security. We offer the most competitive
                  pricing for the quality of service we provide. Prices are continuously
                  fluctuating, but we will always ensure our prices are as low as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default HomeInfo;
