import keyMirror from '../../util/keyMirror';

export const actions = keyMirror('FETCH_ACCOUNT_ORDERS');
export const requests = keyMirror('ACCOUNT_ORDERS');

export interface Order {
  count: number;
  orders: {
    createdAt: string;
    status: string;
    title: string;
    trackingId: string;
  }[];
}

export interface Orders {
  total: Order;
  active: Order;
  completed: Order;
}

export interface AccountState {
  orders: Orders;
}

interface FetchAccountOrders {
  type: typeof actions.FETCH_ACCOUNT_ORDERS;
  orders: Orders;
}

interface Test {
  type: string;
  orders: Orders;
}

export type AccountActions = FetchAccountOrders | Test;
