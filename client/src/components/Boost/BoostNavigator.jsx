import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const BoostNavigator = props => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <div />
    </div>
  );
};

const styles = theme => ({
    container: {
        position: "fixed",
        display: "flex",
        height: "calc(100% - 166px)",
        width: "435px",
        left: 0,
        // borderRadius: 16,
        backgroundColor: theme.primary,
        boxShadow: "5px 0 12px 0 rgb(0,0,0,.15)"
    }
});

BoostNavigator.propTypes = propTypes;

export default withStyles(styles)(BoostNavigator);


