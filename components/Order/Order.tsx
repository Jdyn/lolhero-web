import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import OrderHeader from './OrderHeader/OrderHeader';
import OrderDetails from './OrderDetails/OrderDetails';
import OrderStatus from './OrderStatus';
import { SessionState } from '../../store/session/types';
import { AccountState } from '../../store/account/types';
import OrderDisplay from './OrderDisplay';
import OrderChampions from './OrderChampions';
import OrderAdmin from './OrderAdmin/OrderAdmin';

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

  const isEditable = useMemo(() => {
    if (account.selectedOrder) {
      const { isEditable, booster, user } = account.selectedOrder;
      if (booster?.username === user?.username) {
        return false;
      }

      if (isEditable) {
        return true;
      }
    }

    return false;
  }, [account.selectedOrder]);

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
              isEditable={isEditable}
              authEmail={authEmail}
            />
            <OrderDetails
              orderForm={orderForm}
              setOrderForm={setOrderForm}
              isEditable={isEditable}
              order={account.selectedOrder}
              session={session}
              account={account}
            />
            <OrderDisplay
              order={account.selectedOrder}
              orderForm={orderForm}
              isEditable={isEditable}
              setOrderForm={setOrderForm}
            />
            <OrderChampions
              orderForm={orderForm}
              setOrderForm={setOrderForm}
              order={account.selectedOrder}
            />
            {(session?.user.role === 'admin' || session?.user?.role === 'booster') && (
              <OrderAdmin account={account} order={account.selectedOrder} session={session} />
            )}
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
