import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import OrderHeader from './OrderHeader/OrderHeader';
import OrderDetails from './OrderDetails/OrderDetails';
import OrderStatus from './OrderStatus';
import { SessionState } from '../../store/session/types';
import { AccountState } from '../../store/account/types';
import OrderDisplay from './OrderDisplay';
import OrderChampions from './OrderChampions';

interface Props {
  account: AccountState;
  session?: SessionState;
  authEmail?: string;
  initializeOrder?: (payload: object, trackingId: string, email?: string) => void;
  updateOrderStatus?: (status: string, trackingId: string, email?: string) => void;
}

const BoostOrder: React.FC<Props> = (props: Props): JSX.Element => {
  const { session, account, initializeOrder, authEmail, updateOrderStatus } = props;
  const router = useRouter();
  const { trackingId } = router.query;

  const [orderForm, setOrderForm] = useState({
    note: '',
    details: {
      primaryRole: account?.selectedOrder?.details?.primaryRole,
      secondaryRole: account?.selectedOrder?.details?.primaryRole,
      summonerName: '',
      champions: []
    },
    accountDetails: {
      username: null,
      password: null
    }
  });

  useEffect(() => {
    setOrderForm(prev => ({
      ...prev,
      details: {
        ...prev.details,
        primaryRole: account.selectedOrder?.details?.primaryRole || null,
        secondaryRole: account.selectedOrder?.details?.secondaryRole || null
      }
    }));
  }, [setOrderForm, account.selectedOrder]);

  const onInitializeOrder = (): void => {
    const { champions } = orderForm.details;

    const newChampions = [...champions].map(champ => ({
      name: champ.name,
      position: champ.position
    }));

    const finalForm = { ...orderForm, details: { ...orderForm.details, champions: newChampions } };
    initializeOrder(finalForm, trackingId as string, authEmail);
  };

  console.log(orderForm);

  return (
    <div className={styles.root}>
      <>
        <div className={styles.stripe} />
        <OrderHeader order={account.selectedOrder} />
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <OrderStatus
              order={account.selectedOrder}
              onInitializeOrder={onInitializeOrder}
              updateOrderStatus={updateOrderStatus}
              authEmail={authEmail}
            />
            <OrderDetails
              orderForm={orderForm}
              setOrderForm={setOrderForm}
              order={account.selectedOrder}
              session={session}
              account={account}
            />
            <OrderDisplay
              order={account.selectedOrder}
              orderForm={orderForm}
              setOrderForm={setOrderForm}
            />
            <OrderChampions
              orderForm={orderForm}
              setOrderForm={setOrderForm}
              order={account.selectedOrder}
            />
          </div>
        </div>
      </>
    </div>
  );
};

BoostOrder.defaultProps = {
  initializeOrder: (): void => {
    // do nothing
  },
  updateOrderStatus: (): void => {
    // do nothing
  }
};

export default BoostOrder;
