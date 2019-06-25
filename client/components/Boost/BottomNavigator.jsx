import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const BottomNavigator = props => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <button className={classes.navigate} onClick={() => {}}>next</button>
    </div>
  );
};

const styles = theme => ({
  container: {
    position: "fixed",
    display: "flex",
    justifyContent: "flex-end",
    gridArea: "botNav",
    minHeight: "90px",
    width: "100%",
    bottom: 0,
    backgroundColor: theme.tertiary,
    zIndex: 10,
  },
  navigate: {
    outline: "none",
    border: "none",
    width: "375px",
    cursor: "pointer",
    color: theme.white,
    textTransform: "uppercase",
    letterSpacing: .8,
    fontWeight: 700,
    fontSize: 20,
    backgroundColor: theme.accent
  }
});

BottomNavigator.propTypes = propTypes;

export default withStyles(styles)(BottomNavigator);
