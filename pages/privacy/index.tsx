import React from 'react';
import Layout from '../../components/Reusable/Layout';
import styles from './styles.module.css';

const TOS = (): JSX.Element => {
  return (
    <Layout title="Terms Of Service">
      <div className={styles.root}>
        <div className={styles.container}>
          <h1>Privacy Policy</h1>
        </div>
      </div>
    </Layout>
  );
};

export default TOS;
