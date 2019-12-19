import React, { useState, useMemo, useEffect } from 'react';
import Filter from '../../reusable/Filter';
import content from '../../../lib/boosts';
import { BoostOrderDetails } from '../../../store/boost/types';
import styles from './styles.css';

const contentKeys = Object.keys(content);

interface Props {
  currentOrder: BoostOrderDetails;
  updateOrder: (payload: object) => void;
}

const BoostTab = (props: Props): JSX.Element => {
  const { currentOrder, updateOrder } = props;

  const [selectedIndex, setIndex] = useState(0);
  const [currentType, setType] = useState(currentOrder.boostType);

  const currentContent = useMemo(() => content[currentType], [currentType]);

  useEffect(() => {
    if (currentType !== currentOrder.boostType) {
      const currentItem = currentContent.items[selectedIndex];
      setIndex(selectedIndex);
      updateOrder({
        collectionId: currentItem.id,
        collectionName: currentItem.title,
        boostType: currentType
      });
    }
  }, [currentType, currentOrder, selectedIndex, currentContent, updateOrder]);

  const handleOrderUpdate = (newSelectedIndex: number): void => {
    const currentItem = currentContent.items[newSelectedIndex];

    setIndex(newSelectedIndex);
    updateOrder({
      collectionId: currentItem.id,
      collectionName: currentItem.title,
      boostType: currentType
    });
  };

  return (
    <div className={styles.root}>
      <Filter
        filters={contentKeys}
        selectedIndex={currentType === 'Solo' ? 0 : 1}
        onClick={(index: number): void => setType(contentKeys[index])}
      />
      <div className={styles.notice}>
        {currentContent.description}
        <span>{currentContent.subdescription}</span>
      </div>
      <div className={styles.container}>
        {currentContent.items.map((item, index) => {
          const isSelected = currentContent.items[index].id === currentOrder.collectionId;
          return (
            <button
              type="button"
              aria-label="boost-type"
              key={item.id}
              className={`${styles.button} ${isSelected ? styles.selected : ''}`}
              onClick={(): void => handleOrderUpdate(index)}
            >
              <div className={styles.header}>
                <span>{item.tag}</span>
                <h2>{item.title}</h2>
                <h3>{isSelected ? 'selected' : ''}</h3>
              </div>
              <p>{item.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BoostTab;
