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

  const orderStatus = (status: string): string => {
    switch (status) {
      case 'open':
        return 'Complete your order details to begin your order!';
      case 'initialized':
      case 'active':
        return 'Your order is currently in progress!';
      case 'paused':
        return 'We will not continue your order while it is paused.';
      case 'completed':
        return 'Your order is now complete!';
      default:
        return 'Ooops, we cannot determine the status of your order.';
    }
  };

  const orderChampions = useCallback(order => {
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
  }, []);

  return (
    <div className={styles.root}>
      {orders[filter].orders.length > 0 ? (
        orders[filter].orders.map(order => (
          <div key={order.trackingId} className={styles.container}>
            <div className={styles.wrapper}>
              <div className={styles.header}>
                <Link href="/account/order/[trackingId]" as={`/account/order/${order.trackingId}`}>
                  <h1>{order.title}</h1>
                </Link>
                <div>
                  <span># {order.trackingId} - </span>
                  <span>{order.status}</span>
                  <time>{formatTime(order.createdAt)}</time>
                </div>
              </div>
              <div className={styles.content}>
                <span>
                  {order.booster
                    ? `Your current hero is ${order.booster.username}`
                    : 'You currently do not have a hero assigned to your order.'}
                </span>
                <span>{orderStatus(order.status)}</span>
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
        ))
      ) : (
        <div className={styles.empty}>There are no orders to show here. :(</div>
      )}
    </div>
  );
};

export default DashboardTable;
