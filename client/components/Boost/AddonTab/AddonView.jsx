import React from "react";
import addons from "../../../lib/addonContent";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Toggle from "../../Shared/Toggle";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const AddonView = props => {
  const { classes, updateOrder, currentOrder } = props;

  return (
    <>
      <div className={classes.wrapper}>
        <h2>Extras</h2>
        {addons.addons.extras.map((extra, index) => (
          <React.Fragment key={index}>
            <Toggle
              isSelected={currentOrder[extra.type]}
              onClick={() =>
                updateOrder({ [extra.type]: !currentOrder[extra.type] })
              }
            >
              {extra.title}
            </Toggle>
            <p>{extra.description}</p>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

const styles = theme => ({
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
      fontSize: 20,
      margin: 0,
      marginBottom: "10px"
    }
  }
});
AddonView.propTypes = propTypes;

export default withStyles(styles)(AddonView);
