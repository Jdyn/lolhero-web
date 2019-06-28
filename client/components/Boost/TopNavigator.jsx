import Link from "next/link";
import React from "react";
import Filter from "../Shared/Filter";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const filters = ["Details", "Add-Ons", "set-up", "review", "payment"];

const TopNavigator = props => {
  const { classes, currentStage, setStage } = props;

  return (
    <div className={classes.root}>
      <Link href="/">
        <div className={classes.logo}>
          <h1>LoL Hero</h1>
        </div>
      </Link>
      <div className={classes.container}>
        <Filter
          extended
          filters={filters}
          selectedIndex={currentStage}
          onClick={index => setStage(index)}
        />
      </div>
    </div>
  );
};

const styles = theme => ({
  root: {
    top: 0,
    width: "100%",
    zIndex: 20,
    display: "flex",
    position: "fixed",
    justifyContent: "center",
    borderBottom: `3px solid #999`,
    backgroundColor: theme.tertiary,
    "@media (min-width: 640px)": {
      justifyContent: "flex-start"
    }
  },
  container: {
    display: "none",
    position: "relative",
    flexGrow: 1,
    bottom: -1,
    "@media (min-width: 1025px)": {
      display: "flex"
    }
  },
  logo: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: "200px",
    minHeight: "76px",
    cursor: "pointer",
    transitionDuration: ".15s",
    borderBottom: "3px solid #999",
    bottom: -3,
    "&:hover": {
      borderColor: `${theme.accent} !important`,
      color: `${theme.accent} !important`
    },
    "& h1": {
      margin: 0,
      color: theme.white
    }
  }
});

TopNavigator.propTypes = propTypes;

export default withStyles(styles, { link: true })(TopNavigator);
