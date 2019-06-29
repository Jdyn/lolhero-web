import React from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool
};

const Toggle = ({ classes, children, onClick }) => (
  <button onClick={onClick} className={classes.button}>
    {children}
  </button>
);

Toggle.propTypes = propTypes;
Toggle.defaultProps = {
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
});

export default withStyles(styles, { link: true })(Toggle);
