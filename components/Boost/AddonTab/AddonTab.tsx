import React, { useEffect } from 'react';
import dropin from 'braintree-web-drop-in';
import Filter from '../../Reusable/Filter/Filter';
import AddonView from './AddonView';
import BoostView from './BoostView';
import ReviewView from './ReviewView/ReviewView';
import DetailsView from './DetailsView/DetailsView';
import dropinOptions from '../../../lib/dropinOptions';
import styles from './styles.module.css';
import { BoostOrderDetails, BoostState } from '../../../store/boost/types';
import { SessionState } from '../../../store/session/types';
import { Request } from '../../../store/request/types';

const filters = ['boost', 'extras', 'details', 'review'];

interface Props {
  currentStage: number;
  updateOrder: (detailsUpdate: object) => void;
  currentOrder: BoostOrderDetails;
  session: SessionState;
  handleAuth: (type: string, form: object) => void;
  setBraintreeInstance: (instance: object) => void;
  purchaseOrderRequest: Request;
  boost: BoostState;
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
    purchaseOrderRequest,
    boost,
    valid,
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
    1: <AddonView currentOrder={currentOrder} updateOrder={updateOrder} boost={boost} />,
    2: <DetailsView handleAuth={handleAuth} session={session} />,
    3: (
      <ReviewView
        currentOrder={currentOrder}
        boost={boost}
        purchaseOrderRequest={purchaseOrderRequest}
      />
    )
  };

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
      <div className={styles.filter}>
        <Filter
          extended
          filters={filters}
          untargetableIndices={validateView()}
          selectedIndex={currentStage}
          onClick={(index: number): void => setStage(index)}
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

export default AddonTab;
