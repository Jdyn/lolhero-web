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
  }
}));

Order.propTypes = propTypes;

export default Order;
