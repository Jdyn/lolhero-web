import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Filter from '../../Reusable/Filter/Filter';
import content from '../../../lib/boosts';
import { UpdateOrder } from '../../../store/boost/types';
import styles from './styles.module.css';

const contentKeys = Object.keys(content);
type BoostType = 'Solo' | 'Duo';

interface Props {
  boostType: BoostType;
  collectionId: number;
  updateOrder: UpdateOrder;
}

const BoostTab = (props: Props): JSX.Element => {
  const { updateOrder, boostType, collectionId } = props;

  const [currentType, setType] = useState(boostType);
  const currentContent = useMemo(() => content[currentType], [currentType]);

  const [selectedIndex, setIndex] = useState(
    currentContent.items.indexOf(
      currentContent.items.filter(item => item.id === collectionId)[0]
    ) || 0
  );

  useEffect(() => {
    if (currentType !== boostType) {
      setIndex(selectedIndex);

      const currentItem = currentContent.items[selectedIndex];

      updateOrder({
        collectionId: currentItem.id,
        collectionName: currentItem.title,
        boostType: currentType
      });
    }
  }, [currentType, boostType, selectedIndex, currentContent, updateOrder]);

  const handleOrderUpdate = (newSelectedIndex: number): void => {
    setIndex(newSelectedIndex);

    const currentItem = currentContent.items[newSelectedIndex];
    if (collectionId !== currentItem.id) {
      updateOrder({
        collectionId: currentItem.id,
        collectionName: currentItem.title,
        boostType: currentType
      });
    }
  };

  const handleFilterUpdate = useCallback((index: number): void => {
    setType(contentKeys[index] as BoostType);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.filter}>
        <Filter
          filters={contentKeys}
          selectedIndex={currentType === 'Solo' ? 0 : 1}
          onClick={handleFilterUpdate}
        />
      </div>
      <div className={styles.notice}>
        {currentContent.description}
        <span> {currentContent.subdescription}</span>
      </div>
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
                <span className={`${styles[currentType]}`}>{item.tag}</span>
                <h2>{item.title}</h2>
              </div>
              {/* <span className={styles.selectedText}>{isSelected && 'selected'}</span> */}
              <p>{item.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(BoostTab);
