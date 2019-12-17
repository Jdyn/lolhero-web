import React, { useEffect } from 'react';
import dropin from 'braintree-web-drop-in';
import { createUseStyles } from 'react-jss';
import Filter from '../../reusable/Filter';
import AddonView from './AddonView';
import BoostView from './BoostView';
import ReviewView from './ReviewView';
import DetailsView from './DetailsView';
import dropinOptions from '../../../lib/dropinOptions';

const filters = ['boost', 'add ons', 'details', 'review'];

const AddonTab = props => {
  const {
    currentStage,
    updateOrder,
    currentOrder,
    session,
    handleAuth,
    setBraintreeInstance,
    boost,
    valid,
    setStage
  } = props;

  const classes = useStyles();

  useEffect(() => {
    dropin
      .create(dropinOptions)
      .then(instance => {
        setBraintreeInstance(instance);
      })
      .catch(error => {});
  }, [setBraintreeInstance]);

  const views = {
    0: <BoostView currentOrder={currentOrder} updateOrder={updateOrder} />,
    1: <AddonView currentOrder={currentOrder} updateOrder={updateOrder} boost={boost} />,
    2: <DetailsView handleAuth={handleAuth} session={session} />,
    3: <ReviewView currentOrder={currentOrder} boost={boost} />
  };

  const validateView = () => {
    const { payment, details } = valid;
    const { isLoggedIn } = session;
    const {
      order: { paymentMethodIsSelected }
    } = boost;

    const confirmedLoggedIn = isLoggedIn && paymentMethodIsSelected;
    const confirmedEmail = payment && details && paymentMethodIsSelected;

    if (confirmedLoggedIn || confirmedEmail) {
      return [];
    }

    return [3];
  };

  return (
    <div className={classes.root}>
      <div className={classes.filter}>
        <Filter
          extended
          filters={filters}
          untargetableIndices={validateView()}
          selectedIndex={currentStage}
          onClick={index => setStage(index)}
        />
      </div>
      {Object.keys(views).map((view, index) => {
        return (
          <div
            key={view}
            className={classes.content}
            style={{
              display: currentStage === parseInt(view, 0) ? 'flex' : 'none'
            }}
          >
            {views[index]}
          </div>
        );
      })}
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    width: '100%',
    minHeight: '350px',
    display: 'flex !important',
    position: 'relative',
    boxShadow: '0px 0px 15px 0px rgba(0, 0, 0, 0.4)',
    // borderRadius: 16,
    flexDirection: 'column',
    backgroundColor: theme.primary,
    color: theme.white,
    '@media (min-width: 1025px)': {
      width: '400px',
      height: '100%',
      boxShadow: '-5px 0px 15px 0px rgba(0, 0, 0, 0.2)'
    }
  },
  filter: {
    display: 'flex',
    '@media (min-width: 1025px)': {
      display: 'none'
    }
  },
  container: {
    display: 'inherit',
    '@media (min-width: 1025px)': {
      display: 'none'
    }
  },
  content: {
    flexDirection: 'column',
    overflowY: 'auto',
    margin: '0 10px 0 10px'
  }
}));

export default AddonTab;
