import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import dropin from "braintree-web-drop-in";
import Api from "../../../services/api";

const propTypes = {};

const NewView = props => {
  const classes = useStyes();

  useEffect(() => {
    Api.fetch("/token").then(response => {
      if (response.ok) {
        console.log(response);
        dropin
          .create({
            authorization: response.result.token,
            container: "#dropin-container",
            paypal: {
              flow: "vault"
            },
            venmo: {
              allowNewBrowserTab: false
            }
          })
          .then(instance => {
            const button = document.getElementById("submit-button");
            button.addEventListener("click", () => {
              console.log(instance);
              instance.requestPaymentMethod((error, payload) => {
                props.submitOrder(payload.nonce);
              });
            });
          })
          .catch(error => {
            console.log("ERROR BRO", error);
          });
      }
    });
  }, [props.currentOrder]);

  return (
    <>
      <div className={classes.wrapper}>
        <div id="dropin-container" />
        <button id="submit-button">submit</button>
      </div>
    </>
  );
};

const useStyes = createUseStyles(theme => ({
    wrapper: {
        padding: "15px"
    }
}));

NewView.propTypes = propTypes;

export default NewView;
