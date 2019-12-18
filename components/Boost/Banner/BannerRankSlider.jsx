import React, { useMemo, useEffect } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import content from '../../../lib/boosts';

const BannerRankSlider = props => {
  const { rank, currentOrder, updateOrder } = props;

  const classes = useStyles(props);
  const theme = useTheme();

  const currentCollection = useMemo(
    () =>
      content[currentOrder.boostType].items.filter(
        item => item.title === currentOrder.collectionName
      )[0],
    [currentOrder.collectionId]
  );

  // Update the value if the collection was changed and the desiredAmount was greater than the new collections maximum amount.
  useEffect(() => {
    if (currentOrder.desiredAmount > currentCollection.maxAmount) {
      updateOrder({ desiredAmount: parseInt(currentCollection.maxAmount, 0) });
    }
  }, [currentCollection, updateOrder, currentOrder.desiredAmount]);

  return (
    <div className={classes.container}>
      <h3 className={classes.amount}>{currentOrder.desiredAmount}</h3>
      <div className={classes.sliderWrapper}>
        <input
          type="range"
          min="1"
          max={currentCollection.maxAmount}
          className={classes.slider}
          style={{ backgroundColor: rank.accent || theme.grey }}
          value={currentOrder.desiredAmount}
          onChange={event => updateOrder({ desiredAmount: parseInt(event.target.value, 0) })}
        />
      </div>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    flexGrow: 1
  },
  amount: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 65,
    margin: 0,
    flexGrow: 1
  },
  sliderWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginBottom: '-20px',
    maxHeight: '95px'
  },
  slider: {
    appearance: 'none',
    width: '100%',
    height: '14px',
    outline: 'none',
    borderRadius: 3,
    '&::-webkit-slider-thumb': {
      appearance: 'none',
      cursor: 'pointer',
      height: '35px',
      width: '10px',
      borderRadius: 3,
      backgroundColor: theme.white,
      transitionDuration: '.15s',
      '&:hover': {
        transform: 'scale(1.2)'
      }
    }
  }
}));

export default BannerRankSlider;
