import React, { useEffect } from 'react';
import content from '../../../../lib/content';
import Toggle from '../../../reusable/Toggle';
import { BoostOrderDetails } from '../../../../store/boost/types';
import styles from './styles.css';

interface Props {
  currentOrder: BoostOrderDetails;
  updateOrder: (boostUpdate: object) => void;
}

const BoostView = (props: Props): JSX.Element => {
  const { currentOrder, updateOrder } = props;

  useEffect(() => {
    if (currentOrder.lp === 100) {
      if (currentOrder.startRank % 4 === 0) {
        updateOrder({ promos: ['X', 'X', 'X', 'X'] });
      } else {
        updateOrder({ promos: ['X', 'X'] });
      }
    }
  }, [currentOrder.startRank, currentOrder.lp, updateOrder]);

  const handlePromoChange = (type: string, index: number): void => {
    const newPromos = [...currentOrder.promos];
    if (type !== newPromos[index]) {
      newPromos[index] = type;
      updateOrder({ promos: newPromos });
    }
  };

  const handleLpChange = (selectedLp: number): void => {
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

  const validateDisabled = (type: string): boolean => {
    let maxWins: number;
    let maxLosses: number;

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
        <div className={styles.root}>
          <h2>Current LP</h2>
          <p>How much LP do you have?</p>
          <div className={styles.lp}>
            {content.boosts.lp.map(lp => (
              <Toggle
                key={lp.title}
                onClick={(): void => handleLpChange(lp.lp)}
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
            <div className={styles.promos}>
              <h2>Promotion Series</h2>
              {currentOrder.promos && (
                <>
                  <div className={styles.promoSection}>
                    <span>-</span>
                    <span>Win</span>
                    <span>Loss</span>
                  </div>
                  {currentOrder.promos.map((promo, rowIndex) => (
                    <div key={rowIndex} className={styles.promoSection}>
                      {['X', 'W', 'L'].map(type => (
                        <button
                          className={`${styles.promo} ${promo === type && styles.selected}`}
                          type="button"
                          aria-label="promotion"
                          key={type}
                          disabled={validateDisabled(type)}
                          onClick={(): void => handlePromoChange(type, rowIndex)}
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
      <div className={styles.root}>
        <h2>Server</h2>
        <p>We currently support the following servers</p>
        {content.boosts.servers.map(server => {
          return (
            <Toggle
              key={server.server}
              onClick={(): void =>
                currentOrder.server !== server.server && updateOrder({ server: server.server })
              }
              isSelected={currentOrder.server === server.server}
            >
              {server.title}
            </Toggle>
          );
        })}
      </div>
      <div className={styles.root}>
        <h2>Queue</h2>
        <p>We currently support the following queues types</p>
        {content.boosts.queues.map(queue => (
          <Toggle
            key={queue.queue}
            onClick={(): void =>
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

export default BoostView;
