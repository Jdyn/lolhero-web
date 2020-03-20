import React, { useState, useEffect, useMemo } from 'react';
import { Socket } from 'phoenix';
import styles from './index.module.css';
import OrderHeader from './OrderHeader';
import OrderDetails from './OrderDetails';
import OrderStatus from './OrderStatus';
import { SessionState } from '../../store/session/types';
import { AccountState } from '../../store/account/types';
import OrderDisplay from './OrderDisplay';
import OrderChampions from './OrderChampions';
import OrderAdmin from './OrderAdmin';
import OrderChat from './OrderChat';
import Button from '../shared/Button';

interface Props {
  account: AccountState;
  session?: SessionState;
  trackingId?: string;
  authEmail?: string;
  initializeOrder?: (payload: object, trackingId: string, email?: string) => void;
  updateOrderStatus?: (status: string, trackingId: string, email?: string) => void;
  fetchOrder?: (trackingId: string, email?: string) => void;
  updateOrder?: (order: object) => void;
}

const BoostOrder: React.FC<Props> = (props: Props): JSX.Element => {
  const {
    session,
    account,
    initializeOrder,
    updateOrderStatus,
    fetchOrder,
    updateOrder,
    trackingId,
    authEmail
  } = props;

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

  const [channel, setChannel] = useState(null);
  const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   let sock;

  //   if (session.user.token && account.selectedOrder) {
  //     sock = new Socket('ws://localhost:4000/socket', {
  //       params: { token: session.user.token },
  //       heartbeatIntervalMs: null
  //     });
  //     sock.connect();

  //     setSocket(sock);
  //   }
  //   return () => {
  //     if (sock) {
  //       sock.disconnect();
  //     }
  //   };
  // }, [session.user.token, account.selectedOrder, setSocket]);

  const joinChannel = () => {
    const chann = socket.channel(`order:${account.selectedOrder.trackingId}`);
    chann.join();
    chann.push('request:chat_history').receive('ok', payload => {
      console.log(payload);
    });

    setChannel(chann);
  };

  const sendMessage = () => {
    channel.push('send:message', {
      message: 'Hello World',
      userId: session.user.id,
      orderId: account.selectedOrder.id
    });
  };

  useEffect(() => {
    if (typeof fetchOrder === 'function') {
      fetchOrder(trackingId);
    }
    return (): void => {
      if (typeof updateOrder === 'function') {
        updateOrder(null);
      }
    };
  }, [fetchOrder, trackingId, updateOrder]);

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
              session={session}
              account={account}
            />
            <OrderDisplay
              order={account.selectedOrder}
              orderForm={orderForm}
              isEditable={editable}
              setOrderForm={setOrderForm}
            />
            <OrderChat />
            <Button onClick={joinChannel} />
            <Button onClick={sendMessage} />
            {/* <OrderChampions
              orderForm={orderForm}
              setOrderForm={setOrderForm}
              order={account.selectedOrder}
            /> */}
            {/* {(session?.user.role === 'admin' || session?.user?.role === 'booster') && (
              <OrderAdmin account={account} order={account.selectedOrder} session={session} />
            )} */}
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
