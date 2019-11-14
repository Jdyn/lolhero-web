import { Dispatch } from 'redux';
import { NextPageContext } from 'next';
import Api from '../../services/api';
import { AppState } from '../root';
import { setRequest } from '../request/actions';
import { accountActions, accountRequests, AccountActionTypes, OrderList, Order } from './types';

export const setOrderList = (orders: OrderList): AccountActionTypes => ({
  type: accountActions.ORDER_LIST,
  orders
});

export const fetchAccountOrderList = () => (dispatch: Dispatch, getState: () => AppState): void => {
  const requestType = accountRequests.FETCH_ACCOUNT_ORDER_LIST;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  Api.fetch(`/account/orders`)
    .then((response): void => {
      if (response.ok) {
        const { completed, active, total } = response.result;

        const payload = {
          ...response.result,
          total: {
            ...total,
            orders: [...completed.orders, ...active.orders]
          }
        };

        dispatch(setOrderList(payload));
        dispatch(setRequest(false, requestType));
      } else {
        dispatch(
          setRequest(false, requestType, {
            errored: true,
            error: 'Error fetching account orders.'
          })
        );
      }
    })
    .catch((): void => {
      dispatch(
        setRequest(false, requestType, {
          errored: true,
          error: 'Error fetching account orders.'
        })
      );
    });
};

const setOrderDetails = (order: Order): AccountActionTypes => ({
  type: accountActions.SET_CURRENT_ORDER,
  order
});

export const fetchOrder = (trackingId: string, email: string) => (
  dispatch: Dispatch,
  getState: () => AppState
): void => {
  const requestType = accountRequests.FETCH_ACCOUNT_ORDER;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  Api.post(`/order/${trackingId}`, { email }).then(response => {
    if (response.ok) {
      dispatch(setOrderDetails(response.result.order));
      dispatch(setRequest(false, requestType));
    } else {
      dispatch(
        setRequest(false, requestType, {
          errored: true,
          error: response.error
        })
      );
    }
  });
};

export const fetchAccountOrder = (trackingId: string, context: NextPageContext) => async (
  dispatch: Dispatch,
  getState: () => AppState
): Promise<void> => {
  const requestType = accountRequests.FETCH_ACCOUNT_ORDER;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  const response = await Api.fetch(`/account/order/${trackingId}`, { ctx: context });

  if (response.ok) {
    dispatch(setOrderDetails(response.result.order));
    dispatch(setRequest(false, requestType));
  } else {
    dispatch(
      setRequest(false, requestType, {
        errored: true,
        error: response.error
      })
    );
  }
};

const setInitialOrder = (order: Order): AccountActionTypes => ({
  type: accountActions.INITIATE_ORDER,
  order
});

export const initializeOrder = (payload: object, trackingId: number) => (
  dispatch: Dispatch
): void => {
  Api.patch(`/order/${trackingId}`, payload).then(response => {
    if (response.ok) {
      dispatch(setInitialOrder(response.result.order));
    }
  });
};
