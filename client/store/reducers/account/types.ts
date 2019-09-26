interface AccountRequests {
  ACCOUNT_ORDERS: string;
}

export const accountRequests: AccountRequests = {
  ACCOUNT_ORDERS: 'ACCOUNT_ORDERS'
};

interface AccountActions {
  FETCH_ACCOUNT_ORDERS: string;
}

export const accountActions: AccountActions = {
  FETCH_ACCOUNT_ORDERS: 'FETCH_ACCOUNT_ORDERS'
};

export interface BaseOrder {
  createdAt: string;
  status: string;
  title: string;
  trackingId: string;
}

export interface Order {
  count: number;
  title: string;
  orders: BaseOrder[];
}

export interface Orders {
  total: Order;
  active: Order;
  completed: Order;
}

interface FetchAccountOrders {
  type: typeof accountActions.FETCH_ACCOUNT_ORDERS;
  orders: Orders;
}

export type AccountActionTypes = FetchAccountOrders;

export interface AccountState {
  orders: Orders;
}
