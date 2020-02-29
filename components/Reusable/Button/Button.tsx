import React from 'react';
import Link from 'next/link';
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
  href?: string;
}

const Button: React.FC<Props> = React.forwardRef(
  (props: Props, ref: React.RefObject<HTMLButtonElement>) => {
    const { secondary, onClick, margin, padding, isPending, width, large, href } = props;

    return href ? (
      <Link href={href}>
        <button
          type="submit"
          ref={ref}
          onClick={onClick}
          className={`
        ${styles.button}
        ${secondary ? styles.secondary : styles.primary}
        ${large ? styles.large : ''}`}
          style={{ margin, padding, width }}
        >
          {isPending ? <Loader width="36px" height="36px" /> : props.children}
        </button>
      </Link>
    ) : (
      <button
        type="submit"
        ref={ref}
        onClick={onClick}
        className={`
      ${styles.button}
      ${secondary ? styles.secondary : styles.primary}
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
  padding: '0px 0',
  secondary: false,
  onClick: null,
  large: false
};

export default Button;
