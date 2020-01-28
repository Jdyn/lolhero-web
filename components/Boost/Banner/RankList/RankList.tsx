/* eslint-disable react/no-array-index-key */
import React, { useMemo, useCallback, useEffect } from 'react';
import ranks, { Rank, unranked } from '../../../../lib/ranks';
import styles from './styles.module.css';
import { BoostOrderDetails, UpdateOrder } from '../../../../store/boost/types';

interface Props {
  rank: Rank;
  isStartRank: boolean;
  updateOrder: UpdateOrder;
  currentOrder: BoostOrderDetails;
  isPlacements?: boolean;
}

const RankList = (props: Props): JSX.Element => {
  const { rank, isStartRank, updateOrder, currentOrder, isPlacements } = props;

  const handleClick = useCallback(
    rankItem => {
      if (isStartRank) {
        updateOrder({ startRank: rankItem.rank }, { startRankTitle: rankItem.title });
      } else {
        updateOrder({ desiredRank: rankItem.rank }, { desiredRankTitle: rankItem.title });
      }
    },
    [isStartRank, updateOrder]
  );

  const validate = useCallback(
    itemRank => {
      if (
        currentOrder.collectionName === 'Division Boost' ||
        currentOrder.collectionName === 'Net Wins' ||
        currentOrder.collectionName === 'Net Games'
      ) {
        if (currentOrder.boostType === 'Duo' && itemRank > 21) {
          return true;
        }

        if (!isStartRank) {
          if (currentOrder.startRank !== null) {
            return itemRank < currentOrder.startRank + 1;
          }
        } else if (currentOrder.desiredRank !== null) {
          return itemRank > currentOrder.desiredRank - 1;
        } else {
          return false;
        }
      }

      return false;
    },
    [
      currentOrder.startRank,
      currentOrder.collectionName,
      currentOrder.boostType,
      currentOrder.desiredRank,
      isStartRank
    ]
  );

  useEffect(() => {
    if (currentOrder.collectionName !== 'Placement Games' && currentOrder.startRank === 28) {
      updateOrder({ startRank: null }, { startRankTitle: '' });
    }
  }, [currentOrder.collectionId, currentOrder.collectionName, updateOrder, currentOrder.startRank]);

  const list = useMemo(() => {
    const items = isPlacements ? [unranked, ...ranks] : ranks;

    return items.map((rankList, index) => (
      <div key={index} className={styles.rankWrapper}>
        {rankList.map(rankItem => {
          const disabled = validate(rankItem.rank);
          const selected = rank.rank === rankItem.rank;
          return (
            <button
              key={rankItem.title}
              type="button"
              aria-label="rank"
              disabled={disabled}
              className={`${styles.button} ${styles[`${rankItem.tag}`]} ${disabled &&
                styles.disabled} ${selected && styles.selected}`}
              onClick={(): void => handleClick(rankItem)}
            />
          );
        })}
      </div>
    ));
  }, [handleClick, rank, validate, isPlacements]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>{list}</div>
      <div className={styles.label}>Select Rank</div>
    </div>
  );
};

export default RankList;
