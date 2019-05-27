import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Header = props => {
  const { classes } = props;

  return <div className={classes.root}>header</div>;
};

const styles = {
  root: {
    position: "relative",
    width: "100%",
    height: "75px",
    boxShadow: "0px 3px 10px rgb(0,0,0,.25)",
    top: 0,
    left: 0,
    zIndex: 5
  }
};

Header.propTypes = propTypes;

export default withStyles(styles)(Header);
