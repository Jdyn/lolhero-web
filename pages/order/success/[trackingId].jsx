import React from 'react';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import Layout from '../../../components/Reusable/Layout';

const OrderSuccess = props => {
  const router = useRouter();
  const classes = useStyles();

  const { trackingId } = router.query;

  return (
    <Layout>
      <div className={classes.root}>
        <h1>Thank you for your purchase.</h1>
        <h3>
          Your Tracking ID is <b>{trackingId || 'unknown'}</b>.
        </h3>
        <p>Please check the email associated with your order for further instructions.</p>
      </div>
    </Layout>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    padding: '35px',
    height: '85vh',
    maxWidth: '975px',
    margin: '0 auto',
    color: theme.white,
    '& h3': {
      '& b': {
        color: theme.accent
      }
    }
  }
}));

export default OrderSuccess;
