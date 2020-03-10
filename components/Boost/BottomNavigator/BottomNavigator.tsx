import React, { useState, useEffect } from 'react';
import { Dropin } from 'braintree-web-drop-in';
import { UpdateOrder } from '../../../store/boost/types';
import { SessionState } from '../../../store/session/types';
import styles from './styles.module.css';
import { Request } from '../../../store/request/types';
import Loader from '../../shared/Loader';

interface Props {
  currentStage: number;
  setStage: (state: number) => void;
  session: SessionState;
  valid: { details: boolean; payment: boolean };
  setValid: React.Dispatch<
    React.SetStateAction<{
      payment: boolean;
      details: boolean;
    }>
  >;
  children: React.ReactNode;
  submitOrder: () => void;
  braintreeInstance: Dropin;
  purchaseOrderRequest: Request;
  updateOrder: UpdateOrder;
}

const BottomNavigator = (props: Props): JSX.Element => {
  const {
    children,
    currentStage,
    setStage,
    session,
    valid,
    setValid,
    submitOrder,
    braintreeInstance,
    purchaseOrderRequest,
    updateOrder
  } = props;

  const [detailsForm, setDetailsForm] = useState({
    'details-email': '',
    'details-email-confirmation': ''
  });

  const updateStage = (stage: number): void => {
    if (stage === 3) {
      submitOrder();
    } else if (stage === 2) {
      if (braintreeInstance) {
        if ((valid.details && valid.payment) || (session.isLoggedIn && valid.payment)) {
          braintreeInstance.requestPaymentMethod((error, payload) => {
            if (!error && payload) {
              setStage(currentStage + 1);
              updateOrder(
                {},
                {
                  paymentMethodIsSelected: true,
                  nonce: payload.nonce,
                  email: detailsForm['details-email']
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
      if (key === 'details-email' || key === 'details-email-confirmation') {
        if (validate(detailsForm[key])) {
          validCount += 1;
        }
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
        return 'enabled';
      }
      return 'disabled';
    }
    return 'enabled';
  };

  return (
    <div className={styles.root}>
      {children}
      <button
        type="button"
        id="submit-button"
        className={`${styles.button} ${styles[buttonColor()]}`}
        onClick={(): void => updateStage(currentStage)}
      >
        {purchaseOrderRequest?.isPending ? (
          <Loader height="57px" width="57px" />
        ) : (
          stageText(currentStage)
        )}
      </button>
    </div>
  );
};

export default React.memo(BottomNavigator);
