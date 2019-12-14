import React, { useState } from 'react';
import styles from './styles.css';
import Api from '../../../services/api';
import OrderContainer from '../../../containers/OrderContainer';

interface Props {
  trackingId: string | string[];
  errorMessage?: string;
  onSubmit: (trackingId: string | string[], email: string) => void;
}

const OrderAuth = (props: Props): JSX.Element => {
  const { trackingId } = props;

  const [email, setEmail] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const fetchOrder = (): void => {
    Api.post(`/order/${trackingId}`, { email }).then(response => {
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
      <div className={styles.container}>
        <h3>{trackingId}</h3>
        <span>Tracking ID</span>
        <p>
          Please allow us to verify it is you by providing the email you used to purchase the order.
        </p>
        <form className={styles.form} onSubmit={submitEmail}>
          <input
            value={email}
            className={styles.search}
            onChange={(event): void => setEmail(event.target.value)}
            aria-label="search"
            placeholder="Verify Email"
          />
          <button className={styles.formSubmit} type="submit">
            Go
          </button>
        </form>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default OrderAuth;
