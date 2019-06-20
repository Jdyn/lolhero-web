import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Banner from "./Banner";
import ranks from "../../lib/ranks";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const RankSelect = props => {
  const { classes, collection } = props;

  const handleClick = (tierIndex, itemIndex) => {
    const item = ranks[tierIndex][itemIndex]

    console.log(item)


  }



  return (
    <div className={classes.container}>
      {/* <Banner />
      <Banner /> */}




      {ranks.map((rankList, tierIndex) =>(
        rankList.map((listItem, itemIndex) => (
          <button style={{backgroundColor: ranks[tierIndex][itemIndex].color}} onClick={() => handleClick(tierIndex, itemIndex)}>{listItem.title}</button>
        ))
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-evenly",
    flexGrow: 1
  }
};

RankSelect.propTypes = propTypes;

export default withStyles(styles)(RankSelect);
