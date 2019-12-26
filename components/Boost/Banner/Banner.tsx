import React from 'react';
import RankList from './RankList';
import RankSlider from './RankSlider';
import styles from './styles.module.css';
import { BoostOrderDetails } from '../../../store/boost/types';
import { Rank } from '../../../lib/ranks';

interface Props {
  type: string;
  rank: Rank;
  height?: string;
  isStartRank?: boolean;
  updateOrder?: () => void;
  currentOrder?: BoostOrderDetails;
}

const Banner = (props: Props): JSX.Element => {
  const { type, rank, updateOrder, currentOrder, isStartRank, height } = props;

  const renderContent = {
    default: <></>,
    slider: <RankSlider rank={rank} currentOrder={currentOrder} updateOrder={updateOrder} />,
    picker: (
      <RankList
        rank={rank}
        currentOrder={currentOrder}
        isStartRank={isStartRank}
        updateOrder={updateOrder}
      />
    )
  };

  return (
    <div className={styles.root} style={{ height }}>
      <div
        className={`${styles.container} ${rank && styles.rank}`}
        style={{
          backgroundColor: rank.color,
          borderColor: rank.accent
        }}
      >
        <div className={styles.header}>
          <h1>{rank.title || ''}</h1>
          <h3>{isStartRank ? 'Current' : 'Desired'}</h3>
        </div>
        {renderContent[type]}
      </div>
      <div className={styles.footer}>
        <svg
          className={styles.foot}
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          style={{
            fill: rank.color,
            stroke: rank.accent
          }}
        >
          <path d="M0 0 L50 100 L100 0 Z" />
        </svg>
      </div>
    </div>
  );
};

export default Banner;
