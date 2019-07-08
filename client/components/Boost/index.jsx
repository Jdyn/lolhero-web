import React, { useState, useEffect } from "react";
import BoostTab from "./BoostTab";
import AddonTab from "./AddonTab";
import PropTypes from "prop-types";
import TopNavigator from "./TopNavigator";
import BoostDisplay from "./BoostDisplay";
import BottomNavigator from "./BottomNavigator";
import { createUseStyles } from "react-jss";

const propTypes = {
  boost: PropTypes.object.isRequired,
  updateOrder: PropTypes.func.isRequired,
  currentOrder: PropTypes.object.isRequired,
  fetchBoostPrices: PropTypes.func.isRequired
};

const Boost = props => {
  const { fetchBoostPrices, updateOrder, currentOrder, boost } = props;
  const classes = useStyles();

  const [currentStage, setStage] = useState(3);

  useEffect(() => {
    fetchBoostPrices();
  }, []);

  return (
    <div className={classes.root}>
      <TopNavigator currentStage={currentStage} setStage={setStage} />
      <div className={classes.container}>
        <BoostTab updateOrder={updateOrder} />
        <BoostDisplay currentOrder={currentOrder} updateOrder={updateOrder} />
        <AddonTab
          boost={boost}
          currentStage={currentStage}
          currentOrder={currentOrder}
          updateOrder={updateOrder}
        />
      </div>
      <BottomNavigator
        currentStage={currentStage}
        currentOrder={currentOrder}
        setStage={setStage}
        boost={boost}
      />
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
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
}));

Boost.propTypes = propTypes;

export default Boost;
