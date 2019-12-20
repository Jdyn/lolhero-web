import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import PropTypes from 'prop-types';

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
      type="button"
      onClick={onClick}
      className={classes.button}
      style={{
        // backgroundColor: props.isSelected ? theme.accent : theme.primary,
        color: props.isSelected ? theme.accent : theme.white
      }}
    >
      {children}
    </button>
  );
};

Toggle.propTypes = propTypes;
Toggle.defaultProps = {
  width: '100%',
  height: 'auto',
  margin: '6px 0',
  padding: '10px',
  borderRadius: '14px'
};

const useStyles = createUseStyles(theme => ({
  button: props => ({
    cursor: 'pointer',
    width: props.width,
    height: props.height,
    outline: 'none',
    border: `none`,
    backgroundColor: '#373739',
    color: theme.white, //props.isSelected ? theme.accent : theme.white,
    fontWeight: 700,
    fontSize: 13,
    padding: props.padding,
    borderRadius: props.borderRadius,
    letterSpacing: '.025em',
    margin: props.margin,
    transitionDuration: '.3s',
    '&:hover': {
      transform: 'translateY(-2px)'
    },
    '&:active': {
      transform: 'translateY(2px)'
    }
  })
}));

export default Toggle;
