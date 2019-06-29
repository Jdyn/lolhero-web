import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const BottomNavigator = props => {
  const { classes, currentStage, setStage } = props;

  const updateStage = stage => {
    if (stage + 1 <= 4) {
      setStage(prev => prev + 1);
    }
  };

  const stageText = currentStage => {
    switch (currentStage) {
      case 0:
      case 1:
        return "next";
      case 2:
        return "checkout";
      case 3:
        return "order";
      default:
        return "next";
    }
  };

  return (
    <div className={classes.container}>

      <h3>purchase price</h3>
      <button
        className={classes.button}
        onClick={() => updateStage(currentStage)}
      >
        {stageText(currentStage)}
      </button>
    </div>
  );
};

const styles = theme => ({
  container: {
    position: "fixed",
    display: "flex",
    // justifyContent: "flex-end",
    gridArea: "botNav",
    minHeight: "90px",
    width: "100%",
    bottom: 0,
    backgroundColor: theme.tertiary,
    zIndex: 20
  },
  button: {
    outline: "none",
    border: "none",
    width: "350px",
    margin: "15px 25px 15px auto",
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
