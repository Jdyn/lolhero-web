import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Banner from "./Banner";
import ranks from "../../lib/ranks";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const RankSelect = props => {
  const { classes, setOrder, currentOrder } = props;

  const [ranksObject] = useState(
    [].concat
      .apply([], ranks)
      .reduce((obj, item) => ((obj[item.rank] = item), obj), {})
  );

  const renderContent = collectionId => {
    switch (collectionId) {
      case 1:
      case 5:
        return (
          <>
            <Banner
              isStartingRank
              rank={ranksObject[currentOrder.starting_rank]}
              setOrder={setOrder}
            />
            <Banner
              rank={ranksObject[currentOrder.desired_rank]}
              setOrder={setOrder}
            />
          </>
        );
      default:
        return <div>Oh</div>;
    }
  };

  return (
    <div className={classes.container}>
      {renderContent(currentOrder.collection_id)}

      {/* <div>
        {ranks.map((rankList, tierIndex) =>
          rankList.map((listItem, itemIndex) => (
            <button
              key={listItem.title}
              className={classes.button}
              style={{ backgroundColor: ranks[tierIndex][itemIndex].color }}
              onClick={() => handleClick(tierIndex, itemIndex, false)}
            >
              {listItem.title}
            </button>
          ))
        )}
      </div> */}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gridArea: "ranks",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexGrow: 1
  }
};

RankSelect.propTypes = propTypes;

export default withStyles(styles)(RankSelect);
