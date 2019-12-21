import React, { useState } from 'react';
import BoostTab from './BoostsTab';
import AddonTab from './AddonTab';
import TopNavigator from './TopNavigator/TopNavigator';
import BoostDisplay from './BoostDisplay/BoostDisplay';
import BottomNavigator from './BottomNavigator';
import styles from './styles.css';

const Boost = props => {
  const {
    updateOrder,
    currentOrder,
    boost,
    session,
    handleAuth,
    submitOrder,
    purchaseOrderRequest
  } = props;

  const [valid, setValid] = useState({ payment: false, details: false });

  const [currentStage, setStage] = useState(0);
  const [braintreeInstance, setBraintreeInstance] = useState(null);

  return (
    <div className={styles.root}>
      <TopNavigator
        currentStage={currentStage}
        setStage={setStage}
        session={session}
        boost={boost}
        valid={valid}
      />
      <div className={styles.container}>
        <BoostTab currentOrder={currentOrder} updateOrder={updateOrder} />
        <BoostDisplay
          currentOrder={currentOrder}
          updateOrder={updateOrder}
          purchaseOrderRequest={purchaseOrderRequest}
        />
        <AddonTab
          handleAuth={handleAuth}
          session={session}
          boost={boost}
          valid={valid}
          setBraintreeInstance={setBraintreeInstance}
          purchaseOrderRequest={purchaseOrderRequest}
          currentStage={currentStage}
          setStage={setStage}
          currentOrder={currentOrder}
          updateOrder={updateOrder}
        />
      </div>
      <BottomNavigator
        currentStage={currentStage}
        currentOrder={currentOrder}
        submitOrder={submitOrder}
        updateOrder={updateOrder}
        valid={valid}
        setValid={setValid}
        session={session}
        setStage={setStage}
        braintreeInstance={braintreeInstance}
        boost={boost}
      />
    </div>
  );
};

export default Boost;
