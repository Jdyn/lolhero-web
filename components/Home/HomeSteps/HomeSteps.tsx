import React from 'react';
import styles from './styles.module.css';

const HomeSteps = (): JSX.Element => {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <h1>A truly modern boosting experience</h1>
        <p>
          Having been in the boosting industry for years, we understand all our customers’ needs and
          frustrations. Our team consists of only the most skilled and well-trained boosters. Our
          only priority is to get your boosting order done quickly, securely and without hassle.
        </p>
      </div>
    </section>
  );
};

export default HomeSteps;
