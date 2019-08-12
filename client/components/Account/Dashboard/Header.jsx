import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const propTypes = {
  session: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    user: PropTypes.shape({
      username: PropTypes.string
    }).isRequired
  }).isRequired
};

let useStyles;

const DashboardHeader = props => {
  const { session } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.portrait} />
        <div className={classes.content}>{session.user.username || 'unknown'}</div>
      </div>
      <div className={classes.filter} />
    </div>
  );
};

useStyles = createUseStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    padding: '50px 0 0 0',
    flexDirection: 'column',
    backgroundColor: theme.secondary
  },
  container: {
    zIndex: 20,
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    padding: '50px 30px 0 30px',
    maxWidth: '795px',
    flexGrow: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    '@media (min-width: 650px)': {
      alignItems: 'flex-start',
      flexDirection: 'row'
    }
  },
  filter: {
    margin: 0,
    height: '90px',
    display: 'flex',
    position: 'relative',
    // boxShadow: '0px 2px 6px 0px rgba(0,0,0, .2)',
    backgroundColor: theme.quartinary,
    '@media (min-width: 650px)': {
      marginTop: '-50px'
    }
  },
  portrait: {
    width: '150px',
    height: '150px',
    border: `2px solid ${theme.grey}`,
    display: 'flex',
    boxShadow: '0px 2px 6px 0px rgba(0,0,0, .2)',
    borderRadius: '24px',
    backgroundColor: theme.tertiary,
    '@media (min-width: 650px)': {
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
    }
  },
  content: {
    color: theme.white,
    margin: '15px 0',
    display: 'flex',
    flexGrow: 1,
    fontSize: 20,
    fontWeight: 700,
    flexDirection: 'column',
    '@media (min-width: 650px)': {
      height: '100px',
      margin: 0,
      padding: '30px 0px 0px 50px'
    }
  }
}));

DashboardHeader.propTypes = propTypes;

export default DashboardHeader;
