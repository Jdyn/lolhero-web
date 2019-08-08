import React, { useState, useEffect } from 'react';
import BoostTab from './BoostsTab';
import AddonTab from './AddonTab';
import PropTypes from 'prop-types';
import TopNavigator from './TopNavigator';
import BoostDisplay from './BoostDisplay';
import BottomNavigator from './BottomNavigator';
import { createUseStyles } from 'react-jss';

const propTypes = {
  boost: PropTypes.object.isRequired,
  submitOrder: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  currentOrder: PropTypes.object.isRequired,
  fetchBoostPrices: PropTypes.func.isRequired
};

const Boost = props => {
  const {
    fetchBoostPrices,
    updateOrder,
    currentOrder,
    boost,
    session,
    handleAuth,
    submitOrder,
    submitOrderRequest
  } = props;

  const classes = useStyles();
  const [valid, setValid] = useState({ payment: false, details: false });

  const [currentStage, setStage] = useState(0);
  const [braintreeInstance, setBraintreeInstance] = useState(null);

  useEffect(() => {
    fetchBoostPrices();
  }, []);

  return (
    <div className={classes.root}>
      <TopNavigator
        currentStage={currentStage}
        setStage={setStage}
        boost={boost}
        valid={valid}
        setValid={setValid}
      />
      <div className={classes.container}>
        <BoostTab currentOrder={currentOrder} updateOrder={updateOrder} />
        <BoostDisplay
          currentOrder={currentOrder}
          updateOrder={updateOrder}
          submitOrderRequest={submitOrderRequest}
        />
        <AddonTab
          handleAuth={handleAuth}
          session={session}
          boost={boost}
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
    paddingTop: '76px',
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

Boost.propTypes = propTypes;

export default Boost;
