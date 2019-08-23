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

  const { server, queue, lp, boostType, collectionName } = order.details;

  return (
    <div className={classes.root}>
      <DashboardHeader order={order} />
      {order && (
        <div className={classes.container}>
          <div className={classes.hero}>
            <h3>{boostType} {collectionName}</h3>
            {Object.keys(order.details).map(detailKey => (
              <div>
                {detailKey}: {order.details[detailKey]}
              </div>
            ))}
          </div>
          <div> ok</div>
          <div> ok</div>
        </div>
      )}
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
    flexGrow: 1,
    gridArea: 'hero',
    padding: '30px',
    backgroundColor: theme.quartinary
  }
}));

Order.propTypes = propTypes;

export default Order;
