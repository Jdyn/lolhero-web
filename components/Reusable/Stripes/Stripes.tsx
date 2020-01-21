import React from 'react';
import styles from './styles.module.css';

interface Props {
  zIndex?: number;
  version?: string;
}

const Stripes: React.FC<Props> = (props: Props): JSX.Element => {
  const { zIndex, version } = props;

  return (
    <div className={`${styles.stripes} ${version && styles[`${version}`]}`} style={{ zIndex }}>
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
};

Stripes.defaultProps = {
  zIndex: -5
};

export default Stripes;
