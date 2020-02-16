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
      {version === 'v1' && (
        <video
          preload="auto"
          loop
          autoPlay
          playsInline
          muted
          src="/static/images/art/hero.mp4"
          className={styles.video}
        >
          <track kind="captions" />
        </video>
      )}
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
