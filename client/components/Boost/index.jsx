import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import TopNavigator from "./TopNavigator";
import BottomNavigator from "./BottomNavigator";
import BoostList from "./BoostList";
import AddonNavigator from "./AddonNavigator";
import RankSelect from "./RankSelect";
import Filter from "../Shared/Filter";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const CustomBoost = props => {
  const { classes, fetchBoosts, boosts } = props;

  const [currentOrder, setOrder] = useState({
    collection_id: 1,
    starting_rank: 12,
    desired_rank: 13
  });

  return (
    <div className={classes.root}>
      <TopNavigator />
      <div className={classes.container}>
        <BoostList />
        <RankSelect order={currentOrder} />
        <AddonNavigator />
      </div>
      <BottomNavigator />
    </div>
  );
};

const styles = theme => ({
  root: {
    position: "absolute",
    padding: "76px 0 90px 0",
    height: "100%",
    minHeight: "100vh",
    overflow: "hidden",
    width: "100%",
    overflowY: "auto",
    backgroundColor: theme.primary
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    "@media (min-width: 1025px)": {
      flexDirection: "row"
    }
  }
});

CustomBoost.propTypes = propTypes;

export default withStyles(styles)(CustomBoost);
