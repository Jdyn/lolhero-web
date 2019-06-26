import React, { useState, useEffect } from "react";
import BoostTab from "./BoostTab";
import AddonTab from "./AddonTab";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import TopNavigator from "./TopNavigator";
import BoostDisplay from "./BoostDisplay";
import BottomNavigator from "./BottomNavigator";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Boost = props => {
  const { classes, fetchBoosts, boosts } = props;

  const [currentStage, setStage] = useState(0);
  const [currentOrder, setOrder] = useState({
    lp: null,
    type: null,
    queue: null,
    server: null,
    start_rank: null,
    desired_rank: null,
    collection_id: 1
  });

  return (
    <div className={classes.root}>
      <TopNavigator currentStage={currentStage} setStage={setStage} />
      <div className={classes.container}>
        <BoostTab setOrder={setOrder} />
        <BoostDisplay order={currentOrder} />
        <AddonTab currentStage={currentStage} />
      </div>
      <BottomNavigator currentStage={currentStage} setStage={setStage} />
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

Boost.propTypes = propTypes;

export default withStyles(styles)(Boost);
