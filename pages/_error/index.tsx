import React from 'react';
import { NextPageContext } from 'next';
import Layout from '../../components/Reusable/Layout';
import styles from './styles.module.css';

interface Props {
  status: number;
}

const Error = (props: Props): JSX.Element => {
  const { status } = props;

  return (
    <Layout title={`Error ${status}`}>
      <div className={styles.root}>
        <div className={styles.container}>
          <h1>Oops.</h1>
          <h2>
            Error <span>{status}</span>
          </h2>
          <p>This page likely does not exist.</p>
        </div>
      </div>
    </Layout>
  );
};

Error.getInitialProps = (ctx: NextPageContext): object => {
  const { res, err } = ctx;

  let status = 404;

  if (res) {
    status = res.statusCode;
  } else if (err) {
    status = err.statusCode;
  }

  return { status };
};

export default Error;
