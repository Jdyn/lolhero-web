import React from "react";
import addons from "../../../lib/addonContent";
import Toggle from "../../Shared/Toggle";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import BoostTabItem from "../BoostsTab/BoostTabItem";

const propTypes = {
  updateOrder: PropTypes.func.isRequired,
  currentOrder: PropTypes.object.isRequired
};

const AddonView = props => {
  const { updateOrder, currentOrder } = props;

  const classes = useStyles();

  return (
    <>
      {/* <div className={classes.wrapper}> */}
        {/* <h2>Extras</h2> */}
        {addons.addons.extras.map((extra, index) => (
          <div className={classes.wrapper} key={index}>
            <Toggle
              isSelected={currentOrder[extra.type]}
              onClick={() => updateOrder({ [extra.type]: !currentOrder[extra.type] })}
            >
              {extra.title}
            </Toggle>
            <p>{extra.description}</p>
          </div>
        ))}
      {/* </div> */}
      {/* {addons.addons.extras.map((item, index) => (
        <BoostTabItem
          key={index}
          item={item}
          onClick={() => updateOrder({ [item.type]: !currentOrder[item.type] })}
          isSelected={currentOrder[item.type]}
        />
      ))} */}
    </>
  );
};

const useStyles = createUseStyles(theme => ({
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
    },
    "& h2": {
      fontSize: 20,
      margin: 0,
      marginBottom: "25px"
    }
  },
  container: {
    marginBottom: "20px"
  }
}));

AddonView.propTypes = propTypes;

export default AddonView;
