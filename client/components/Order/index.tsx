import React from 'react';
import { createUseStyles } from 'react-jss';
import OrderHero from './OrderHero';
import { SessionState } from '../../store/reducers/session/types';
import OrderHeader from './OrderHeader/OrderHeader';

interface Props {
  order: any;
  session: SessionState;
  updateOrder: () => void;
}

let useStyles;

const Order: React.FC<Props> = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { order, session, updateOrder } = props;

  return (
    <div className={classes.root}>
      <OrderHeader session={session} order={order} />
      <OrderHero order={order} updateOrder={updateOrder} />
    </div>
  );
};

useStyles = createUseStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

export default Order;
