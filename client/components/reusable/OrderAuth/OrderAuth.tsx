import React, { useState } from 'react';
import styles from './styles.css';

interface Props {
  trackingId: string | number;
  errorMessage?: string;
  onSubmit: (email: string) => void;
}

const OrderAuth = (props: Props): JSX.Element => {
  const { trackingId, onSubmit, errorMessage } = props;

  const [email, setEmail] = useState('');

  const submitEmail = (event: React.FormEvent): void => {
    event.preventDefault();

    onSubmit(email);
  };

  return (
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
        {errorMessage && <span className={styles.error}>{errorMessage}</span>}
      </div>
    </div>
  );
};

export default OrderAuth;
