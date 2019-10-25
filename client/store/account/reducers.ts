import { AccountState, accountActions, AccountActions } from './types';

const initialState = {
  currentOrder: null,
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

const reducer = (state: AccountState = initialState, action: AccountActions): AccountState => {
  switch (action.type) {
    case accountActions.FETCH_ACCOUNT_ORDERS:
      return {
        ...state,
        orders: action.orders
      };
    case accountActions.SET_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: action.order
      };
    default:
      return state;
  }
};

export default reducer;
