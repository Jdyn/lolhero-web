import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Banner from "./Banner";
import ranks from "../../lib/ranks";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const BoostDisplay = props => {
  const { classes, updateOrder, currentOrder } = props;

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
            <div className={classes.wrapper}>
              <Banner
                isStartingRank
                rank={
                  currentOrder.start_rank
                    ? ranksObject[currentOrder.start_rank]
                    : {}
                }
                currentOrder={currentOrder}
                updateOrder={updateOrder}
              />
            </div>
            <Banner
              rank={
                currentOrder.desired_rank
                  ? ranksObject[currentOrder.desired_rank]
                  : {}
              }
              updateOrder={updateOrder}
              currentOrder={currentOrder}
            />
          </>
        );
      default:
        return <div>Oh</div>;
    }
  };

  return <div className={classes.root}>{renderContent(1)}</div>;
};

const styles = {
  root: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    paddingBottom: "110px",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexGrow: 1,
    // top: -6,
    "@media (min-width: 640px)": {
      flexDirection: "row",
      alignItems: "normal"
    }
  },
  wrapper: {
    display: "flex",
    width: "100%",
    zIndex: 10,
    justifyContent: "center",
    borderRadius: "0 0 12px 12px",
    boxShadow: "0px 0px 15px rgb(0,0,0,.4)",
    "@media (min-width: 640px)": {
      boxShadow: "none",
      width: "auto"
    }
  }
};

BoostDisplay.propTypes = propTypes;

export default withStyles(styles)(BoostDisplay);
