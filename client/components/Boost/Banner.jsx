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
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {slider ? (
          <div>slide</div>
        ) : (
          <>
            <div className={classes.header}>
              <h1>
                {rank.title
                  ? rank.title
                  : isStartingRank
                  ? "current rank"
                  : "desired rank"}
              </h1>
            </div>

            <div className={classes.body}>
              {isStartingRank && (
                <>
                  <div className={classes.info}>
                    <h3>queue</h3>
                    <span>{currentOrder.queue || "—"}</span>
                  </div>
                  <div className={classes.options}>
                    <div className={classes.info}>
                      <h3>server</h3>
                      <span>{currentOrder.server || "—"}</span>
                    </div>
                    <div className={classes.info}>
                      <h3>lp</h3>
                      <span>{currentOrder.lp || "—"}</span>
                    </div>
                  </div>
                </>
              )}

              <div className={classes.itemWrapper} />
            </div>
            <div className={classes.ranks}>
              {ranks.map((rankList, tierIndex) =>
                rankList.map((listItem, itemIndex) => (
                  <BannerRankItem
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

      <div className={classes.footerWrapper}>
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

{
  /* <button
key={listItem.title}
className={classes.button}
style={{
  backgroundColor: ranks[tierIndex][itemIndex].color,
  borderColor: ranks[tierIndex][itemIndex].accent
}}
onClick={() =>
  handleClick(tierIndex, itemIndex, isStartingRank)
}
/> */
}

const styles = theme => ({
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "245px",
    margin: "0 15px 50px 15px",
    zIndex: 5
  },
  wrapper: props => ({
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    color: "#fefefe",
    padding: "65px 24px",
    borderLeft: `6px solid ${props.rank.accent || theme.tertiary}`,
    borderRight: `6px solid ${props.rank.accent || theme.tertiary}`,
    backgroundColor: props.rank.color || theme.secondary,
    boxShadow: "0px -15px 15px rgba(0,0,0,.2)",
    maxHeight: "450px",
    height: "465px",
    "& span": {
      textAlign: "center"
    }
  }),
  header: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    "& h1": {
      fontSize: 30
    }
  },
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    width: "100%"
  },
  options: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: "10px 20px"
  },
  ranks: {
    display: "flex",
    // flexDirection: "row",
    flexWrap: "wrap",
    width: "170px"
  },
  optionButton: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "transparent",
    outline: "none",
    border: "none",
    fontSize: 14,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "5px",
    borderRadius: 6,
    color: theme.white,
    fontWeight: 700,
    width: "65px"
  },
  optionItem: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: 700,
    color: theme.white
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
  }),
  footerWrapper: {
    width: "100%",
    height: "100px",
    minHeight: "100px",
    backgroundColor: "transparent",
    fill: "transparent",
    position: "relative",
    bottom: 2,
    zIndex: -1
  }
});

Banner.propTypes = propTypes;

export default withStyles(styles, { link: true })(Banner);
