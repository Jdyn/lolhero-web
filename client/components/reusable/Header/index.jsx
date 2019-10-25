import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import AuthDisplay from './auth/AuthDisplay/AuthDisplay';
import Router from 'next/router';

const propTypes = {};

const Header = props => {
  const { handleAuth, session, sessionRequest } = props;
  const classes = useStyles(props);

  const [form, setForm] = useState({
    trackingId: ''
  });

  const handleSubmit = event => {
    event.preventDefault();
    Router.push(
      { pathname: '/order/order', query: { trackingId: form.trackingId } },
      `/track/${form.trackingId}`
    );
  };

  return (
    <header className={classes.root}>
      <Link href="/">
        <div className={classes.logo}>LoL Hero</div>
      </Link>
      <form className={classes.searchForm} onSubmit={handleSubmit}>
        <input
          value={form.trackingId || ''}
          onChange={event => setForm({ trackingId: event.target.value })}
          className={classes.orderSearch}
          aria-label="search"
          placeholder="Enter Tracking ID"
        />
      </form>

      <AuthDisplay handleAuth={handleAuth} session={session} sessionRequest={sessionRequest} />
    </header>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    zIndex: 50,
    display: 'flex',
    position: 'relative',
    backgroundColor: theme.tertiary,
    width: '100%',
    height: '76px',
    borderBottom: `2px solid #999`,
    gridArea: 'header',
    padding: '20px 0px 20px 0px',
    '@media (min-width: 650px)': {
      padding: '20px 40px 20px 0px'
    },
    top: 0,
    left: 0
  },
  logo: {
    flex: 1,
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px 45px',
    margin: '-20px 0 -22px 0',
    cursor: 'pointer',
    // width: '100%',
    maxWidth: '205px',
    transitionDuration: '.2s',
    borderBottom: '2px solid #999',
    color: theme.white,
    fontSize: 28,
    '&:hover': {
      borderColor: `${theme.accent} !important`,
      color: `${theme.accent} !important`
    }
  },
  searchForm: {
    display: 'none',
    flex: 2,
    justifyContent: 'flex-end',
    '@media (min-width: 650px)': {
      display: 'flex'
    }
  },
  orderSearch: {
    display: 'flex',
    flex: 1,
    maxWidth: '250px',
    minWidth: 0,
    width: '100%',
    border: 'none',
    outline: 'none',
    borderRadius: 8,
    padding: '15px',
    color: theme.white,
    backgroundColor: theme.primary
  }
}));

Header.propTypes = propTypes;

export default Header;
