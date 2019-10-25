import React from 'react';
import { createUseStyles } from 'react-jss';
import OrderHero from './OrderHero';
import { SessionState } from '../../store/reducers/session/types';
import OrderHeader from './OrderHeader/OrderHeader';
import { Order } from '../../store/reducers/account/types';

interface Props {
  order: Order;
  session: SessionState;
  updateOrder: () => void;
}

let useStyles;

const BoostOrder: React.FC<Props> = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { order, session, updateOrder } = props;

  return (
    <div className={classes.root}>
      <OrderHeader session={session} order={order} />
      <OrderHero order={order} updateOrder={updateOrder} />
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
