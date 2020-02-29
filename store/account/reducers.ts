/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountState, SetOrderList, OrderUpdate } from './types';

const initialState: AccountState = {
  selectedOrder: null,
  boosters: null,
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

const reducers = {
  orderListFetched: (state: AccountState, action: PayloadAction<SetOrderList>): void => {
    state.orders = action.payload.orders;
  },
  orderUpdated: (state: AccountState, action: PayloadAction<OrderUpdate>): void => {
    state.selectedOrder = action.payload.order;
  }
};

const account = createSlice({
  name: 'account',
  initialState,
  reducers
});

export const { orderListFetched, orderUpdated } = account.actions;
export default account.reducer;
