import React, { useMemo } from "react";
import ranks from "../../../lib/ranks";
import flatten from "../../../util/Flatten";
import PropTypes from "prop-types";
import BannerRankItem from "./BannerRankItem";
import { createUseStyles } from "react-jss";

const propTypes = {
  rank: PropTypes.object,
  isStartRank: PropTypes.bool,
  updateOrder: PropTypes.func.isRequired,
  currentOrder: PropTypes.object.isRequired
};

const BannerRankList = props => {
  const { rank, isStartRank, currentOrder, updateOrder } = props;
  
  const classes = useStyles();

  const flatRanks = useMemo(() => flatten([...ranks]));

  const validateDisabled = itemIndex => {
    if (currentOrder.collection_id === 1 || currentOrder.collection_id === 5) {
      if (!isStartRank) {
        if (currentOrder.start_rank !== null) {
          return itemIndex < currentOrder.start_rank + 1;
        } else {
          return false;
        }
      } else {
        if (currentOrder.desired_rank !== null) {
          return itemIndex > currentOrder.desired_rank - 1;
        } else {
          return false;
        }
      }
    }
  };

  return (
    <div className={classes.container}>
      {flatRanks.map((rankItem, index) => (
        <BannerRankItem
          key={index}
          rank={rankItem}
          isSelected={rank.rank === rankItem.rank}
          isStartRank={isStartRank}
          isDisabled={validateDisabled(rankItem.rank)}
          updateOrder={updateOrder}
        />
      ))}
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "170px",
    height: "75px"
  }
});

BannerRankList.propTypes = propTypes;

export default BannerRankList;
