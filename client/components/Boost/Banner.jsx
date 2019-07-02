import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import ranks from "../../lib/ranks";
import BannerRankItem from "./BannerRankItem";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Banner = props => {
  const {
    classes,
    theme,
    slider,
    rank,
    updateOrder,
    currentOrder,
    isStartingRank
  } = props;

  const validateDisabled = itemIndex => {
    if (!isStartingRank) {
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
        {slider ? (
          <div>slide</div>
        ) : (
          <>
            <div className={classes.header}>
              <h1>{rank.title || ""}</h1>
              <h3>{isStartingRank ? "current rank" : "desired rank"}</h3>
            </div>
            <div className={classes.ranks}>
              {ranks.map((rankList, tierIndex) =>
                rankList.map((listItem, itemIndex) => (
                  <BannerRankItem
                    key={tierIndex + itemIndex}
                    rank={ranks[tierIndex][itemIndex]}
                    isSelected={rank.rank === listItem.rank}
                    isStartingRank={isStartingRank}
                    isDisabled={validateDisabled(listItem.rank)}
                    updateOrder={updateOrder}
                  />
                ))
              )}
            </div>
          </>
        )}
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
    height: "65vh",
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
    width: "170px"
  },
  wrapper: {
    width: "100%",
    height: "100px",
    minHeight: "100px",
    backgroundColor: "transparent",
    fill: "transparent",
    position: "relative",
    bottom: 2,
    zIndex: -1
  },
  footer: props => ({
    width: "100%",
    height: "100px",
    position: "relative",
    strokeWidth: 3,
    zIndex: 0,
    fill: props.rank.color || theme.secondary,
    stroke: props.rank.accent || theme.tertiary,
    filter: "drop-shadow(0 65px 15px rgba(0,0,0,.35))"
  })
});

Banner.propTypes = propTypes;

export default withStyles(styles, { link: true, injectTheme: true })(Banner);
