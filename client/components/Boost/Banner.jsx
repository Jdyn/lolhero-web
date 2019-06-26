import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import ranks from "../../lib/ranks";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Banner = props => {
  const { classes, slider, rank, setOrder, isStartingRank } = props;

  const handleClick = (tierIndex, itemIndex, isStartingRank) => {
    const item = ranks[tierIndex][itemIndex];
    const change = {};

    if (isStartingRank) {
      change["starting_rank"] = item.rank;
    } else {
      change["desired_rank"] = item.rank;
    }

    setOrder(prev => ({ ...prev, ...change }));
  };

  return (
    <div className={classes.container}>
      <div
        className={classes.wrapper}
        style={{ backgroundColor: rank.color, borderColor: rank.accent }}
      >
        {slider ? (
          <div>slide</div>
        ) : (
          <>
            <div className={classes.header}>
              <h1>{rank.title}</h1>
            </div>
            <div className={classes.body}>
              <button className={classes.optionButton}>
                <span>queue</span>
                <span className={classes.optionItem}>solo</span>
              </button>
              <div className={classes.options}>
                <button className={classes.optionButton}>
                  <span>server</span>
                  <span className={classes.optionItem}>NA</span>
                </button>
                <button className={classes.optionButton}>
                  <span>lp</span>
                  <span className={classes.optionItem}>0-21</span>
                </button>
              </div>
              <div className={classes.itemWrapper} />
            </div>
            <div className={classes.ranks}>
              {ranks.map((rankList, tierIndex) =>
                rankList.map((listItem, itemIndex) => (
                  <button
                    key={listItem.title}
                    className={classes.button}
                    style={{
                      backgroundColor: ranks[tierIndex][itemIndex].color,
                      borderColor: ranks[tierIndex][itemIndex].accent
                    }}
                    onClick={() =>
                      handleClick(tierIndex, itemIndex, isStartingRank)
                    }
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
          style={{ fill: rank.color, stroke: rank.accent }}
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
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "245px",
    margin: "0 15px 50px 15px",
    zIndex: 5
  },
  wrapper: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    color: "#fefefe",
    padding: "75px 24px",
    borderLeft: "6px solid",
    borderRight: "6px solid",
    maxHeight: "450px",
    "& span": {
      textAlign: "center"
    }
  },
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
    width: "144px"
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
  button: {
    border: "none",
    outline: "none",
    margin: "1px 1px",
    padding: 0,
    cursor: "pointer",
    borderRadius: 3,
    height: "35px",
    width: "10px",
    border: `1px solid #e5e5e5`,
    transitionDuration: ".1s",
    "&:hover": {
      transform: "scale(1.5)"
    }
  },
  footer: {
    width: "100%",
    height: "100px",
    position: "relative",
    strokeWidth: 3,
    zIndex: 0,
    filter: "drop-shadow(0 65px 15px rgba(0,0,0,.35))"
  },
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

export default withStyles(styles)(Banner);
