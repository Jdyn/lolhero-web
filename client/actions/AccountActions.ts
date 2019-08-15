import { actions, requests, AccountActions, Orders } from '../reducers/account/types';
import { AppState } from '../reducers';
import { setRequest } from './RequestActions';
import Api from '../services/api';

export const setAccountOrders = (orders: Orders): AccountActions => ({
  type: actions.FETCH_ACCOUNT_ORDERS,
  orders
});

export const fetchAccountOrders = (): ((dispatch: Function, getState: () => AppState) => void) => (
  dispatch,
  getState
): void => {
  const requestType = requests.ACCOUNT_ORDERS;
  const request = getState().request[requestType] || {};

  if (request.isPending) return;

  dispatch(setRequest(true, requestType));

  Api.fetch('/account/orders')
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
