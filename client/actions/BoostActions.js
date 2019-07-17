import Api from "../services/api";
import keyMirror from "../util/keyMirror";
import { setRequestInProcess } from "./RequestActions";
import * as Sentry from "@sentry/browser";
import calculatePrice from "../util/CalculatePrice";

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
    const pricing = getState().boost.pricing[order.boost_type];
    const price = calculatePrice(order, pricing);

    dispatch(setBoost({ boost: { price }, details: { ...newUpdate } }));
    return;
  }

  dispatch(setBoost({ boost: {}, details: { ...newUpdate } }));
};

export const submitOrder = () => (dispatch, getState) => {
  const requestType = requests.SUBMIT_ORDER;

  const requestInProcess = getState().request[requestType] || {};

  if (requestInProcess.isPending) return;

  dispatch(setRequestInProcess(true, requestType));

  let order = { ...getState().boost.order };

  const { collection_id, desired_rank, start_rank } = order.details;

  if (!start_rank) {
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
    if (!desired_rank) {
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
      } else {
        dispatch(
          setRequestInProcess(false, requestType, {
            errored: true,
            error: "Failed to fetch"
          })
        );
      }
    })
    .catch(error => {
      dispatch(
        setRequestInProcess(false, requestType, {
          errored: true,
          error: "Failed to fetch"
        })
      );
      Sentry.captureException(error);
    });
};