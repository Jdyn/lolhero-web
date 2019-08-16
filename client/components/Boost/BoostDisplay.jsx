import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import ranks from '../../lib/ranks';
import Banner from './Banner';

const propTypes = {
  updateOrder: PropTypes.func.isRequired,
  currentOrder: PropTypes.shape({}).isRequired
};

let useStyles;

const BoostDisplay = props => {
  const { updateOrder, currentOrder, submitOrderRequest } = props;

  const classes = useStyles();

  const ranksObject = useMemo(() =>
    [].concat.apply([], [...ranks]).reduce((obj, item) => ((obj[item.rank] = item), obj), {})
  );

  const renderContent = collectionName => {
    switch (collectionName) {
      case 'Division Boost':
        return (
          <>
            <Banner
              type="picker"
              isStartRank
              rank={currentOrder.startRank ? ranksObject[currentOrder.startRank] : {}}
              currentOrder={currentOrder}
              updateOrder={updateOrder}
            />
            <Banner
              type="picker"
              rank={currentOrder.desiredRank ? ranksObject[currentOrder.desiredRank] : {}}
              updateOrder={updateOrder}
              currentOrder={currentOrder}
            />
          </>
        );
      default:
        return (
          <>
            <Banner
              type="picker"
              isStartRank
              rank={currentOrder.startRank ? ranksObject[currentOrder.startRank] : {}}
              currentOrder={currentOrder}
              updateOrder={updateOrder}
            />
            <Banner
              type="slider"
              rank={currentOrder.startRank ? ranksObject[currentOrder.startRank] : {}}
              updateOrder={updateOrder}
              currentOrder={currentOrder}
            />
          </>
        );
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>{renderContent(currentOrder.collectionName)}</div>
      {submitOrderRequest.errored && (
        <div className={classes.error}>
          <span>Error: {submitOrderRequest.error}</span>
        </div>
      )}
    </div>
  );
};

useStyles = createUseStyles(theme => ({
  root: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    flexGrow: 1
  },
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexGrow: 1,
    flexDirection: 'column',
    '@media (min-width: 640px)': {
      flexDirection: 'row',
      alignItems: 'normal'
    }
  },
  error: {
    display: 'flex',
    color: theme.white,
    borderRadius: '8px 8px 0 0',
    backgroundColor: theme.red,
    padding: '8px 20px 8px 20px',
    margin: '10px 15px 0 15px',
    border: '2px solid #f44336'
  }
}));

BoostDisplay.propTypes = propTypes;

export default BoostDisplay;
