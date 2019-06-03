import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Header = props => {
  const { classes } = props;

  return <div className={classes.root} />;
};

const styles = {
  root: {
    position: "absolute",
    width: "100%",
    height: "75px",
    top: 0,
    left: 0,
    zIndex: 5
  }
};

Header.propTypes = propTypes;

export default withStyles(styles)(Header);
