import React from 'react';
import styles from './index.module.css';

interface Props {
  zIndex?: number;
  version?: string;
}

const Stripes: React.FC<Props> = (props: Props): JSX.Element => {
  const { zIndex, version } = props;

  return (
    <div className={`${styles.stripes} ${version && styles[`${version}`]}`} style={{ zIndex }}>
      <span />
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
    </div>
  );
};

Stripes.defaultProps = {
  zIndex: -1
};

export default React.memo(Stripes);
