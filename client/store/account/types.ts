interface AccountRequests {
  ACCOUNT_ORDERS: string;
  ACCOUNT_ORDER_DETAILS: string;
}

export const accountRequests: AccountRequests = {
  ACCOUNT_ORDERS: 'ACCOUNT_ORDERS',
  ACCOUNT_ORDER_DETAILS: 'ACCOUNT_ORDER_DETAILS'
};

interface AccountActions {
  FETCH_ACCOUNT_ORDERS: string;
  INITIATE_ACCOUNT_ORDER: string;
  UPDATE_ACCOUNT_ORDER_DETAILS: string;
}

export const accountActions: AccountActions = {
  FETCH_ACCOUNT_ORDERS: 'FETCH_ACCOUNT_ORDERS',
  INITIATE_ACCOUNT_ORDER: 'INITIATE_ACCOUNT_ORDER',
  UPDATE_ACCOUNT_ORDER_DETAILS: 'UPDATE_ACCOUNT_ORDER_DETAILS'
};

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

interface FetchAccountOrdersAction {
  type: string;
  orders: OrderList;
}

interface UpdateAccountOrderDetailsAction {
  type: string;
  order: Order;
}

export type AccountActionTypes = UpdateAccountOrderDetailsAction | FetchAccountOrdersAction;
