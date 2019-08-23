import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import DashboardHeader from '../Account/Header';
import { formatLP } from '../../util/Helpers';
import addons from '../../lib/addonContent';

const propTypes = {};

let useStyles;

const Order = props => {
  const classes = useStyles();
  const { order, session } = props;

  return (
    <div className={classes.root}>
      <DashboardHeader order={order} />

      {order && (
        <div className={classes.wrapper}>
          <h3>Order Summary</h3>
          <h2>{order.title}</h2>
          <h3>Details</h3>

          <span>
            LP: <b>{formatLP(order.lp)}</b>
          </span>

          <span>
            Type: <b>{order.details.boostType}</b>
          </span>
          <span>
            Server: <b>{order.details.server}</b>
          </span>
          <span>
            Boost: <b>{order.details.collectionName}</b>
          </span>
          <span>
            Queue:
            <b>
              {` ${order.details.queue.charAt(0).toUpperCase()}${order.details.queue.slice(1)} ` +
                `Queue`}
            </b>
          </span>
          <h3>Add-Ons</h3>
          {addons.addons.extras.map((extra, index) => (
            <span key={index}>
              {extra.title}: <b>{order.details[extra.type] ? 'Yes' : 'No'}</b>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

useStyles = createUseStyles(theme => ({
  root: {}
}));

Order.propTypes = propTypes;

export default Order;
