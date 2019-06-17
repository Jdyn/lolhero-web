import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import TopNavigator from "./TopNavigator";
import BottomNavigator from "./BottomNavigator";
import BoostNavigator from "./BoostNavigator";
import Banner from "./Banner";
import AddonNavigator from "./AddonNavigator";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const CustomBoost = props => {
  const { classes, fetchBoosts, boosts } = props;

  const [currentCollection, setCollection] = useState({});

  useEffect(() => {
    fetchBoosts();
  }, []);

  useEffect(() => {
    if (boosts.length > 0) {
      setCollection(boosts[0].collections[0]);
    }
  }, [boosts]);

  
  return (
    <div className={classes.root}>
      <TopNavigator />
      <div className={classes.container}>
        <BoostNavigator boosts={boosts} setCollection={setCollection} />
        <div className={classes.main}>
          <Banner />
          <Banner />
        </div>
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
  },
  main: {
    display: "flex",
    justifyContent: "space-evenly",
    flexGrow: 1
  }
});

CustomBoost.propTypes = propTypes;

export default withStyles(styles)(CustomBoost);
