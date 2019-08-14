import { AccountState, AccountActions, actions } from './types';

const initialState: AccountState = {
  orders: {
    total: {
      orders: [],
      count: 0
    },
    active: {
      orders: [],
      count: 0
    },
    completed: {
      orders: [],
      count: 0
    }
  }
};

export default (state: AccountState = initialState, action: AccountActions): AccountState => {
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
