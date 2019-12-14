import React, { useMemo } from 'react';
import ranks from '../../../lib/ranks';
import { flatten } from '../../../util/helpers';
import PropTypes from 'prop-types';
import BannerRankItem from './BannerRankItem';
import { createUseStyles } from 'react-jss';

const propTypes = {
  rank: PropTypes.object,
  isStartRank: PropTypes.bool,
  updateOrder: PropTypes.func,
  currentOrder: PropTypes.object
};

const BannerRankList = props => {
  const { rank, isStartRank, currentOrder, updateOrder } = props;

  const classes = useStyles();

  const flatRanks = useMemo(() => flatten([...ranks]));

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
          {rankList.map((rankItem, rankIndex) => (
            <BannerRankItem
              rank={rankItem}
              key={index + rankIndex}
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
    // width: "100%",
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  rankWrapper: {
    display: 'flex'
  }
});

BannerRankList.propTypes = propTypes;

export default BannerRankList;
