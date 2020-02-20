import React, { useMemo } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';
import Filter from '../../Reusable/Filter/Filter';

interface Props {
  paymentMethodIsSelected: boolean;
  valid: { payment: boolean; details: boolean };
  isLoggedIn: boolean;
  setStage: (newStage: number) => void;
  currentStage: number;
}

const filters = ['boost', 'setup', 'details', 'review'];

const TopNavigator: React.FC<Props> = (props: Props): JSX.Element => {
  const { paymentMethodIsSelected, valid, isLoggedIn, setStage, currentStage } = props;

  const validateView = useMemo((): number[] => {
    const { payment, details } = valid;

    const confirmedLoggedIn = isLoggedIn && paymentMethodIsSelected;
    const confirmedEmail = payment && details && paymentMethodIsSelected;

    if (confirmedLoggedIn || confirmedEmail) {
      return [];
    }

    return [3];
  }, [isLoggedIn, valid, paymentMethodIsSelected]);

  return (
    <div className={styles.root}>
      <Link href="/">
        <div className={styles.logo}>LoLHero</div>
      </Link>
      <div className={styles.container}>
        <Filter
          onClick={(index): void => setStage(index)}
          extended
          filters={filters}
          selectedIndex={currentStage}
          untargetableIndices={validateView}
        />
      </div>
    </div>
  );
};

export default React.memo(TopNavigator);
