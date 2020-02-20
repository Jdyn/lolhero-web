import { BoostState, boostActions, BoostActionTypes } from './types';

const initialState: BoostState = {
  price: null,
  stage: 0,
  order: {
    type: 'boost',
    nonce: null,
    email: null,
    startRankTitle: '',
    desiredRankTitle: '',
    paymentMethodIsSelected: false,
    details: {
      lp: 20,
      queue: 'Solo',
      server: 'NA',
      flashPosition: 'D',
      primaryRole: 'Middle',
      secondaryRole: 'Bottom',
      startRank: null,
      desiredRank: null,
      desiredAmount: 10,
      boostType: 'Solo',
      collectionId: 1,
      collectionName: 'Division Boost',
      isExpress: false,
      isIncognito: false,
      isUnrestricted: false,
      promos: null
    }
  },
  pricing: null
};

export default (state = initialState, action: BoostActionTypes): BoostState => {
  switch (action.type) {
    case boostActions.UPDATE_BOOST:
      return {
        ...state,
        price: action.newPrice,
        order: {
          ...state.order,
          ...action.orderUpdate,
          details: {
            ...state.order.details,
            ...action.detailsUpdate
          }
        }
      };
    case boostActions.FETCH_BOOST_PRICES:
      return {
        ...state,
        pricing: {
          ...action.prices
        }
      };
    default:
      return state;
  }
};
