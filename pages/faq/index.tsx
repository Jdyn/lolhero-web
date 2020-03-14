import React from 'react';
import Layout from '../../components/shared/Layout';
import faq from '../../lib/faq';
import styles from './index.module.css';

const FAQ = (): JSX.Element => {
  return (
    <Layout title="Terms Of Service">
      <div className={styles.root}>
        <div className={styles.container}>
          <h1>Frequently Asked Questions</h1>
          {faq.map(item => (
            <div>
              <h2>{item.question}</h2>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
