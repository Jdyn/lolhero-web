import { AccountState, accountActions, AccountActionTypes } from './types';

const initialState: AccountState = {
  selectedOrder: null,
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

const reducer = (state = initialState, action: AccountActionTypes): AccountState => {
  switch (action.type) {
    case accountActions.FETCH_ACCOUNT_ORDERS:
      return {
        ...state,
        orders: action.orders
      };
    case accountActions.UPDATE_ACCOUNT_ORDER_DETAILS:
      return {
        ...state,
        selectedOrder: action.order
      };
    default:
      return state;
  }
};

export default reducer;
