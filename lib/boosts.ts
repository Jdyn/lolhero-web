export interface Boosts {
  [name: string]: {
    name: string;
    description: string;
    subdescription: string;
    color: string;
    items: {
      title: string;
      type: string;
      tag: string;
      maxAmount: string;
      id: number;
      description: string;
    }[];
  };
}

const boosts: Boosts = {
  Solo: {
    name: 'Solo Boost',
    description: 'SOLO means one of our heroes will log onto your account.',
    subdescription: 'If you want to play with our hero, you can select our duo service.',
    color: '#4285F4',
    items: [
      {
        title: 'Division Boost',
        type: 'solo-divisions',
        tag: 'Solo',
        maxAmount: '1',
        id: 1,
        description: 'We play any amount of games necessary to reach the rank of your choosing.'
      },
      {
        title: 'Placement Games',
        type: 'solo-placements',
        tag: 'Solo',
        maxAmount: '10',
        id: 2,
        description: 'We will play the amount of placement games you choose.'
      },
      {
        title: 'Net Wins',
        type: 'solo-net-wins',
        tag: 'Solo',
        maxAmount: '10',
        id: 3,
        description:
          'We guarantee a win ratio of 2 to 1 where each loss adds an additional 2 wins to your boost.'
      }
      // {
      //   title: 'Normal Games',
      //   type: 'solo-normal-games',
      //   tag: 'Solo',
      //   maxAmount: '25',
      //   id: 4,
      //   description: 'Low cost, guaranteeing high performance without a specific win rate'
      // }
    ]
  },
  Duo: {
    name: 'Duo Boost',
    description: 'DUO means you will play with one of our heroes on your own account.',
    subdescription: " if you don't want to play, you can select our solo option.",
    color: '#e53935',
    items: [
      {
        title: 'Division Boost',
        type: 'duo-divisions',
        tag: 'Duo',
        maxAmount: '1',
        id: 5,
        description: 'We play any amount of games necessary to reach the rank of your choosing.'
      },
      {
        title: 'Placement Games',
        type: 'duo-placements',
        tag: 'Duo',
        maxAmount: '10',
        id: 6,
        description: 'We will play the amount of placement games you choose.'
      },
      {
        title: 'Net Wins',
        type: 'duo-net-wins',
        tag: 'Duo',
        maxAmount: '10',
        id: 7,
        description:
          'We guarantee a win ratio of 2 to 1 where each loss adds an additional 2 wins to your boost.'
      }
      // {
      //   title: 'Net Games',
      //   type: 'duo-net-games',
      //   tag: 'Duo',
      //   maxAmount: '20',
      //   id: 8,
      //   description: 'Low cost, guaranteeing high performance without a specific win rate'
      // }
    ]
  }
};

export default boosts;
