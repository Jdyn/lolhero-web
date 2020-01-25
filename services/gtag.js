import ReactGA from 'react-ga';

export const GA_TRACKING_ID = 'UA-135635293-2';

export const pageview = url => {
  ReactGA.pageview(url);
};

export const event = ({ action, category, label, value }) => {
  ReactGA.event({
    category,
    action,
    label,
    value
  });
};
