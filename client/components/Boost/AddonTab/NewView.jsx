import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import dropin from "braintree-web-drop-in";

const propTypes = {};

const NewView = props => {
  const { setStage, updateOrder } = props;
  const classes = useStyes();

  useEffect(() => {
    dropin
      .create({
        authorization: "sandbox_7brmzhhx_cfcsbff65qmxzrgf",
        container: "#dropin-container",
        card: {
          overrides: {
            styles: {
              input: {
                color: "#fafafa"
              },
              ".label": {
                color: "white"
              },
              ".number": {
                color: "#fafafa"
              },
              ".expirationDate": {
                color: "#fafafa"
              },
              ".cvv": {
                color: "#fafafa"
              },
              ".postalCode": {
                color: "#fafafa"
              }
            }
          }
        },
        paypal: {
          flow: "vault",
          buttonStyle: {
            color: "blue",
            shape: "rect",
            size: "responsive"
          }
        },
        venmo: {
          allowNewBrowserTab: false
        }
      })
      .then(instance => {
        const button = document.getElementById("submit-button");
        button.addEventListener("click", () => {
          instance.requestPaymentMethod((error, payload) => {
            if (!error) {
              updateOrder(payload.nonce);
              setStage(prev => (prev === 2 ? prev + 1 : prev));
            }
          });
        });
      })
      .catch(error => {
        console.log("ERROR BRO", error);
      });
  }, []);

  return (
    <>
      <div className={classes.wrapper}>
        <div id="dropin-container" />
      </div>
    </>
  );
};

const useStyes = createUseStyles(theme => ({
  wrapper: {
    padding: "15px",
    backgroundColor: theme.tertiary,
    borderRadius: 12,
    margin: "10px 10px 20px 10px",
    boxShadow: "0px 0px 15px 0px rgba(0,0,0, .2)"
  }
}));

NewView.propTypes = propTypes;

export default NewView;
