import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './styles.css';
import Filter from '../../reusable/Filter';
import { BoostState } from '../../../store/boost/types';
import { SessionState } from '../../../store/session/types';

const filters = ['boost', 'add-ons', 'details', 'review'];

interface Props {
  boost: BoostState;
  valid: { payment: boolean; details: boolean };
  session: SessionState;
  setStage: (newStage: number) => void;
  currentStage: number;
}

const TopNavigator: React.FC<Props> = (props: Props): JSX.Element => {
  const { boost, valid, session, setStage, currentStage } = props;

  const [untargetable, setUntargetable] = useState([]);

  useEffect(() => {
    const { payment, details } = valid;
    const { isLoggedIn } = session;
    const { paymentMethodIsSelected } = boost.order;

    if (
      (payment && details && paymentMethodIsSelected) ||
      (isLoggedIn && paymentMethodIsSelected)
    ) {
      setUntargetable([]);
    } else {
      setUntargetable([3]);
    }
  }, [valid, session, boost]);

  return (
    <div className={styles.root}>
      <Link href="/">
        <div className={styles.logo}>LoL Hero</div>
      </Link>
      <div className={styles.container}>
        <Filter
          onClick={(index): void => setStage(index)}
          extended
          filters={filters}
          selectedIndex={currentStage}
          untargetableIndices={untargetable}
        />
      </div>
    </div>
  );
};

export default TopNavigator;
