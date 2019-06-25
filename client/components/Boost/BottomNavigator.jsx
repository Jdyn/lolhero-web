import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const BottomNavigator = props => {
  const { classes, setTopFilter, currentTopFilter } = props;

  return (
    <div className={classes.container}>
      <button onClick={() => setTopFilter(currentTopFilter + 1)} />
    </div>
  );
};

const styles = theme => ({
  container: {
    position: "fixed",
    display: "flex",
    gridArea: "botNav",
    minHeight: "90px",
    width: "100%",
    bottom: 0,
    backgroundColor: theme.tertiary,
    zIndex: 10,
    borderTop: `2px solid ${theme.quartinary}`
  }
});

BottomNavigator.propTypes = propTypes;

export default withStyles(styles)(BottomNavigator);
