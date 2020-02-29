import * as Sentry from '@sentry/browser';
import { NextPageContext } from 'next';
import Router from 'next/router';
import { Dispatch } from 'redux';
import Api from '../../services/api';
import PriceCalculator from '../../util/PriceCalculator';
import { boostRequests, BoostOrder } from './types';
import { boostUpdated, boostPricingFetched } from './reducers';
import { setRequest } from '../request/actions';
import { AppState } from '..';

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

export const fetchBoostPrices = (ctx?: NextPageContext) => async (
  dispatch: Dispatch,
  getState: () => AppState
): Promise<void> => {
  const requestType = boostRequests.BOOST_PRICING;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  let response;

  try {
    response = await Api.fetch('/prices', { ctx });
  } catch (e) {
    dispatch(setRequest(false, requestType, 'Failed to Fetch'));
  }

  if (response.ok) {
    dispatch(boostPricingFetched(response.result));
    dispatch(setRequest(false, requestType));
  } else {
    dispatch(setRequest(false, requestType, 'Failed to Fetch'));
  }
};

export const updateOrder = (detailsUpdate: object, orderUpdate?: object) => (
  dispatch: Dispatch,
  getState: () => AppState
): void => {
  const requestType = boostRequests.PURCHASE_ORDER;
  const request = getState().request[requestType] || { errored: false };

  if (request.errored) {
    dispatch(setRequest(false, requestType));
  }

  const { boost } = getState();

  let newPrice = 0;

  if (boost.pricing) {
    const order = { ...boost.order.details, ...detailsUpdate };

    const pricing = boost.pricing[order.boostType];
    newPrice = PriceCalculator(order, pricing);
  }

  const payload = {
    newPrice,
    detailsUpdate,
    orderUpdate
  };

  dispatch(boostUpdated(payload));
};

export const submitOrder = () => (dispatch: Dispatch, getState: () => AppState): void => {
  const requestType = boostRequests.PURCHASE_ORDER;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  const order = { ...getState().boost.order };

  const dispatchError = (error: string): void => {
    dispatch(setRequest(false, requestType, error));
  };

  if (validateOrder(order, dispatchError)) {
    Api.post('/order/create', order)
      .then(response => {
        if (response.ok) {
          dispatch(setRequest(false, requestType));
          Router.push({
            pathname: response.result.success_url
          });
        } else {
          const errors = response.errors || [];
          const message =
            errors[Object.keys(errors)[0]] ||
            'There was an error placing your order. Please try again later or contact support.';

          dispatchError(message);
        }
      })
      .catch(error => {
        dispatchError(
          'There was an error placing your order. Please try again later or contact support.'
        );
        Sentry.captureException(error);
      });
  }
};
