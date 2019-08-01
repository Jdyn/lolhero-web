import Api from "../services/api";
import keyMirror from "../util/keyMirror";
import { setRequestInProcess } from "./RequestActions";
import * as Sentry from "@sentry/browser";
import calculatePrice from "../util/CalculatePrice";
import Router from "next/router";

export const actions = keyMirror("FETCH_BOOST_PRICES", "UPDATE_BOOST");

export const requests = keyMirror("BOOST_PRICING", "BOOST_ORDER", "SUBMIT_ORDER");

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
  if (typeof newUpdate !== "object") {
    dispatch(
      setBoost({
        boost: { paymentMethodIsSelected: true },
        order: { nonce: newUpdate }
      })
    );
    return;
  }

  const requestType = requests.SUBMIT_ORDER;
  const request = getState().request[requestType] || {};

  if (request.errored) {
    dispatch(
      setRequestInProcess(false, requests.SUBMIT_ORDER, {
        errored: false
      })
    );
  }

  let order = { ...getState().boost.order.details, ...newUpdate };
  const pricing = getState().boost.pricing[order.boost_type];
  const price = calculatePrice(order, pricing);

  dispatch(setBoost({ boost: { price }, details: { ...newUpdate } }));
};

export const submitOrder = () => (dispatch, getState) => {
  const requestType = requests.SUBMIT_ORDER;

  const requestInProcess = getState().request[requestType] || {};

  if (requestInProcess.isPending) return;

  dispatch(setRequestInProcess(true, requestType));

  let order = { ...getState().boost.order };

  const { collection_id, desired_rank, start_rank } = order.details;

  if (!start_rank) {
    const error = "Your starting rank cannot be blank.";

    dispatch(
      setRequestInProcess(false, requestType, {
        errored: true,
        error
      })
    );
    return;
  }

  if (start_rank > desired_rank) {
    dispatch(
      setRequestInProcess(false, requestType, {
        errored: true,
        error: "Your starting rank cannot be greater than your desired rank."
      })
    );

    return;
  }

  if (collection_id === 1 || collection_id === 5) {
    if (!desired_rank) {
      const error = "You must have a desired rank.";

      dispatch(
        setRequestInProcess(false, requestType, {
          errored: true,
          error
        })
      );
      return;
    }

    delete order.details.desired_amount;
  } else {
    delete order.details.desired_rank;
  }

  if (order.details.desired_amount && order.details.desired_rank) {
    dispatch(
      setRequestInProcess(false, requestType, {
        errored: true,
        error: "Internal Error: desired_amount and desired_rank exists"
      })
    );

    Sentry.captureException(error);
  }

  Api.post("/orders", order)
    .then(response => {
      if (response.ok) {
        dispatch(setRequestInProcess(false, requestType));
        window.location.href = response.result.success_url;
      } else {
        dispatch(
          setRequestInProcess(false, requestType, {
            errored: true,
            error:
              response.errors[Object.keys(response.errors)[0]] ||
              "Error placing order. Try again later."
          })
        );
      }
    })
    .catch(error => {
      dispatch(
        setRequestInProcess(false, requestType, {
          errored: true,
          error: "Error placing order. Try again later or contact support."
        })
      );
      Sentry.captureException(error);
    });
};
