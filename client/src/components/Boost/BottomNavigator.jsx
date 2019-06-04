import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const BottomNavigator = props => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <div>bottom</div>
    </div>
  );
};

const styles = theme => ({
    container: {
        position: "fixed",
        display: "flex",
        minHeight: "90px",
        width: "100%",
        bottom: 0,
        backgroundColor: theme.tertiary,
        zIndex: 10,
        borderTop: `2px solid ${theme.quartinary}`
    }
});

BottomNavigator.propTypes = propTypes;

export default withStyles(styles)(BottomNavigator);


