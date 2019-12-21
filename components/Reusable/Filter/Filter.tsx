import React, { useState, useEffect } from 'react';
import styles from './styles.css';

interface Props {
  filters: string[];
  selectedIndex?: number;
  extended?: boolean;
  rounded?: boolean;
  onClick: (currentIndex?: number) => void;
  untargetableIndices: number[];
}

const Filter = (props: Props): JSX.Element => {
  const { filters, selectedIndex, onClick, untargetableIndices, extended, rounded } = props;

  const [state, set] = useState(selectedIndex || 0);

  useEffect(() => {
    if (selectedIndex < filters.length) set(selectedIndex);
  }, [selectedIndex, filters]);

  const handleClick = (index: number): void => {
    if (typeof onClick === 'function') {
      onClick(index);
    }
    set(index);
  };

  return (
    <ul
      className={`${styles.root} ${extended ? styles.extended : ''} ${
        rounded ? styles.rounded : ''
      }`}
    >
      {Array.isArray(filters) &&
        filters.map((filter, index) => {
          const disabled = untargetableIndices.includes(index);
          return (
            <button
              key={filter}
              type="button"
              className={`${styles.item} ${state === index && styles.selected} ${disabled &&
                styles.disabled} `}
              onClick={(): void => handleClick(index)}
              style={{
                width: `calc(100% / ${props.filters.length})`
              }}
            >
              {filter}
            </button>
          );
        })}
    </ul>
  );
};

Filter.defaultProps = {
  untargetableIndices: []
} as Partial<Props>;

export default Filter;
