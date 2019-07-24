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
        <h3>Thank you for your purchase</h3>
        <h2>{tracking_id ? tracking_id : "bad"}</h2>
      </div>
    </Layout>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    color: theme.white
  }
}));

export default OrderSuccess;
