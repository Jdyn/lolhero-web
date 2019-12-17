import React from 'react';
import { flatRanks } from '../../../lib/ranks';
import Banner from '../Banner';
import styles from './styles.css';
import { BoostOrderDetails } from '../../../store/boost/types';
import { Request } from '../../../store/request/types';

const ranks = flatRanks();

interface Props {
  updateOrder: () => void;
  currentOrder: BoostOrderDetails;
  purchaseOrderRequest: Request;
}

const BoostDisplay: React.FC<Props> = (props: Props): JSX.Element => {
  const { updateOrder, currentOrder, purchaseOrderRequest } = props;

  const renderContent = (): JSX.Element => {
    const { startRank, desiredRank, collectionName } = currentOrder;

    switch (collectionName) {
      case 'Division Boost':
        return (
          <>
            <Banner
              type="picker"
              isStartRank
              rank={startRank ? ranks[startRank] : {}}
              currentOrder={currentOrder}
              updateOrder={updateOrder}
            />
            <Banner
              type="picker"
              rank={desiredRank ? ranks[desiredRank] : {}}
              updateOrder={updateOrder}
              currentOrder={currentOrder}
            />
          </>
        );
      default:
        return (
          <>
            <Banner
              type="picker"
              isStartRank
              rank={startRank ? ranks[startRank] : {}}
              currentOrder={currentOrder}
              updateOrder={updateOrder}
            />
            <Banner
              type="slider"
              rank={startRank ? ranks[startRank] : {}}
              updateOrder={updateOrder}
              currentOrder={currentOrder}
            />
          </>
        );
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>{renderContent()}</div>
      {purchaseOrderRequest.errored && (
        <div className={styles.error}>
          <span>Error: {purchaseOrderRequest.error}</span>
        </div>
      )}
    </div>
  );
};

export default BoostDisplay;
