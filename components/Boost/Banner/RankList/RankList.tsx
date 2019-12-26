import React, { useMemo, useCallback } from 'react';
import ranks, { Rank } from '../../../../lib/ranks';
import styles from './styles.module.css';
import { BoostOrderDetails } from '../../../../store/boost/types';

interface Props {
  rank: Rank;
  isStartRank: boolean;
  updateOrder: (detailsUpdate: object, orderUpdate: object) => void;
  currentOrder: BoostOrderDetails;
}

const RankList = (props: Props): JSX.Element => {
  const { rank, isStartRank, updateOrder, currentOrder } = props;

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
    itemIndex => {
      if (currentOrder.collectionName === 'Division Boost') {
        if (!isStartRank) {
          if (currentOrder.startRank !== null) {
            return itemIndex < currentOrder.startRank + 1;
          }
        } else if (currentOrder.desiredRank !== null) {
          return itemIndex > currentOrder.desiredRank - 1;
        } else {
          return false;
        }
      }

      return false;
    },
    [currentOrder.startRank, currentOrder.collectionName, currentOrder.desiredRank, isStartRank]
  );

  const list = useMemo(() => {
    return ranks.map((rankList, index) => (
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
              className={`${styles.button} ${disabled && styles.disabled} ${selected &&
                styles.selected}`}
              onClick={(): void => handleClick(rankItem)}
              style={{ backgroundColor: rankItem.color, borderColor: rankItem.accent }}
            />
          );
        })}
      </div>
    ));
  }, [handleClick, validate, rank]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>{list}</div>
      <div className={styles.label}>Ranks</div>
    </div>
  );
};

export default RankList;
