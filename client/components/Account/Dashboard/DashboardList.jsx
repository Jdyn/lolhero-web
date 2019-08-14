import React from 'react';
// import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const propTypes = {};

let useStyles;

const DashboardCards = props => {
  const { orders, selectedFilter } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {orders && (
          <div className={classes.grid}>
            {orders[selectedFilter].orders.map(order => (
              <div className={classes.gridItem} key={Math.random()}>
                <span>
                  <div>Serivce:</div>
                  <b>{order.title}</b>
                </span>
                <span>
                  <div>Tracking ID:</div>
                  <b>{order.trackingId}</b>
                </span>
                <span>
                  <div>Status:</div>
                  <b>{order.status}</b>
                </span>
                <span>
                  <div>Purchase Date:</div>
                  <b>{new Date(order.createdAt).toUTCString()}</b>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
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
    display: 'flex',
    position: 'relative',
    padding: '15px 15px',
    height: '650px',
    backgroundColor: theme.quartinary,
    borderRadius: 24,
    boxShadow: '0px 2px 6px 0px rgba(0,0,0, .2)'
  },
  grid: {
    display: 'grid',
    width: '100%',
    color: theme.white,
    overflowY: 'auto',
    padding: '15px',
    gridTemplateColumns: '1fr'
  },
  gridItem: {
    marginBottom: '30px',
    backgroundColor: theme.secondary,
    padding: '20px',
    borderRadius: 12,
    '& span': {
      display: 'flex',
      marginBottom: '10px',
      flexDirection: 'column',
      textAlign: 'center',
      '@media (min-width: 650px)': {
        flexDirection: 'row'
      },
      '& div': {
        textAlign: 'center',
        margin: '10px 0',
        color: theme.grey
      },
      '& b': {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        '@media (min-width: 650px)': {
          marginLeft: '5px',
          justifyContent: 'flex-end'
        }
      }
    }
  }
}));

DashboardCards.propTypes = propTypes;

export default DashboardCards;
