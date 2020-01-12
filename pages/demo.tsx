import React from 'react';
import Layout from '../components/Reusable/Layout';
import BoostOrder from '../components/Order/Order';
import { AccountState } from '../store/account/types';

const date = new Date();

const fakeAccount: AccountState = {
  selectedOrder: {
    createdAt: date.toString(),
    isEditable: true,
    note: '123',
    price: '160.0',
    status: 'open',
    title: 'Solo | Division Boost - Iron I to Platinum I',
    trackingId: 'ABLC1',
    user: {
      role: 'user',
      username: 'LoL Hero'
    },
    details: {
      boostType: 'Solo',
      champions: [],
      collectionId: 1,
      collectionName: 'Division Boost',
      desiredAmount: 5,
      desiredRank: 20,
      isExpress: false,
      isIncognito: false,
      isUnrestricted: false,
      lp: 20,
      primaryRole: 'Middle',
      promos: null,
      queue: 'Solo',
      secondaryRole: 'Bottom',
      server: 'NA',
      startRank: 4,
      summonerName: 'Not Set'
    }
  }
};

const Demo = (): JSX.Element => {
  return (
    <Layout title="Home - Professional Boosting Services">
      <BoostOrder account={fakeAccount} initializeOrder={() => {}} updateOrderStatus={() => {}} />
    </Layout>
  );
};

export default Demo;
