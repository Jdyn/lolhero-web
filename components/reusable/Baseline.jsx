import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {
  children: null
};

const Baseline = ({ children }) => {
  useStyles();

  return children;
};

const useStyles = createUseStyles(theme => ({
  '@global': {
    html: {
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      boxSizing: 'border-box'
    },
    '*, *::before, *::after, div': {
      boxSizing: 'inherit',
      fontFamily: 'Museo Sans Rounded, Helvetica Neue'
    },
    body: {
      margin: 0,
      backgroundColor: theme.secondary,
      fontSize: '100%',
      fontFamily: 'Museo Sans Rounded',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textRendering: 'optimizeLegibility'
    },
    'body, div': {
      '@media (min-width: 1025px)': {
        '&::-webkit-scrollbar': {
          width: '8px'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#999',
          borderRadius: 6,
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,.2)'
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: theme.primary,
          webkitBoxShadow: 'inset 0 0 6px transparent'
        },
        '&::-webkit-scrollbar-button': {
          width: '0',
          height: '0',
          display: 'none'
        }
      }
    }
  }
}));

Baseline.propTypes = propTypes;
Baseline.defaultProps = defaultProps;

export default Baseline;
