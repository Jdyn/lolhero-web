import Link from 'next/link';
import React from 'react';
import Filter from '../reusable/Filter';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const propTypes = {
  setStage: PropTypes.func.isRequired,
  currentStage: PropTypes.number.isRequired
};

const filters = ['boost', 'add-ons', 'details', 'review'];

const TopNavigator = props => {
  const { currentStage, setStage, boost, valid, session } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link href="/">
        <div className={classes.logo}>LoL Hero</div>
      </Link>
      <div className={classes.container}>
        <Filter
          extended
          filters={filters}
          untargetableIndices={
            (valid.payment && valid.details && boost.order.paymentMethodIsSelected) ||
            (session.isLoggedIn && boost.order.paymentMethodIsSelected)
              ? []
              : [3]
          }
          selectedIndex={currentStage}
          onClick={index => setStage(index)}
        />
      </div>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    top: 0,
    width: '100%',
    zIndex: 50,
    display: 'flex',
    position: 'fixed',
    height: '76px',
    // marginTop: '-76px',
    justifyContent: 'center',
    borderBottom: `2px solid #999`,
    backgroundColor: theme.tertiary,
    '@media (min-width: 1025px)': {
      position: 'fixed',
      marginTop: 0
    },
    '@media (min-width: 640px)': {
      justifyContent: 'flex-start'
    }
  },
  container: {
    display: 'none',
    position: 'relative',
    flexGrow: 1,
    marginBottom: '-2px',
    '@media (min-width: 1025px)': {
      display: 'flex'
    }
  },
  logo: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 45px',
    marginBottom: '-2px',
    cursor: 'pointer',
    transitionDuration: '.15s',
    borderBottom: '2px solid #999',
    color: theme.white,
    fontSize: 28,
    '&:hover': {
      borderColor: `${theme.accent} !important`,
      color: `${theme.accent} !important`
    }
  }
}));

TopNavigator.propTypes = propTypes;

export default TopNavigator;
