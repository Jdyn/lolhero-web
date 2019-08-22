import React, { useMemo } from 'react';
import ranks from '../../../lib/ranks';
import addons from '../../../lib/addonContent';
import content from '../../../lib/boostContent';
import PropTypes from 'prop-types';
import { formatLP } from '../../../util/Helpers';
import { createUseStyles } from 'react-jss';

const propTypes = {
  currentOrder: PropTypes.object.isRequired
};

const ReviewView = props => {
  const { currentOrder, submitOrderRequest } = props;
  const classes = useStyles();

  const formatTitle = () => {
    const { boostType, startRank, desiredRank, lp, desiredAmount, collectionName } = currentOrder;

    switch (collectionName) {
      case 'Division Boost':
        return `${boostType.toUpperCase()} | ${collectionName} - From ${startRank ||
          'TBD'} (${formatLP(lp)} LP) to ${desiredRank || 'TBD'}`;
      default:
        return `${boostType.toUpperCase()} | ${desiredAmount} ${collectionName} - ${startRank ||
          'TBD'}`;
    }
  };

  return (
    <>
      <div className={classes.wrapper}>
        <h3>Order Summary</h3>
        <h2>{formatTitle()}</h2>
        <h3>Details</h3>

        {currentOrder.collectionName === 'Division Boost' && (
          <span>
            LP: <b>{formatLP(currentOrder.lp)}</b>
          </span>
        )}

        <span>
          Type: <b>{currentOrder.boostType}</b>
        </span>
        <span>
          Server: <b>{currentOrder.server}</b>
        </span>
        <span>
          Boost: <b>{currentOrder.collectionName}</b>
        </span>
        <span>
          Queue:
          <b>
            {` ${currentOrder.queue.charAt(0).toUpperCase()}${currentOrder.queue.slice(1)} ` +
              `Queue`}
          </b>
        </span>
        <h3>Add-Ons</h3>
        {addons.addons.extras.map((extra, index) => (
          <span key={index}>
            {extra.title}: <b>{currentOrder[extra.type] ? 'Yes' : 'No'}</b>
          </span>
        ))}
      </div>
    </>
  );
};

const useStyles = createUseStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.tertiary,
    borderRadius: 12,
    padding: '25px',
    boxShadow: '0 0 15px 0 rgba(0,0,0,.2)',
    margin: '10px 10px 20px 10px',
    '& p': {
      color: theme.grey,
      margin: 0,
      fontSize: 16,
      marginBottom: '15px'
    },
    '& h2': {
      fontSize: 16,
      margin: 0,
      marginBottom: '15px'
    },
    '& h3': {
      margin: '15px 0',
      fontSize: 20,
      marginBottom: '15px',
      color: theme.white
    },
    '& span': {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '5px',
      fontSize: 16,
      color: theme.white,
      '& b': {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-end',
        color: theme.grey
      }
    }
  }
}));

ReviewView.propTypes = propTypes;

export default ReviewView;
