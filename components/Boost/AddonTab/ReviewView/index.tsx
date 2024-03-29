import React from 'react';
import content from '../../../../lib/content';
import { formatLP } from '../../../../util/helpers';
import { BoostOrderDetails, BoostOrder } from '../../../../store/boost/types';
import styles from './index.module.css';

interface Props {
  currentOrder: BoostOrderDetails;
  boostOrder: BoostOrder;
}

const ReviewView = (props: Props): JSX.Element => {
  const { currentOrder, boostOrder } = props;

  const formatTitle = (): string => {
    const { boostType, lp, desiredAmount, collectionName } = currentOrder;
    switch (collectionName) {
      case 'Division Boost':
        return `${boostType.toUpperCase()} | ${collectionName} - From ${boostOrder.startRankTitle ||
          'TBD'} (${formatLP(lp)} LP) to ${boostOrder.desiredRankTitle || 'TBD'}`;
      default:
        return `${boostType.toUpperCase()} | ${desiredAmount} ${collectionName} - ${boostOrder.startRankTitle ||
          'TBD'}`;
    }
  };

  return (
    <>
      <div className={styles.root}>
        <h3>Order Summary</h3>
        <h2>{formatTitle()}</h2>
        <h3>Details</h3>

        {currentOrder.collectionName === 'Division Boost' && (
          <span>
            LP: <b>{formatLP(currentOrder.lp)}</b>
          </span>
        )}

        <span>
          Type: <b>{currentOrder.boostType} Boost</b>
        </span>
        <span>
          Server: <b>{currentOrder.server}</b>
        </span>
        <span>
          Boost: <b>{currentOrder.collectionName}</b>
        </span>
        <span>
          Queue:
          <b>
            {` ${currentOrder.queue.charAt(0).toUpperCase()}${currentOrder.queue.slice(1)} ` +
              `Queue`}
          </b>
        </span>
        <h3>Extras</h3>
        {content.addons.extras.map(extra => (
          <span key={extra.title}>
            {extra.title}: <b>{currentOrder[extra.type] ? 'Yes' : 'No'}</b>
          </span>
        ))}
        <h3>Add-Ons</h3>
        <span>
          VPN Protection: <b>FREE</b>
        </span>
        <span>
          Champion Preferences: <b>FREE</b>
        </span>
        <span>
          Flash Position: <b>FREE</b>
        </span>
      </div>
    </>
  );
};

export default ReviewView;
