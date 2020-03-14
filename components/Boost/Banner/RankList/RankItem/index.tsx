/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import styles from './index.module.css';
import { Rank } from '../../../../../lib/ranks';

interface Props {
  rankItem: Rank;
  rankTier: number;
  disabled: boolean;
  selected: boolean;
  onClick: (rankItem: Rank) => void;
}

const RankItem = (props: Props): JSX.Element => {
  const { rankItem, rankTier, disabled, selected, onClick } = props;

  const handleOnClick = useCallback(() => {
    onClick(rankItem);
  }, [rankItem, onClick]);

  return (
    <button
      type="button"
      aria-label={`${rankItem.tag} ${rankTier + 1}`}
      disabled={disabled}
      className={`${styles.rankItem} ${styles[`${rankItem.tag}`]} ${
        disabled ? styles.disabled : ''
      } ${selected ? styles.selected : ''}`}
      onClick={handleOnClick}
    />
  );
};

export default React.memo(RankItem);
