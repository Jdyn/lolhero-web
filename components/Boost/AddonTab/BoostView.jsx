import React, { useEffect } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import content from '../../../lib/content';
import Toggle from '../../reusable/Toggle';

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
    }
  }, [currentOrder.startRank, currentOrder.lp, updateOrder]);

  const handlePromoChange = (type, index) => {
    const newPromos = [...currentOrder.promos];
    if (type !== newPromos[index]) {
      newPromos[index] = type;
      updateOrder({ promos: newPromos });
    }
  };

  const handleLpChange = selectedLp => {
    if (selectedLp !== currentOrder.lp) {
      if (selectedLp === 100) {
        if (currentOrder.startRank % 4 === 0) {
          updateOrder({ lp: selectedLp, promos: ['X', 'X', 'X', 'X'] });
        } else {
          updateOrder({ lp: selectedLp, promos: ['X', 'X'] });
        }
      } else if (currentOrder.promos !== null) {
        updateOrder({ lp: selectedLp, promos: null });
      } else {
        updateOrder({ lp: selectedLp });
      }
    }
  };

  const validateDisabled = type => {
    let maxWins;
    let maxLosses;

    if (currentOrder.startRank % 4 === 0) {
      maxWins = 2;
      maxLosses = 2;
    } else {
      maxWins = 1;
      maxLosses = 1;
    }

    let totalWins = 0;
    let totalLosses = 0;

    currentOrder.promos.forEach(promo => {
      if (promo === 'W') {
        totalWins += 1;
      } else if (promo === 'L') {
        totalLosses += 1;
      }
    });

    if (totalWins >= maxWins) {
      if (type === 'W') {
        return true;
      }
    }

    if (totalLosses >= maxLosses) {
      if (type === 'L') {
        return true;
      }
    }

    return false;
  };

  return (
    <>
      {currentOrder.collectionName === 'Division Boost' && (
        <div className={classes.wrapper}>
          <h2>Current LP</h2>
          <p>How much LP do you have?</p>
          <div className={classes.lp}>
            {content.boosts.lp.map((lp, index) => (
              <Toggle
                key={index}
                onClick={() => handleLpChange(lp.lp)}
                width="85px"
                margin="5px 5px"
                borderRadius="8px"
                isSelected={currentOrder.lp === lp.lp}
              >
                {lp.title}
              </Toggle>
            ))}
          </div>
          {currentOrder.lp === 100 && (
            <div className={classes.promos}>
              <h2>Promotion Series</h2>
              {currentOrder.promos && (
                <>
                  <div className={classes.promoSection}>
                    <span>-</span>
                    <span>Win</span>
                    <span>Loss</span>
                  </div>
                  {currentOrder.promos.map((promo, rowIndex) => (
                    <div key={rowIndex} className={classes.promoSection}>
                      {['X', 'W', 'L'].map(type => (
                        <button
                          className={classes.promo}
                          type="button"
                          aria-label="promotion"
                          key={type}
                          disabled={validateDisabled(type)}
                          style={{ backgroundColor: promo === type ? theme.accent : theme.primary }}
                          onClick={() => handlePromoChange(type, rowIndex)}
                        />
                      ))}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      )}
      <div className={classes.wrapper}>
        <h2>Server</h2>
        <p>We currently support the following servers</p>
        {content.boosts.servers.map(server => {
          return (
            <Toggle
              key={server.server}
              onClick={() =>
                currentOrder.server !== server.server && updateOrder({ server: server.server })
              }
              isSelected={currentOrder.server === server.server}
            >
              {server.title}
            </Toggle>
          );
        })}
      </div>
      <div className={classes.wrapper}>
        <h2>Queue</h2>
        <p>We currently support the following queues types</p>
        {content.boosts.queues.map(queue => (
          <Toggle
            key={queue.queue}
            onClick={() =>
              currentOrder.queue !== queue.queue && updateOrder({ queue: queue.queue })
            }
            isSelected={currentOrder.queue === queue.queue}
          >
            {queue.title}
          </Toggle>
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
    borderRadius: 8,
    padding: '25px',
    boxShadow: '0 0 15px 0 rgba(0,0,0,.2)',
    margin: '10px 10px 10px 10px',
    '& p': {
      color: theme.grey,
      margin: 0,
      fontSize: 16,
      marginBottom: '10px'
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
    justifyContent: 'center',
    flexDirection: 'row',
    margin: '25px 0 0px 0',
    '& h2': {
      fontSize: 20,
      margin: 0,
      width: '100%',
      marginBottom: '10px'
    }
  },
  promoSection: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    margin: '0 35px',
    '& span': {
      margin: '5px',
      width: '45px',
      textAlign: 'center'
    }
  },
  promo: {
    cursor: 'pointer',
    height: '32px',
    width: '32px',
    borderRadius: 8,
    border: 'none',
    outline: 'none',
    display: 'flex',
    margin: '5px',
    padding: 0,
    justifyContent: 'center',
    fontWeight: 700,
    transitionDuration: '.2s',
    '&:hover': {
      transform: 'translateY(2px)'
    }
  }
}));

export default BoostView;
