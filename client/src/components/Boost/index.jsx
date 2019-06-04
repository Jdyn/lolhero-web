import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import TopNavigator from "./TopNavigator";
import BottomNavigator from "./BottomNavigator";
import BoostNavigator from "./BoostNavigator";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const CustomBoost = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <TopNavigator />
      <BoostNavigator />
      <BottomNavigator />
    </div>
  );
};

const styles = theme => ({
  root: {
    position: "absolute",
    padding: "76px 0 90px 0",
    height: "100%",
    minHeight: "100vh",
    overflow: "hidden",
    width: "100%",
    backgroundColor: theme.primary,
    "": {}
  }
});

CustomBoost.propTypes = propTypes;

export default withStyles(styles)(CustomBoost);
