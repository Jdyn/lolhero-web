import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';

const useStyles = createUseStyles(theme => ({
  container: ({ rank }) => ({
    width: '12px',
    border: `1px solid`,
    margin: '1.5px 1px',
    cursor: 'pointer',
    height: '35px',
    outline: 'none',
    padding: 0,
    borderRadius: 3,
    transitionDuration: '.05s',
    backgroundColor: rank.color,
    '&:hover': {
      transform: 'scale(1.5)'
    }
  })
}));

const BannerRankItem = props => {
  const { rank, isStartRank, updateOrder, isSelected, isDisabled } = props;

  const theme = useTheme();
  const classes = useStyles(props);

  const handleClick = () => {
    if (isStartRank) {
      updateOrder({ startRank: rank.rank }, { startRankTitle: rank.title });
    } else {
      updateOrder({ desiredRank: rank.rank }, { desiredRankTitle: rank.title });
    }
  };

  return (
    <button
      type="button"
      aria-label="rank"
      className={classes.container}
      disabled={isDisabled}
      onClick={handleClick}
      style={{
        opacity: isDisabled ? '0.4' : '1',
        borderColor: isSelected ? theme.white : rank.accent
      }}
    />
  );
};

export default BannerRankItem;
