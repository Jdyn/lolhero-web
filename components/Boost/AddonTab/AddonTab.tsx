import React, { useEffect, useCallback, useMemo } from 'react';
import dropin from 'braintree-web-drop-in';
import Filter from '../../Reusable/Filter/Filter';
import AddonView from './AddonView';
import BoostView from './BoostView';
import ReviewView from './ReviewView/ReviewView';
import DetailsView from './DetailsView';
import dropinOptions from '../../../lib/dropinOptions';
import styles from './styles.module.css';
import { SessionState } from '../../../store/session/types';
import {
  BoostOrderDetails,
  UpdateOrder,
  BoostOrder,
  BoostPricing
} from '../../../store/boost/types';

const filters = ['boost', 'setup', 'details', 'review'];

interface Props {
  currentStage: number;
  updateOrder: UpdateOrder;
  currentOrder: BoostOrderDetails;
  session: SessionState;
  handleAuth: (type: string, form: object) => void;
  setBraintreeInstance: (instance: object) => void;
  pricing: BoostPricing;
  paymentMethodIsSelected: boolean;
  boostOrder: BoostOrder;
  valid: { payment: boolean; details: boolean };
  setStage: (newStage: number) => void;
}

const AddonTab = (props: Props): JSX.Element => {
  const {
    currentStage,
    updateOrder,
    currentOrder,
    session,
    handleAuth,
    setBraintreeInstance,
    pricing,
    paymentMethodIsSelected,
    valid,
    boostOrder,
    setStage
  } = props;

  useEffect(() => {
    dropin
      .create(dropinOptions)
      .then(instance => {
        setBraintreeInstance(instance);
      })
      .catch();
  }, [setBraintreeInstance]);

  const views = {
    0: <BoostView currentOrder={currentOrder} updateOrder={updateOrder} />,
    1: <AddonView currentOrder={currentOrder} updateOrder={updateOrder} pricing={pricing} />,
    2: <DetailsView handleAuth={handleAuth} session={session} />,
    3: <ReviewView currentOrder={currentOrder} boostOrder={boostOrder} />
  };

  const validateView = useMemo((): number[] => {
    const { payment, details } = valid;

    const confirmedLoggedIn = session.isLoggedIn && paymentMethodIsSelected;
    const confirmedEmail = payment && details && paymentMethodIsSelected;

    if (confirmedLoggedIn || confirmedEmail) {
      return [];
    }

    return [3];
  }, [session.isLoggedIn, valid, paymentMethodIsSelected]);

  const handleFilter = useCallback(
    (index: number): void => {
      setStage(index);
    },
    [setStage]
  );

  return (
    <div className={styles.root}>
      <div className={styles.filter}>
        <Filter
          extended
          filters={filters}
          untargetableIndices={validateView}
          selectedIndex={currentStage}
          onClick={handleFilter}
        />
      </div>
      {Object.keys(views).map((view, index) => {
        return (
          <div
            key={view}
            className={styles.content}
            style={{
              display: currentStage === parseInt(view, 0) ? 'flex' : 'none'
            }}
          >
            {views[index]}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(AddonTab);
