import React from "react";
import { useRouter } from "next/router";
import { createUseStyles } from "react-jss";
import Layout from "../../components/Shared/Layout";

const OrderSuccess = props => {
  const router = useRouter();
  const classes = useStyles();
  const { tracking_id } = router.query;

  return (
    <Layout>
      <div className={classes.root}>
        <h1>Thank you for your purchase.</h1>
        <h3>
          Your Tracking ID is <b>{tracking_id || "unknown"}</b>.
        </h3>
        <p>Please review the email we have sent you detailing the next steps.</p>
      </div>
    </Layout>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    padding: "35px",
    maxWidth: "975px",
    margin: "0 auto",
    color: theme.white,
    "& h3": {
      "& b": {
        color: theme.accent
      }
    }
  }
}));

export default OrderSuccess;
