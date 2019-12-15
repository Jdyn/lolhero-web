import React from 'react';
import styles from './styles.css';
import { flatRanks } from '../../../lib/ranks';
import { Order } from '../../../store/account/types';
import Banner from '../../Boost/Banner';

const ranks = flatRanks();

interface Props {
  order?: Order;
}

const OrderDisplay: React.FC<Props> = (props: Props): JSX.Element => {
  const { order } = props;

  return (
    <div className={styles.root}>
      <h3>{order.title}</h3>
      <div className={styles.container}>
        <Banner
          isStartRank
          height="375px"
          type="default"
          rank={ranks[order.details.startRank] || {}}
        />
        <Banner height="375px" type="default" rank={ranks[order.details.desiredRank] || {}} />
      </div>
    </div>
  );
};

export default OrderDisplay;
