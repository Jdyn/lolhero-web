import React, { useEffect } from 'react';
import addons from '../../../lib/addonContent';
import Toggle from '../../Shared/Toggle';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const propTypes = {
  updateOrder: PropTypes.func.isRequired,
  currentOrder: PropTypes.object.isRequired
};

const BoostView = props => {
  const { currentOrder, updateOrder } = props;

  const classes = useStyles();

  useEffect(() => {
    if (currentOrder.start_rank % 4 === 0) {
      if (currentOrder.promos.length !== 5) {
        let newPromos = [...currentOrder.promos];
        for (let i = newPromos.length; i < 5; i++) {
          newPromos.push('X');
        }

        updateOrder({ promos: newPromos });
      }
    } else if (currentOrder.promos.length !== 3) {
      let newPromos = [...currentOrder.promos];
      for (let i = newPromos.length; i > 3; i--) {
        newPromos.shift();
      }

      updateOrder({ promos: newPromos });
    }
  }, [currentOrder.start_rank]);

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
      {currentOrder.collection_name === 'Division Boost' ? (
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
              {currentOrder.promos.map((promo, index) => (
                <button
                  key={index}
                  onClick={() => handlePromoChange(index)}
                  className={classes.promo}
                  styles={{}}
                >
                  {promo}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div />
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
    margin: '5px',
    color: theme.white,
    border: '2px solid #999',
    backgroundColor: theme.quartinary,
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
