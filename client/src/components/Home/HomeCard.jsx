import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const HomeCard = props => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <div className={classes.header} />
    </div>
  );
};

const styles = theme => ({
  container: {
    height: "475px",
    width: "100%",
    maxWidth: "295px",
    margin: "20px",
    zIndex: 100,
    boxShadow: "0 5px 15px rgb(0,0,0,.3)",
    backgroundColor: theme.primary,
    borderRadius: 8,
    transitionDuration: ".15s",
    "&:hover": {
      transform: "translateY(-4px)"
    }
  },
  header: {
    backgroundColor: theme.tertiary, //"#EEEEEE",
    width: "100%",
    height: "35%",
    borderRadius: "8px 8px 0px 0px"
  }
});

HomeCard.propTypes = propTypes;

export default withStyles(styles)(HomeCard);
