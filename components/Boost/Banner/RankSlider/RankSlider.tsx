import React, { useMemo, useEffect } from 'react';
import content from '../../../../lib/boosts';
import { Rank } from '../../../../lib/ranks';
import { BoostOrderDetails } from '../../../../store/boost/types';
import styles from './styles.module.css';

interface Props {
  rank: Rank;
  currentOrder: BoostOrderDetails;
  updateOrder: (detailsUpdate: object) => void;
}

const BannerRankSlider = (props: Props): JSX.Element => {
  const { rank, currentOrder, updateOrder } = props;

  const currentCollection = useMemo(
    () =>
      content[currentOrder.boostType].items.filter(
        item => item.title === currentOrder.collectionName
      )[0],
    [currentOrder.boostType, currentOrder.collectionName]
  );

  useEffect(() => {
    if (currentOrder.desiredAmount > currentCollection.maxAmount) {
      updateOrder({ desiredAmount: parseInt(currentCollection.maxAmount, 0) });
    }
  }, [currentCollection, updateOrder, currentOrder.desiredAmount]);

  return (
    <div className={styles.root}>
      <h3 className={styles.amount}>{currentOrder.desiredAmount}</h3>
      <div className={styles.sliderWrapper}>
        <input
          type="range"
          min="1"
          max={currentCollection.maxAmount}
          className={styles.slider}
          style={{ backgroundColor: rank.accent }}
          value={currentOrder.desiredAmount}
          onChange={(event): void =>
            updateOrder({ desiredAmount: parseInt(event.target.value, 0) })
          }
        />
      </div>
    </div>
  );
};

export default BannerRankSlider;
