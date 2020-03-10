import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';

interface Props {
  startPosition: number;
  stopDelayMs: number;
  options?: object;
}

const ProgressBar = (props: Props): JSX.Element => {
  const { startPosition, stopDelayMs, options } = props;

  useEffect(() => {
    let timer = null;

    if (options) {
      NProgress.configure(options);
    }

    const routeChangeStart = (): void => {
      NProgress.set(startPosition);
      NProgress.start();
    };

    const routeChangeEnd = (): void => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        NProgress.done(true);
      }, stopDelayMs);
    };

    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeEnd);
    Router.events.on('routeChangeError', routeChangeEnd);
  }, [startPosition, stopDelayMs, options]);

  return <div className="nprogress" />;
};

ProgressBar.defaultProps = {
  startPosition: 0.3,
  stopDelayMs: 200
} as Partial<Props>;

export default ProgressBar;
