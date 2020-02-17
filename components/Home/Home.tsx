import React from 'react';
import HomeHero from './HomeHero';
import HomeInfo from './HomeInfo';
import HomeSteps from './HomeSteps';
import styles from './styles.module.css';

const Home = (): JSX.Element => {
  return (
    <>
      <HomeHero />
      <HomeInfo />
      <HomeSteps />
    </>
  );
};

export default Home;
