export const initialState: BoostState = {
  price: null,
  stage: 0,
  order: {
    type: 'boost',
    nonce: null,
    email: null,
    startRankTitle: '',
    desiredRankTitle: '',
    paymentMethodIsSelected: false,
    details: {
      lp: 20,
      queue: 'Solo',
      server: 'NA',
      flashPosition: 'D',
      primaryRole: 'Middle',
      secondaryRole: 'Bottom',
      startRank: null,
      desiredRank: null,
      desiredAmount: 10,
      boostType: 'Solo',
      collectionId: 1,
      collectionName: 'Division Boost',
      isExpress: false,
      isIncognito: false,
      isUnrestricted: false,
      promos: null
    }
  },
  pricing: null,
  api: {
    purchaseOrder: {
      pending: false,
      success: false,
      errored: false,
      error: null
    }
  }
};

export interface ApiState {
  pending: boolean;
  success: boolean;
  errored: boolean;
  error: string | null;
}

export interface BoostState {
  price: number | null;
  stage: number | null;
  order: BoostOrder;
  pricing: BoostPricing;
  api: { [name: string]: ApiState };
}

export interface BoostPricing {
  Solo: object;
  Duo: object;
}

export interface BoostOrder {
  type: string;
  nonce: string | null;
  email: string | null;
  startRankTitle: string;
  desiredRankTitle: string;
  paymentMethodIsSelected: boolean;
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

export interface SetBoostPrices {
  Solo: object;
  Duo: object;
}

export interface SetBoostUpdate {
  newPrice: number;
  detailsUpdate: object;
  orderUpdate: object;
}

export type UpdateOrder = (detailsUpdate: object | null, orderUpdate?: object) => void;
