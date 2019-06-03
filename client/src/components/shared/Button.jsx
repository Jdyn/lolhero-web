import React from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  secondary: PropTypes.bool,
  noShadow: PropTypes.bool,
  margin: PropTypes.string,
  green: PropTypes.bool
};

const Button = props => {
  const { classes, children, secondary, onClick } = props;
  return (
    <button onClick={onClick} className={secondary ? classes.secondary : classes.primary}>
      {children}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = {
  margin: "0",
  width: "auto",
  height: "50px"
};

const styles = theme => ({
  button: {
    cursor: "pointer",
		outline: "none",
		border: "none",
    fontWeight: 700,
    zIndex: 100,
    fontSize: 14,
    padding: "10px",
    borderRadius: 8,
    letterSpacing: ".025em",
    textTransform: "uppercase",
    transitionDuration: ".15s",
    // height: "75px",
    "&:hover": {
      transform: "translateY(-2px)"
    },
    "&:active": {
      transform: "translateY(2px)"
    }
  },
  primary: {
    extend: "button",
    backgroundClip: "border-box",
    backgroundColor: theme.accent,
    color: theme.white,
    width: props => props.width,
    minHeight: props => props.height,
    margin: props => props.margin
  },
  secondary: {
    extend: "button",
    backgroundClip: "border-box",
    backgroundColor: theme.green,
    color: theme.white,
    width: props => props.width,
    minHeight: props => props.height,
    margin: props => props.margin
  }
});

export default withStyles(styles)(Button);
