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
    case accountActions.ORDER_LIST:
      return {
        ...state,
        orders: action.orders
      };
    case accountActions.INITIATE_ORDER:
      return {
        ...state,
        selectedOrder: action.order
      };
    case accountActions.SET_CURRENT_ORDER:
      return {
        ...state,
        selectedOrder: action.order
      };
    default:
      return state;
  }
};

export default reducer;
