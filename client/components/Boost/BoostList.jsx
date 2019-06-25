import React, { useState, useEffect } from "react";
import Filter from "../Shared/Filter";
import content from "../../lib/boostContent";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import BoostListItem from "./BoostListItem";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const BoostList = props => {
  const { classes } = props;

  const [selectedFilter, setFilter] = useState("solo");
  const [selectedIndex, setIndex] = useState(0);

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
          <BoostListItem
            key={index}
            item={item}
            isSelected={index === selectedIndex}
            onClick={() => setIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

const styles = theme => ({
  root: {
    left: 0,
    width: "400px",
    height: "100%",
    display: "flex",
    position: "relative",
    boxShadow: "5px 0px 15px 0px rgba(0, 0, 0, 0.4)",
    borderRadius: 16,
    flexDirection: "column",
    backgroundColor: theme.primary
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 3,
    overflowY: "auto",
    margin: "10px 10px"
  },
  notice: {
    margin: "10px",
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
