import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import DashboardHeader from './Header';
import DashboardCards from './Cards';
import DashboardList from './DashboardList';

const propTypes = {
  session: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    user: PropTypes.shape({}).isRequired
  }).isRequired
};

let useStyles;

const Dashboard = props => {
  const { session } = props;
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <div className={classes.root}>
      <DashboardHeader session={session} />
      <DashboardCards />
      <DashboardList />
    </div>
  );
};

useStyles = createUseStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: theme.secondary
  }
}));

Dashboard.propTypes = propTypes;

export default Dashboard;
