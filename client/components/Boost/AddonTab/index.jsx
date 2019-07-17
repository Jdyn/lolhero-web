import React from "react";
import PropTypes from "prop-types";
import AddonView from "./AddonView";
import DetailsView from "./DetailsView";
import CheckoutView from "./CheckoutView";
import { createUseStyles } from "react-jss";

const propTypes = {
  updateOrder: PropTypes.func.isRequired,
  currentStage: PropTypes.number.isRequired,
  currentOrder: PropTypes.object.isRequired
};

const AddonTab = props => {
  const { currentStage, updateOrder, currentOrder, submitOrderRequest } = props;

  const classes = useStyles();

  const views = {
    0: <DetailsView currentOrder={currentOrder} updateOrder={updateOrder} />,
    1: <AddonView currentOrder={currentOrder} updateOrder={updateOrder} />,
    2: (
      <CheckoutView currentOrder={currentOrder} submitOrderRequest={submitOrderRequest} />
    )
  };

  return (
    <div className={classes.root}>
      <div className={classes.singleDisplay}>
        <div className={classes.container}>{views[currentStage]}</div>
      </div>
      <div className={classes.fullDisplay}>
        {Object.keys(views).map((view, index) => (
          <div key={index} className={classes.container}>
            {views[view]}
          </div>
        ))}
      </div>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    width: "100%",
    minHeight: "350px",
    display: "flex",
    position: "relative",
    boxShadow: "-5px 0px 15px 0px rgba(0, 0, 0, 0.2)",
    borderRadius: 16,
    zIndex: 15,
    flexDirection: "column",
    backgroundColor: theme.primary,
    "@media (min-width: 1025px)": {
      width: "400px",
      height: "100%"
    }
  },
  container: {
    height: "100%",
    overflowY: "auto",
    color: theme.white
  },
  singleDisplay: {
    display: "none",
    overflowY: "auto",
    margin: "10px",
    "@media (min-width: 1025px)": {
      display: "inline-block"
    }
  },
  fullDisplay: {
    display: "inline-block",
    "@media (min-width: 1025px)": {
      display: "none"
    }
  }
}));

AddonTab.propTypes = propTypes;

export default AddonTab;
