import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Link from "next/link";
import Button from "../Shared/Button";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Header = props => {
  const { classes } = props;

  const isLoggedIn = false;

  return (
    <div className={classes.root}>
      <Link href="/">
        <div className={classes.logo}>LoL Hero</div>
      </Link>
      <input className={classes.orderSearch} placeholder="Enter Tracking ID" />
      {isLoggedIn ? (
        <div> Logged in</div>
      ) : (
        <div className={classes.wrapper}>
          <button className={classes.button} style={{ backgroundColor: "#1bb978" }}>
            log in
          </button>
          <button className={classes.button} style={{ backgroundColor: "#0C7AF2" }}>
            sign up
          </button>
        </div>
      )}
    </div>
  );
};

const styles = theme => ({
  root: {
    display: "flex",
    position: "relative",
    backgroundColor: theme.tertiary,
    width: "100%",
    height: "79px",
    borderBottom: `2px solid #999`,
    padding: "20px 0",
    top: 0,
    left: 0,
    zIndex: 5
  },
  logo: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 45px",
    margin: "-20px 0 -20px 0",
    cursor: "pointer",
    transitionDuration: ".15s",
    borderBottom: "2px solid #999",
    color: theme.white,
    bottom: -2,
    fontSize: 30,
    "&:hover": {
      borderColor: `${theme.accent} !important`,
      color: `${theme.accent} !important`
    }
  },
  orderSearch: {
    display: "flex",
    flexBasis: "250px",
    marginLeft: "auto",
    border: "none",
    outline: "none",
    borderRadius: 8,
    margin: "0 15px",
    padding: "15px",
    color: theme.white,
    backgroundColor: theme.primary
  },
  wrapper: {
    display: "flex",
    flexDirection: "row"
  },

  button: {
    display: "flex",
    outline: "none",
    border: "none",
    color: theme.white,
    borderRadius: 8,
    cursor: "pointer",
    textTransform: "uppercase",
    fontWeight: 700,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    minWidth: "100px",
    marginRight: "20px",
    padding: "10px"
    // backgroundColor: theme.accent
  }
});

Header.propTypes = propTypes;

export default withStyles(styles)(Header);
