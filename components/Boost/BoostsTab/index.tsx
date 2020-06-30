import React, { useState, useMemo } from 'react';
import Filter from '../../shared/Filter';
import content from '../../../lib/boosts';
import { UpdateOrder } from '../../../store/boost/types';
import styles from './index.module.css';

const contentKeys = Object.keys(content);

interface Props {
  boostType: 'Solo' | 'Duo';
  collectionId: number;
  updateOrder: UpdateOrder;
}

const BoostTab = (props: Props): JSX.Element => {
  const { updateOrder, boostType, collectionId } = props;

  const currentContent = useMemo(() => content[boostType], [boostType]);

  const [selectedIndex, setIndex] = useState(
    currentContent.items.indexOf(
      currentContent.items.filter(item => item.id === collectionId)[0]
    ) || 0
  );

  const handleOrderUpdate = (newSelectedIndex: number): void => {
    setIndex(newSelectedIndex);

    const currentItem = currentContent.items[newSelectedIndex];

    updateOrder({
      collectionId: currentItem.id,
      collectionName: currentItem.title
    });
  };

  const handleFilterUpdate = (index: number): void => {
    const currentItem = content[contentKeys[index]].items[selectedIndex];

    updateOrder({
      collectionId: currentItem.id,
      collectionName: currentItem.title,
      boostType: contentKeys[index]
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.filter}>
        <Filter
          filters={contentKeys}
          selectedIndex={boostType === 'Solo' ? 0 : 1}
          onClick={handleFilterUpdate}
        />
      </div>
      {/* <div className={styles.notice}>
        {currentContent.description}
        <span> {currentContent.subdescription}</span>
      </div> */}
      <div className={styles.container}>
        {currentContent.items.map((item, index) => {
          const isSelected = item.id === collectionId;
          return (
            <button
              type="button"
              aria-label="boost-type"
              key={item.id}
              className={`${styles.button} ${isSelected && styles.selected}`}
              onClick={(): void => handleOrderUpdate(index)}
            >
              <div className={styles.header}>
                <span className={`${styles[boostType]}`}>{item.tag}</span>
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
