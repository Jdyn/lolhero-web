import React from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool
};

const Button = props => {
  const { classes, children, onClick } = props;
  console.log(props.isSelected)
  return (
    <button onClick={onClick} className={classes.button}>
      {children}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = {
  width: "100%",
  height: "auto",
  margin: "6px 0"
};

const styles = theme => ({
  button: props => ({
    cursor: "pointer",
    width: props.width,
    height: props.height,
    outline: "none",
    border: `2px solid ${props.isSelected ? theme.accent : theme.grey}`,
    backgroundColor: "transparent",
    color: props.isSelected ? theme.accent : theme.white,
    fontWeight: 700,
    zIndex: 50,
    fontSize: 14,
    padding: "15px",
    borderRadius: 18,
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
});

export default withStyles(styles, { link: true })(Button);
