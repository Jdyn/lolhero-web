import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import { formatLP } from "../../util/Helpers";

const propTypes = {
  boost: PropTypes.object.isRequired,
  setStage: PropTypes.func.isRequired,
  submitOrder: PropTypes.func.isRequired,
  currentStage: PropTypes.number.isRequired,
  currentOrder: PropTypes.object.isRequired
};

const BottomNavigator = props => {
  const { currentStage, setStage, boost, currentOrder, submitOrder } = props;

  const classes = useStyles();
  const theme = useTheme()

  const updateStage = stage => {
    if (stage === 3) {
      submitOrder(boost.nonce);
    } else if (stage + 1 <= 3 && stage != 2) {
      setStage(prev => prev + 1);
    }
  };

  const stageText = currentStage => {
    switch (currentStage) {
      case 3:
        return "place order";
      default:
        return "next";
    }
  };

  console.log(boost)

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h3>{formatLP(currentOrder.lp) || "-"}</h3>
        <span>LP</span>
      </div>
      <div className={classes.content}>
        <h3>{currentOrder.queue || "-"}</h3>
        <span>Queue</span>
      </div>
      <div className={classes.content}>
        <h3>{currentOrder.server || "-"}</h3>
        <span>Server</span>
      </div>
      <div className={classes.content}>
        <h3>${boost.price || 0}</h3>
        <span>Total Price</span>
      </div>
      <button
        id="submit-button"
        className={classes.button}
        onClick={() => updateStage(currentStage)}
        style={{backgroundColor: currentStage === 2 ? boost.paymentMethodIsSelected ? theme.accent : "#414141" : theme.accent}}
      >
        {stageText(currentStage)}
      </button>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    gridArea: "botNav",
    color: theme.white,
    height: "auto",
    width: "100%",
    justifyContent: "center",
    padding: 0,
    bottom: 0,
    backgroundColor: theme.tertiary,
    zIndex: 50,
    position: "sticky",
    borderTop: "2px solid #999",
    "@media (min-width: 1025px)": {
      height: "90px",
      padding: "10px 0",
      position: "fixed",
      justifyContent: "flex-end"
    }
  },
  content: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRight: ".7px solid #999",
    lineHeight: 1,
    flexGrow: 1,
    padding: "15px",
    "& h3": {
      fontSize: 19,
      margin: 0,
      textTransform: "uppercase"
    },
    "& span": {
      fontSize: 17,
      marginTop: "5px",
      color: theme.grey
    }
  },
  button: {
    display: "none",
    outline: "none",
    border: "none",
    margin: "15px",
    width: "100%",
    borderRadius: 12,
    minHeight: "55px",
    cursor: "pointer",
    color: theme.white,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    transitionDuration: ".2s",
    fontWeight: 700,
    fontSize: 20,
    "@media (min-width: 1025px)": {
      margin: "5px 25px 5px 3%",
      width: "350px",
      display: "inline-block"
    }
  },
  checkoutButton: {
    extend: "button",
    display: "inline-block",
    "@media (min-width: 1025px)": {
      display: "none"
    }
  }
}));

BottomNavigator.propTypes = propTypes;

export default BottomNavigator;
