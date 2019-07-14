import React, { useState, useMemo } from "react";
import Filter from "../../Shared/Filter";
import content from "../../../lib/boostContent";
import PropTypes from "prop-types";
import BoostTabItem from "./BoostTabItem";
import { createUseStyles } from "react-jss";

const propTypes = {
  updateOrder: PropTypes.func.isRequired,
  currentOrder: PropTypes.object.isRequired
};

const BoostTab = props => {
  const { currentOrder, updateOrder } = props;

  const classes = useStyles();

  const [selectedIndex, setIndex] = useState(0);
  const [selectedFilter, setFilter] = useState(currentOrder.boost_type);

  const currentContent = useMemo(() => content[selectedFilter], [selectedFilter]);

  const handleOrderUpdate = newSelectedIndex => {
    const selectedCollection = currentContent.items[newSelectedIndex];

    updateOrder({
      collection_id: selectedCollection.id,
      boost_type: selectedFilter
    });

    setIndex(newSelectedIndex);
  };

  const handleFilterUpdate = newIndex => {
    switch (newIndex) {
      case 0:
        return setFilter("solo");
      case 1:
        return setFilter("duo");
      default:
        return setFilter("solo");
    }
  };

  return (
    <div className={classes.root}>
      <Filter filters={Object.keys(content)} onClick={handleFilterUpdate} />
      <span className={classes.notice}>
        {currentContent.description}
        <span>{currentContent.subdescription}</span>
      </span>
      <div className={classes.container}>
        {currentContent.items.map((item, index) => (
          <BoostTabItem
            key={index}
            item={item}
            onClick={() => handleOrderUpdate(index)}
            isSelected={selectedIndex === index}
          />
        ))}
      </div>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    position: "relative",
    boxShadow: "5px 0px 15px 0px rgba(0, 0, 0, 0.2)",
    borderRadius: 16,
    flexDirection: "column",
    backgroundColor: theme.primary,
    "@media (min-width: 1025px)": {
      width: "400px",
      height: "100%"
    }
  },
  container: {
    margin: "10px 10px",
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
    overflow: "auto",
    flexDirection: "row",
    "@media (min-width: 1025px)": {
      flexWrap: "nowrap",
      flexDirection: "column"
    }
  },
  notice: {
    color: theme.white,
    margin: "20px 10px 10px 10px",
    padding: "25px",
    fontSize: 16,
    boxShadow: "0px 0px 15px rgb(0,0,0,.12)",
    borderRadius: 8,
    backgroundColor: theme.tertiary,
    "& span": {
      color: theme.grey
    }
  }
}));

BoostTab.propTypes = propTypes;

export default BoostTab;
