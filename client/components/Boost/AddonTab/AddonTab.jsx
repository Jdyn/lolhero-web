import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import DetailsView from "./DetailsView";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const AddonTab = props => {
  const { classes, currentStage, updateOrder, currentOrder } = props;

  const views = {
    0: (
      <div className={classes.container}>
        <DetailsView currentOrder={currentOrder} updateOrder={updateOrder} />
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
