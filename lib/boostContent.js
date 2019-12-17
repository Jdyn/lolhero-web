export default {
  Solo: {
    name: 'Solo Boost',
    description: 'SOLO means one of our boosters will log onto your account.',
    subdescription: ' If you want to play alongside the booster, you can select DUO.',
    color: '#4285F4',
    items: [
      {
        title: 'Division Boost',
        tag: 'Solo',
        maxAmount: '1',
        id: 1,
        description: 'We play the required amount of games to reach the division you select.'
      },
      {
        title: 'Placement Games',
        tag: 'Solo',
        maxAmount: '10',
        id: 2,
        description: 'We play your desired amount of placement matches.'
      },
      {
        title: 'Net Wins',
        tag: 'Solo',
        maxAmount: '10',
        id: 3,
        description:
          'We guarantee a win/loss ratio of 2:1 where each loss would add an additional 2 wins.'
      },
      {
        title: 'Net Games',
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
    subdescription: " if you don't want to play, you can select SOLO.",
    color: '#e53935',
    items: [
      {
        title: 'Division Boost',
        tag: 'duo',
        maxAmount: '1',
        id: 9,
        description: 'We play the required amount of games to reach the division you select.'
      },
      {
        title: 'Placement Games',
        tag: 'duo',
        maxAmount: '10',
        id: 11,
        description:
          'We guarantee a win/loss ratio of 2:1 where each loss would add an additional 2 wins.'
      },
      {
        title: 'Net Wins',
        tag: 'duo',
        maxAmount: '10',
        id: 10,
        description: 'We play your desired amount of placement matches.'
      },
      {
        title: 'Net Games',
        tag: 'duo',
        maxAmount: '25',
        id: 12,
        description: 'Low cost, guaranteeing high performance without a specific win rate'
      }
    ]
  }
};
