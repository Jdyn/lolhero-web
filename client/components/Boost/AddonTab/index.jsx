import React, { useState, useEffect } from "react";
import Filter from "../../Shared/Filter";
import dropin from "braintree-web-drop-in";
import PropTypes from "prop-types";
import AddonView from "./AddonView";
import BoostView from "./BoostView";
import ReviewView from "./ReviewView";
import DetailsView from "./DetailsView";
import dropinOptions from "../../../lib/dropinOptions";
import { createUseStyles } from "react-jss";

const propTypes = {
  updateOrder: PropTypes.func.isRequired,
  currentStage: PropTypes.number.isRequired,
  currentOrder: PropTypes.object.isRequired
};

const filters = ["boost", "add ons", "details", "review"];

const AddonTab = props => {
  const {
    currentStage,
    updateOrder,
    currentOrder,
    submitOrderRequest,
    session,
    handleAuth,
    setBraintreeInstance,
    boost,
    setStage
  } = props;

  const classes = useStyles();

  useEffect(() => {
    dropin
      .create(dropinOptions)
      .then(instance => {
        setBraintreeInstance(instance);
      })
      .catch(error => {});
  }, []);

  const views = {
    0: <BoostView currentOrder={currentOrder} updateOrder={updateOrder} />,
    1: <AddonView currentOrder={currentOrder} updateOrder={updateOrder} />,
    2: <DetailsView handleAuth={handleAuth} session={session} />,
    3: <ReviewView currentOrder={currentOrder} submitOrderRequest={submitOrderRequest} />
  };

  return (
    <div className={classes.root}>
      {/* <div className={classes.container}>
        <Filter
          extended
          filters={filters}
          untargetableIndices={boost.paymentMethodIsSelected ? [] : [3]}
          selectedIndex={currentStage}
          onClick={index => setStage(index)}
        />
      </div> */}

      {Object.keys(views).map((view, index) => {
        return (
          <div
            key={index}
            className={classes.content}
            style={{ display: currentStage === parseInt(view) ? "flex" : "none" }}
          >
            {views[index]}
          </div>
        );
      })}
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    width: "100%",
    minHeight: "350px",
    display: "flex !important",
    position: "relative",
    boxShadow: "0px 0px 15px 0px rgba(0, 0, 0, 0.4)",
    borderRadius: 16,
    zIndex: 15,
    flexDirection: "column",
    backgroundColor: theme.primary,
    color: theme.white,
    "@media (min-width: 1025px)": {
      width: "400px",
      height: "100%",
      boxShadow: "-5px 0px 15px 0px rgba(0, 0, 0, 0.2)"
    }
  },
  container: {
    display: "inherit",
    "@media (min-width: 1025px)": {
      display: "none"
    }
  },
  content: {
    flexDirection: "column",
    overflowY: "scroll",
    margin: "10px 0px 10px 10px",
    paddingRight: "10px"
  }
}));

AddonTab.propTypes = propTypes;

export default AddonTab;
