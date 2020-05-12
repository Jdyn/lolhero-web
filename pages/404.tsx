import React from 'react';
import Layout from '../components/shared/Layout';
import styles from './_error/index.module.css';

const Error = (): JSX.Element => {
  return (
    <Layout title="Error 404">
      <div className={styles.root}>
        <div className={styles.container}>
          <h1>Oops.</h1>
          <h2>
            Error <span>404</span>
          </h2>
          <p>This page does not exist.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Error;
