import React, { useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Button from "../Shared/Button";
import HomeCards from "./HomeCards";
import Link from "next/link";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Home = props => {
  const { classes } = props;

  let stripe;

  useEffect(() => {
    // stripe = Stripe("pk_test_zuPSlPf5Ewb5WW6o6bbc5Fs8");
  });

  const handleClick = event => {
    event.preventDefault();

    const payload = {
      payment_method_types: ["card"],
      success_url: "http://successurl.com",
      cancel_url: "http://cancelurl.com",
      line_items: [
        {
          name: "extra large cock ring",
          amount: 550,
          currency: "usd",
          quantity: 1
        },
        {
          name: "dragon lube",
          amount: 9999,
          currency: "usd",
          quantity: 1
        }
      ]
    };

    fetch("http://localhost:4000/api/checkout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(response => {
        if (response.ok) {
          console.log(response);
          stripe.redirectToCheckout({
            sessionId: response.result.session.id
          });
        }
      })
      .catch(error => error);
  };

  return (
    <>
      <div className={classes.hero}>
        <form className={classes.form}>
          <h1>LoL Hero</h1>
          <h2>League of Legends</h2>
          <input placeholder="Enter tracking ID" className={classes.search} />
        </form>
        <div className={classes.wrapper}>
          <Link href="/">
            <Button secondary margin="0 25px 0 0">
              prebuilt order
            </Button>
          </Link>

          <Link prefetch href="/boost/custom">
            <Button>custom order</Button>
          </Link>
        </div>
      </div>
      <HomeCards />
    </>
  );
};

const styles = theme => ({
  hero: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "100%",
    maxHeight: "1080px",
    minHeight: "650px",
    padding: "110px 0",
    overflow: "hidden",
    zIndex: 1,
    backgroundColor: theme.secondary
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "35px",
    margin: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    margin: "15px",
    "& h1": {
      fontSize: 45,
      margin: "0 0 0 0",
      color: theme.white
    },
    "& h2": {
      fontSize: 32,
      color: theme.white,
      margin: "0 0 25px 0"
    }
  },
  search: {
    border: "none",
    outline: "none",
    padding: "0 16px",
    width: "100%",
    maxWidth: "380px",
    borderRadius: "8px",
    height: "55px",
    color: theme.white,
    fontSize: 16,
    backgroundColor: theme.quartinary
  }
});

Home.propTypes = propTypes;

export default withStyles(styles)(Home);
