import { Dispatch } from 'redux';
import Api from '../../../services/api';
import { AppState } from '../../reducers';
import { setRequest } from '../RequestActions';
import {
  accountActions,
  accountRequests,
  AccountActionTypes,
  Orders
} from '../../reducers/account/types';

export const setAccountOrders = (orders: Orders): AccountActionTypes => ({
  type: accountActions.FETCH_ACCOUNT_ORDERS,
  orders
});

export const fetchAccountOrders = (): ((dispatch: Dispatch, getState: () => AppState) => void) => (
  dispatch,
  getState
): void => {
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
