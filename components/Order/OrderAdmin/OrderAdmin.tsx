import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './styles.module.css';
import { Order, AccountState } from '../../../store/account/types';
import { SessionState } from '../../../store/session/types';
import Button from '../../shared/Button';
import Api from '../../../services/api';
import { orderUpdated } from '../../../store/account/reducers';

interface Props {
  order?: Order;
  session: SessionState;
  account: AccountState;
}

const statuses = ['-', 'completed', 'active', 'open'];

const OrderAdmin: React.FC<Props> = (props: Props): JSX.Element => {
  const { order, session } = props;
  const dispatch = useDispatch();

  const [revealed, setReveal] = useState(false);

  const [adminUpdate, setAdminUpdate] = useState({});

  const handleAdminUpdate = (event): void => {
    event.preventDefault();

    Api.patch(`/orders/${order.trackingId}`, { ...adminUpdate }).then(response => {
      if (response.ok) {
        dispatch(orderUpdated({ order: response.result.order }));
      }
    });
  };

  return (
    <div className={styles.root}>
      {session?.user?.role === 'admin' && (
        <div className={styles.wrapper}>
          <h3>Admin Controls</h3>
          <div className={styles.adminContainer}>
            <h3>Change Booster</h3>
            <select className={styles.select}>
              <option>-</option>
              {/* {account.boosters &&
                account.boosters.map(booster => (
                  <option key={booster.username}>{booster.username}</option>
                ))} */}
            </select>
            <h3>Change Status</h3>
            <select
              className={styles.select}
              onChange={(event): void =>
                setAdminUpdate({
                  ...adminUpdate,
                  status: event.target.value === '-' ? order.status : event.target.value
                })
              }
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <Button margin="15px 0 0 0" width="100%" onClick={handleAdminUpdate}>
              update
            </Button>
          </div>
        </div>
      )}
      {order?.accountDetails && (
        <div className={styles.wrapper}>
          <h3>Account Details</h3>
          <div className={styles.adminContainer}>
            {revealed ? (
              <>
                <div>{order?.accountDetails?.username}</div>
                <div>{order?.accountDetails?.password}</div>
                <button
                  className={styles.reveal}
                  type="button"
                  onClick={(): void => setReveal(false)}
                >
                  click to hide
                </button>
              </>
            ) : (
              <button className={styles.reveal} type="button" onClick={(): void => setReveal(true)}>
                click to reveal
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderAdmin;
