import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { flatRanks } from '../../../lib/ranks';
import { Order } from '../../../store/account/types';
import Banner from '../../Boost/Banner';
import champions from '../../../lib/champions';
import Filter from '../../shared/Filter';

const ranks = flatRanks();

interface Props {
  order?: Order;
  orderForm: any;
  setOrderForm: (update: object) => void;
}

const OrderDisplay: React.FC<Props> = (props: Props): JSX.Element => {
  const { order, orderForm, setOrderForm } = props;

  const filters = [
    order?.details.primaryRole || 'Role 1',
    order?.details.secondaryRole || 'Role 2'
  ];

  const [currentFilter, setFilter] = useState(filters[0]);
  const [selectedIndex, setIndex] = useState(0);

  useEffect(() => {
    if (filters[selectedIndex] !== currentFilter) {
      setFilter(filters[selectedIndex]);
    }
  }, [selectedIndex, filters, currentFilter]);

  const handleClick = (newChampion: any): void => {
    const champion = { ...newChampion, position: currentFilter };

    const contains = orderForm.details.champions.some(
      champ => JSON.stringify(champ) === JSON.stringify(champion)
    );

    if (!contains && orderForm.details.champions.length < 8) {
      setOrderForm({
        ...orderForm,
        details: {
          ...orderForm.details,
          champions: [...orderForm.details.champions, champion]
        }
      });
    }
  };

  const handleFilter = (index: number): void => {
    setIndex(index);
    setFilter(filters[index]);
  };

  return (
    <div className={styles.root}>
      {order && (
        <>
          {order.isEditable && order.details.boostType === 'Solo' ? (
            <>
              <Filter filters={filters} onClick={(index: number): void => handleFilter(index)} />
              <div className={styles.championContainer}>
                <div className={styles.championWrapper}>
                  {champions.map(champion => (
                    <button
                      className={styles.championButton}
                      key={champion.name}
                      type="button"
                      onClick={(): void => handleClick(champion)}
                    >
                      <img
                        alt="champion-icon"
                        className={styles.championImage}
                        src={champion.img}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className={styles.banners}>
              <h3>{order.title}</h3>
              <div className={styles.container}>
                <Banner
                  isStartRank
                  title=""
                  height="375px"
                  type="default"
                  rank={ranks[order.details.startRank] || {}}
                />
                <Banner
                  title=""
                  height="375px"
                  type="default"
                  rank={ranks[order.details.desiredRank] || ranks[order.details.startRank]}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderDisplay;
