import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Link from "next/link";
import Filter from "../Shared/Filter";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const filters = [
  {
    name: "Details"
  },
  {
    name: "Add-ons"
  },
  {
    name: "Payment"
  }
];

const TopNavigator = props => {
  const { classes, setFilter, currentFilter } = props;

  const handleFilterClick = index => {
    setFilter(index);
    console.log(index)
  };

  return (
    <div className={classes.container}>
      <Link href="/">
        <div className={classes.logo}>
          <h1>LoL Hero</h1>
        </div>
      </Link>
      <div style={{ width: "5%" }} />
      <Filter
        extended
        filters={filters}
        onClick={index => handleFilterClick(index)}
        currentIndex={currentFilter}
      />
      <div style={{ width: "15%" }} />
    </div>
  );
};

const styles = theme => ({
  container: {
    position: "fixed",
    display: "flex",
    gridArea: "topNav",
    minHeight: "76px",
    width: "100%",
    top: 0,
    zIndex: 10,
    backgroundColor: theme.tertiary,
    borderBottom: `2px solid ${theme.quartinary}`
  },
  filterWrapper: {
    display: "flex",
    position: "relaitve",
    flexDirection: "row",
    flexGrow: 1
  },
  logo: {
    display: "flex",
    position: "relative",
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "200px",
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
