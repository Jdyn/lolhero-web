import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import TopNavigator from "./TopNavigator";
import BottomNavigator from "./BottomNavigator";
import BoostNavigator from "./BoostNavigator";
import AddonNavigator from "./AddonNavigator";
import RankSelect from "./RankSelect";

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

  useEffect(() => {
    // fetchBoosts();
  }, []);

  console.log(currentOrder)

  return (
    <div className={classes.root}>
      <TopNavigator />
      <div className={classes.container}>
        <BoostNavigator
          boosts={boosts}
          setOrder={setOrder}
          currentOrder={currentOrder}
        />
        <RankSelect setOrder={setOrder} currentOrder={currentOrder} />
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
    backgroundColor: theme.primary
  },
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100%"
  }
});

CustomBoost.propTypes = propTypes;

export default withStyles(styles)(CustomBoost);
