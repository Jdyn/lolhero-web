import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Banner from "./Banner";
import ranks from "../../lib/ranks";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const RankSelect = props => {
  const { classes, setOrder, order } = props;

  console.log(order)

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
              rank={ranksObject[order.starting_rank]}
              // setOrder={setOrder}
            />
            <Banner
              rank={ranksObject[order.desired_rank]}
              // setOrder={setOrder}
            />
          </>
        );
      default:
        return <div>Oh</div>;
    }
  };

  return (
    <div className={classes.root}>
      {renderContent(1)}
    </div>
  );
};

const styles = {
  root: {
    display: "flex",
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexGrow: 1,
  }
};

RankSelect.propTypes = propTypes;

export default withStyles(styles)(RankSelect);
