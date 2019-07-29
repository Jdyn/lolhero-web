import React from "react";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  secondary: PropTypes.bool,
  noShadow: PropTypes.bool,
  margin: PropTypes.string,
  green: PropTypes.bool
};

const Button = props => {
  const { children, secondary, onClick } = props;
  const classes = useStyles(props);

  return (
    <button onClick={onClick} className={secondary ? classes.secondary : classes.primary}>
      {children}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = {
  margin: "0",
  width: "auto"
};

const useStyles = createUseStyles(theme => ({
  button: {
    cursor: "pointer",
    outline: "none",
    border: "none",
    fontWeight: 700,
    zIndex: 100,
    fontSize: 14,
    padding: "10px",
    borderRadius: 8,
    minHeight: "45px",
    letterSpacing: ".025em",
    textTransform: "uppercase",
    transitionDuration: ".15s",
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
    margin: props => props.margin,
    width: props => props.width
  },
  secondary: {
    extend: "button",
    backgroundClip: "border-box",
    backgroundColor: theme.green,
    color: theme.white,
    margin: props => props.margin,
    width: props => props.width
  }
}));

export default Button;
