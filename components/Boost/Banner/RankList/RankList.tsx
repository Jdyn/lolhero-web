/* eslint-disable react/no-array-index-key */
import React, { useMemo, useCallback, useEffect } from 'react';
import ranks, { Rank, unranked } from '../../../../lib/ranks';
import styles from './styles.module.css';
import { BoostOrderDetails, UpdateOrder } from '../../../../store/boost/types';
import RankItem from './RankItem';

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
        currentOrder.collectionName !== 'Placement Games' &&
        currentOrder.collectionName !== 'Net Wins'
      ) {
        if (itemRank > 20 && itemRank !== 28) {
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

      if (itemRank > 20 && itemRank !== 28) {
        return true;
      }

      return false;
    },
    [currentOrder.collectionName, currentOrder.desiredRank, currentOrder.startRank, isStartRank]
  );

  useEffect(() => {
    if (currentOrder.collectionName !== 'Placement Games' && currentOrder.startRank === 28) {
      updateOrder({ startRank: null }, { startRankTitle: '' });
    }
  }, [currentOrder.collectionName, updateOrder, currentOrder.startRank]);

  const list = useMemo(() => {
    const items = isPlacements ? [unranked, ...ranks] : ranks;

    return items.map((rankList, index) => (
      <div key={index} className={styles.rankWrapper}>
        {rankList.map((rankItem, tier) => {
          const disabled = validate(rankItem.rank);
          const selected = rank.rank === rankItem.rank;
          return (
            <RankItem
              key={rankItem.title + index}
              rankItem={rankItem}
              rankTier={tier}
              disabled={disabled}
              selected={selected}
              onClick={handleClick}
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
