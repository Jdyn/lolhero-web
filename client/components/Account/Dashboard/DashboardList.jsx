import React from 'react';
// import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from 'react-jss';
import formatTime from '../../../util/formatTime';

const propTypes = {};

let useStyles;

const DashboardCards = props => {
  const { orders, selectedFilter } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {orders && (
          <div className={classes.grid}>
            {orders[selectedFilter].orders.map((order, index) => (
              <div
                type="button"
                className={classes.gridItem}
                key={order.trackingId}
                style={{ backgroundColor: index % 2 === 0 ? theme.tertiary : theme.primary }}
              >
                <span>{order.trackingId}</span>
                <span>{order.title}</span>
                <span>{order.status}</span>
                <span>{formatTime(order.createdAt)}</span>
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
    padding: '0px 15px 30px 15px',
    margin: '0 auto',
    '@media (min-width: 650px)': {
      padding: '0px 30px 30px 30px'
    }
  },
  container: {
    display: 'flex',
    position: 'relative',
    padding: '10px 10px',
    minHeight: '500px',
    backgroundColor: theme.quartinary,
    borderRadius: 24,
    boxShadow: '0px 2px 6px 0px rgba(0,0,0, .2)'
  },
  grid: {
    display: 'grid',
    width: '100%',
    minWidth: 0,
    minHeight: 0,
    color: theme.secondaryWhite,
    // overflowY: 'auto',
    padding: '0px 10px',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'min-content'
  },
  gridItem: {
    display: 'inline-grid',
    gridTemplateColumns: '1fr 3fr 0.5fr 1fr',
    // gridTemplateRows: 'min-content',
    // marginBottom: '5px',
    // backgroundColor: theme.secondary,
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

DashboardCards.propTypes = propTypes;

export default DashboardCards;
