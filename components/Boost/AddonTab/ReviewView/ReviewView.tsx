import React from 'react';
import content from '../../../../lib/content';
import { formatLP } from '../../../../util/helpers';
import { BoostOrderDetails, BoostState } from '../../../../store/boost/types';
import styles from './styles.module.css';
import { Request } from '../../../../store/request/types';
import Loader from '../../../Reusable/Loader';

interface Props {
  currentOrder: BoostOrderDetails;
  boost: BoostState;
  purchaseOrderRequest: Request;
}

const ReviewView = (props: Props): JSX.Element => {
  const { currentOrder, boost, purchaseOrderRequest } = props;

  const formatTitle = (): string => {
    const { boostType, lp, desiredAmount, collectionName } = currentOrder;
    switch (collectionName) {
      case 'Division Boost':
        return `${boostType.toUpperCase()} | ${collectionName} - From ${boost.order
          .startRankTitle || 'TBD'} (${formatLP(lp)} LP) to ${boost.order.desiredRankTitle ||
          'TBD'}`;
      default:
        return `${boostType.toUpperCase()} | ${desiredAmount} ${collectionName} - ${boost.order
          .startRankTitle || 'TBD'}`;
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
          Champion & Role Select: <b>FREE</b>
        </span>
        <span>
          Summoner Spell Select : <b>FREE</b>
        </span>
      </div>
    </>
  );
};

export default ReviewView;
