import React from 'react';
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

  const validateView = (): number[] => {
    const { payment, details } = valid;
    const { isLoggedIn } = session;
    const {
      order: { paymentMethodIsSelected }
    } = boost;

    const confirmedLoggedIn = isLoggedIn && paymentMethodIsSelected;
    const confirmedEmail = payment && details && paymentMethodIsSelected;

    if (confirmedLoggedIn || confirmedEmail) {
      return [];
    }

    return [3];
  };

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
          untargetableIndices={validateView()}
        />
      </div>
    </div>
  );
};

export default TopNavigator;
