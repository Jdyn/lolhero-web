import Api from "../services/api";
import keyMirror from "../util/keyMirror";
import { setRequestInProcess } from "./RequestActions";

export const actions = keyMirror("FETCH_BOOST_PRICES", "UPDATE_BOOST");

export const requests = keyMirror("BOOST_PRICING", "BOOST_ORDER");

const setBoostPrices = prices => ({
  type: actions.FETCH_BOOST_PRICES,
  prices
});

export const fetchBoostPrices = () => (dispatch, getState) => {
  const requestType = requests.BOOST_PRICING;
  const requestIsInProcess = getState().request[requestType];

  if (requestIsInProcess) return;

  dispatch(setRequestInProcess(true, requestType));

  Api.fetch("/prices").then(response => {
    if (response.ok) {
      dispatch(setBoostPrices(response.result));
      dispatch(setRequestInProcess(false, requestType));
    } else {
      dispatch(
        setRequestInProcess(false, requestType, {
          errored: true,
          error: "Failed to Fetch"
        })
      );
    }
  });
};

const setBoost = update => ({
  type: actions.UPDATE_BOOST,
  update
});

export const updateOrder = newUpdate => (dispatch, getState) => {
  if (typeof newUpdate !== "object") return;

  const request = getState().request.BOOST_PRICING || {};

  if (request.success) {
    const order = { ...getState().boost.order.details, ...newUpdate };

    const price = calculatePrice(getState, order);

    dispatch(setBoost({ boost: { price }, details: { ...newUpdate } }));
    return;
  }

  dispatch(setBoost({ boost: {}, details: { ...newUpdate } }));
};

const calculatePrice = (getState, order) => {
  const pricing = getState().boost.pricing[order.boost_type];

  var total = 0;

  for (var i = order.start_rank; i < order.desired_rank; i++) {
    total += pricing[order.collection_id][i];
  }

  // const queues = pricing["queues"];
  // const modifiers = pricing["modifiers"];

  // total = total * queues[order.queue];

  // if (order.is_express) {
  //   total = total * modifiers["express"];
  // }

  // if (order.is_unrestricted) {
  //   total = total * modifiers["unrestricted"];
  // }

  // if (order.is_incognito) {
  //   total = total * modifiers["incognito"];
  // }

  return Math.round(total * 100) / 100;
};
