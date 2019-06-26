import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const AddonTab = props => {
  const { classes, topIndex } = props;

  const renderContent = index => {
    switch (index) {
      case 0:
        return <div>details</div>;
      case 1:
        return <div>add ons</div>;
      case 2:
        return <div>payment</div>;
    }
  };

  return <div className={classes.container}>{renderContent(topIndex)}</div>;
};

const styles = theme => ({
  container: {
    position: "relative",
    display: "flex",
    borderRadius: 16,
    gridArea: "addons",
    flexDirection: "column",
    height: "100%",
    width: "400px",
    right: 0,
    overflow: "auto",
    backgroundColor: theme.primary,
    boxShadow: "-5px 0px 15px 0px rgba(0, 0, 0, 0.2)"
  }
});

AddonTab.propTypes = propTypes;

export default withStyles(styles)(AddonTab);
