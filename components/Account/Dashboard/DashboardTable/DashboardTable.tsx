import React from 'react';
import Link from 'next/link';
import formatTime from '../../../../util/formatTime';
import { OrderList } from '../../../../store/account/types';
import styles from './styles.css';

interface Props {
  orders: OrderList;
  filter: string;
}

const labels = ['Tracking ID', 'Service', 'Status', 'Date'];

const DashboardTable: React.FC<Props> = (props: Props): JSX.Element => {
  const { orders, filter } = props;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              {labels.map(label => (
                <th key={label}>
                  <div>{label}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders[filter].orders.map(order => (
              <Link
                key={order.trackingId}
                href="/account/order/[trackingId]"
                as={`/account/order/${order.trackingId}`}
              >
                <tr>
                  <td>
                    <span>{order.trackingId}</span>
                  </td>
                  <td>
                    <span>{order.title}</span>
                  </td>
                  <td>
                    <span>{order.status}</span>
                  </td>
                  <td>
                    <span>{formatTime(order.createdAt)}</span>
                  </td>
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardTable;
