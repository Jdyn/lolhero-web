import React from 'react';
import styles from './styles.module.css';

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
  const { secondary, onClick, margin, padding } = props;

  return (
    <button
      type="submit"
      ref={ref}
      onClick={onClick}
      className={`${styles.root} ${secondary && styles.secondary}`}
      style={{ margin, padding }}
    >
      {props.children}
    </button>
  );
});

Button.defaultProps = {
  margin: '0',
  width: 'auto',
  padding: '0px 15px',
  secondary: false,
  onClick: null
} as Partial<Props>;

export default Button;
