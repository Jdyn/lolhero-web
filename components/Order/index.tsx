import React from 'react';
import { createUseStyles } from 'react-jss';
import OrderDetails from './OrderDetails/OrderDetails';
import { SessionState } from '../../store/session/types';
import OrderHeader from './OrderHeader/OrderHeader';
import { AccountState } from '../../store/account/types';

interface Props {
  account: AccountState;
  session: SessionState;
}

let useStyles;

const BoostOrder: React.FC<Props> = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { session, account } = props;

  return (
    <div className={classes.root}>
      {account.selectedOrder ? (
        <>
          <OrderHeader session={session} order={account.selectedOrder} />
          <OrderDetails order={account.selectedOrder} />
        </>
      ) : (
        <div>Order does not exist</div>
      )}
    </div>
  );
};

useStyles = createUseStyles({
  root: {
    display: 'flex',
    // height: 'calc(100vh - 76px)',
    flexDirection: 'column'
  }
});

export default BoostOrder;
