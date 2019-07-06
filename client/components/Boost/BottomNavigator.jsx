import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const BottomNavigator = props => {
  const { classes, currentStage, setStage, boost, currentOrder } = props;

  const updateStage = stage => {
    if (stage + 1 <= 3) {
      setStage(prev => prev + 1);
    }
  };

  const stageText = currentStage => {
    switch (currentStage) {
      case 0:
      case 1:
      case 2:
        return "next";
      case 3:
        return "checkout";
      default:
        return "next";
    }
  };

  const formatLP = lp => {
    switch (lp) {
      case 20:
        return "0-20";
      case 40:
        return "21-40";
      case 60:
        return "41-60";
      case 80:
        return "61-80";
      case 99:
        return "81-99";
      case 100:
        return "100";
      default:
        return "0";
    }
  };

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
        <span>Purchase price</span>
      </div>

      <button className={classes.button} onClick={() => updateStage(currentStage)}>
        {stageText(currentStage)}
      </button>
    </div>
  );
};

const styles = theme => ({
  container: {
    position: "fixed",
    display: "flex",
    gridArea: "botNav",
    color: theme.white,
    justifyContent: "flex-end",
    height: "90px",
    width: "100%",
    padding: "10px 0",
    bottom: 0,
    backgroundColor: theme.tertiary,
    zIndex: 20
  },
  wrapper: {
    display: "flex",
    height: "100%",
    padding: "0 15px"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    minWidth: "110px",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRight: ".7px solid #999",
    lineHeight: 1,
    flexGrow: 1,
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
    outline: "none",
    border: "none",
    width: "350px",
    margin: "5px 25px 5px 3%",
    borderRadius: 12,
    cursor: "pointer",
    color: theme.white,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    fontWeight: 700,
    fontSize: 20,
    backgroundColor: theme.accent
  }
});

BottomNavigator.propTypes = propTypes;

export default withStyles(styles)(BottomNavigator);
