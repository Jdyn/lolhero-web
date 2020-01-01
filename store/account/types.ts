import { Champion } from '../../lib/champions';

export interface AccountState {
  selectedOrder: Order | null;
  orders?: OrderList;
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
  booster?: { username: string } | null;
  accountDetails?: { username: string; password: string };
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
    champions: Champion[];
    promos: [] | null;
    queue: string;
    server: string;
    startRank: number;
  };
  isEditable: boolean;
  note: string | null;
  price: string;
  status: string;
  title: string;
  trackingId: string;
  user?: {
    role: string;
    username: string;
  } | null;
}

export const accountRequests: {
  INITIALIZE_ORDER: 'INITIALIZE_ORDER';
  UPDATE_ORDER_STATUS: 'UPDATE_ORDER_STATUS';
  FETCH_ACCOUNT_PASSWORD_RESET: 'FETCH_ACCOUNT_PASSWORD_RESET';
  FETCH_ACCOUNT_PASSWORD_UPDATE: 'FETCH_ACCOUNT_PASSWORD_UPDATE';
  FETCH_ACCOUNT_ORDER_LIST: 'FETCH_ACCOUNT_ORDER_LIST';
  FETCH_ACCOUNT_ORDER: 'FETCH_ACCOUNT_ORDER';
  FETCH_ORDER: 'FETCH_ORDER';
} = {
  INITIALIZE_ORDER: 'INITIALIZE_ORDER',
  UPDATE_ORDER_STATUS: 'UPDATE_ORDER_STATUS',
  FETCH_ACCOUNT_PASSWORD_RESET: 'FETCH_ACCOUNT_PASSWORD_RESET',
  FETCH_ACCOUNT_PASSWORD_UPDATE: 'FETCH_ACCOUNT_PASSWORD_UPDATE',
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
