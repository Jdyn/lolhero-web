import React from 'react';
import { createUseStyles } from 'react-jss';
import OrderDetails from './OrderDetails/OrderDetails';
import { SessionState } from '../../store/session/types';
import OrderHeader from './OrderHeader/OrderHeader';
import { AccountState, Order } from '../../store/account/types';
import { Request } from '../../store/request/types';

interface Props {
  account: AccountState;
  session: SessionState;
  orderRequest: Request;
  order: Order;
  fetchAccountOrder: (trackingId: string) => void;
}

let useStyles;

const BoostOrder: React.FC<Props> = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { session, order, orderRequest } = props;

  return (
    <div className={classes.root}>
      <OrderHeader session={session} order={order} />
      <OrderDetails order={order} />
    </div>
  );
};

useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
});

export default BoostOrder;
