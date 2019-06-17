import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Filter from "../Shared/Filter";
import boostContent from "../../lib/boostContent";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const BoostNavigator = props => {
  const { classes, theme, boosts, setCollection } = props;

  const [selectedIndex, setIndex] = useState(0);
  const [filterIndex, setFilter] = useState(0);
  const [filters] = useState([{ name: "Solo Boost" }, { name: "Duo Boost" }]);

  return (
    <div className={classes.container}>
      <Filter extended filters={filters} onClick={index => setFilter(index)} />
      <div className={classes.notice}>
        {boostContent[filterIndex].description}
        <span>{boostContent[filterIndex].subdescription}</span>
      </div>
      <div className={classes.wrapper}>
        {boosts.length > 0 &&
          boosts[filterIndex].collections.map((item, index) => (
            <div
              key={index}
              className={classes.card}
              onClick={() => {
                setIndex(index);
                setCollection(boosts[filterIndex].collections[selectedIndex])
              }}
              style={{
                backgroundColor:
                  selectedIndex === index ? theme.tertiary : theme.primary
              }}
            >
              <div className={classes.cardHeader}>
                <h2>
                  <span style={{ color: boostContent[filterIndex].color }}>
                    {filterIndex === 0 ? "solo" : "duo"}
                  </span>{" "}
                  {item.title}
                </h2>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

const styles = theme => ({
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "400px",
    left: 0,
    overflow: "auto",
    backgroundColor: theme.primary,
    boxShadow: "5px 0px 6px 0px rgba(0, 0, 0, 0.12)",
    "&::-webkit-scrollbar": {
      width: "8px",
      backgroundColor: "#ddd"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#999999",
      borderRadius: 6,
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.2)"
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: theme.primary,
      webkitBoxShadow: "inset 0 0 6px transparent"
    },
    "&::-webkit-scrollbar-button": {
      width: "0",
      height: "0",
      display: "none"
    }
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
    // height: "300px"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    minHeight: "106px",
    padding: "24px 32px",
    "& p": {
      color: theme.grey,
      margin: 0
    },
    // borderBottom: "2px solid #646464",
    cursor: "pointer",
    transitionDuration: ".15s",
    borderRadius: 8,
    margin: "2px 0",
    "&:hover": {
      backgroundColor: `${theme.tertiary} !important`
    }
  },
  cardHeader: {
    "& h2": {
      margin: 0,
      color: theme.white,
      fontSize: 16
    },
    "& span": {
      color: theme.accent,
      textTransform: "uppercase"
    }
  },
  notice: {
    margin: "20px 10px",
    padding: "15px",
    boxShadow: "0px 0px 15px rgb(0,0,0,.12)",
    backgroundColor: theme.tertiary,
    color: theme.white,
    borderRadius: 8,
    "& span": {
      color: theme.grey
    }
  }
});

BoostNavigator.propTypes = propTypes;

export default withStyles(styles, { injectTheme: true })(BoostNavigator);
