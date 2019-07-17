import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool
};

const Toggle = ({ children, onClick, ...props }) => {
  const classes = useStyles(props);
  const theme = useTheme();

  return (
    <button
      onClick={onClick}
      className={classes.button}
      style={{
        borderColor: props.isSelected ? theme.accent : theme.grey,
        color: props.isSelected ? theme.accent : theme.white
      }}
    >
      {children}
    </button>
  );
};

Toggle.propTypes = propTypes;
Toggle.defaultProps = {
  width: "100%",
  height: "auto",
  margin: "6px 0"
};

const useStyles = createUseStyles(theme => ({
  button: props => ({
    cursor: "pointer",
    width: props.width,
    height: props.height,
    outline: "none",
    border: `2px solid`,
    backgroundColor: "transparent",
    color: props.isSelected ? theme.accent : theme.white,
    fontWeight: 700,
    zIndex: 50,
    fontSize: 14,
    padding: "10px",
    borderRadius: 14,
    letterSpacing: ".025em",
    margin: props.margin,
    transitionDuration: ".15s",
    "&:hover": {
      transform: "translateY(-2px)"
    },
    "&:active": {
      transform: "translateY(2px)"
    }
  })
}));

export default Toggle;
