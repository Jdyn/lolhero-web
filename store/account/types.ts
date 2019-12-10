export interface AccountState {
  selectedOrder: Order | null;
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
    primaryRole?: string;
    secondaryRole?: string;
    summonerName: string;
    note?: string;
    desiredRank?: number;
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

export const accountRequests: {
  FETCH_ACCOUNT_ORDER_LIST: 'FETCH_ACCOUNT_ORDER_LIST';
  FETCH_ACCOUNT_ORDER: 'FETCH_ACCOUNT_ORDER';
  FETCH_ORDER: 'FETCH_ORDER';
} = {
  FETCH_ACCOUNT_ORDER_LIST: 'FETCH_ACCOUNT_ORDER_LIST',
  FETCH_ACCOUNT_ORDER: 'FETCH_ACCOUNT_ORDER',
  FETCH_ORDER: 'FETCH_ORDER'
};

export interface SetOrderList {
  orders: OrderList;
}

export interface OrderUpdate {
  order: Order;
}
