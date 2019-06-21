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
    <>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          {slider ? (
            <div>slide</div>
          ) : (
            <>
              <span>{rank.title}</span>
              <div className={classes.ranks}>
                {ranks.map((rankList, tierIndex) =>
                  rankList.map((listItem, itemIndex) => (
                    <button
                      key={listItem.title}
                      className={classes.button}
                      style={{
                        backgroundColor: ranks[tierIndex][itemIndex].color
                      }}
                      onClick={() => handleClick(tierIndex, itemIndex, isStartingRank)}
                    >
                      {/* {listItem.title} */}
                    </button>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        <svg
          className={classes.footer}
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <path d="M0 0 L50 100 L100 0 Z" />
        </svg>
      </div>
    </>
  );
};

const styles = theme => ({
  container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    width: "245px",
    height: "calc(90% - 100px)",
    minHeight: "400px",
    backgroundColor: theme.tertiary,
    boxShadow: "0px 0px 20px rgba(0,0,0,.3)",
    margin: "0 15px",
    maxHeight: "450px",
    zIndex: 1
  },
  wrapper: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    color: "#fefefe",
    "& span": {
      textAlign: "center"
    }
  },
  ranks: {
    // display: "flex",
    // flexDirection: "row",
    // flexWrap: 1,
    maxWidth: "145px",

  },
  button: {
    border: "none",
    outline: "none",
    margin: "0 3px 0 0",
    padding: 0,
    cursor: "pointer",
    borderRadius: 3,
    height: "30px",
    width: "9px"
  },
  footer: {
    width: "100%",
    height: "100px",
    position: "absolute",
    bottom: "-100px",
    fill: theme.tertiary,
    zIndex: -1,
    filter: "drop-shadow(0 65px 15px rgba(0,0,0,.35))"
  }
});

Banner.propTypes = propTypes;

export default withStyles(styles)(Banner);
