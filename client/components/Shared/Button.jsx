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
    <button
      type="submit"
      onClick={onClick}
      className={secondary ? classes.secondary : classes.primary}
    >
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
    // display: "flex",
    cursor: "pointer",
    outline: "none",
    border: "none",
    fontWeight: 600,
    fontSize: 13,
    padding: "15px 10px",
    color: theme.white,
    borderRadius: 8,
    letterSpacing: ".025em",
    textTransform: "uppercase",
    transitionDuration: '.2s',
    boxShadow: '0px 4px 6px 0px rgba(0,0,0,.2)',
    '&:hover': {
      transform: 'translateY(2px)',
      boxShadow: 'none'
    },
    '&:active': {
      transform: 'translateY(2)',
      boxShadow: 'none'
    }
    // transitionDuration: ".15s",
    // "&:hover": {
    //   transform: "translateY(-2px)"
    // },
    // "&:active": {
    //   transform: "translateY(2px)"
    // }
  },
  primary: props => ({
    extend: "button",
    backgroundColor: theme.accent,
    margin: props.margin,
    // flexGrow: props.grow ? 1 : 0,
    width: props.width
  }),
  secondary: props => ({
    extend: "button",
    backgroundColor: theme.green,
    // flexGrow: props.grow ? 1 : 0,
    margin: props.margin,
    width: props.width
  })
}));

export default Button;
