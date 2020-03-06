import React from 'react';
import Link from 'next/link';
import HomeHero from './HomeHero';
import HomeInfo from './HomeInfo';
import styles from './styles.module.css';

const Home = (): JSX.Element => {
  return (
    <>
      <HomeHero />
      <HomeInfo />
      <section className={styles.tertiary}>
        <div className={styles.root}>
          <div className={styles.container}>
            <h1>How it works</h1>
            <p>
              Our League Of Legends Elo boost service works in 2 ways. We either play on your
              account, or we group with you while you play on your account until we get you to your
              desired Rank. Both ways work just as well, so it is completely up too you!
            </p>
            <Link href="/boost">Learn about what we offer</Link>
          </div>
          <div className={styles.container}>
            <h1>What we offer</h1>
            <p>
              We offer a bunch of unique add-ons and options that allow you to customize your order
              from the group up. We highly recommend utilizing some of these options to get the most
              value out of your order!
            </p>
            <Link href="/boost">Learn about what we offer</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
