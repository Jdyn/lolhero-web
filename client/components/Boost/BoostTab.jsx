import React, { useState, useEffect } from "react";
import Filter from "../Shared/Filter";
import content from "../../lib/boostContent";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import BoostTabItem from "./BoostTabItem";

const propTypes = {
  classes: PropTypes.object.isRequired,
  setOrder: PropTypes.func.isRequired
};

const BoostList = props => {
  const { classes, setOrder } = props;

  const [selectedFilter, setFilter] = useState("solo");
  const [selectedIndex, setIndex] = useState(0);

  useEffect(() => {
    updateOrder(selectedIndex);
  }, [selectedFilter]);

  const updateOrder = newSelectedIndex => {
    const selectedCollection = content[selectedFilter].items[newSelectedIndex];
    setIndex(newSelectedIndex);
    setOrder(prev => ({
      ...prev,
      collection_id: selectedCollection.id,
      type: selectedFilter
    }));
  };

  return (
    <div className={classes.root}>
      <Filter
        filters={Object.keys(content)}
        onClick={index => setFilter(index === 0 ? "solo" : "duo")}
      />
      <div className={classes.notice}>
        {content[selectedFilter].description}
        <span>{content[selectedFilter].subdescription}</span>
      </div>
      <div className={classes.container}>
        {content[selectedFilter].items.map((item, index) => (
          <BoostTabItem
            key={index}
            item={item}
            isSelected={selectedIndex === index}
            onClick={() => updateOrder(index)}
          />
        ))}
      </div>
    </div>
  );
};

const styles = theme => ({
  root: {
    width: "100%",
    display: "flex",
    position: "relative",
    boxShadow: "5px 0px 15px 0px rgba(0, 0, 0, 0.2)",
    borderRadius: 16,
    zIndex: 15,
    flexDirection: "column",
    backgroundColor: theme.primary,
    "@media (min-width: 1025px)": {
      width: "400px",
      height: "100%"
    }
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
    overflow: "auto",
    flexDirection: "row",
    margin: "10px 10px",
    "@media (min-width: 1025px)": {
      flexWrap: "nowrap",
      flexDirection: "column"
    }
  },
  notice: {
    margin: "20px 10px 10px 10px",
    padding: "15px",
    boxShadow: "0px 0px 15px rgb(0,0,0,.12)",
    backgroundColor: theme.tertiary,
    color: theme.white,
    borderRadius: 8,
    fontSize: 16,
    "& span": {
      color: theme.grey
    }
  }
});

BoostList.propTypes = propTypes;

export default withStyles(styles)(BoostList);
