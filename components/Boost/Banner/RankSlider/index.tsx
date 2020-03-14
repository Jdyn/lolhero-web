import React, { useMemo, useEffect, useState } from 'react';
import content from '../../../../lib/boosts';
import { Rank } from '../../../../lib/ranks';
import { BoostOrderDetails, UpdateOrder } from '../../../../store/boost/types';
import styles from './index.module.css';

interface Props {
  rank: Rank;
  currentOrder: BoostOrderDetails;
  updateOrder: UpdateOrder;
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

  const [currentAmount, setAmount] = useState(currentOrder.desiredAmount);

  useEffect(() => {
    const maxAmount = parseInt(currentCollection.maxAmount, 0);
    if (currentOrder.desiredAmount > maxAmount) {
      updateOrder({ desiredAmount: maxAmount });
      setAmount(maxAmount);
    }
  }, [currentCollection, updateOrder, currentOrder.desiredAmount]);

  return (
    <div className={styles.root}>
      <h3 className={styles.amount}>{currentAmount}</h3>
      <div className={styles.sliderWrapper}>
        <input
          type="range"
          min="1"
          max={currentCollection.maxAmount}
          className={styles.slider}
          style={{ backgroundColor: rank.accent }}
          value={currentAmount}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
            setAmount(parseInt(event.target.value, 0))
          }
          onMouseUp={(event: any): void =>
            updateOrder({ desiredAmount: parseInt(event.target.value, 0) })
          }
        />
      </div>
    </div>
  );
};

export default BannerRankSlider;
