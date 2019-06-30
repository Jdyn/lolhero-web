import { actions } from "../../actions/BoostActions";

const initialState = {
  price: null,
  stage: 0,
  order: {
    lp: 20,
    queue: "solo",
    server: "NA",
    boost_type: null,
    start_rank: null,
    desired_rank: null,
    collection_id: null,
    is_express: false
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
          ...action.update.order
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
