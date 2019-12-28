import React, { useState } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.css';
import OrderContainer from '../../../containers/OrderContainer';
import Button from '../Button/Button';
import { SessionState } from '../../../store/session/types';
import { fetchOrder as getOrder } from '../../../store/account/actions';
import { AccountState } from '../../../store/account/types';
import { AppState } from '../../../store';
import { Request } from '../../../store/request/types';

interface Props {
  fullAuth?: boolean;
  trackingId: string | string[];
  email?: string;
  account?: AccountState;
  fetchOrderRequest: Request;
  fetchOrder: (trackingId: string, email: string) => void;
  onSubmit: (trackingId: string | string[], email: string) => void;
}

const OrderAuth = (props: Props): JSX.Element => {
  const { trackingId, fullAuth, email, account, fetchOrder, fetchOrderRequest } = props;

  const [form, setForm] = useState({
    email: email || 'test2@test.com',
    trackingId: trackingId || ''
  });

  const submitEmail = (event: React.FormEvent): void => {
    event.preventDefault();

    fetchOrder(trackingId as string, form.email);
  };

  return account.selectedOrder !== null ? (
    <OrderContainer authEmail={form.email} />
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
          {fetchOrderRequest.errored && (
            <span className={styles.error}>{fetchOrderRequest.error}</span>
          )}
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
          {fetchOrderRequest.errored && (
            <span className={styles.error}>{fetchOrderRequest.error}</span>
          )}
        </div>
      )}
    </div>
  );
};

const mapState = (state: AppState): object => ({
  account: state.account,
  fetchOrderRequest: state.request.FETCH_ORDER || {}
});

const mapDispatch = (dispatch): object => ({
  fetchOrder: (trackingId: string, email: string): void => dispatch(getOrder(trackingId, email))
});

export default connect(mapState, mapDispatch)(OrderAuth);
