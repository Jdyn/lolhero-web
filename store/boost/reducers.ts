/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BoostState, SetBoostUpdate, SetBoostPrices, initialState } from './types';

const reducers = {
  boostUpdated: (state: BoostState, action: PayloadAction<SetBoostUpdate>): void => {
    const { newPrice, orderUpdate, detailsUpdate } = action.payload;
    state.price = newPrice;
    state.order = { ...state.order, ...orderUpdate };
    state.order.details = { ...state.order.details, ...detailsUpdate };
  },
  boostPricingFetched: (state: BoostState, action: PayloadAction<SetBoostPrices>): void => {
    state.pricing = { ...action.payload };
  }
};

const boost = createSlice({
  name: 'boost',
  initialState,
  reducers
});

export const { boostUpdated, boostPricingFetched } = boost.actions;
export default boost.reducer;
