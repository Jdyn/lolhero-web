import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const BannerRankItem = props => {
  const { classes, rank, isStartingRank, updateOrder } = props;

  const handleClick = () => {
    isStartingRank
      ? updateOrder({ start_rank: rank.rank })
      : updateOrder({ desired_rank: rank.rank });
  };

  return <button className={classes.container} onClick={handleClick} />;
};

const styles = theme => ({
  container: ({ isSelected, rank }) => ({
    width: "12px",
    border: `1px solid ${isSelected ? theme.white : rank.accent}`,
    margin: "1.5px 1px",
    cursor: "pointer",
    height: "35px",
    outline: "none",
    padding: 0,
    borderRadius: 3,
    transitionDuration: ".05s",
    backgroundColor: rank.color,
    "&:hover": {
      zIndex: 10,
      transform: "scale(1.5)"
    }
  })
});

BannerRankItem.propTypes = propTypes;

export default withStyles(styles)(BannerRankItem);
