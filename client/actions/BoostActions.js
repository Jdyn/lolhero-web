import * as Sentry from '@sentry/browser';
import Router from 'next/router';
import Api from '../services/api';
import keyMirror from '../util/keyMirror';
import { setRequest } from './RequestActions';
import calculatePrice from '../util/CalculatePrice';

export const actions = keyMirror('FETCH_BOOST_PRICES', 'UPDATE_BOOST');
export const requests = keyMirror('BOOST_PRICING', 'BOOST_ORDER', 'SUBMIT_ORDER');

const setBoostPrices = prices => ({
  type: actions.FETCH_BOOST_PRICES,
  prices
});

export const fetchBoostPrices = () => (dispatch, getState) => {
  const requestType = requests.BOOST_PRICING;
  const requestInProcess = getState().request[requestType] || {};

  if (requestInProcess.isPending) return;

  dispatch(setRequest(true, requestType));

  Api.fetch('/prices').then(response => {
    if (response.ok) {
      dispatch(setBoostPrices(response.result));
      dispatch(setRequest(false, requestType));
    } else {
      dispatch(
        setRequest(false, requestType, {
          errored: true,
          error: 'Failed to Fetch'
        })
      );
    }
  });
};

const setBoost = update => ({
  type: actions.UPDATE_BOOST,
  update
});

export const updateOrder = newUpdate => (dispatch, getState) => {
  if (newUpdate.boost) {
    dispatch(
      setBoost({
        order: { ...newUpdate.boost }
      })
    );
    return;
  }

  const requestType = requests.SUBMIT_ORDER;
  const request = getState().request[requestType] || {};

  if (request.errored) {
    dispatch(
      setRequest(false, requests.SUBMIT_ORDER, {
        errored: false
      })
    );
  }

  let order = { ...getState().boost.order.details, ...newUpdate };
  const pricing = getState().boost.pricing[order.boostType];

  const price = calculatePrice(order, pricing);

  if (order.lp !== 100) {
    order.promos = null;
  }

  dispatch(setBoost({ boost: { price }, details: { ...newUpdate } }));
};

export const submitOrder = () => (dispatch, getState) => {
  const requestType = requests.SUBMIT_ORDER;
  const requestInProcess = getState().request[requestType] || {};

  if (requestInProcess.isPending) return;

  dispatch(setRequest(true, requestType));

  let order = { ...getState().boost.order };

  const dispatchError = message => {
    dispatch(
      setRequest(false, requestType, {
        errored: true,
        error: message
      })
    );

    return false;
  };

  if (validateOrder(order, dispatchError)) {
    const finalOrder = trimOrder(order);

    if (typeof finalOrder === 'object') {
      Api.post('/orders', finalOrder)
        .then(response => {
          if (response.ok) {
            dispatch(setRequest(false, requestType));
            Router.push({
              pathname: response.result.success_url,
              query: { order: response.result }
            });
          } else {
            console.log(response);
            const errors = response.errors || [];
            const message =
              errors[Object.keys(errors)[0]] || 'Error placing order. Try again later.';

            dispatchError(message);
          }
        })
        .catch(error => {
          console.log(error);
          dispatchError('Error placing order. Try again later or contact support.');
          Sentry.captureException(error);
        });
    }
  }
};

const validateOrder = (order, dispatchError) => {
  const { collectionName, startRank, desiredRank, desiredAmount } = order.details;

  if (!startRank) return dispatchError('You must have a starting rank.');

  if (startRank > desiredRank)
    return dispatchError('Your starting rank cannot be greater than your desired rank.');

  if (collectionName === 'Division Boost') {
    if (!desiredRank) return dispatchError('You must have a desired rank.');
  } else if (!desiredAmount) return dispatchError('You must have a desired amount.');

  return true;
};

const trimOrder = order => {
  if (!order.details.collectionName) return dispatchError('Oops');

  if (order.details.collectionName === 'Division Boost') {
    delete order.details.desiredAmount;
  } else {
    delete order.details.desiredRank;
  }

  return order;
};
