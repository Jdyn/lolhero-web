import React, { useMemo } from 'react';
import ranks from '../../lib/ranks';
import Banner from './Banner';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const propTypes = {
  updateOrder: PropTypes.func.isRequired,
  currentOrder: PropTypes.objectOf(PropTypes.string).isRequired
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
              rank={currentOrder.start_rank ? ranksObject[currentOrder.start_rank] : {}}
              currentOrder={currentOrder}
              updateOrder={updateOrder}
            />
            <Banner
              type="picker"
              rank={currentOrder.desired_rank ? ranksObject[currentOrder.desired_rank] : {}}
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
              rank={currentOrder.start_rank ? ranksObject[currentOrder.start_rank] : {}}
              currentOrder={currentOrder}
              updateOrder={updateOrder}
            />
            <Banner
              type="slider"
              rank={currentOrder.start_rank ? ranksObject[currentOrder.start_rank] : {}}
              updateOrder={updateOrder}
              currentOrder={currentOrder}
            />
          </>
        );
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>{renderContent(currentOrder.collection_name)}</div>
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
    margin: '10px auto 0 auto',
    border: '2px solid #f44336'
  }
}));

BoostDisplay.propTypes = propTypes;

export default BoostDisplay;
