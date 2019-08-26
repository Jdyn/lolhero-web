import { Reducer } from 'redux';
import { AccountState, AccountActions, actions } from './types';

const initialState: AccountState = {
  orders: {
    total: {
      title: '',
      count: 0,
      orders: []
    },
    active: {
      title: '',
      count: 0,
      orders: []
    },
    completed: {
      title: '',
      count: 0,
      orders: []
    }
  }
};

const reducer: Reducer<AccountState, AccountActions> = (
  state: AccountState = initialState,
  action: AccountActions
): AccountState => {
  switch (action.type) {
    case actions.FETCH_ACCOUNT_ORDERS:
      return {
        ...state,
        orders: action.orders
      };

    default:
      return state;
  }
};

export default reducer;
