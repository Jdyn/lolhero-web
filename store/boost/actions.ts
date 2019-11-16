import * as Sentry from '@sentry/browser';
import Router from 'next/router';
import { Dispatch } from 'redux';
import Api from '../../services/api';
import calculatePrice from '../../util/CalculatePrice';
import { boostActions, boostRequests, BoostActionTypes, BoostOrder, BoostPricing } from './types';
import { setRequest } from '../request/actions';
import { AppState } from '../root';

const validateOrder = (order: BoostOrder, dispatchError: (message: string) => void): boolean => {
  const { collectionName, startRank, desiredRank, desiredAmount } = order.details;

  if (!startRank) {
    dispatchError('You must have a starting rank.');
    return false;
  }

  if (collectionName === 'Division Boost') {
    if (!desiredRank) {
      dispatchError('You must have a desired rank.');
      return false;
    }
    if (startRank > desiredRank) {
      dispatchError('Your starting rank cannot be greater than your desired rank.');
      return false;
    }
  } else if (!desiredAmount) {
    dispatchError('You must have a desired amount.');
    return false;
  }

  return true;
};

const trimOrder = (order: BoostOrder): BoostOrder => {
  const newOrder = { ...order };
  if (order.details.collectionName === 'Division Boost') {
    delete newOrder.details.desiredAmount;
  } else {
    delete newOrder.details.desiredRank;
  }

  return newOrder;
};

const setBoostPrices = (prices: BoostPricing): BoostActionTypes => ({
  type: boostActions.FETCH_BOOST_PRICES,
  prices
});

export const fetchBoostPrices = () => (dispatch: Dispatch, getState: () => AppState): void => {
  const requestType = boostRequests.BOOST_PRICING;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  Api.fetch('/prices').then(response => {
    if (response.ok) {
      dispatch(setBoostPrices(response.result));
      dispatch(setRequest(false, requestType));
    } else {
      dispatch(
        setRequest(false, requestType, {
          errored: true,
          message: 'Failed to Fetch'
        })
      );
    }
  });
};

const setBoost = (
  newPrice: number,
  detailsUpdate: object,
  orderUpdate: object
): BoostActionTypes => ({
  type: boostActions.UPDATE_BOOST,
  newPrice,
  detailsUpdate,
  orderUpdate
});

export const updateOrder = (detailsUpdate: object, orderUpdate?: object) => (
  dispatch: Dispatch,
  getState: () => AppState
): void => {
  const requestType = boostRequests.PURCHASE_ORDER;
  const request = getState().request[requestType] || { error: { errored: false } };

  if (request.error.errored) {
    dispatch(
      setRequest(false, boostRequests.PURCHASE_ORDER, {
        errored: false,
        message: ''
      })
    );
  }

  const order = { ...getState().boost.order.details, ...detailsUpdate };
  const pricing = getState().boost.pricing[order.boostType];
  const price = calculatePrice(order, pricing);

  dispatch(setBoost(price, { ...detailsUpdate }, { ...orderUpdate }));
};

export const submitOrder = () => (dispatch: Dispatch, getState: () => AppState): void => {
  const requestType = boostRequests.PURCHASE_ORDER;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  const order = { ...getState().boost.order };

  const dispatchError = (message: string): void => {
    dispatch(
      setRequest(false, requestType, {
        errored: true,
        message
      })
    );
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