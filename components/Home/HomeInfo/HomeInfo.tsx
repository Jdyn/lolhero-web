import React from 'react';
import styles from './styles.module.css';

const HomeInfo = (): JSX.Element => {
  return (
    <section className={styles.root}>
      <div className={styles.container} />
      <div className={styles.content}>
        <div className={styles.hero}>
          <h1>Stuck in elo hell?</h1>
          <p>
            If your stuck in elo hell and your teammates are continously holding you back, we are
            here to help. Getting unlucky teammates is frustrating and can make it feel impossible
            to climb. we can give you a slight push in the right direction!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeInfo;
