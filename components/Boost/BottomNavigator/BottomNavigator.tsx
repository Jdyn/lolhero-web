import React, { useState, useEffect } from 'react';
import { Dropin } from 'braintree-web-drop-in';
import { formatLP } from '../../../util/helpers';
import { BoostState, BoostOrderDetails } from '../../../store/boost/types';
import { SessionState } from '../../../store/session/types';
import styles from './styles.module.css';
import { Request } from '../../../store/request/types';
import Loader from '../../Reusable/Loader';

interface Props {
  currentStage: number;
  setStage: (state: number) => void;
  boost: BoostState;
  session: SessionState;
  valid: { details: boolean; payment: boolean };
  setValid: (state: object) => void;
  currentOrder: BoostOrderDetails;
  submitOrder: () => void;
  braintreeInstance: Dropin;
  purchaseOrderRequest: Request;
  updateOrder: (detailsUpate: object, orderUpdate: object) => void;
}

const BottomNavigator = (props: Props): JSX.Element => {
  const {
    currentStage,
    setStage,
    boost,
    session,
    valid,
    setValid,
    currentOrder,
    submitOrder,
    braintreeInstance,
    purchaseOrderRequest,
    updateOrder
  } = props;

  const [detailsForm, setDetailsForm] = useState({});

  const updateStage = (stage: number): void => {
    if (stage === 3) {
      submitOrder();
    } else if (stage === 2) {
      if (braintreeInstance) {
        if ((valid.details && valid.payment) || (session.isLoggedIn && valid.payment)) {
          braintreeInstance.requestPaymentMethod((error, payload) => {
            if (!error) {
              setStage(currentStage + 1);
              updateOrder(
                {},
                {
                  paymentMethodIsSelected: true,
                  nonce: payload.nonce,
                  email: detailsForm['details-email'] || session.user.email
                }
              );
            }
          });
        }
      }
    } else if (stage + 1 <= 3 && stage !== 2) {
      setStage(currentStage + 1);
    }
  };

  useEffect(() => {
    if (braintreeInstance) {
      braintreeInstance.on('paymentMethodRequestable', () => {
        setValid(prev => ({ ...prev, payment: true }));
      });
    }
  }, [braintreeInstance, setValid]);

  useEffect(() => {
    const validate = (string: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string);

    let isEqual = false;
    let validCount = 0;

    Object.keys(detailsForm).forEach((key: string) => {
      if (validate(detailsForm[key])) {
        validCount += 1;
      }
    });

    const email = detailsForm['details-email'];
    const emailConfirmation = detailsForm['details-email-confirmation'];

    if (email === emailConfirmation) {
      isEqual = true;
    }

    if (isEqual && validCount === 2) {
      setValid(prev => ({ ...prev, details: true }));
    } else {
      setValid(prev => ({ ...prev, details: false }));
    }
  }, [detailsForm, setValid]);

  useEffect(() => {
    const email = document.getElementById('details-email-confirmation');
    const emailConfirmation = document.getElementById('details-form');

    const handleInput = (event: Event): void => {
      const target = event.target as HTMLInputElement;
      setDetailsForm(prev => ({ ...prev, [target.id]: target.value }));
    };

    if (email && emailConfirmation) {
      email.addEventListener('input', handleInput);
      emailConfirmation.addEventListener('input', handleInput);
    }

    return (): void => {
      if (email && emailConfirmation) {
        email.removeEventListener('input', handleInput);
        emailConfirmation.removeEventListener('input', handleInput);
      }
    };
  }, [braintreeInstance, session]);

  const stageText = (stage: number): string => {
    switch (stage) {
      case 3:
        return 'place order';
      case 2:
        return 'review';
      default:
        return 'next';
    }
  };

  const buttonColor = (): string => {
    if (currentStage === 2) {
      const { payment, details } = valid;

      if ((payment && details) || (valid.payment && session.isLoggedIn)) {
        return '#4285F4';
      }
      return '#414141';
    }
    return '#4285F4';
  };

  const navItems = {
    Queue: currentOrder.queue,
    Server: currentOrder.server,
    LP: formatLP(currentOrder.lp) || '-',
    Total: `$${boost.price || 0}`
  };

  return (
    <div className={styles.root}>
      {Object.keys(navItems).map(key => (
        <div key={key} className={styles.container}>
          <h3>{navItems[key]}</h3>
          <span>{key}</span>
        </div>
      ))}
      <button
        type="button"
        id="submit-button"
        className={styles.button}
        onClick={(): void => updateStage(currentStage)}
        style={{ backgroundColor: buttonColor() }}
      >
        {purchaseOrderRequest.isPending ? (
          <Loader height="57px" width="57px" />
        ) : (
          stageText(currentStage)
        )}
      </button>
    </div>
  );
};

export default BottomNavigator;
