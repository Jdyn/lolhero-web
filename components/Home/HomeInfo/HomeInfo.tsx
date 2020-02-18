import React from 'react';
import styles from './styles.module.css';
import HomeSteps from '../HomeSteps';

const HomeInfo = (): JSX.Element => {
  return (
    <section className={styles.primary}>
      <section className={styles.info} />
      <HomeSteps />
    </section>
  );
};

export default HomeInfo;
