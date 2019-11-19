import React, { useMemo } from 'react';
import ranks from '../../../lib/ranks';
import Banner from '../Banner';
import styles from './styles.css';
import { BoostOrderDetails } from '../../../store/boost/types';
import { Request } from '../../../store/request/types';

interface Props {
  updateOrder: () => void;
  currentOrder: BoostOrderDetails;
  purchaseOrderRequest: Request;
}

const BoostDisplay: React.FC<Props> = (props: Props): JSX.Element => {
  const { updateOrder, currentOrder, purchaseOrderRequest } = props;

  const ranksObject = useMemo(
    () => [].concat.apply([], [...ranks]).reduce((obj, item) => ((obj[item.rank] = item), obj), {}),
    []
  );

  const renderContent = (collectionName: string): JSX.Element => {
    switch (collectionName) {
      case 'Division Boost':
        return (
          <>
            <Banner
              type="picker"
              isStartRank
              rank={currentOrder.startRank ? ranksObject[currentOrder.startRank] : {}}
              currentOrder={currentOrder}
              updateOrder={updateOrder}
            />
            <Banner
              type="picker"
              rank={currentOrder.desiredRank ? ranksObject[currentOrder.desiredRank] : {}}
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
              rank={currentOrder.startRank ? ranksObject[currentOrder.startRank] : {}}
              currentOrder={currentOrder}
              updateOrder={updateOrder}
            />
            <Banner
              type="slider"
              rank={currentOrder.startRank ? ranksObject[currentOrder.startRank] : {}}
              updateOrder={updateOrder}
              currentOrder={currentOrder}
            />
          </>
        );
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>{renderContent(currentOrder.collectionName)}</div>
      {purchaseOrderRequest.errored && (
        <div className={styles.error}>
          <span>Error: {purchaseOrderRequest.error}</span>
        </div>
      )}
    </div>
  );
};

export default BoostDisplay;
