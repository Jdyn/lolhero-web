import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const propTypes = {};

let useStyles;

const DashboardHeader = props => {
  const { session, order } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.portrait} />
        <div className={classes.content}>
          {session && session.user.username}
          {order && (
            <div className={classes.contentInner}>
              <div>
                {order.trackingId} <span>Tracking ID</span>
              </div>
              <div>
                {order.status} <span>Order Status</span>
              </div>
              <div>
                {order.details.server} <span>Server</span>
              </div>
              <div>
                {order.details.summonerName || 'Not Set'} <span>Summoner Name</span>
              </div>
            </div>
          )}
        </div>
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
    width: '100%',
    flex: 1,
    fontSize: 20,
    fontWeight: 700,
    flexDirection: 'column',
    '@media (min-width: 650px)': {
      height: '100px',
      margin: '0 0 0 0',
      padding: '15px 0px 0px 50px'
    }
  },
  contentInner: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '10px 0 0 0',
    alignItems: 'stretch',
    '& div': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 10px',
      marginBottom: '10px',
      flex: 1,
      fontSize: 16,
      '@media (min-width: 650px)': {
        margin: 0,
        justifyContent: 'space-evenly',
        padding: 0
      },
      '& span': {
        color: theme.grey,
        fontSize: 13,
        marginTop: '5px',
        textAlign: 'center'
      }
    }
  }
}));

DashboardHeader.propTypes = propTypes;

export default DashboardHeader;
