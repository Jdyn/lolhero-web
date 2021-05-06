import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styles from './index.module.css';
import OrderHeader from './OrderHeader';
import OrderDetails from './OrderDetails';
import OrderStatus from './OrderStatus';
// import OrderStats from './OrderStats';
import { SessionState } from '../../store/session/types';
import { AccountState } from '../../store/account/types';
import OrderDisplay from './OrderDisplay';
import OrderChampions from './OrderChampions';
import OrderAdmin from './OrderAdmin';
// import OrderChat from './OrderChat';
import socket from '../../services/socket';
// import OrderMatches from './OrderMatches';
import { Request } from '../../store/request/types';

interface Props {
  account: AccountState;
  session?: SessionState;
  trackingId?: string;
  authEmail?: string;
  isDemo?: boolean;
  initializeOrder?: (payload: object, trackingId: string, email?: string) => void;
  updateOrderStatus?: (status: string, trackingId: string, email?: string) => void;
  fetchOrder?: (trackingId: string, email?: string) => void;
  updateOrder?: (order: object) => void;
  orderRequest?: Request;
}

const BoostOrder: React.FC<Props> = (props: Props): JSX.Element => {
  const {
    session,
    account,
    initializeOrder,
    updateOrderStatus,
    // fetchOrder,
    updateOrder,
    trackingId,
    authEmail,
    isDemo,
    orderRequest
  } = props;

  // const { selectedOrder } = account;

  const dispatch = useDispatch();
  const [orderForm, setOrderForm] = useState({
    note: '',
    summonerName: null,
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
    if (!isDemo) {
      if (!socket.isAlive() && orderRequest.success) {
        Notification.requestPermission();
        socket.init('ws://localhost:4000/socket', {
          token: session.user.token
        });
      }

      if (socket.isAlive() && orderRequest.success) {
        socket.joinChat(`order:${trackingId}`, dispatch);
      }
    }
  }, [dispatch, isDemo, session, trackingId, orderRequest]);

  useEffect(() => {
    return (): void => {
      if (typeof updateOrder === 'function') {
        updateOrder(null);
      }
    };
  }, [trackingId, updateOrder]);

  const editable = useMemo(() => {
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
    setOrderForm((prev) => ({
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

    const newChampions = [...champions].map((champ) => ({
      name: champ.name,
      position: champ.position
    }));

    const finalForm = { ...orderForm, details: { ...orderForm.details, champions: newChampions } };
    initializeOrder(finalForm, trackingId as string, authEmail);
  };

  return (
    <div className={styles.root}>
      <>
        <OrderHeader order={account.selectedOrder} />
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <OrderStatus
              order={account.selectedOrder}
              onInitializeOrder={onInitializeOrder}
              updateOrderStatus={updateOrderStatus}
              isEditable={editable}
              authEmail={authEmail}
            />
            <OrderDetails
              orderForm={orderForm}
              setOrderForm={setOrderForm}
              isEditable={editable}
              order={account.selectedOrder}
            />
            <OrderDisplay
              order={account.selectedOrder}
              orderForm={orderForm}
              isEditable={editable}
              setOrderForm={setOrderForm}
            />
            <OrderChampions
              orderForm={orderForm}
              setOrderForm={setOrderForm}
              order={account.selectedOrder}
            />
            {/* <OrderStats /> */}
            {/* <div className={styles.tile}>Your Hero</div>
            <OrderMatches />
            <OrderChat
              messages={account?.selectedOrder?.messages}
              session={session}
              isDemo={isDemo}
            /> */}
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
