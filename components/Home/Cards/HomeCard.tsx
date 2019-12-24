import React from 'react';
import styles from './styles.module.css';

interface Props {
  card: { title: string; description: string; step: string };
}

const HomeCard = (props: Props): JSX.Element => {
  const { card } = props;
  return (
    <div className={styles.container}>
      <div className={styles.header} />
      <div className={styles.content}>
        <span>{card.step}</span>
        <h3>{card.title}</h3>
        <p>{card.description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
