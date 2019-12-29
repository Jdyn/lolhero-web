export default {
  Solo: {
    name: 'Solo Boost',
    description: 'SOLO means one of our boosters will log onto your account.',
    subdescription: ' If you want to play alongside the booster, you can select our duo option.',
    color: '#4285F4',
    items: [
      {
        title: 'Division Boost',
        type: 'solo-divisions',
        tag: 'Solo',
        maxAmount: '1',
        id: 1,
        description: 'We play the required amount of games to reach the division you select.'
      },
      {
        title: 'Placement Games',
        type: 'solo-placements',
        tag: 'Solo',
        maxAmount: '10',
        id: 2,
        description: 'We play your desired amount of placement matches.'
      },
      {
        title: 'Net Wins',
        type: 'solo-net-wins',
        tag: 'Solo',
        maxAmount: '10',
        id: 3,
        description: 'We ensure a win/loss ratio of 2:1 where each loss adds an additional 2 wins.'
      },
      {
        title: 'Net Games',
        type: 'solo-net-games',
        tag: 'Solo',
        maxAmount: '25',
        id: 4,
        description: 'Low cost, guaranteeing high performance without a specific win rate'
      }
    ]
  },
  Duo: {
    name: 'Duo Boost',
    description: 'DUO means you will play alongside our booster on your own account.',
    subdescription: ' if you do not want to play, you can select our solo option.',
    color: '#e53935',
    items: [
      {
        title: 'Division Boost',
        type: 'duo-divisions',
        tag: 'Duo',
        maxAmount: '1',
        id: 9,
        description: 'We play the required amount of games to reach the division you select.'
      },
      {
        title: 'Placement Games',
        type: 'duo-placements',
        tag: 'Duo',
        maxAmount: '10',
        id: 11,
        description: 'We play your desired amount of placement matches.'
      },
      {
        title: 'Net Wins',
        type: 'duo-net-wins',
        tag: 'Duo',
        maxAmount: '10',
        id: 10,
        description: 'We ensure a win/loss ratio of 2:1 where each loss adds an additional 2 wins.'
      },
      {
        title: 'Net Games',
        type: 'duo-net-games',
        tag: 'Duo',
        maxAmount: '25',
        id: 12,
        description: 'Low cost, guaranteeing high performance without a specific win rate'
      }
    ]
  }
};
