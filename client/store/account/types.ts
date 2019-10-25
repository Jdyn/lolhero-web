export interface AccountState {
  currentOrder: Order | null;
  orders: OrderList;
}

export interface ListBaseOrder {
  createdAt: string;
  status: string;
  title: string;
  trackingId: string;
}

export interface ListOrder {
  count: number;
  title: string;
  orders: ListBaseOrder[];
}

export interface OrderList {
  total: ListOrder;
  active: ListOrder;
  completed: ListOrder;
}

export interface Order {
  createdAt: string;
  details: {
    boostType: string;
    collectionId: number;
    collectionName: string;
    desiredAmount?: number;
    isExpress: boolean;
    isIncognito: boolean;
    isUnrestricted: boolean;
    lp: number;
    promos: [] | null;
    queue: string;
    server: string;
    startRank: number;
  };
  isEditable: boolean;
  note: string | null;
  price: number;
  status: string;
  title: string;
  trackingId: string;
  user: {
    role: string;
    username: string;
  };
}

export const accountActions = {
  FETCH_ACCOUNT_ORDERS: 'FETCH_ACCOUNT_ORDERS',
  INITIATE_ACCOUNT_ORDER: 'INITIATE_ACCOUNT_ORDER',
  SET_CURRENT_ORDER: 'UPDATE_ORDER_DETAILS'
};

export const accountRequests = {
  ACCOUNT_ORDERS: 'ACCOUNT_ORDERS',
  ACCOUNT_ORDER_DETAILS: 'ACCOUNT_ORDER_DETAILS'
};

interface FetchOrderAction {
  type: typeof accountActions.FETCH_ACCOUNT_ORDERS;
  orders: OrderList;
}

interface UpdateOrderDetailsAction {
  type: typeof accountActions.SET_CURRENT_ORDER;
  order: Order;
}

export type AccountActions = FetchOrderAction | UpdateOrderDetailsAction;
