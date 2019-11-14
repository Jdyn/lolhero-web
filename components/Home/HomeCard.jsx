import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const propTypes = {};

let useStyles;

const HomeCard = props => {
  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      <div className={classes.header} />
    </div>
  );
};

useStyles = createUseStyles(theme => ({
  container: {
    display: 'flex',
    height: '475px',
    flexGrow: 1,
    width: '100%',
    margin: '10px 20px 10px 20px',
    maxWidth: '295px',
    '@media (min-width: 650px)': {
      margin: '-60px 10px 10px 10px'
    },
    boxShadow: '0 2px 6px rgb(0,0,0,.2)',
    backgroundColor: theme.primary,
    borderRadius: 8,
    transitionDuration: '.15s',
    '&:hover': {
      transform: 'translateY(-4px)'
    }
  },
  header: {
    backgroundColor: theme.tertiary,
    width: '100%',
    height: '35%',
    borderRadius: '8px 8px 0px 0px'
  }
}));

HomeCard.propTypes = propTypes;

export default HomeCard;
