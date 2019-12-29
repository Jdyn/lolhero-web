import React from 'react';
import styles from './styles.module.css';
import Loader from '../Loader';

interface Props {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  secondary?: boolean;
  margin?: string;
  grow?: boolean;
  width?: string;
  maxWidth?: string;
  padding?: string;
  isPending?: boolean;
}

const Button = React.forwardRef((props: Props, ref: React.RefObject<HTMLButtonElement>) => {
  const { secondary, onClick, margin, padding, isPending, width } = props;

  return (
    <button
      type="submit"
      ref={ref}
      onClick={onClick}
      className={`${styles.root} ${secondary && styles.secondary}`}
      style={{ margin, padding, width }}
    >
      {isPending ? <Loader width="36px" height="36px" /> : props.children}
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
