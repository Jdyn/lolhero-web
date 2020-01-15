import React from 'react';
import { NextPageContext } from 'next';
import Layout from '../components/Reusable/Layout';

interface Props {
  status: number;
}

const error = (props: Props): JSX.Element => {
  const { status } = props;

  return <Layout title={`Error ${status}`}>That Page does not exist.</Layout>;
};

error.getInitialProps = (ctx: NextPageContext): object => {
  const { res, err } = ctx;

  let status: number;

  if (res) {
    status = res.statusCode;
  } else if (err) {
    status = err.statusCode;
  } else {
    status = 404;
  }

  return { status };
};

export default error;
