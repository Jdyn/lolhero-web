import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const propTypes = {};

let useStyles;

const cards = [
  {
    title: 'Total Orders'
  },
  {
    title: 'Active Orders'
  },
  {
    title: 'Complete Orders'
  }
];

const DashboardCards = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {cards.map(card => (
          <div key={card.title} className={classes.card}>
            <h3>{card.title}</h3>
            <span>0</span>
          </div>
        ))}
      </div>
    </div>
  );
};

useStyles = createUseStyles(theme => ({
  root: {
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    padding: '50px 0 0px 0',
    maxWidth: '935px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '100%',
    display: 'grid',
    gridGap: '10px',
    padding: '10px 30px',
    gridTemplateRows: '1fr 1fr 1fr',
    gridTemplateColumns: '1fr',
    '@media (min-width: 650px)': {
      gridGap: '25px',
      padding: '10px 100px',
      gridTemplateRows: '1fr',
      gridTemplateColumns: '1fr 1fr 1fr'
    }
  },
  card: {
    color: theme.white,
    display: 'flex',
    padding: '24px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 600,
    borderRadius: 12,
    backgroundColor: theme.tertiary,
    boxShadow: '0px 2px 6px 0px rgba(0,0,0, .2)',
    textAlign: 'center',
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
