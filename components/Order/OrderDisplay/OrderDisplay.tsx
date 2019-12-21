import React, { useState, useEffect } from 'react';
import styles from './styles.css';
import { flatRanks } from '../../../lib/ranks';
import { Order } from '../../../store/account/types';
import Banner from '../../Boost/Banner';
import champions from '../../../lib/champions';
import Filter from '../../Reusable/Filter';

const ranks = flatRanks();

interface Props {
  order?: Order;
  orderForm: any;
  setOrderForm: (update: object) => void;
}

const OrderDisplay: React.FC<Props> = (props: Props): JSX.Element => {
  const { order, orderForm, setOrderForm } = props;
  const filters = [
    orderForm.details.primaryRole || 'Role 1',
    orderForm.details.secondaryRole || 'Role 2'
  ];

  const [currentFilter, setFilter] = useState(filters[0]);
  const [selectedIndex, setIndex] = useState(filters[0]);

  useEffect(() => {
    setFilter(filters[selectedIndex]);
  }, [selectedIndex, filters]);

  const handleClick = (newChampion: any): void => {
    const champion = { ...newChampion, position: currentFilter };

    const contains = orderForm.champions.some(
      champ => JSON.stringify(champ) === JSON.stringify(champion)
    );

    if (!contains) {
      setOrderForm({
        ...orderForm,
        champions: [...orderForm.champions, champion]
      });
    }
  };

  const handleFilter = (index: number): void => {
    setIndex(index);
    setFilter(filters[index]);
  };

  return (
    <div className={styles.root}>
      {/* <h3>{order.title}</h3> */}
      {order.isEditable ? (
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
                  <img alt="champion-icon" className={styles.championImage} src={champion.img} />
                  {/* <span>{champion.name}</span> */}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className={styles.container}>
          <Banner
            isStartRank
            height="375px"
            type="default"
            rank={ranks[order.details.startRank] || {}}
          />
          <Banner height="375px" type="default" rank={ranks[order.details.desiredRank] || {}} />
        </div>
      )}
    </div>
  );
};

export default OrderDisplay;
