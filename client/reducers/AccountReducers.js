import { actions } from '../actions/AccountActions';

const initialState = {
  orders: {
    total: {
      orders: [],
      count: null
    },
    active: {
      orders: [],
      count: null
    },
    completed: {
      orders: [],
      count: null
    }
  }
};

export default (state = initialState, action) => {
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
