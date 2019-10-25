import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import Order from '../components/Order';

// interface Props {
//   requireAuth: boolean;
// }

let useStyles;

const OrderContainer = props => {
  const { requireAuth } = props;
  const classes = useStyles();
  const router = useRouter();

  const [email, setEmail] = useState('');

  const { trackingId } = router.query;

  return requireAuth ? (
    <div className={classes.root}>
      <div className={classes.container}>
        <h3>{trackingId}</h3>
        <span>Tracking ID</span>
        <p>
          Please allow us to verify it is you by providing the email you used to purchase the order.
        </p>
        <form className={classes.form} onSubmit={handleOrderSearch}>
          <input
            value={email}
            className={classes.search}
            onChange={event => setEmail(event.target.value)}
            aria-label="search"
            placeholder="Verify Email"
          />
          <button className={classes.formSubmit} type="submit">
            Go
          </button>
        </form>
        {/* {error && <span className={classes.error}>{error}</span>} */}
      </div>
    </div>
  ) : (
    <Order {...props} />
  );
};

const mapStateToProps = state => ({
  session: state.session,
  OrderRequest: state.request
});

const mapDispatchToProps = dispatch => ({});

useStyles = createUseStyles(theme => ({
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderContainer);
