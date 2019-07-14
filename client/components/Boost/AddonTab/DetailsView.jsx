import React from "react";
import addons from "../../../lib/addonContent";
import Toggle from "../../Shared/Toggle";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const DetailsView = props => {
  const { classes, currentOrder, updateOrder } = props;

  return (
    <>
      <div className={classes.wrapper}>
        <h2>Servers</h2>
        <p>
          What server are you on? We currently support the following servers.
        </p>
        {addons.details.servers.map((server, index) => {
          return (
            <Toggle
              key={index}
              onClick={() => updateOrder({ server: server.server })}
              isSelected={currentOrder.server === server.server}
            >
              {server.title}
            </Toggle>
          );
        })}
      </div>

      <div className={classes.wrapper}>
        <h2>Queues</h2>
        <p>
          What queue type do you want to play on? We currently support the
          following queues.
        </p>
        {addons.details.queues.map((queue, index) => {
          return (
            <Toggle
              key={index}
              onClick={() => updateOrder({ queue: queue.queue })}
              isSelected={currentOrder.queue === queue.queue}
            >
              {queue.title}
            </Toggle>
          );
        })}
      </div>
      {currentOrder.collection_id === 1 || currentOrder.collection_id === 5 ? (
          <div className={classes.wrapper}>
            <h2>League Points</h2>
            <p>
              How much LP do you have? We adjust the price based on the amount.
            </p>
            <div className={classes.lp}>
              {addons.details.lp.map((lp, index) => {
                return (
                  <Toggle
                    key={index}
                    onClick={() => updateOrder({ lp: lp.lp })}
                    width="85px"
                    margin="5px 5px"
                    isSelected={currentOrder.lp === lp.lp}
                  >
                    {lp.title}
                  </Toggle>
                );
              })}
            </div>
          </div>
        ) : <div></div>}
    </>
  );
};

const styles = theme => ({
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
      marginBottom: "10px"
    }
  },
  lp: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  }
});

DetailsView.propTypes = propTypes;

export default withStyles(styles)(DetailsView);
