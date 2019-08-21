import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const propTypes = {};

let useStyles;

const Order = props => {
  const classes = useStyles();

  return <div className={classes.root}>
    
  </div>;
};

useStyles = createUseStyles(theme => ({
  root: {}
}));

Order.propTypes = propTypes;

export default Order;
