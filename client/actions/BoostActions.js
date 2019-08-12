import Api from '../services/api';
import keyMirror from '../util/keyMirror';
import { setRequestInProcess } from './RequestActions';
import * as Sentry from '@sentry/browser';
import calculatePrice from '../util/CalculatePrice';
import Router from 'next/router';

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

  dispatch(setRequestInProcess(true, requestType));

  Api.fetch('/prices').then(response => {
    if (response.ok) {
      dispatch(setBoostPrices(response.result));
      dispatch(setRequestInProcess(false, requestType));
    } else {
      dispatch(
        setRequestInProcess(false, requestType, {
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
  if (typeof newUpdate === 'string') {
    dispatch(
      setBoost({
        boost: { paymentMethodIsSelected: true },
        order: { nonce: newUpdate }
      })
    );
    return;
  }

  const requestType = requests.SUBMIT_ORDER;
  const request = getState().request[requestType] || {};

  if (request.errored) {
    dispatch(
      setRequestInProcess(false, requests.SUBMIT_ORDER, {
        errored: false
      })
    );
  }

  const order = { ...getState().boost.order.details, ...newUpdate };
  const pricing = getState().boost.pricing[order.boost_type];
  const price = calculatePrice(order, pricing);

  console.log(price);

  dispatch(setBoost({ boost: { price }, details: { ...newUpdate } }));
};

export const submitOrder = () => (dispatch, getState) => {
  const requestType = requests.SUBMIT_ORDER;
  const requestInProcess = getState().request[requestType] || {};

  if (requestInProcess.isPending) return;

  dispatch(setRequestInProcess(true, requestType));

  let order = { ...getState().boost.order };

  const dispatchError = message => {
    dispatch(
      setRequestInProcess(false, requestType, {
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
            dispatch(setRequestInProcess(false, requestType));
            window.location.href = response.result.success_url;
          } else {
            const errors = response.errors || [];
            const message =
              errors[Object.keys(errors)[0]] || 'Error placing order. Try again later.';

            dispatchError(message);
          }
        })
        .catch(error => {
          dispatchError('Error placing order. Try again later or contact support.');
          Sentry.captureException(error);
        });
    }
  }
};

const validateOrder = (order, dispatchError) => {
  const { collection_name, start_rank, desired_rank, desired_amount } = order.details;

  if (!start_rank) return dispatchError('You must have a starting rank.');

  if (start_rank > desired_rank)
    return dispatchError('Your starting rank cannot be greater than your desired rank.');

  if (collection_name === 'Division Boost') {
    if (!desired_rank) return dispatchError('You must have a desired rank.');
  } else {
    if (!desired_amount) return dispatchError('You must have a desired amount.');
  }

  return true;
};

const trimOrder = order => {
  if (!order.details.collection_name) return dispatchError('Oops');

  if (order.details.collection_name === 'Division Boost') {
    delete order.details.desired_amount;
  } else {
    delete order.details.desired_rank;
  }

  return order;
};
