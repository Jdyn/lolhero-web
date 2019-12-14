import { Dispatch } from 'redux';
import { NextPageContext } from 'next';
import Api from '../../services/api';
import { AppState } from '..';
import { setRequest } from '../request/actions';
import { accountRequests } from './types';
import { orderListFetched, orderUpdated } from './reducers';

export const fetchAccountOrderList = (ctx?: NextPageContext) => async (
  dispatch: Dispatch,
  getState: () => AppState
): Promise<void> => {
  const requestType = accountRequests.FETCH_ACCOUNT_ORDER_LIST;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  const response = await Api.fetch(`/account/orders`, { ctx });

  if (response.ok) {
    const { completed, active, total } = response.result;

    const orders = {
      ...response.result,
      total: {
        ...total,
        orders: [...completed.orders, ...active.orders]
      }
    };

    dispatch(orderListFetched({ orders }));
    dispatch(setRequest(false, requestType));
  } else {
    dispatch(setRequest(false, requestType, 'Error fetching account orders.'));
  }
};

export const fetchOrder = (id: string, email: string, ctx?: NextPageContext) => async (
  dispatch: Dispatch,
  getState: () => AppState
): Promise<void> => {
  const requestType = accountRequests.FETCH_ORDER;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  let response;

  if (email) {
    response = await Api.post(`/order/${id}`, { email });
  } else {
    response = await Api.fetch(`/account/order/${id}`, { ctx });
  }

  if (response.ok) {
    dispatch(orderUpdated({ order: response.result.order }));
    dispatch(setRequest(false, requestType));
  } else {
    dispatch(setRequest(false, requestType, response.error));
  }
};

export const initializeOrder = (payload: object, trackingId: number) => (
  dispatch: Dispatch
): void => {
  Api.patch(`/order/${trackingId}`, payload).then(response => {
    if (response.ok) {
      dispatch(orderUpdated({ order: response.result.order }));
    }
  });
};
