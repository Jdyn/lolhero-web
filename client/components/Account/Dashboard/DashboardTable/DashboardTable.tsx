import React from 'react';
import Link from 'next/link';
import formatTime from '../../../../util/formatTime';
import { Orders, BaseOrder } from '../../../../reducers/account/types';
import styles from './styles.css';

interface Props {
  orders: Orders;
  filter: string;
}

const DashboardTable: React.FC<Props> = (props: Props): JSX.Element => {
  const { orders, filter } = props;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span>Tracking ID</span>
          <span>Service</span>
          <span>Status</span>
          <span>Order Date</span>
        </div>
        {orders && (
          <div className={styles.grid}>
            {orders[filter].orders.map(
              (order: BaseOrder, index: number): JSX.Element => (
                <Link
                  key={order.trackingId}
                  href={{
                    pathname: '/account/order',
                    query: { trackingId: order.trackingId }
                  }}
                  as={`/account/order/${order.trackingId}`}
                >
                  <div
                    className={`${styles.gridItem} ${index % 2 === 0 && styles.selected}`}
                    key={order.trackingId}
                  >
                    <span>{order.trackingId}</span>
                    <span>{order.title}</span>
                    <span>{order.status}</span>
                    <span>{formatTime(order.createdAt)}</span>
                  </div>
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTable;
