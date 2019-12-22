import React from 'react';
import styles from './styles.css';

const Stripes: React.FC = (): JSX.Element => {
  return (
    <div className={styles.stripes}>
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
};

export default Stripes;