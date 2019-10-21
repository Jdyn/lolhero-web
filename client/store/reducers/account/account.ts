import { Reducer } from 'redux';
import { AccountState, accountActions, AccountActionTypes } from './types';

const initialState: AccountState = {
  orders: {
    active: {
      title: 'Active Orders',
      count: 0,
      orders: []
    },
    completed: {
      title: 'Completed Orders',
      count: 0,
      orders: []
    },
    total: {
      title: 'Total Orders',
      count: 0,
      orders: []
    }
  }
};

const reducer: Reducer<AccountState, AccountActionTypes> = (
  state: AccountState = initialState,
  action: AccountActionTypes
): AccountState => {
  switch (action.type) {
    case accountActions.FETCH_ACCOUNT_ORDERS:
      return {
        ...state,
        orders: action.orders
      };

    default:
      return state;
  }
};

export default reducer;
