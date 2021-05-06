import Router from 'next/router';
import { Dispatch } from 'redux';
import Api from '../../services/api';
import PriceCalculator from '../../util/PriceCalculator';
import { boostRequests, BoostOrder } from './types';
import { boostUpdated, boostPricingFetched } from './reducers';
import { setRequest } from '../request/actions';
import { AppState } from '..';

type GetState = () => AppState;

const validateOrder = (order: BoostOrder, dispatchError: (message: string) => boolean): boolean => {
  const { collectionName, startRank, desiredRank, desiredAmount } = order.details;

  if (!startRank) return dispatchError('You must have a starting rank.');

  if (collectionName === 'Division Boost') {
    if (!desiredRank) return dispatchError('You must have a desired rank.');
    if (startRank > desiredRank)
      return dispatchError('Your starting rank cannot be greater than your desired rank.');
  }

  if (!desiredAmount) return dispatchError('You must have a desired amount.');

  return true;
};

export const fetchBoostPrices = () => async (
  dispatch: Dispatch,
  getState: GetState
): Promise<void> => {
  const requestType = boostRequests.BOOST_PRICING;
  const request = getState().request[requestType];

  if (request?.isPending) return;

  dispatch(setRequest(true, requestType));

  const { ok, result } = await Api.fetch('/prices');

  if (ok) {
    dispatch(boostPricingFetched(result));
    dispatch(setRequest(false, requestType));
  } else {
    dispatch(setRequest(false, requestType, 'Failed to Fetch'));
  }
};

export const updateOrder = (detailsUpdate: object, orderUpdate?: object) => (
  dispatch: Dispatch,
  getState: GetState
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

export const submitOrder = () => async (
  dispatch: Dispatch,
  getState: () => AppState
): Promise<void> => {
  const requestType = boostRequests.PURCHASE_ORDER;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  const order = { ...getState().boost.order };

  const dispatchError = (error: string): boolean => {
    dispatch(setRequest(false, requestType, error));
    return false;
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
      .catch(() => {
        dispatchError(
          'There was an error placing your order. Please try again later or contact support.'
        );
      });
  }
};
