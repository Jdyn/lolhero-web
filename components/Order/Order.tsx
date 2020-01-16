import React, { useState } from 'react';
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
  initializeOrder: (payload: object, trackingId: string, email?: string) => void;
  updateOrderStatus: (status: string, trackingId: string, email?: string) => void;
}

const BoostOrder: React.FC<Props> = (props: Props): JSX.Element => {
  const { session, account, initializeOrder, authEmail, updateOrderStatus } = props;
  const router = useRouter();
  const { trackingId } = router.query;

  const [orderForm, setOrderForm] = useState({
    note: '',
    details: {
      primaryRole: 'Middle',
      secondaryRole: 'Bottom',
      summonerName: '',
      champions: []
    },
    accountDetails: {
      username: null,
      password: null
    }
  });

  const onInitializeOrder = (): void => {
    const { champions } = orderForm.details;

    const newChampions = [...champions].map(champ => ({
      name: champ.name,
      position: champ.position
    }));

    const finalForm = { ...orderForm, details: { ...orderForm.details, champions: newChampions } };
    initializeOrder(finalForm, trackingId as string, authEmail);
  };

  return (
    <div className={styles.root}>
      {account.selectedOrder ? (
        <>
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
      ) : (
        <div>Order does not exist</div>
      )}
    </div>
  );
};

export default BoostOrder;
