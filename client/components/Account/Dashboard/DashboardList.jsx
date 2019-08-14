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
          <table className={classes.table}>
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Service</th>
                <th>Purchase Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders[selectedFilter].orders.map(order => (
                <tr key={order.trackingId} onClick={() => console.log(order)}>
                  <td>{order.trackingId}</td>
                  <td>{order.title}</td>
                  <td>ok</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
    height: '500px',
    display: 'flex',
    backgroundColor: theme.quartinary,
    borderRadius: 24,
    boxShadow: '0px 2px 6px 0px rgba(0,0,0, .2)',
    padding: '30px 20px'
  },
  table: {
    display: 'table',
    width: '100%',
    borderCollapse: 'collapse',
    // height: '100%',
    color: theme.white,
    '& thead': {
      display: 'table-header-group',
      textAlign: 'left',
      '& tr': {
        '& th': {
          padding: '15px',
          fontSize: 14
        }
      }
    },
    '& tbody': {
      '& tr': {
        padding: "15px 0",
        borderCollapse: 'collapse',
        transitionDuration: '.2s',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0px 2px 2px 0px rgba(0,0,0,.1)'
        },
        '& td': {
          padding: '15px'
        }
      }
    }
  }
}));

DashboardCards.propTypes = propTypes;

export default DashboardCards;
