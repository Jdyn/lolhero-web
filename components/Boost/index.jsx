import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import BoostTab from './BoostsTab';
import AddonTab from './AddonTab';
import { flatRanks } from '../../lib/ranks';
import TopNavigator from './TopNavigator/TopNavigator';
import BoostDisplay from './BoostDisplay/BoostDisplay';
import BottomNavigator from './BottomNavigator';

const ranks = flatRanks();

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

  const classes = useStyles();
  const [valid, setValid] = useState({ payment: false, details: false });

  const [currentStage, setStage] = useState(0);
  const [braintreeInstance, setBraintreeInstance] = useState(null);

  return (
    <div className={classes.root}>
      <TopNavigator
        currentStage={currentStage}
        setStage={setStage}
        session={session}
        boost={boost}
        valid={valid}
        setValid={setValid}
      />
      <div className={classes.container}>
        <BoostTab currentOrder={currentOrder} updateOrder={updateOrder} />
        <BoostDisplay
          ranks={ranks}
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

const useStyles = createUseStyles(theme => ({
  root: {
    position: 'relative',
    padding: '0',
    height: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
    width: '100%',
    overflowY: 'auto',
    backgroundColor: theme.primary,
    WebkitOverflowScrolling: 'touch',
    '@media (min-width: 1025px)': {
      position: 'absolute',
      padding: '76px 0 90px 0'
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '@media (min-width: 1025px)': {
      flexDirection: 'row',
      height: '100%'
    }
  }
}));

export default Boost;
