import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const AddonNavigator = props => {
  const { classes, topIndex } = props;

  const renderContent = index => {
    switch (index) {
      case 0:
        return <div>details</div>;
      case 1:
        return (
          <div>add ons</div>
        )
      case 2:
      return (
        <div>payment</div>
      )
    }
  };

  return <div className={classes.container}>{renderContent(topIndex)}</div>;
};

const styles = theme => ({
  container: {
    position: "relative",
    display: "flex",
    gridArea: "addons",
    flexDirection: "column",
    height: "100%",
    width: "400px",
    right: 0,
    overflow: "auto",
    backgroundColor: theme.primary,
    boxShadow: "-5px 0px 6px 0px rgba(0, 0, 0, 0.12)",
    "&::-webkit-scrollbar": {
      width: "8px",
      backgroundColor: "#ddd"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#999999",
      borderRadius: 6,
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.2)"
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: theme.primary,
      webkitBoxShadow: "inset 0 0 6px transparent"
    },
    "&::-webkit-scrollbar-button": {
      width: "0",
      height: "0",
      display: "none"
    }
  }
});

AddonNavigator.propTypes = propTypes;

export default withStyles(styles)(AddonNavigator);
