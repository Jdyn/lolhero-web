import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Button from "../shared/Button";
import HomeCards from "./HomeCards";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Home = props => {
  const { classes } = props;

  return (
    <>
      <div className={classes.hero}>
        <form className={classes.form}>
          <h1>LoL Hero</h1>
          <input placeholder="Enter tracking ID" className={classes.search} />
        </form>
        <div className={classes.wrapper}>
          <Button secondary noShadow width="200px" margin="0 25px 0 0">
            prebuilt order
          </Button>
          <Button width="200px">custom order</Button>
        </div>
      </div>
      <HomeCards />
    </>
  );
};

const styles = theme => ({
  hero: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "100%",
    maxHeight: "1080px",
    minHeight: "550px",
    padding: "110px 0",
    overflow: "hidden",
    zIndex: 1,
    backgroundColor: "#9E9E9E"
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    "& h1": {
      fontSize: 45,
      margin: "0 0 20px 0",
      color: theme.white
    }
  },
  search: {
    border: "none",
    outline: "none",
    padding: "0 16px",
    width: "100%",
    maxWidth: "380px",
    borderRadius: "8px",
    height: "40px",
    fontSize: 16
  }
});

Home.propTypes = propTypes;

export default withStyles(styles)(Home);
