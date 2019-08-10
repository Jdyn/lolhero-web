import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const propTypes = {};

let useStyles;

const DashboardCards = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>

    </div>
  );
};

useStyles = createUseStyles(theme => ({}));

DashboardCards.propTypes = propTypes;

export default DashboardCards;
