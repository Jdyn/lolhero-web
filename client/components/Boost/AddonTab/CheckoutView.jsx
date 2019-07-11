import React, { useMemo } from "react";
import PropTypes from "prop-types";
import content from "../../../lib/boostContent";
import { createUseStyles } from "react-jss";
import { formatLP } from "../../../util/Helpers";
import addons from "../../../lib/addonContent";

const propTypes = {
  currentOrder: PropTypes.object.isRequired
};

const CheckoutView = props => {
  const { currentOrder } = props;
  const classes = useStyes();

  const currentCollection = useMemo(
    () =>
      content[currentOrder.boost_type || "solo"].items.filter(
        item => item.id === currentOrder.collection_id
      )[0],
    [currentOrder.boost_type, currentOrder.collection_id]
  );

  return (
    <>
      <div className={classes.wrapper}>
        <h2>Order Summary</h2>
        <h2>Details</h2>
        <span>
          LP: <b>{formatLP(currentOrder.lp)}</b>
        </span>
        <span>
          Type: <b>{currentOrder.boost_type}</b>
        </span>
        <span>
          Server: <b>{currentOrder.server}</b>
        </span>
        <span>
          Boost: <b>{currentCollection.name}</b>
        </span>
        <span>
          Queue:
          <b>
            {" " +
              currentOrder.queue.charAt(0).toUpperCase() +
              currentOrder.queue.slice(1) +
              " " +
              "Queue"}
          </b>
        </span>
      </div>

      <div className={classes.wrapper}>
        <h2>Add-Ons</h2>
        {addons.addons.extras.map((extra, index) => (
          <span key={index}>
            {extra.title}: <b>{currentOrder[extra.type] ? "Yes" : "No"}</b>
          </span>
        ))}
      </div>
    </>
  );
};

const useStyes = createUseStyles(theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.tertiary,
    borderRadius: 12,
    padding: "25px",
    boxShadow: "0 0 15px 0 rgba(0,0,0,.2)",
    margin: "10px 10px 20px 10px",
    "& p": {
      color: theme.grey,
      margin: 0,
      fontSize: 16,
      marginBottom: "15px"
    },
    "& h2": {
      fontSize: 20,
      margin: 0,
      marginBottom: "15px"
    },
    "& h3": {
      margin: 0,
      marginBottom: "15px"
    },
    "& span": {
      display: "flex",
      flexDirection: "row",
      marginBottom: "5px",
      fontSize: 16,
      color: theme.white,
      "& b": {
        display: "flex",
        flexGrow: 1,
        justifyContent: "flex-end",
        color: theme.grey
      }
    }
  }
}));

CheckoutView.propTypes = propTypes;

export default CheckoutView;
