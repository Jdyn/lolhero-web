import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import dropin from "braintree-web-drop-in";
import Api from "../../../services/api";

const propTypes = {};

const NewView = props => {
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
          console.log("clicked");
          instance.requestPaymentMethod((error, payload) => {
            // if (!error) {
            //   props.submitOrder(payload.nonce);
            // } else {
            //   console.log(error);
            // }
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
        {/* <button id="submit-button">submit</button> */}
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
