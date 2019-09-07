import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Shared/Layout';
import OrderContainer from '../../containers/OrderContainer';
import Api from '../../services/api';
import { createUseStyles } from 'react-jss';

const Order = props => {
  const router = useRouter();
  const { trackingId, email } = router.query;

  const classes = useStyles();
  const [order, setOrder] = useState(null);
  const [form, setForm] = useState({
    email: ''
  });

  const [error, setError] = useState(null);

  const handleOrderSearch = event => {
    event.preventDefault();

    setError(null);
    Api.post(`/order/${trackingId}`, form).then(response => {
      if (response.ok) {
        setOrder(response.result.order);
      } else {
        setError(response.error);
      }
    });
  };

  const updateOrder = payload => {
    Api.patch(`/order/${trackingId}`, { ...form, ...payload }).then(
      response => {
        if (response.ok) {
          setOrder(response.result.order);
        } else {
          setError(response.error);
        }
      }
    );
  };

  return (
    <Layout>
      {order ? (
        <OrderContainer
          trackingId={trackingId}
          order={order}
          updateOrder={updateOrder}
        />
      ) : (
        <div className={classes.root}>
          <div className={classes.container}>
            <h3>{trackingId}</h3>
            <span>Tracking ID</span>
            <p>
              Please allow us to verify it is you by providing the email you
              used to purchase the order.
            </p>
            <form className={classes.form} onSubmit={handleOrderSearch}>
              <input
                value={form.email}
                className={classes.search}
                onChange={event => setForm({ email: event.target.value })}
                aria-label="search"
                placeholder="Verify Email"
              />
              <button className={classes.formSubmit} type="submit">
                Go
              </button>
            </form>
            {error && <span className={classes.error}>{error}</span>}
          </div>
        </div>
      )}
    </Layout>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    display: 'flex',
    flex: 1,
    minHeight: '90vh',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '50px 10px',
    padding: '30px',
    color: theme.white,
    textAlign: 'center',
    flex: 1,
    width: '100%',
    maxWidth: '300px',
    backgroundColor: theme.quartinary,
    borderRadius: 16,
    boxShadow: '0px 6px 15px 0px rgba(0,0,0,.2)',
    '& h3': {
      margin: 0, //  '0 0 10px 0',
      fontSize: 38,
      color: theme.white
    },
    '& span': {
      color: theme.grey
    },
    '& p': {
      color: theme.secondaryWhite
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    borderRadius: '8px',
    backgroundColor: theme.primary,
    padding: '5px 16px',
    minWidth: 0
  },
  formSubmit: {
    backgroundColor: theme.primary,
    border: 'none',
    outline: 'none',
    borderRadius: '50%',
    height: '40px',
    width: '40px',
    transitionDuration: '.2s',
    cursor: 'pointer',
    color: theme.white,
    '&:hover': {
      backgroundColor: theme.quartinary
    }
  },
  search: {
    display: 'flex',
    flex: 1,
    color: theme.white,
    margin: '0 10px',
    border: 'none',
    outline: 'none',
    minWidth: 0,
    width: '100%',
    fontSize: 16,
    backgroundColor: 'transparent'
  },
  error: {
    margin: '10px 0'
  }
}));

export default Order;
