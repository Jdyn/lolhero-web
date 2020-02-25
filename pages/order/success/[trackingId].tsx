import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Reusable/Layout';
import styles from './success.module.css';

const OrderSuccess = (): JSX.Element => {
  const router = useRouter();

  const { trackingId } = router.query;

  return (
    <Layout title="Order Success">
      <div className={styles.root}>
        <div className={styles.container}>
          <h1>Thank you for your purchase.</h1>
          <h3>
            Your Tracking ID is <b>{trackingId || 'unknown'}</b>.
          </h3>
          <p>Please check the email associated with your order for further instructions.</p>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
