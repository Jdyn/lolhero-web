import React from 'react';
import Link from 'next/link';
import formatTime from '../../../../util/formatTime';
import { OrderList } from '../../../../store/account/types';
import styles from './styles.css';

interface Props {
  orders: OrderList;
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
              (order): JSX.Element => (
                <Link
                  key={order.trackingId}
                  href="/account/order/[trackingId]"
                  as={`/account/order/${order.trackingId}`}
                >
                  <div className={styles.gridItem} key={order.trackingId}>
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