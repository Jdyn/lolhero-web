import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { createUseStyles, useTheme } from 'react-jss';
import formatTime from '../../../util/formatTime';

const propTypes = {
  orders: PropTypes.shape({}),
  selectedFilter: PropTypes.string.isRequired
};

let useStyles;

const DashboardList = props => {
  const { orders, selectedFilter } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <span>tracking ID</span>
          <span>Service</span>
          <span>status</span>
          <span>Order Date</span>
        </div>
        {orders && (
          <div className={classes.grid}>
            {orders[selectedFilter].orders.map((order, index) => (
              <Link
                key={order.trackingId}
                href={{
                  pathname: '/account/order',
                  query: { trackingId: order.trackingId }
                }}
                as={`/account/order/${order.trackingId}`}
              >
                <div
                  className={classes.gridItem}
                  key={order.trackingId}
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? theme.tertiary : theme.primary
                  }}
                >
                  <span>{order.trackingId}</span>
                  <span>{order.title}</span>
                  <span>{order.status}</span>
                  <span>{formatTime(order.createdAt)}</span>
                </div>
              </Link>
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
    padding: '0px 15px 30px 15px',
    margin: '0 auto',
    '@media (min-width: 650px)': {
      padding: '0px 30px 30px 30px'
    }
  },
  header: {
    display: 'inline-grid',
    gridTemplateColumns: '1fr 3fr 0.5fr 1fr',
    padding: '15px 10px',
    color: theme.white,
    '& span': {
      padding: '5px'
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    padding: '10px 10px',
    minHeight: '500px',
    backgroundColor: theme.quartinary,
    borderRadius: 8,
    boxShadow: '0px 2px 6px 0px rgba(0,0,0, .2)'
  },
  grid: {
    display: 'grid',
    width: '100%',
    minWidth: 0,
    minHeight: 0,
    color: theme.secondaryWhite,
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'min-content',
    gridAutoRows: 'min-content'
  },
  gridItem: {
    display: 'inline-grid',
    gridTemplateColumns: '1fr 3fr 0.5fr 1fr',
    marginBottom: '5px',
    padding: '15px 10px',
    borderRadius: 8,
    cursor: 'pointer',
    transitionDuration: '.2s',
    '& span': {
      padding: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    '&:hover': {
      // transform: 'translateY(2px)',
      boxShadow: '0px 2px 6px 0px rgba(0,0,0, .2)'
    }
  }
}));

DashboardList.propTypes = propTypes;

export default DashboardList;
