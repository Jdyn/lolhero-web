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

interface AccountActions {
  ORDER_LIST: 'account/fetchedOrderList';
  INITIATE_ORDER: 'account/initializedOrder';
  SET_CURRENT_ORDER: 'account/updatedCurrentOrder';
}

export const accountActions: AccountActions = {
  ORDER_LIST: 'account/fetchedOrderList',
  INITIATE_ORDER: 'account/initializedOrder',
  SET_CURRENT_ORDER: 'account/updatedCurrentOrder'
};

export const accountRequests: {
  FETCH_ACCOUNT_ORDER_LIST: 'FETCH_ACCOUNT_ORDER_LIST';
  FETCH_ACCOUNT_ORDER: 'FETCH_ACCOUNT_ORDER';
} = {
  FETCH_ACCOUNT_ORDER_LIST: 'FETCH_ACCOUNT_ORDER_LIST',
  FETCH_ACCOUNT_ORDER: 'FETCH_ACCOUNT_ORDER'
};

interface SetOrderList {
  type: typeof accountActions.ORDER_LIST;
  orders: OrderList;
}

interface InitiateOrder {
  type: typeof accountActions.INITIATE_ORDER;
  order: Order;
}

interface SetCurrentOrder {
  type: typeof accountActions.SET_CURRENT_ORDER;
  order: Order;
}

export type AccountActionTypes = SetOrderList | SetCurrentOrder | InitiateOrder;
