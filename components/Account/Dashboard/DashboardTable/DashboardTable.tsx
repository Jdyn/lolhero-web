import React, { useMemo, useCallback } from 'react';
import Link from 'next/link';
import { formatTime } from '../../../../util/helpers';
import { OrderList } from '../../../../store/account/types';
import styles from './styles.module.css';
import { SessionState } from '../../../../store/session/types';
import champions from '../../../../lib/champions';

interface Props {
  orders: OrderList;
  filter: string;
  session: SessionState;
}

const DashboardTable: React.FC<Props> = (props: Props): JSX.Element => {
  const { orders, filter, session } = props;

  const orderStatus = useCallback((status: string, booster) => {
    const boost = booster
      ? { severity: 2, message: `Your current hero is ${booster.username}` }
      : { severity: 3, message: 'You currently do not have a hero assigned to your order.' };

    let order: { message: string; severity: number };

    switch (status) {
      case 'open':
        order = {
          severity: 4,
          message: 'Please complete your order details to begin your boost!'
        };
        break;
      case 'initialized':
      case 'active':
        order = {
          severity: 2,
          message: booster
            ? 'Your order is currently in progress!'
            : 'We are currently looking for a hero!'
        };
        break;
      case 'paused':
        order = {
          severity: 3,
          message: 'We will not continue your order while it is paused.'
        };
        break;
      case 'completed':
        order = { severity: 1, message: 'Your order is now complete!' };
        break;
      default:
        order = {
          severity: 4,
          message: 'Ooops, we cannot determine the status of your order.'
        };
    }

    return { boost, order };
  }, []);

  const orderChampions = useCallback(
    order => {
      const list = [];

      if (order?.champions) {
        champions.forEach(champ => {
          order.champions.forEach(item => {
            if (champ.name === item.name) {
              list.push({
                ...item,
                img: champ.img
              });
            }
          });
        });
      }

      console.log(list);

      return list;
    },
    [orders]
  );

  return (
    <div className={styles.root}>
      {orders[filter].orders.length > 0 ? (
        orders[filter].orders.map(order => {
          const status = orderStatus(order.status, order.booster);
          return (
            <div key={order.trackingId} className={styles.container}>
              <div className={styles.wrapper}>
                <div className={styles.header}>
                  <Link
                    href="/account/order/[trackingId]"
                    as={`/account/order/${order.trackingId}`}
                  >
                    <h1>{order.title}</h1>
                  </Link>
                  <div>
                    <span># {order.trackingId} - </span>
                    <span>{order.status}</span>
                    <time>{formatTime(order.createdAt)}</time>
                  </div>
                </div>
                <div className={styles.content}>
                  <span className={styles[`severity${status.boost.severity}`]}>
                    {status.boost.message}
                  </span>
                  <span className={styles[`severity${status.order.severity}`]}>
                    {status.order.message}
                  </span>
                </div>
              </div>
              <div className={styles.champions}>
                {orderChampions(order).map(champion => (
                  <div className={styles.championItem} key={champion.name}>
                    <img alt="champion-icon" className={styles.championImage} src={champion.img} />
                  </div>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className={styles.empty}>There are no orders to show here. :(</div>
      )}
    </div>
  );
};

export default DashboardTable;
