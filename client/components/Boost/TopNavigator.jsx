import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Link from "next/link";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const TopNavigator = props => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <Link href="/">
        <div className={classes.logo}>
          <h1>LoL Hero</h1>
        </div>
      </Link>
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
  },
  logo: {
    display: "flex",
    // flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    width: "180px",
    minHeight: "76px",
    cursor: "pointer",
    "& h1": {
      margin: 0,
      color: theme.white
    }
  }
});

TopNavigator.propTypes = propTypes;

export default withStyles(styles)(TopNavigator);
