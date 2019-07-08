import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import DetailsView from "./DetailsView";
import AddonView from "./AddonView";
import Api from "../../../services/api";
import CheckoutView from "./CheckoutView";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const AddonTab = props => {
  const { classes, currentStage, updateOrder, currentOrder, boost } = props;

  const submit = () => {
    let order = { ...boost.order };

    if (order.details.collection_id == 1 || order.details.collection_id == 5) {
      delete order.details.desired_amount;
    } else {
      delete order.details.desired_rank;
    }

    console.log(order.details);

    Api.post("/checkout", order)
      .then(response => {
        if (response.ok) {
          Stripe("pk_test_zuPSlPf5Ewb5WW6o6bbc5Fs8")
            .redirectToCheckout({
              sessionId: response.result.session.id
            })
            .then(result => {
              console.log(result);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const views = {
    0: (
      <div className={classes.container}>
        <DetailsView currentOrder={currentOrder} updateOrder={updateOrder} />
      </div>
    ),
    1: (
      <div className={classes.container}>
        <AddonView currentOrder={currentOrder} updateOrder={updateOrder} />
      </div>
    ),
    2: (
      <div className={classes.container}>
        <div>set up</div>
      </div>
    ),
    3: (
      <div className={classes.container}>
        <CheckoutView currentOrder={currentOrder} />
      </div>
    )
  };

  return <div className={classes.root}>{views[currentStage]}</div>;
};

const styles = theme => ({
  root: {
    position: "relative",
    display: "flex",
    borderRadius: 16,
    padding: "10px",
    flexDirection: "column",
    height: "100%",
    width: "400px",
    right: 0,
    overflow: "auto",
    backgroundColor: theme.primary,
    boxShadow: "-5px 0px 15px 0px rgba(0, 0, 0, 0.2)"
  },
  container: {
    height: "100%",
    overflowY: "auto",
    color: theme.white
  },
  lp: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  }
});

AddonTab.propTypes = propTypes;

export default withStyles(styles)(AddonTab);
