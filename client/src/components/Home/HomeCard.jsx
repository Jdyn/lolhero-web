import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import theme from "../../lib/theme";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const HomeCard = props => {
  const { classes } = props;

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header} />
      </div>
    </>
  );
};

const styles = theme => ({
  container: {
    height: "475px",
    width: "100%",
    zIndex: 100,
    boxShadow: "0 3px 20px rgb(0,0,0,.3)",
    backgroundColor: theme.white,
    borderRadius: 8 
  },
  header: {
      backgroundColor: "#EEEEEE",
      width: "100%",
      height: "35%",
      borderRadius: "8px 8px 0px 0px"
  }
});

HomeCard.propTypes = propTypes;

export default withStyles(styles)(HomeCard);
