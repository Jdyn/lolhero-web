import React from 'react';
import { NextPageContext } from 'next';
import Layout from '../../components/shared/Layout';
import styles from './index.module.css';

interface Props {
  message: string;
  status: number;
}

const Error = (props: Props): JSX.Element => {
  const { status, message } = props;

  return (
    <Layout title={`Error ${status}`}>
      <div className={styles.root}>
        <div className={styles.container}>
          <h1>Oops.</h1>
          <h2>
            Error <span>{status}</span>
          </h2>
          <p>{message}</p>
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

  const message = status === 404 ? 'This page likely does not exist.' : 'This was not expected.';

  return { status, message };
};

export default Error;
