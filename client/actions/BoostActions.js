import Api from "../services/api";
import keyMirror from "../util/keyMirror";
import { setRequestInProcess } from "./RequestActions";
import * as Sentry from "@sentry/browser";

export const actions = keyMirror("FETCH_BOOST_PRICES", "UPDATE_BOOST");

export const requests = keyMirror(
  "BOOST_PRICING",
  "BOOST_ORDER",
  "SUBMIT_ORDER"
);

const setBoostPrices = prices => ({
  type: actions.FETCH_BOOST_PRICES,
  prices
});

export const fetchBoostPrices = () => (dispatch, getState) => {
  const requestType = requests.BOOST_PRICING;
  const requestInProcess = getState().request[requestType] || {};

  if (requestInProcess.isPending) return;

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

  if (order.collection_id == 1 || order.collection_id == 5) {
    for (var i = order.start_rank; i < order.desired_rank; i++) {
      total += pricing[order.collection_id][i];
    }
  } else {
    const base = pricing[order.collection_id][order.start_rank];
    total = base * order.desired_amount;
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

export const submitOrder = () => (dispatch, getState) => {
  const requestType = requests.SUBMIT_ORDER;

  const requestInProcess = getState().request[requestType] || {};

  if (requestInProcess.isPending) return;

  dispatch(setRequestInProcess(true, requestType));

  let order = { ...getState().boost.order };

  const {
    collection_id,
    desired_amount,
    desired_rank,
    start_rank
  } = order.details;

  if (!order.details.start_rank) {
    const error = "starting rank cannot be blank";

    dispatch(
      setRequestInProcess(false, requestType, {
        errored: true,
        error
      })
    );
    return;
  }
  
  if (collection_id === 1 || collection_id === 5) {
    if (!order.details.desired_rank) {
      const error = "Must choose a desired rank";

      dispatch(
        setRequestInProcess(false, requestType, {
          errored: true,
          error
        })
      );
      return;
    }
  }

  if (collection_id === 1 || collection_id === 5) {
    delete order.details.desired_amount;
  } else {
    delete order.details.desired_rank;
  }

  if (order.details.desired_amount && order.details.desired_rank) {
    const error =
      "desired_amount and desired_rank cannot be submitted together";

    dispatch(
      setRequestInProcess(false, requestType, {
        errored: true,
        error
      })
    );

    Sentry.captureException(error);

    return;
  }

  Api.post("/checkout", order)
    .then(response => {
      if (response.ok) {
        dispatch(setRequestInProcess(false, requestType));

        const sessionId = response.result.session.id;

        Stripe("pk_test_zuPSlPf5Ewb5WW6o6bbc5Fs8")
          .redirectToCheckout({
            sessionId
          })
          .then(result => {
            console.log(result);
          });
      }
    })
    .catch(error => {
      Sentry.captureException(error);
    });
};
