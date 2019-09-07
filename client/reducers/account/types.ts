interface AccountRequests {
  ACCOUNT_ORDERS: string;
}

export const requests: AccountRequests = {
  ACCOUNT_ORDERS: 'ACCOUNT_ORDERS'
};

interface AccountActions {
  FETCH_ACCOUNT_ORDERS: string;
}

export const actions: AccountActions = {
  FETCH_ACCOUNT_ORDERS: 'FETCH_ACCOUNT_ORDERS'
};

export interface Order {
  count: number;
  title: string;
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

export type AccountActionTypes = FetchAccountOrders;
