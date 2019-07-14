import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const propTypes = {
  rank: PropTypes.object,
  updateOrder: PropTypes.func.isRequired,
  currentOrder: PropTypes.object.isRequired
};

const BannerRankSlider = props => {
  const { currentOrder, updateOrder } = props;

  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      <h3>{currentOrder.desired_amount}</h3>
      <div className={classes.wrapper}>
        <input
          type="range"
          min="1"
          max="10"
          className={classes.slider}
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
    textAlign: "center",
    "& h3": {
      fontSize: 67
    }
  },
  sliderWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "170px",
    height: "75px"
  },
  slider: props => ({
    appearance: "none",
    width: "100%",
    height: "14px",
    outline: "none",
    borderRadius: 3,
    backgroundColor: props.rank.accent || theme.grey,
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
  })
}));

BannerRankSlider.propTypes = propTypes;

export default BannerRankSlider;
