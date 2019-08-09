import React from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  secondary: PropTypes.bool,
  margin: PropTypes.string
};

const Button = React.forwardRef((props, ref) => {
  const { children, secondary, onClick } = props;

  const classes = useStyles(props);

  return (
    <button
      type="submit"
      ref={ref}
      onClick={onClick}
      className={secondary ? classes.secondary : classes.primary}
    >
      {children}
    </button>
  );
});

Button.propTypes = propTypes;
Button.defaultProps = {
  margin: '0',
  width: 'auto',
  padding: '10px 15px'
};

const useStyles = createUseStyles(theme => ({
  button: {
    display: 'flex',
    cursor: 'pointer',
    outline: 'none',
    border: 'none',
    fontWeight: 600,
    fontSize: 13,
    color: theme.white,
    borderRadius: 8,
    letterSpacing: '.025em',
    textTransform: 'uppercase',
    justifyContent: 'center',
    transitionDuration: '.2s',
    boxShadow: '0px 2px 6px 0px rgba(0,0,0,.2)',
    '&:hover': {
      transform: 'translateY(2px)',
      boxShadow: 'none'
    },
    '&:active': {
      transform: 'translateY(2)',
      boxShadow: 'none'
    }
  },
  primary: props => ({
    extend: 'button',
    backgroundColor: theme.accent,
    margin: props.margin,
    width: props.width,
    maxWidth: props.maxWidth,
    padding: props.padding,
    flexGrow: props.grow ? 1 : 0
  }),
  secondary: props => ({
    extend: 'button',
    backgroundColor: theme.green,
    margin: props.margin,
    width: props.width,
    padding: props.padding
  })
}));

export default Button;
