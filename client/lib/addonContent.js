export default {
  details: {
    servers: [{ server: 'NA', title: 'North America', type: 'servers' }],
    queues: [
      { queue: 'solo', title: 'Solo Queue', type: 'queues' },
      { queue: 'flex', title: 'Flex Queue', type: 'queues' }
    ],
    lp: [
      { lp: 20, title: '0 - 20', type: 'lp' },
      { lp: 40, title: '21 - 40', type: 'lp' },
      { lp: 60, title: '41 - 60', type: 'lp' },
      { lp: 80, title: '61 - 80', type: 'lp' },
      { lp: 99, title: '81 - 99', type: 'lp' },
      { lp: 100, title: '100', type: 'lp' }
    ]
  },
  addons: {
    extras: [
      {
        description:
          'Ensures your order is heavily prioritized over others and is completed sooner. Costs +20%',
        title: 'Express',
        type: 'isExpress'
      },
      {
        description: 'Appear as if you are offline to everyone on your friends list. Costs +5%',
        title: 'Incognito',
        type: 'isIncognito'
      },
      {
        description:
          'Enable us to play any champion or role on your account during the service. Discount -10%',
        title: 'Unrestricted',
        type: 'isUnrestricted'
      }
    ]
  }
};
