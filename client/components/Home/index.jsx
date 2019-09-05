import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { createUseStyles, useTheme } from 'react-jss';
import Button from '../Shared/Button';
import Link from 'next/link';
import HomeCard from './HomeCard';

const propTypes = {};

const cards = [
  {
    title: 'card1'
  },
  {
    title: 'card2'
  },
  {
    title: 'card3'
  }
];

const Home = props => {
  const classes = useStyles(props);
  const theme = useTheme();

  const [form, setForm] = useState({ trackingId: '' });

  const handleOrderSearch = event => {
    event.preventDefault();

    if (form.trackingId) {
      Router.push(
        { pathname: '/order/order', query: { trackingId: form.trackingId } },
        `/track/${form.trackingId}`
      );
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h1>LoL Hero</h1>
        <h2>League of Legends</h2>
        <form className={classes.form} onSubmit={handleOrderSearch}>
          <input
            value={form.trackingId}
            onChange={event => setForm({ trackingId: event.target.value })}
            placeholder="Enter tracking ID"
            aria-label="search"
            className={classes.search}
          />
          <button className={classes.formSubmit}>Go</button>
        </form>
      </div>
      <div className={classes.wrapper}>
        <Link href="/order/boost">
          <Button grow maxWidth="185px" padding="15px 10px">
            Customize Order
          </Button>
        </Link>
      </div>
      <div className={classes.content}>
        {cards.map((item, index) => (
          <HomeCard card={item} key={index} />
        ))}
      </div>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    padding: '60px 10px 30px 10px',
    backgroundColor: theme.secondary,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    '& h1': {
      fontSize: 45,
      margin: 0,
      color: theme.white
    },
    '& h2': {
      color: theme.white,
      margin: '0 0 25px 0',
      fontSize: 32
    }
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: '30px 0 60px 0px',
    '@media (min-width: 650px)': {
      flexDirection: 'row'
    }
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '80px 0 300px 0',
    padding: '10px 10px 30px 10px',
    '@media (min-width: 650px)': {
      flexDirection: 'row'
    },
    backgroundColor: theme.tertiary
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    width: '100%',
    maxWidth: '450px',
    borderRadius: '8px',
    backgroundColor: theme.quartinary,
    padding: '10px 16px',
    minWidth: 0
    // height: '55px'
  },
  formSubmit: {
    backgroundColor: theme.quartinary,
    border: 'none',
    outline: 'none',
    borderRadius: '50%',
    height: '40px',
    width: '40px',
    transitionDuration: '.2s',
    cursor: 'pointer',
    color: theme.secondaryWhite,
    '&:hover': {
      backgroundColor: theme.primary
    }
  },
  search: {
    display: 'flex',
    flex: 1,
    color: theme.white,
    margin: '0 10px',
    border: 'none',
    outline: 'none',
    minWidth: 0,
    fontSize: 16,
    backgroundColor: 'transparent'
  }
}));

Home.propTypes = propTypes;

export default Home;
