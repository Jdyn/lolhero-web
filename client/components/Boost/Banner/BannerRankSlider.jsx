import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";

const propTypes = {
  rank: PropTypes.object,
  updateOrder: PropTypes.func.isRequired,
  currentOrder: PropTypes.object.isRequired
};

const BannerRankSlider = props => {
  const { rank, currentOrder, updateOrder } = props;

  const classes = useStyles(props);
  const theme = useTheme();

  return (
    <div className={classes.container}>
      <h3 className={classes.amount}>{currentOrder.desired_amount}</h3>
      <div className={classes.sliderWrapper}>
        <input
          type="range"
          min="1"
          max="10"
          className={classes.slider}
          style={{ backgroundColor: rank.accent || theme.grey }}
          value={currentOrder.desired_amount}
          onChange={event =>
            updateOrder({ desired_amount: parseInt(event.target.value) })
          }
        />
      </div>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    flexGrow: 1
  },
  amount: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 65,
    margin: 0,
    flexGrow: 1
  },
  sliderWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "170px",
    flex: 1,
    marginBottom: "-20px",
    maxHeight: "95px"
  },
  slider: {
    appearance: "none",
    width: "100%",
    height: "14px",
    outline: "none",
    borderRadius: 3,
    "&::-webkit-slider-thumb": {
      appearance: "none",
      cursor: "pointer",
      height: "35px",
      width: "10px",
      borderRadius: 3,
      backgroundColor: theme.white,
      transitionDuration: ".15s",
      "&:hover": {
        transform: "scale(1.2)"
      }
    }
  }
}));

BannerRankSlider.propTypes = propTypes;

export default BannerRankSlider;
