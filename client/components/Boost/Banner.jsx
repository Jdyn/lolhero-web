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
    slider,
    rank,
    updateOrder,
    currentOrder,
    isStartingRank
  } = props;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {slider ? (
          <div>slide</div>
        ) : (
          <>
            <div className={classes.header}>
              <h1>{rank.title || ""}</h1>
              <h3>{isStartingRank ? "current rank" : "desired rank"}</h3>
            </div>
            {/* <div className={classes.body}>
              {isStartingRank && (
                <>
                  <div className={classes.info}>
                    <h3>queue</h3>
                    <span>{currentOrder.queue || "—"}</span>
                  </div>
                  <div className={classes.info}>
                    <h3>server</h3>
                    <span>{currentOrder.server || "—"}</span>
                  </div>
                  <div className={classes.info}>
                    <h3>lp</h3>
                    <span>{currentOrder.lp || "—"}</span>
                  </div>
                </>
              )}
            </div> */}
            <div className={classes.ranks}>
              {ranks.map((rankList, tierIndex) =>
                rankList.map((listItem, itemIndex) => (
                  <BannerRankItem
                    key={tierIndex + itemIndex}
                    rank={ranks[tierIndex][itemIndex]}
                    isSelected={rank.rank === listItem.rank}
                    isStartingRank={isStartingRank}
                    isDisabled={false}
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
    height: "520px",
    justifyContent: "flex-start",
    width: "245px",
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
    borderLeft: `6px solid ${props.rank.accent || theme.tertiary}`,
    borderRight: `6px solid ${props.rank.accent || theme.tertiary}`,
    backgroundColor: props.rank.color || theme.secondary,
    boxShadow: "0px -15px 15px rgba(0,0,0,.2)",
    // height: "450px",
    "& span": {
      textAlign: "center"
    }
  }),
  info: {
    display: "flex",
    flexDirection: "column",
    fontSize: 15,
    margin: "5px 0",
    fontWeight: 700,
    textTransform: "uppercase",
    color: theme.white,
    textShadow: "0 0 15px rgba(0,0,0,.5)",
    "& h3": {
      textTransform: "lowercase",
      color: theme.white,
      margin: "5px 0",
      fontSize: 18
    }
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
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexGrow: 1,
    width: "100%"
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

export default withStyles(styles, { link: true })(Banner);
