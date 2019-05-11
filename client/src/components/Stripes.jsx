import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Stripes = props => {
  const { classes } = props;

  return (
    <div className={classes.stripes}>
      <span />
			<span />
      <span />
      <span />
    </div>
  );
};

const styles = {
  stripes: {
    display: "grid",
    position: "absolute",
    grid: "repeat(4, 190px)/repeat(6, 1fr)",
    top: 0,
    zIndex: -1,
    width: "100%",
    overflow: "hidden",
    // backgroundImage: "url(static/Yasuo.jpg)",
    // backgroundSize: "cover",
    // backgroundRepeat: "no-repeat",
    // "&:before": {
    //   content: "''",
    //   position: "absolute",
    //   top: 0,
    //   left: 0,
    //   zIndex: -1,
    //   backgroundColor: "rgb(0,0,0,0.35)",
    //   width: "100%",
    //   height: "100%"
    // },
		transformOrigin: 0,
		background: "linear-gradient(150deg,#202020 15%,#343434 70%,#474747 94%)",
    boxShadow: "0 5px 20px 0 rgb(0,0,0,.5)",
    transform: "skewY(-10deg)",
    "& span:first-child": {
      gridColumn: "span 1",
			background: "#252525",
      // boxShadow: "0 5px 20px 0 rgb(0,0,0,.5)"
		},
		"& span:nth-child(2)": {
      gridColumn: "span 3",
			background: "#282828",
      // boxShadow: "0 5px 20px 0 rgb(0,0,0,.5)"
    },
    "& span:nth-child(3)": {
      gridColumn: "6",
      gridRow: "3",
      borderRadius: "16px 0 0 16px",
      background: "#454545",//"#25ddf5",
      // boxShadow: "0 5px 20px 0 rgb(0,0,0,.5)"
    },
    "& span:nth-child(4)": {
      gridColumn: "span 2",
      gridRow: 4,
			background: "#353535",//"#E53935",
			borderRadius: "0 16px 0 0",
      // boxShadow: "0 5px 20px 0 rgb(0,0,0,.5)"
		},
  }
};

Stripes.propTypes = propTypes;

export default withStyles(styles)(Stripes);
