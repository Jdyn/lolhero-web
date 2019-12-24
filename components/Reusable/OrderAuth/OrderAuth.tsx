import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Api from '../../../services/api';
import OrderContainer from '../../../containers/OrderContainer';
import Button from '../Button/Button';

interface Props {
  fullAuth?: boolean;
  trackingId: string | string[];
  email?: string;
  errorMessage?: string;
  onSubmit: (trackingId: string | string[], email: string) => void;
}

const OrderAuth = (props: Props): JSX.Element => {
  const { trackingId, fullAuth, email } = props;

  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    email: email || '',
    trackingId: trackingId || ''
  });

  const fetchOrder = (): void => {
    Api.post(`/order/${form.trackingId}`, { email: form.email }).then(response => {
      if (response.ok) {
        setOrder(response.result.order);
      } else {
        setError(response.error);
      }
    });
  };

  const submitEmail = (event: React.FormEvent): void => {
    event.preventDefault();

    fetchOrder();
  };

  return order ? (
    <OrderContainer order={order} />
  ) : (
    <div className={styles.root}>
      {fullAuth ? (
        <div className={styles.container}>
          <h3>{form.trackingId}</h3>
          <span>Tracking ID</span>
          <p>Please provide your Tracking ID and the Email associated with your order. </p>
          <form className={styles.form} onSubmit={submitEmail}>
            <input
              value={form.trackingId}
              className={styles.input}
              onChange={(event): void => setForm({ ...form, trackingId: event.target.value })}
              aria-label="search"
              placeholder="Tracking ID"
            />
            <input
              value={form.email}
              className={styles.input}
              onChange={(event): void => setForm({ ...form, email: event.target.value })}
              aria-label="search"
              placeholder="Email"
            />
            <Button margin="10px 0 0 0">search</Button>
          </form>
          {error && <span className={styles.error}>{error}</span>}
        </div>
      ) : (
        <div className={styles.container}>
          <h3>{trackingId}</h3>
          <span>Tracking ID</span>
          <p>
            Please allow us to verify it is you by providing the email you used to purchase the
            order.
          </p>
          <form className={styles.form} onSubmit={submitEmail}>
            <input
              value={form.email}
              className={styles.input}
              onChange={(event): void => setForm({ ...form, email: event.target.value })}
              aria-label="search"
              placeholder="Verify Email"
            />
            <Button margin="10px 0 0 0">search</Button>
          </form>
          {error && <span className={styles.error}>{error}</span>}
        </div>
      )}
    </div>
  );
};

export default OrderAuth;
