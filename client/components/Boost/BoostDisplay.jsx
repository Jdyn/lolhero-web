import React, { useMemo } from "react";
import ranks from "../../lib/ranks";
import Banner from "./Banner";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const propTypes = {
  updateOrder: PropTypes.func.isRequired,
  currentOrder: PropTypes.object.isRequired
};

const BoostDisplay = props => {
  const { updateOrder, currentOrder } = props;

  const classes = useStyles();

  const ranksObject = useMemo(() =>
    [].concat
      .apply([], [...ranks])
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
                type="picker"
                isStartRank
                rank={currentOrder.start_rank ? ranksObject[currentOrder.start_rank] : {}}
                currentOrder={currentOrder}
                updateOrder={updateOrder}
              />
            </div>
            <Banner
              type="picker"
              rank={
                currentOrder.desired_rank ? ranksObject[currentOrder.desired_rank] : {}
              }
              updateOrder={updateOrder}
              currentOrder={currentOrder}
            />
          </>
        );
      default:
        return (
          <>
            <div className={classes.wrapper}>
              <Banner
                type="picker"
                isStartRank
                rank={currentOrder.start_rank ? ranksObject[currentOrder.start_rank] : {}}
                currentOrder={currentOrder}
                updateOrder={updateOrder}
              />
            </div>
            <Banner
              type="slider"
              rank={currentOrder.start_rank ? ranksObject[currentOrder.start_rank] : {}}
              updateOrder={updateOrder}
              currentOrder={currentOrder}
            />
          </>
        );
    }
  };

  return <div className={classes.root}>{renderContent(currentOrder.collection_id)}</div>;
};

const useStyles = createUseStyles({
  root: {
    top: -10,
    display: "flex",
    position: "relative",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexGrow: 1,
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
});

BoostDisplay.propTypes = propTypes;

export default BoostDisplay;
