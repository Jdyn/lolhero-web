import React from 'react';
import styles from './styles.module.css';

interface Props {
  children?: React.ReactNode;
  onClick: (event: React.MouseEvent) => void;
  isSelected: boolean;
  width?: string;
  margin?: string;
  height?: string;
  padding?: string;
  borderRadius?: string;
}

const Toggle = (props: Props): JSX.Element => {
  const { onClick, children, isSelected, width, height, borderRadius, padding, margin } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.button} ${isSelected && styles.selected}`}
      style={{ width, height, borderRadius, padding, margin }}
    >
      {children}
    </button>
  );
};

Toggle.defaultProps = {
  width: '100%',
  height: 'auto',
  margin: '6px 0',
  padding: '10px',
  borderRadius: '14px'
};

export default Toggle;
