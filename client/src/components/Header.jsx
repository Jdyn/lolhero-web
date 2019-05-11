import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Header = props => {
  const { classes } = props;

  return <div>header</div>;
};

const styles = {};

Header.propTypes = propTypes;

export default withStyles(styles)(Header);
