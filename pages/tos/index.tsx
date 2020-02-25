import React from 'react';
import Layout from '../../components/Reusable/Layout';
import tos from '../../lib/tos';
import styles from './styles.module.css';

const TOS = (): JSX.Element => {
  return (
    <Layout title="Terms Of Service">
      <div className={styles.root}>
        <div className={styles.container}>
          <h1>Terms Of Service</h1>
          {tos.terms.map(term => (
            <p>
              <span>{term.article}</span>
              {term.body}
            </p>
          ))}
          <h1>Customer Agreements</h1>
          {tos.duties.map(duty => (
            <p>
              <span>{duty.article}</span>
              {duty.body}
            </p>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TOS;
