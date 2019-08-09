import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import DashboardHeader from './Header';

const propTypes = {};

let useStyles;

const Dashboard = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DashboardHeader></DashboardHeader>
    </div>
  );
};

useStyles = createUseStyles(theme => ({
  root: {
    backgroundColor: theme.secondary
  }
}));

Dashboard.propTypes = propTypes;

export default Dashboard;
