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
    flexGrow: 1,
    "@media (min-width: 650px)": {
      maxWidth: "305px",
      margin: "1%",
    },
    margin: "5%",
    zIndex: 100,
    boxShadow: "0 5px 15px rgb(0,0,0,.3)",
    backgroundColor: theme.primary,
    borderRadius: 8,
    transitionDuration: ".15s",
    "&:hover": {
      transform: "translateY(-4px)",
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
