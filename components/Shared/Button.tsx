import React from 'react';
import { createUseStyles } from 'react-jss';

interface Props {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  secondary?: boolean;
  margin?: string;
  grow?: boolean;
  width?: string;
  maxWidth?: string;
  padding?: string;
}

const Button = React.forwardRef((props: Props, ref: React.RefObject<HTMLButtonElement>) => {
  const { secondary, onClick } = props;

  const classes: any = useStyles(props);

  return (
    <button
      type="submit"
      ref={ref}
      onClick={onClick}
      className={secondary ? classes.secondary : classes.primary}
    >
      {props.children}
    </button>
  );
});

Button.defaultProps = {
  margin: '0',
  width: 'auto',
  padding: '10px 15px',
  children: '',
  secondary: false,
  onClick: null
} as Partial<Props>;

const useStyles = createUseStyles(theme => ({
  button: {
    display: 'flex',
    cursor: 'pointer',
    outline: 'none',
    border: 'none',
    fontWeight: 600,
    fontSize: 13,
    color: '#fff',
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
    maxWidth: props.maxWidth,
    padding: props.padding,
    flexGrow: props.grow ? 1 : 0
  })
}));

export default Button;
