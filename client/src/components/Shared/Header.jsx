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

const styles = theme => ({
  root: {
    position: "relative",
    backgroundColor: theme.secondary,
    width: "100%",
    height: "75px",
    top: 0,
    left: 0,
    zIndex: 5
  }
});

Header.propTypes = propTypes;

export default withStyles(styles)(Header);
