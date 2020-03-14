import React, { useState, useEffect, useMemo } from 'react';
import BoostTab from './BoostsTab';
import AddonTab from './AddonTab';
import TopNavigator from './TopNavigator';
import BoostDisplay from './BoostDisplay';
import BottomNavigator from './BottomNavigator';
import styles from './index.module.css';
import { formatLP } from '../../util/helpers';

const Boost = props => {
  const {
    updateOrder,
    currentOrder,
    boost,
    session,
    handleAuth,
    submitOrder,
    purchaseOrderRequest,
    fetchBoostPrices
  } = props;

  const [valid, setValid] = useState({ payment: false, details: false });

  const [currentStage, setStage] = useState(0);
  const [braintreeInstance, setBraintreeInstance] = useState(null);
  const { queue, server, lp } = currentOrder;
  const { price } = boost;

  useEffect(() => {
    fetchBoostPrices();
  }, [fetchBoostPrices]);

  const navItems = useMemo(() => {
    const items = {
      Queue: queue,
      Server: server,
      LP: formatLP(lp) || '-',
      Total: `$${price || 0}`
    };

    return Object.keys(items).map(key => (
      <div key={key} className={styles.bottomNav}>
        <h3>{items[key]}</h3>
        <span>{key}</span>
      </div>
    ));
  }, [queue, server, lp, price]);

  return (
    <div className={styles.root}>
      <TopNavigator
        currentStage={currentStage}
        setStage={setStage}
        isLoggedIn={session.isLoggedIn}
        paymentMethodIsSelected={boost.order.paymentMethodIsSelected}
        valid={valid}
      />
      <div className={styles.container}>
        <BoostTab
          boostType={currentOrder.boostType}
          collectionId={currentOrder.collectionId}
          updateOrder={updateOrder}
        />
        <BoostDisplay
          currentOrder={currentOrder}
          updateOrder={updateOrder}
          purchaseOrderRequest={purchaseOrderRequest}
        />
        <AddonTab
          handleAuth={handleAuth}
          session={session}
          pricing={boost.pricing}
          boostOrder={boost.order}
          paymentMethodIsSelected={boost.paymentMethodIsSelected}
          valid={valid}
          setBraintreeInstance={setBraintreeInstance}
          currentStage={currentStage}
          setStage={setStage}
          currentOrder={currentOrder}
          updateOrder={updateOrder}
        />
      </div>
      <BottomNavigator
        purchaseOrderRequest={purchaseOrderRequest}
        currentStage={currentStage}
        submitOrder={submitOrder}
        updateOrder={updateOrder}
        valid={valid}
        setValid={setValid}
        session={session}
        setStage={setStage}
        braintreeInstance={braintreeInstance}
      >
        {navItems}
      </BottomNavigator>
    </div>
  );
};

export default Boost;
