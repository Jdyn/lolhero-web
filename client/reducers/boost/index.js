import { actions } from "../../actions/BoostActions";

const initialState = {
  price: null,
  stage: 0,
  paymentMethodIsSelected: false,
  order: {
    type: "boost",
    nonce: null,
    details: {
      lp: 20,
      queue: "solo",
      server: "NA",
      desired_amount: 5,
      boost_type: "solo",
      collection_id: 1,
      is_express: false,
      is_incognito: false,
      is_unrestricted: false,
      promos: ["X", "X", "X"]
    }
  },
  pricing: {
    solo: {},
    duo: {}
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
