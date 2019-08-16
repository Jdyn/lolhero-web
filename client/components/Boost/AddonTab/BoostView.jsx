import React, { useEffect } from 'react';
import addons from '../../../lib/addonContent';
import Toggle from '../../Shared/Toggle';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from 'react-jss';

const propTypes = {
  updateOrder: PropTypes.func.isRequired,
  currentOrder: PropTypes.object.isRequired
};

const BoostView = props => {
  const { currentOrder, updateOrder } = props;

  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    if (currentOrder.lp === 100) {
      if (currentOrder.startRank % 4 === 0) {
        updateOrder({ promos: ['X', 'X', 'X', 'X'] });
      } else {
        updateOrder({ promos: ['X', 'X'] });
      }
    } else {
      updateOrder({ promos: null });
    }
  }, [currentOrder.startRank, currentOrder.lp]);

  const handlePromoChange = index => {
    let newPromos = [...currentOrder.promos];

    switch (newPromos[index]) {
      case 'X':
        newPromos[index] = 'W';
        break;
      case 'W':
        newPromos[index] = 'L';
        break;
      case 'L':
        newPromos[index] = 'X';
        break;
      default:
        newPromos[index] = 'X';
        break;
    }

    updateOrder({ promos: newPromos });
  };

  const promoColor = promo => {
    switch (promo) {
      case 'X':
        return theme.secondaryWhite;
      case 'W':
        return 'green';

      case 'L':
        return 'red';

      default:
        return theme.secondaryWhite;
    }
  };

  return (
    <>
      <div className={classes.wrapper}>
        <h2>Servers</h2>
        <p>What server are you on? We currently support the following servers.</p>
        {addons.details.servers.map((server, index) => {
          return (
            <Toggle
              key={index}
              onClick={() => updateOrder({ server: server.server })}
              isSelected={currentOrder.server === server.server}
            >
              {server.title}
            </Toggle>
          );
        })}
      </div>

      <div className={classes.wrapper}>
        <h2>Queues</h2>
        <p>What queue type do you want to play on? We currently support the following queues.</p>
        {addons.details.queues.map((queue, index) => (
          <Toggle
            key={index}
            onClick={() => updateOrder({ queue: queue.queue })}
            isSelected={currentOrder.queue === queue.queue}
          >
            {queue.title}
          </Toggle>
        ))}
      </div>
      {currentOrder.collectionName === 'Division Boost' && (
        <div className={classes.wrapper}>
          <h2>League Points</h2>
          <p>How much LP do you have? We adjust the price based on the amount.</p>
          <div className={classes.lp}>
            {addons.details.lp.map((lp, index) => (
              <Toggle
                key={index}
                onClick={() => updateOrder({ lp: lp.lp })}
                width="85px"
                margin="5px 5px"
                isSelected={currentOrder.lp === lp.lp}
              >
                {lp.title}
              </Toggle>
            ))}
          </div>
          {currentOrder.lp === 100 && (
            <div className={classes.promos}>
              {currentOrder.promos &&
                currentOrder.promos.map((promo, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => handlePromoChange(index)}
                    className={classes.promo}
                    style={{ color: promoColor(promo) }}
                  >
                    {promo}
                  </button>
                ))}
            </div>
          )}
        </div>
      )}
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
      fontSize: 20,
      margin: 0,
      marginBottom: '10px'
    }
  },
  lp: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  promos: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    margin: '10px'
  },
  promo: {
    cursor: 'pointer',
    padding: '20px 15px',
    borderRadius: 14,
    border: 'none',
    outline: 'none',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    margin: '5px',
    fontWeight: 700,
    backgroundColor: theme.primary,
    transitionDuration: '.2s',
    '&:hover': {
      transform: 'translateY(-2px)'
    },
    '&:active': {
      transform: 'translateY(2px)'
    }
  }
}));

BoostView.propTypes = propTypes;

export default BoostView;
