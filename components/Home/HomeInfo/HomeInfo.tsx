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
        </div>
        <div className={styles.content} />
      </div>
      <section className={styles.secondary}>
        <div className={styles.secondaryRoot}>
          <div className={styles.secondaryContainer}>
            <h1>A truly modern boosting experience</h1>
            <p>
              We understand that many players don’t have the time or patience to grind out the
              ranked seasonal rewards. Not to mention all the trolls that run it down mid on the
              ranked ladder in League Of Legends. Because of this, we’re here to offer our help with
              our LoL boosting services! If you are too busy with work to play, or just can’t stand
              all the griefers in your games, we offer the greatest and smoothest boosting
              experience available.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default HomeInfo;
