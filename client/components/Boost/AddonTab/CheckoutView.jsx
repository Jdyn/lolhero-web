import React, { useMemo } from "react";
import ranks from "../../../lib/ranks";
import addons from "../../../lib/addonContent";
import content from "../../../lib/boostContent";
import PropTypes from "prop-types";
import { formatLP } from "../../../util/Helpers";
import { createUseStyles } from "react-jss";

const propTypes = {
  currentOrder: PropTypes.object.isRequired
};

const CheckoutView = props => {
  const { currentOrder, submitOrderRequest } = props;
  const classes = useStyes();

  const ranksObject = useMemo(() =>
    [].concat.apply([], [...ranks]).reduce((obj, item) => ((obj[item.rank] = item), obj), {})
  );

  const currentCollection = useMemo(
    () =>
      content[currentOrder.boost_type || "solo"].items.filter(
        item => item.id === currentOrder.collection_id
      )[0],
    [currentOrder.boost_type, currentOrder.collection_id]
  );

  const formatTitle = () => {
    const { boost_type, start_rank, desired_rank, lp, desired_amount } = currentOrder;

    const startRank = ranksObject[start_rank] || { title: "TBD" };
    const desiredRank = ranksObject[desired_rank] || { title: "TBD" };

    switch (currentCollection.name) {
      case "Division Boost":
        return `${boost_type.toUpperCase()} | ${currentCollection.name} - From ${
          startRank.title
        } (${formatLP(lp)} LP) to ${desiredRank.title}`;
      default:
        return `${boost_type.toUpperCase()} | ${desired_amount} ${currentCollection.name} - ${
          startRank.title
        }`;
    }
  };

  return (
    <>
      <div className={classes.wrapper}>
        <h3>Order Summary</h3>
        <h2>{formatTitle()}</h2>
        <h3>Details</h3>

        {currentCollection.name === "Division Boost" && (
          <span>
            LP: <b>{formatLP(currentOrder.lp)}</b>
          </span>
        )}

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
        <h3>Add-Ons</h3>
        {addons.addons.extras.map((extra, index) => (
          <span key={index}>
            {extra.title}: <b>{currentOrder[extra.type] ? "Yes" : "No"}</b>
          </span>
        ))}
      </div>
      {/* {submitOrderRequest.errored && <span>{submitOrderRequest.error}</span>} */}
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
      fontSize: 16,
      margin: 0,
      marginBottom: "15px"
    },
    "& h3": {
      margin: "15px 0",
      fontSize: 20,
      marginBottom: "15px",
      color: theme.white
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
