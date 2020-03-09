import React from 'react';
import Link from 'next/link';
import HomeHero from './HomeHero';
import HomeInfo from './HomeInfo';
import styles from './styles.module.css';
import Button from '../Reusable/Button';

const Home = (): JSX.Element => {
  return (
    <>
      <HomeHero />
      <HomeInfo />
      <section className={styles.tertiary}>
        <section className={styles.banner}>
          <div>
            <h1>Secure your League of Legends season rewards today!</h1>
            <Button href="/boost">Purchase Now</Button>
          </div>
        </section>
        <div className={styles.root}>
          <div className={styles.hero}>
            <h1>What is League Of Legends Boosting</h1>
            <p>
              We understand that many players don’t have the time or patience to grind out the
              ranked season rewards. Not to mention all the trolls that constantly feed in your
              games. Because of this, we’re here to offer a service where we play with you, or for
              you to reach your goals! If you are too busy with work to play, or just can’t stand
              all the griefers in your games, we offer the greatest and smoothest boosting
              experience available.
            </p>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <h1>How it works</h1>
              <p>
                Our League of Legends boosting service works in two ways. We can play on your
                account, or we can play alongside you while you play on your account until we get
                you to your desired goals. Both ways work just as well, so it is completely up too
                you!
              </p>
              <Link href="/boost">
                <span>Learn about what we offer</span>
              </Link>
            </div>
            <div className={styles.container}>
              <h1>What we offer</h1>
              <p>
                We offer a bunch of unique add-ons and options that allow you to customize your
                order from the group up. We highly recommend utilizing some of these options to get
                the most value out of your order! Check out these options on the order page.
              </p>
              <Link href="/boost">
                <span>Learn about these options</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
