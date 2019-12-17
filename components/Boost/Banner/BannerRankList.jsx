import React from 'react';
import ranks from '../../../lib/ranks';
import BannerRankItem from './BannerRankItem';
import { createUseStyles } from 'react-jss';

const BannerRankList = props => {
  const { rank, isStartRank, currentOrder, updateOrder } = props;

  const classes = useStyles();

  const validateDisabled = itemIndex => {
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
  };

  return (
    <div className={classes.container}>
      {ranks.map((rankList, index) => (
        <div key={index} className={classes.rankWrapper}>
          {rankList.map(rankItem => (
            <BannerRankItem
              rank={rankItem}
              key={rankItem.rank}
              isSelected={rank.rank === rankItem.rank}
              isStartRank={isStartRank}
              isDisabled={validateDisabled(rankItem.rank)}
              updateOrder={updateOrder}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  rankWrapper: {
    display: 'flex'
  }
});

export default BannerRankList;
