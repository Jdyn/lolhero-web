import React, { useMemo } from "react";
import ranks from "../../../lib/ranks";
import addons from "../../../lib/addonContent";
import content from "../../../lib/boostContent";
import PropTypes from "prop-types";
import { formatLP } from "../../../util/Helpers";
import { createUseStyles } from "react-jss";

const propTypes = {
  currentOrder: PropTypes.object.isRequired
};

const CheckoutView = props => {
  const { currentOrder } = props;
  const classes = useStyes();

  return (
    <>
      <div className={classes.wrapper}>
    
      </div>
    </>
  );
};

const useStyes = createUseStyles(theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.tertiary,
    borderRadius: 12,
    padding: "25px",
    boxShadow: "0 0 15px 0 rgba(0,0,0,.2)",
    margin: "10px 10px 20px 10px",
    "& p": {
      color: theme.grey,
      margin: 0,
      fontSize: 16,
      marginBottom: "15px"
    },
    "& h2": {
      fontSize: 16,
      margin: 0,
      marginBottom: "15px"
    },
    "& h3": {
      margin: "15px 0",
      fontSize: 20,
      marginBottom: "15px",
      color: theme.white
    },
    "& span": {
      display: "flex",
      flexDirection: "row",
      marginBottom: "5px",
      fontSize: 16,
      color: theme.white,
      "& b": {
        display: "flex",
        flexGrow: 1,
        justifyContent: "flex-end",
        color: theme.grey
      }
    }
  }
}));

CheckoutView.propTypes = propTypes;

export default CheckoutView;
