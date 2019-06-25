import { actions } from "../../actions/MarketActions";

const initialState = {
  pricing: {
    solo: {},
    duo: {}
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_BOOSTS:
      return {
        ...state,
        pricing: {
          ...action.boosts
        }
      };
    default:
      return state;
  }
};

const setBoosts = (state, action) => {
  const { boosts } = action;
  const boostObject = {};

  boostObject[boosts[0].title] = boosts[0].collections;
  boostObject[boosts[1].title] = boosts[1].collections;

  return { ...state, boosting: boosts };
};