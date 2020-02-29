import React from 'react';
import styles from './styles.module.css';
import HomeSteps from '../HomeSteps';

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
        </div>
        <div className={styles.content} />
      </div>
      <div className={styles.secondary}>
        <HomeSteps />
      </div>
    </section>
  );
};

export default HomeInfo;
