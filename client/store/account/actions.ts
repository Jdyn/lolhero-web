import { Dispatch } from 'redux';
import Api from '../../services/api';
import { AppState } from '../root';
import { setRequest } from '../request/actions';
import { accountActions, accountRequests, AccountActionTypes, OrderList, Order } from './types';

export const setAccountOrders = (orders: OrderList): AccountActionTypes => ({
  type: accountActions.FETCH_ACCOUNT_ORDERS,
  orders
});

export const fetchAccountOrders = () => (dispatch: Dispatch, getState: () => AppState): void => {
  const requestType = accountRequests.ACCOUNT_ORDERS;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  const { isAdmin } = getState().session.user;

  Api.fetch(`${isAdmin ? '/admin' : ''}/account/orders`)
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

        dispatch(setAccountOrders(payload));
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

const updateAccountOrderDetails = (order: Order): AccountActionTypes => ({
  type: accountActions.UPDATE_ACCOUNT_ORDER_DETAILS,
  order
});

export const fetchAccountOrderDetails = (trackingId: number) => (
  dispatch: Dispatch,
  getState: () => AppState
): void => {
  const requestType = accountRequests.ACCOUNT_ORDER_DETAILS;
  const request = getState().request[requestType] || { isPending: false };

  if (request.isPending) return;

  Api.patch(`/account/order/${trackingId}`).then(response => {
    if (response.ok) {
      dispatch(updateAccountOrderDetails(response.result.order));
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

const setInitialOrder = (order: Order): AccountActionTypes => ({
  type: accountActions.INITIATE_ACCOUNT_ORDER,
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
