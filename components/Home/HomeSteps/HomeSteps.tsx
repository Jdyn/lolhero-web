import React from 'react';
import styles from './styles.module.css';

const HomeSteps = (): JSX.Element => {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div
            className={styles.content}
            style={{ backgroundImage: 'url(/static/images/art/strategy.jpg)' }}
          />
          <div
            className={styles.content}
            style={{ backgroundImage: 'url(/static/images/art/legacy.jpg)' }}
          />
          <div
            className={styles.content}
            style={{ backgroundImage: 'url(/static/images/art/glory.jpg)' }}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeSteps;
