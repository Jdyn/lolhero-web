import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Filter from "../Shared/Filter";
import boostOptions from "../../lib/boostOptions";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const filters = [
  {
    name: "Solo Boost"
  },
  {
    name: "Duo Boost"
  }
];

const BoostNavigator = props => {
  const { classes, theme } = props;

  const [currentIndex, setIndex] = useState(0);
  const [currentFilter, setFilter] = useState("solo");

  const handleItemClick = index => {
    setIndex(index);
  };

  const handleFilterClick = index => {
    setFilter(index === 0 ? "solo" : "duo");
  };

  return (
    <div className={classes.container}>
      <Filter extended filters={filters} onClick={handleFilterClick} />
      <div className={classes.notice}>
        {boostOptions[currentFilter].description}
        <span>{boostOptions[currentFilter].subdescription}</span>
      </div>
      <div className={classes.wrapper}>
        {boostOptions[currentFilter].items.map((item, index) => (
          <div
            key={index}
            className={classes.card}
            onClick={() => handleItemClick(index)} 
            style={{ backgroundColor: currentIndex === index ? theme.tertiary : theme.primary }}
          >
            <div className={classes.cardHeader}>
              <h2>
                <span style={{color: boostOptions[currentFilter].color}}>{currentFilter}</span> {item.name}
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
    // borderRadius: 16,
    // backgroundColor: theme.tertiary,
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
      // borderRadius: 6,
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
    flexGrow: 1,
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
