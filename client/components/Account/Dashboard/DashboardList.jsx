import React from 'react';
// import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const propTypes = {};

let useStyles;

const DashboardCards = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container} />
    </div>
  );
};

useStyles = createUseStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '795px',
    padding: '0px 30px 30px 30px',
    margin: '0 auto'
  },
  container: {
    height: '500px',
    display: 'flex',
    backgroundColor: theme.quartinary,
    borderRadius: 12,
    boxShadow: '0px 2px 6px 0px rgba(0,0,0, .2)'
  }
}));

DashboardCards.propTypes = propTypes;

export default DashboardCards;
