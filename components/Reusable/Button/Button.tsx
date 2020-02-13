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
  large?: boolean;
}

const Button: React.FC<Props> = React.forwardRef(
  (props: Props, ref: React.RefObject<HTMLButtonElement>) => {
    const { secondary, onClick, margin, padding, isPending, width, large } = props;

    return (
      <button
        type="submit"
        ref={ref}
        onClick={onClick}
        className={`
        ${styles.root}
        ${secondary ? styles.secondary : ''}
        ${large ? styles.large : ''}`}
        style={{ margin, padding, width }}
      >
        {isPending ? <Loader width="36px" height="36px" /> : props.children}
      </button>
    );
  }
);

Button.defaultProps = {
  margin: '5px',
  width: 'auto',
  padding: '0px 15px',
  secondary: false,
  onClick: null,
  large: false
};

export default Button;
