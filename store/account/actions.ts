import { Dispatch } from 'redux';
import { NextPageContext } from 'next';
import Api from '../../services/api';
import { AppState } from '..';
import { setRequest } from '../request/actions';
import { accountRequests } from './types';
import { orderListFetched, orderUpdated } from './reducers';
import 'isomorphic-unfetch';

type GetState = () => AppState;

export const fetchAccountOrderList = (ctx?: NextPageContext) => async (
  dispatch: Dispatch,
  getState: GetState
): Promise<void> => {
  const requestType = accountRequests.FETCH_ACCOUNT_ORDER_LIST;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  const response = await Api.fetch(`/account/orders`, { ctx });

  if (response.ok) {
    const {
      boosters,
      orders: { total, completed, active }
    } = response.result;

    const payload = {
      boosters,
      orders: {
        ...response.result.orders,
        total: {
          ...total,
          orders: [...completed.orders, ...active.orders]
        }
      }
    };

    dispatch(orderListFetched(payload));
    dispatch(setRequest(false, requestType));
  } else {
    dispatch(setRequest(false, requestType, 'Error fetching account orders.'));
  }
};

export const fetchOrder = (id: string, email: string = null) => async (
  dispatch: Dispatch,
  getState: GetState
): Promise<void> => {
  const requestType = accountRequests.FETCH_ORDER;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  let response;

  if (email) {
    response = await Api.post(`/order/${id}`, { email });
  } else {
    response = await Api.fetch(`/account/order/${id}`);
  }

  if (response.ok) {
    dispatch(orderUpdated({ order: response.result.order }));
    dispatch(setRequest(false, requestType));
  } else {
    dispatch(setRequest(false, requestType, response.error));
  }
};

export const fetchPasswordReset = (email: string) => async (
  dispatch: Dispatch,
  getState: GetState
): Promise<void> => {
  const requestType = accountRequests.FETCH_ACCOUNT_PASSWORD_RESET;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  await Api.post('/account/password/reset', { email });

  dispatch(setRequest(false, requestType));
};

export const fetchPasswordUpdate = (password: string, resetToken: string) => async (
  dispatch: Dispatch,
  getState: GetState
): Promise<void> => {
  const requestType = accountRequests.FETCH_ACCOUNT_PASSWORD_UPDATE;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  const response = await Api.patch('/account/password/update', {
    password,
    resetToken
  });

  if (response.ok) {
    dispatch(setRequest(false, requestType));
  } else {
    dispatch(setRequest(false, requestType, response.error));
  }
};

export const initializeOrder = (
  payload: object,
  trackingId: string,
  email: string = null
) => async (dispatch: Dispatch, getState: () => AppState): Promise<void> => {
  const requestType = accountRequests.INITIALIZE_ORDER;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  let response;

  if (email) {
    response = await Api.patch(`/order/${trackingId}`, { ...payload, email });
  } else {
    response = await Api.patch(`/account/order/${trackingId}`, { ...payload });
  }

  if (response.ok) {
    dispatch(orderUpdated({ order: response.result.order }));
    dispatch(setRequest(false, requestType));
  } else {
    dispatch(setRequest(false, requestType, 'Please fill out every field.'));
  }
};

export const updateOrderStatus = (
  status: string,
  trackingId: string,
  email: string = null
) => async (dispatch: Dispatch, getState: GetState): Promise<void> => {
  const requestType = accountRequests.UPDATE_ORDER_STATUS;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  let response;

  if (email) {
    response = await Api.post(`/order/${trackingId}/status`, { email, status });
  } else {
    response = await Api.post(`/account/order/${trackingId}/status`, { status });
  }

  if (response.ok) {
    dispatch(orderUpdated({ order: response.result.order }));
    dispatch(setRequest(false, requestType));
  } else {
    dispatch(setRequest(false, requestType, response.error));
  }
};
