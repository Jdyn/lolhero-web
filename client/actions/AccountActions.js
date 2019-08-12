import keyMirror from '../util/keyMirror';
import { setRequestInProcess } from './RequestActions';
import Api from '../services/api';

export const actions = keyMirror('FETCH_ACCOUNT_ORDERS');
export const requests = keyMirror('ACCOUNT_ORDERS');

const setAccountOrders = orders => ({
  type: actions.FETCH_ACCOUNT_ORDERS,
  orders
});

export const fetchAccountOrders = () => (dispatch, getState) => {
  const requestType = requests.ACCOUNT_ORDERS;
  const requestInProcess = getState().request[requestType] || {};

  if (requestInProcess.isPending) return;

  dispatch(setRequestInProcess(true, requestType));

  Api.fetch('/account/orders')
    .then(response => {
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
        dispatch(setRequestInProcess(false, requestType));
      } else {
        dispatch(
          setRequestInProcess(false, requestType, {
            errored: true,
            error: 'Error fetching account orders.'
          })
        );
      }
    })
    .catch(error => {
      dispatch(
        setRequestInProcess(false, requestType, {
          errored: true,
          error: 'Error fetching account orders.'
        })
      );
    });
};
