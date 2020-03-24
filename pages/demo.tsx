import React from 'react';
import Layout from '../components/shared/Layout';
import BoostOrder from '../components/Order';
import { AccountState } from '../store/account/types';

const date = new Date();

const fakeAccount: AccountState = {
  currentFilter: 'active',
  selectedOrder: {
    createdAt: date.toString(),
    isEditable: true,
    id: 1,
    note: '123',
    price: '160.0',
    status: 'open',
    title: 'Solo | Division Boost - Iron I to Platinum I',
    trackingId: 'ABLC1',
    messages: [],
    user: {
      role: 'user',
      username: 'LoLHero'
    },
    booster: null,
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
      flashPosition: 'F',
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

const content = {
  title: 'Order Demo',
  description:
    'See how your order will look when you purchase a league boost at LoL Hero. You can see how easy it is to track your order throughout the entire process.'
};

const Demo = (): JSX.Element => {
  return (
    <Layout title={content.title} description={content.description}>
      <BoostOrder isDemo account={fakeAccount} />
    </Layout>
  );
};

export default Demo;
