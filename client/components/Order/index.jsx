import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from 'react-jss';
import DashboardHeader from '../Account/Dashboard/Header/Header';
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
      <DashboardHeader session={session} order={order} />
      <OrderHero order={order} updateOrder={updateOrder} />
    </div>
  );
};

useStyles = createUseStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

Order.propTypes = propTypes;

export default Order;
