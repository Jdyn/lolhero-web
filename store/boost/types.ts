export interface BoostState {
  price: number | null;
  stage: number | null;
  order: BoostOrder;
  pricing: BoostPricing;
}

export interface BoostPricing {
  Solo: object;
  Duo: object;
}

export interface BoostOrder {
  type: string;
  nonce: string | null;
  email: string | null;
  paymentMethodIsSelected: boolean;
  startRankTitle: string;
  desiredRankTitle: string;
  details: BoostOrderDetails;
}

export interface BoostOrderDetails {
  lp: number;
  queue: string;
  server: string;
  primaryRole: string;
  secondaryRole: string;
  flashPosition: string;
  desiredAmount: number;
  startRank: number | null;
  desiredRank: number | null;
  boostType: string;
  collectionId: number;
  collectionName: string;
  isExpress: boolean;
  isIncognito: boolean;
  isUnrestricted: boolean;
  promos: string[] | null;
}

interface BoostRequests {
  BOOST_PRICING: 'BOOST_PRICING';
  BOOST_ORDER: 'BOOST_ORDER';
  PURCHASE_ORDER: 'PURCHASE_ORDER';
}

export const boostRequests: BoostRequests = {
  BOOST_PRICING: 'BOOST_PRICING',
  BOOST_ORDER: 'BOOST_ORDER',
  PURCHASE_ORDER: 'PURCHASE_ORDER'
};

interface BoostActions {
  FETCH_BOOST_PRICES: 'FETCH_BOOST_PRICES';
  UPDATE_BOOST: 'UPDATE_BOOST';
}

export const boostActions: BoostActions = {
  FETCH_BOOST_PRICES: 'FETCH_BOOST_PRICES',
  UPDATE_BOOST: 'UPDATE_BOOST'
};

interface SetBoostPrices {
  type: typeof boostActions.FETCH_BOOST_PRICES;
  prices: {
    Solo: object;
    Duo: object;
  };
}

interface UpdateBoost {
  type: typeof boostActions.UPDATE_BOOST;
  newPrice: number;
  detailsUpdate: object;
  orderUpdate: object;
}

export type UpdateOrder = (detailsUpdate: object | null, orderUpdate?: object) => void;

export type BoostActionTypes = SetBoostPrices | UpdateBoost;
