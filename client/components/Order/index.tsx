import React from 'react';
import { createUseStyles } from 'react-jss';
import OrderHero from './OrderHero';
import { SessionState } from '../../store/session/types';
import OrderHeader from './OrderHeader/OrderHeader';
import { AccountState, Order } from '../../store/account/types';

interface Props {
  account: AccountState;
  session: SessionState;
  order: Order;
  fetchAccountOrder: (trackingId: string) => void;
}

let useStyles;

const BoostOrder: React.FC<Props> = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { session, order } = props;

  return order ? (
    <div className={classes.root}>
      <OrderHeader session={session} order={order} />
      <OrderHero order={order} />
    </div>
  ) : (
    <div>ok</div>
  );
};

useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
});

export default BoostOrder;
