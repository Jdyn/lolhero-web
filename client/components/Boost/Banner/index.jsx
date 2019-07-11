import React, { useMemo } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import ranks from "../../../lib/ranks";
import BannerRankItem from "./BannerRankItem";

const propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["slider", "picker"])
};

const flatten = arr => arr.reduce((flat, next) => flat.concat(next), []);

const Banner = props => {
  const { classes, theme, type, rank, updateOrder, currentOrder, isStartRank } = props;

  const flatRanks = useMemo(() => flatten([...ranks]));

  const validateDisabled = itemIndex => {
    if (currentOrder.collection_id === 1 || currentOrder.collection_id === 5) {
      if (!isStartRank) {
        if (currentOrder.start_rank !== null) {
          return itemIndex < currentOrder.start_rank + 1;
        } else {
          return false;
        }
      } else {
        if (currentOrder.desired_rank !== null) {
          return itemIndex > currentOrder.desired_rank - 1;
        } else {
          return false;
        }
      }
    }
  };

  const renderContent = {
    slider: (
      <>
        <div className={classes.amount}>{currentOrder.desired_amount}</div>
        <div className={classes.sliderWrapper}>
          <input
            type="range"
            min="1"
            max="10"
            className={classes.slider}
            value={currentOrder.desired_amount}
            onChange={event => updateOrder({ desired_amount: parseInt(event.target.value) })}
          />
        </div>
      </>
    ),
    picker: (
      <>
        <div className={classes.ranks}>
          {flatRanks.map((rankItem, index) => (
            <BannerRankItem
              key={index}
              rank={rankItem}
              isSelected={rank.rank === rankItem.rank}
              isStartRank={isStartRank}
              isDisabled={validateDisabled(rankItem.rank)}
              updateOrder={updateOrder}
            />
          ))}
        </div>
      </>
    )
  };

  return (
    <div className={classes.root}>
      <div
        className={classes.container}
        style={{
          backgroundColor: rank.color || theme.secondary,
          borderColor: `${rank.accent || theme.tertiary}`
        }}
      >
        <div className={classes.header}>
          <h1>{rank.title || ""}</h1>
          <h3>{isStartRank ? "current rank" : "desired amount"}</h3>
        </div>
        {renderContent[type]}
      </div>

      <div className={classes.wrapper}>
        <svg
          className={classes.footer}
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          style={{
            fill: rank.color || theme.secondary,
            stroke: rank.accent || theme.tertiary
          }}
        >
          <path d="M0 0 L50 100 L100 0 Z" />
        </svg>
      </div>
    </div>
  );
};

const styles = theme => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    // height: "520px",
    height: "70vh",
    maxHeight: "550px",
    justifyContent: "flex-start",
    width: "235px",
    margin: "0 15px 50px 15px",
    zIndex: 5
  },
  container: props => ({
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#fefefe",
    padding: "55px 24px",
    borderLeft: `6px solid`,
    borderRight: `6px solid`,
    boxShadow: "0px -15px 15px rgba(0,0,0,.2)",
    "& span": {
      textAlign: "center"
    }
  }),
  amount: {
    fontSize: 67
  },
  header: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    "& h1": {
      margin: "10px 0",
      fontSize: 30,
      height: "36px"
    },
    "& h3": {
      margin: 0,
      color: theme.white,
      fontSize: 16
    }
  },
  ranks: {
    display: "flex",
    flexWrap: "wrap",
    width: "170px",
    height: "75px"
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
  }),
  wrapper: props => ({
    width: "100%",
    height: "100px",
    minHeight: "100px",
    backgroundColor: "transparent",
    fill: "transparent",
    position: "relative",
    bottom: 2,
    zIndex: -1,
    fill: props.rank.color || theme.secondary,
    stroke: props.rank.accent || theme.tertiary,
    filter: "drop-shadow(0 0px 15px rgba(0,0,0,.35))"
  }),
  footer: {
    width: "100%",
    height: "100px",
    position: "relative",
    strokeWidth: 3
  }
});

Banner.propTypes = propTypes;

export default withStyles(styles, { link: true, injectTheme: true })(Banner);
