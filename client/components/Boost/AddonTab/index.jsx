import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AddonView from "./AddonView";
import DetailsView from "./DetailsView";
import CheckoutView from "./CheckoutView";
import { createUseStyles } from "react-jss";
import NewView from "./NewView";
// import useDimensions from "../../../util/useDimensions";
import Filter from "../../Shared/Filter";
import dropin from "braintree-web-drop-in";

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
    submitOrder,
    session,
    handleAuth,
    setBraintreeInstance,
    boost,
    setStage
  } = props;

  const classes = useStyles();
  const [form, setForm] = useState({});

  useEffect(() => {
    dropin
      .create({
        authorization: "sandbox_7brmzhhx_cfcsbff65qmxzrgf",
        container: "#dropin-container",
        paypal: {
          flow: "vault",
          buttonStyle: {
            color: "blue",
            shape: "rect",
            size: "responsive"
          }
        },
        venmo: {
          allowNewBrowserTab: false
        }
      })
      .then(instance => {
        setBraintreeInstance(instance);
      })
      .catch(error => {});
  }, []);

  const views = {
    0: <DetailsView currentOrder={currentOrder} updateOrder={updateOrder} />,
    1: <AddonView currentOrder={currentOrder} updateOrder={updateOrder} />,
    2: <NewView handleAuth={handleAuth} session={session} setForm={setForm} form={form} />,
    3: <CheckoutView currentOrder={currentOrder} submitOrderRequest={submitOrderRequest} />
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Filter
          extended
          filters={filters}
          untargetableIndices={boost.paymentMethodIsSelected ? [] : [3]}
          selectedIndex={currentStage}
          onClick={index => setStage(index)}
        />
      </div>

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
    display: "flex",
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
