import React from 'react';
import Link from 'next/link';
import { formatTime } from '../../../../util/helpers';
import { OrderList } from '../../../../store/account/types';
import styles from './styles.module.css';
import { SessionState } from '../../../../store/session/types';

interface Props {
  orders: OrderList;
  filter: string;
  session: SessionState;
}

const labels = ['ID', 'Service', 'Summoner', 'Booster', 'Status', 'Date'];

const DashboardTable: React.FC<Props> = (props: Props): JSX.Element => {
  const { orders, filter, session } = props;

  // const labels =
  //   session.user.role === 'admin'
  //     ? ['Tracking ID', 'Service', 'Summoner', 'Booster', 'Status', 'Date', 'Assign', 'Set']
  //     : ['Tracking ID', 'Service', 'Summoner', 'Booster', 'Status', 'Date'];

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
              <tr key={order.trackingId}>
                <td>
                  <span>{order.trackingId}</span>
                </td>
                <Link
                  key={order.trackingId}
                  href="/account/order/[trackingId]"
                  as={`/account/order/${order.trackingId}`}
                >
                  <td>
                    <span>{order.title}</span>
                  </td>
                </Link>
                <td>
                  <span>{order.summonerName}</span>
                </td>
                <td>
                  <span>{order.booster ? order.booster.username : '-'}</span>
                </td>
                <td>
                  <span>{order.status}</span>
                </td>
                <td>
                  <span>{formatTime(order.createdAt)}</span>
                </td>
                {/* <td>
                  <select>
                    <option>ok</option>
                  </select>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardTable;
