import React, { useEffect } from 'react';
import RankList from './RankList';
import RankSlider from './RankSlider';
import styles from './index.module.css';
import { BoostOrderDetails, UpdateOrder } from '../../../store/boost/types';
import { Rank } from '../../../lib/ranks';
import RankIcon from '../../shared/RankIcon';

interface Props {
  type: string;
  title: string;
  rank: Rank;
  height?: string;
  isStartRank?: boolean;
  isPlacements?: boolean;
  updateOrder?: UpdateOrder;
  currentOrder?: BoostOrderDetails;
}

const Banner = (props: Props): JSX.Element => {
  const { type, rank, updateOrder, currentOrder, isStartRank, height, title, isPlacements } = props;

  useEffect(() => {
    if (title === 'Normal Games') {
      updateOrder({ startRank: 28 }, { startRankTitle: 'Unranked' });
    }
  }, [title, updateOrder]);

  const renderContent = {
    default: <></>,
    slider: <RankSlider rank={rank} currentOrder={currentOrder} updateOrder={updateOrder} />,
    division: (
      <RankList
        rank={rank}
        currentOrder={currentOrder}
        isStartRank={isStartRank}
        isPlacements={isPlacements}
        updateOrder={updateOrder}
      />
    )
  };

  return (
    <div className={styles.root} style={{ height }}>
      <div className={`${styles.container} ${styles[`${rank.tag}`]}`}>
        {/* <RankIcon tag={rank.tag} /> */}
        <div className={styles.header}>
          <h1>{rank.title || ''}</h1>
          <h3>{title}</h3>
        </div>
        {renderContent[type]}
      </div>
      <div className={styles.footer}>
        <svg
          className={`${styles.foot} ${styles[`${rank.tag}-banner`]}`}
          preserveAspectRatio="none"
          viewBox="0 0 100 110"
        >
          <path d="M0 0 L50 105 L100 0 Z" />
        </svg>
      </div>
    </div>
  );
};

export default Banner;
