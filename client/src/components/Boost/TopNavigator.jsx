import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import theme from "../../lib/theme";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const TopNavigator = props => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <div>top</div>
    </div>
  );
};

const styles = theme => ({
  container: {
    position: "fixed",
    display: "flex",
    minHeight: "76px",
    width: "100%",
    top: 0,
    zIndex: 10,
    backgroundColor: theme.tertiary,
    borderBottom: `2px solid ${theme.quartinary}`
  }
});

TopNavigator.propTypes = propTypes;

export default withStyles(styles)(TopNavigator);
