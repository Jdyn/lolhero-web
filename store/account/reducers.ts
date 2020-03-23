/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountState, SetOrderList, OrderUpdate, FilterUpdate } from './types';

const initialState: AccountState = {
  selectedOrder: null,
  boosters: null,
  currentFilter: 'active',
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
  filterUpdated: (state: AccountState, action: PayloadAction<FilterUpdate>): void => {
    state.currentFilter = action.payload.filter;
  },
  orderUpdated: (state: AccountState, action: PayloadAction<OrderUpdate>): void => {
    state.selectedOrder = action.payload.order;
    if (action.payload.boosters) {
      state.boosters = action.payload.boosters;
    }
  },
  orderChatUpdated: (state: AccountState, action: PayloadAction<any>): void => {
    state.selectedOrder.messages = [...state.selectedOrder.messages, { ...action.payload.message }];
  }
};

const account = createSlice({
  name: 'account',
  initialState,
  reducers
});

export const { orderListFetched, orderUpdated, filterUpdated, orderChatUpdated } = account.actions;
export default account.reducer;
