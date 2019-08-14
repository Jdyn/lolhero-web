import React from 'react';
// import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from 'react-jss';

const propTypes = {};

let useStyles;

const DashboardCards = props => {
  const { account, setFilter, selectedFilter } = props;
  const classes = useStyles();
  const theme = useTheme();

  const handleFilterChange = orderKey => {
    setFilter(orderKey);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {Object.keys(account.orders).map(orderKey => {
          const order = account.orders[orderKey];
          return (
            <button
              type="button"
              key={orderKey}
              className={classes.card}
              onClick={() => handleFilterChange(orderKey)}
              style={{ borderColor: selectedFilter === orderKey ? theme.grey : theme.quartinary }}
            >
              <h3>{order.title || '...'}</h3>
              <span>{order.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

useStyles = createUseStyles(theme => ({
  root: {
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    padding: '30px',
    maxWidth: '795px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '100%',
    display: 'grid',
    gridGap: '10px',
    gridTemplateRows: '1fr 1fr 1fr',
    gridTemplateColumns: '1fr',
    '@media (min-width: 650px)': {
      gridGap: '25px',
      gridTemplateRows: '1fr',
      gridTemplateColumns: '1fr 1fr 1fr'
    }
  },
  card: {
    color: theme.white,
    display: 'flex',
    padding: '24px',
    outline: 'none',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 600,
    borderRadius: 24,
    backgroundColor: theme.quartinary,
    boxShadow: '0px 5px 10px 0px rgba(0,0,0,.2)',
    textAlign: 'center',
    cursor: 'pointer',
    border: '2px solid #999',
    transitionDuration: '.2s',
    '&:hover': {
      transform: 'translateY(2px)',
      boxShadow: '0px 0px 5px 0px rgba(0,0,0,.2)'
    },
    '@media (min-width: 650px)': {
      flexDirection: 'column',
      justifyContent: 'center'
    },
    '& span': {
      margin: '5px 0',
      fontSize: 50,
      '@media (min-width: 650px)': {
        margin: '24px 0'
      }
    }
  }
}));

DashboardCards.propTypes = propTypes;

export default DashboardCards;
