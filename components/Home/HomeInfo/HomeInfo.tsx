import React from 'react';
import styles from './styles.module.css';

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
          <ul>
            <li>Free champion preferences and roles</li>
          </ul>
        </div>
        <div className={styles.content} />
      </div>
      <section className={styles.secondary}>
        <div className={styles.secondaryRoot}>
          <div className={styles.secondaryContainer}>
            <h1>We strive to be a service worthy of your trust</h1>
            <p>
              Having been in the boosting industry for years, we understand all our customers’ needs
              and frustrations. Our team consists of only the most skilled and well-trained
              boosters. Our only priority is to get your boosting order done quickly, securely and
              without hassle.
            </p>
            <div className={styles.cards}>
              <div className={styles.card}>
                <h1>high level heroes</h1>
                <p>
                  Joining the LoLHero team is not easy. We employ a very rigorous application
                  process to ensure we only bring in the best. The minimum rank we accept is Master
                  tier, unless someone shows extreme potential. If any Heroes are underperforming,
                  we try to work with them, but we are willing to replace any underperforming
                  members, which makes our team constantly evolving and up-to-date with the meta.
                </p>
              </div>
              <div className={styles.card}>
                <h1>safety and security</h1>
                <p>
                  We ensure every order is treated with great care in terms of security. We operate
                  with a VPN for free on request and can play in offline mode. We make it a huge
                  point to follow any and all instruction given to us by our customers. Your hero
                  preferences, region, and even timeslots you want us to fulfil your order during.
                  For more information, you can check out our F.A.Q section.
                </p>
              </div>
              <div className={styles.card}>
                <h1>pricing strategy</h1>
                <p>
                  Low prices prevent us from maintaining the highest level players, leads to lower
                  quality work, and lower your account’s security. At LoLHero, We offer the most
                  competitive pricing for the quality of service we provide. Prices are continously
                  fluctuating and we provide discount codes throughout the season. We will always
                  ensure our prices are representative of service we provide.
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
