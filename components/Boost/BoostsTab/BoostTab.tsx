import React, { useState, useMemo, useEffect } from 'react';
import Filter from '../../Reusable/Filter/Filter';
import content from '../../../lib/boosts';
import { BoostOrderDetails } from '../../../store/boost/types';
import styles from './styles.module.css';

const contentKeys = Object.keys(content);

interface Props {
  currentOrder: BoostOrderDetails;
  updateOrder: (payload: object) => void;
}

const BoostTab = (props: Props): JSX.Element => {
  const { currentOrder, updateOrder } = props;

  const [currentType, setType] = useState(currentOrder.boostType);
  const currentContent = useMemo(() => content[currentType], [currentType]);

  const [selectedIndex, setIndex] = useState(
    currentContent.items.indexOf(
      currentContent.items.filter(item => item.id === currentOrder.collectionId)[0]
    )
  );

  useEffect(() => {
    if (currentType !== currentOrder.boostType) {
      setIndex(selectedIndex);

      const currentItem = currentContent.items[selectedIndex];

      updateOrder({
        collectionId: currentItem.id,
        collectionName: currentItem.title,
        boostType: currentType
      });
    }
  }, [currentType, currentOrder.boostType, selectedIndex, currentContent, updateOrder]);

  const handleOrderUpdate = (newSelectedIndex: number): void => {
    setIndex(newSelectedIndex);

    const currentItem = currentContent.items[newSelectedIndex];
    if (currentOrder.collectionId !== currentItem.id) {
      updateOrder({
        collectionId: currentItem.id,
        collectionName: currentItem.title,
        boostType: currentType
      });
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.filter}>
        <Filter
          filters={contentKeys}
          rounded
          selectedIndex={currentType === 'Solo' ? 0 : 1}
          onClick={(index: number): void => setType(contentKeys[index])}
        />
      </div>

      {/* <div className={styles.notice}>
        {currentContent.description}
        <span>{currentContent.subdescription}</span>
      </div> */}
      <div className={styles.container}>
        {currentContent.items.map((item, index) => {
          const isSelected = selectedIndex === index;
          return (
            <button
              type="button"
              aria-label="boost-type"
              key={item.id}
              className={`${styles.button} ${isSelected && styles.selected}`}
              onClick={(): void => handleOrderUpdate(index)}
            >
              <div className={styles.header}>
                <span>{item.tag}</span>
                <h2>{item.title}</h2>
                <h3>{isSelected && 'selected'}</h3>
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
