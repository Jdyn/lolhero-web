import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface Props {
  filters: string[];
  selectedIndex?: number;
  extended?: boolean;
  noSelect?: boolean;
  onClick?: (currentIndex?: number, filter?: string) => void;
  untargetableIndices: number[];
  fontSize?: string;
}

const Filter = (props: Props): JSX.Element => {
  const {
    filters,
    selectedIndex,
    onClick,
    untargetableIndices,
    extended,
    noSelect,
    fontSize
  } = props;

  const [state, set] = useState(selectedIndex || 0);

  useEffect(() => {
    if (selectedIndex < filters.length) set(selectedIndex);
  }, [selectedIndex, filters]);

  const handleClick = (index: number): void => {
    if (typeof onClick === 'function') {
      onClick(index, filters[index]);
    }
    set(index);
  };

  return (
    <div className={`${styles.root} ${extended ? styles.extended : ''} `}>
      {Array.isArray(filters) &&
        filters.map((filter, index) => {
          const disabled = untargetableIndices.includes(index);
          const select = state === index && !noSelect;
          return (
            <button
              key={filter}
              type="button"
              className={`${styles.item} ${select ? styles.selected : ''} ${
                disabled ? styles.disabled : ''
              } `}
              onClick={(): void => handleClick(index)}
              style={{
                width: `calc(100% / ${filters.length})`,
                fontSize
              }}
            >
              {filter}
            </button>
          );
        })}
    </div>
  );
};

Filter.defaultProps = {
  untargetableIndices: []
} as Partial<Props>;

export default React.memo(Filter);
