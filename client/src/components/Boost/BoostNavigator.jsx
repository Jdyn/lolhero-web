import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Filter from "../Shared/Filter";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const filters = [
  {
    name: "Duo Boost"
  },
  {
    name: "Solo Boost"
  }
];

const products = [
  {
    name: "Division Boost",
    description: "Guarantee the rank you want without thinking twice."
  },
  {
    name: "Net Wins Boost"
  },
  {
    name: "Placements"
  }
];

const BoostNavigator = props => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <Filter extended filters={filters} />
      <div className={classes.wrapper}>
        {products.map((item, index) => (
          <div>{item.name}</div>
        ))}
      </div>
    </div>
  );
};

const styles = theme => ({
  container: {
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    height: "calc(100% - 166px)",
    width: "435px",
    left: 0,
    // borderRadius: 16,
    // backgroundColor: theme.tertiary,
    boxShadow: "5px 0 6px 0 rgb(0,0,0,.12)"
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "300px"
  }
});

BoostNavigator.propTypes = propTypes;

export default withStyles(styles)(BoostNavigator);
