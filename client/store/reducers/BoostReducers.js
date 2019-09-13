import { actions } from '../actions/BoostActions';

const initialState = {
  price: null,
  stage: 0,
  order: {
    type: 'boost',
    nonce: null,
    email: null,
    details: {
      lp: 20,
      queue: 'Solo',
      server: 'NA',
      desiredAmount: 5,
      boostType: 'Solo',
      collectionId: 1,
      collectionName: 'Division Boost',
      isExpress: false,
      isIncognito: false,
      isUnrestricted: false,
      promos: null
    }
  },
  pricing: {
    Solo: {},
    Duo: {}
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_BOOST:
      return {
        ...state,
        ...action.update.boost,
        order: {
          ...state.order,
          ...action.update.order,
          details: {
            ...state.order.details,
            ...action.update.details
          }
        }
      };
    case actions.FETCH_BOOST_PRICES:
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
