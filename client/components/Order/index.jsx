import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from 'react-jss';
import DashboardHeader from '../Account/Header';
import { formatLP } from '../../util/Helpers';
import addons from '../../lib/addonContent';
import OrderHero from './OrderHero';

const propTypes = {};

let useStyles;

const Order = props => {
  const classes = useStyles();
  const { order, session, updateOrder } = props;


  return (
    <div className={classes.root}>
      <DashboardHeader order={order} />
      <OrderHero order={order} updateOrder={updateOrder} />
    </div>
  );
};

useStyles = createUseStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    display: 'grid',
    gridTemplateRows: 'min-content 1fr',
    gridTemplateColumns: '2fr 1fr',
    gridTemplateAreas: `
    'hero hero'
    '. .'
    `,
    flexDirection: 'column',
    maxWidth: '1000px',
    width: '100%',
    flex: 1,
    margin: '0 auto',
    padding: '30px 30px'
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexGrow: 1,
    width: '100%',
    gridArea: 'hero',
    padding: '24px',
    maxWidth: '750px',
    margin: '0 auto',
    borderRadius: 18,
    backgroundColor: theme.quartinary,
    color: theme.white,
    '& h3': {
      margin: '0 0 15px 0'
    }
  },
  heroList: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  heroListItem: {
    display: 'flex',
    padding: '5px 10px',
    margin: '0 0 5px 0',
    textAlign: 'left',
    borderRadius: 8,
    '& span': {
      display: 'flex',
      flex: 1,
      padding: '0 0 0 10px',
      justifyContent: 'flex-end'
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    color: theme.secondaryWhite,
    marginTop: '20px',
    '& span': {
      margin: '10px 0'
    }
  },
  formInput: {
    outline: 'none',
    border: 'none',
    borderRadius: 8,
    // height: '30px',
    padding: '13px',
    backgroundColor: theme.primary,
    color: theme.white
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginRight: '10px',
    textAlign: 'left',
    '& span': {
      textAlign: 'left !important'
    }
  },
  rolesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  rolesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.secondaryWhite,
    '& span': {
      fontSize: 16,
      margin: '10px 0'
    }
  },
  roles: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.primary,
    marginRight: '10px',
    padding: '3px',
    borderRadius: 8
  },
  role: {
    display: 'flex',
    minWidth: '36px',
    height: '36px',
    // padding: '15px 10px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    transitionDuration: '.2s',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: `${theme.quartinary} !important`
    }
  },
  notes: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.secondaryWhite,
    width: '100%',
    '& span': {
      fontSize: 16,
      margin: '10px 0'
    },
    '& textarea': {
      fontSize: 14,
      lineHeight: '24px',
      padding: '15px',
      border: 'none',
      overFlow: 'auto',
      whiteSpace: 'pre-wrap',
      width: '100%',
      borderRadius: 6,
      resize: 'vertical',
      outline: 'none',
      color: theme.white,
      backgroundColor: theme.primary,
      height: '100px'
    }
  }
}));

Order.propTypes = propTypes;

export default Order;
