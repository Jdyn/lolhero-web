import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Banner = props => {
  const { classes } = props;

  return (
    <>
      <div className={classes.container}>
        <svg className={classes.footer} preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0 0 L50 100 L100 0 Z" />
        </svg>
      </div>
    </>
  );
};

const styles = theme => ({
  container: {
    position: "relative",
    display: "flex",
    width: "245px",
    height: "calc(90% - 100px)",
    minHeight: "400px",
    backgroundColor: theme.tertiary,
    boxShadow: "0px 0px 20px rgba(0,0,0,.3)",
    margin: "0 15px",
    maxHeight: "450px",
    zIndex: 1
  },
  footer: {
    width: "100%",
    height: "100px",
    position: "absolute",
    bottom: "-100px",
    fill: theme.tertiary,
    zIndex: -1,
    filter: "drop-shadow(0 65px 15px rgba(0,0,0,.35))"
  }
});

Banner.propTypes = propTypes;

export default withStyles(styles)(Banner);
