import Link from "next/link";
import React from "react";
import Filter from "../Shared/Filter";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const propTypes = {
  setStage: PropTypes.func.isRequired,
  currentStage: PropTypes.number.isRequired
};

const filters = ["Details", "Add-Ons", "checkout"];

const TopNavigator = props => {
  const { currentStage, setStage } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link href="/">
        <div className={classes.logo}>LoL Hero</div>
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

const useStyles = createUseStyles(theme => ({
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
}));

TopNavigator.propTypes = propTypes;

export default TopNavigator;
