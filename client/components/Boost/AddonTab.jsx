import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import addons from "../../lib/addonContent";
import Toggle from "../Shared/Toggle";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const AddonTab = props => {
  const { classes, currentStage, setOrder, currentOrder } = props;

  const updateOrder = newUpdate => {
    if (typeof newUpdate === "object") {
      switch (newUpdate.type) {
        case "server":
          if (currentOrder.server !== newUpdate.server) {
            console.log("true");
            setOrder(prev => ({ ...prev, server: newUpdate.server }));
          }
          return;
        case "queue":
          if (currentOrder.queue !== newUpdate.queue) {
            setOrder(prev => ({ ...prev, queue: newUpdate.queue }));
          }
          return;
        case "lp":
          if (currentOrder.lp !== newUpdate.lp) {
            setOrder(prev => ({ ...prev, lp: newUpdate.lp }));
          }
          return;
      }
    }
  };

  console.log(currentOrder);

  const views = {
    0: (
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <h1>Details</h1>
        </div>
        <div className={classes.wrapper}>
          <h2>Servers</h2>
          {addons.details.servers.map((server, index) => {
            return (
              <Toggle
                key={index}
                onClick={() => updateOrder(server)}
                isSelected={currentOrder.server === server.server}
              >
                {server.title}
              </Toggle>
            );
          })}
        </div>

        <div className={classes.wrapper}>
          <h2>Queue Type</h2>
          {addons.details.queues.map((queue, index) => {
            return (
              <Toggle
                key={index}
                onClick={() => updateOrder(queue)}
                isSelected={currentOrder.queue === queue.queue}
              >
                {queue.title}
              </Toggle>
            );
          })}
        </div>
        <div className={classes.wrapper}>
          <h2>What is your current LP?</h2>
          <div className={classes.lp}>
            {addons.details.lp.map((lp, index) => {
              return (
                <Toggle
                  key={index}
                  onClick={() => updateOrder(lp)}
                  width="85px"
                  height="95px"
                  margin="10px 5px"
                  isSelected={currentOrder.lp === lp.lp}
                >
                  {lp.title}
                </Toggle>
              );
            })}
          </div>
        </div>
      </div>
    ),
    1: <div>add ons</div>,
    2: <div>set up</div>,
    3: <div>review</div>
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
    color: theme.grey,
    "& h1": {
      fontSize: 20,
      margin: 0
    },
    "& h2": {
      fontSize: 18,
      margin: "0px 0 25px 0"
    }
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.tertiary,
    borderRadius: 12,
    padding: "25px",
    boxShadow: "0 0 15px 0 rgba(0,0,0,.2)",
    margin: "10px 10px 15px 10px"
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
