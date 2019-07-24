import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Link from "next/link";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Header = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Link href="/">
        <div className={classes.logo}>LoL Hero</div>
      </Link>
    </div>
  );
};

const styles = theme => ({
  root: {
    display: "flex",
    position: "relative",
    backgroundColor: theme.tertiary,
    width: "100%",
    height: "79px", 
    borderBottom: `3px solid #999`,
    top: 0,
    left: 0,
    zIndex: 5
  },
  logo: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 45px",
    minHeight: "76px",
    cursor: "pointer",
    transitionDuration: ".15s",
    borderBottom: "3px solid #999",
    color: theme.white,
    bottom: -3,
    fontSize: 30,
    "&:hover": {
      borderColor: `${theme.accent} !important`,
      color: `${theme.accent} !important`
    }
  }
});

Header.propTypes = propTypes;

export default withStyles(styles)(Header);
