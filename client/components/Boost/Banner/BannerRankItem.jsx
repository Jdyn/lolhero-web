import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";

const propTypes = {
  rank: PropTypes.object,
  isStartRank: PropTypes.bool,
  updateOrder: PropTypes.func.isRequired
};

const BannerRankItem = props => {
  const { rank, isStartRank, updateOrder } = props;

  const theme = useTheme();
  const classes = useStyles(props);

  const handleClick = () => {
    isStartRank
      ? updateOrder({ start_rank: rank.rank })
      : updateOrder({ desired_rank: rank.rank });
  };

  return (
    <button
      className={classes.container}
      disabled={props.isDisabled}
      onClick={handleClick}
      style={{
        opacity: props.isDisabled ? "0.4" : "1",
        borderColor: props.isSelected ? theme.white : rank.accent
      }}
    />
  );
};

const useStyles = createUseStyles(theme => ({
  container: ({ rank }) => ({
    width: "12px",
    border: `1px solid`,
    margin: "1.5px 1px",
    cursor: "pointer",
    height: "35px",
    outline: "none",
    padding: 0,
    borderRadius: 3,
    transitionDuration: ".05s",
    backgroundColor: rank.color,
    "&:hover": {
      transform: "scale(1.5)"
    }
  })
}));

BannerRankItem.propTypes = propTypes;

export default BannerRankItem;
