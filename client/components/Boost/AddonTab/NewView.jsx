import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import dropin from "braintree-web-drop-in";
import Api from "../../../services/api";

const propTypes = {};

const NewView = props => {
  const classes = useStyes();

  const [currentToken, setToken] = useState(null);

  useEffect(() => {
    Api.fetch("/token").then(response => {
      if (response.ok) {
        console.log("new token");
        setToken(response.result.token);
      }
    });
  }, []);

  useEffect(() => {
    if (currentToken !== null) {
      dropin
        .create({
          authorization: currentToken,
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
            console.log("clicked");
            instance.requestPaymentMethod((error, payload) => {
              if (!error) {
                props.submitOrder(payload.nonce);
              } else {
                console.log(error);
              }
            });
          });
        })
        .catch(error => {
          console.log("ERROR BRO", error);
        });
    }
  }, [currentToken]);

  return (
    <>
      <div className={classes.wrapper}>
        <div id="dropin-container" />
        {/* <button id="submit-button">submit</button> */}
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
