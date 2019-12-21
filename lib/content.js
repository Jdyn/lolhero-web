export default {
  boosts: {
    servers: [{ server: 'NA', title: 'North America', type: 'servers' }],
    queues: [
      { queue: 'Solo', title: 'Solo Queue', type: 'queues' },
      { queue: 'Flex', title: 'Flex Queue', type: 'queues' }
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
          'Ensure your order gets done faster! Your order will be considered top priority and will have a booster at all times!',
        title: 'Express',
        tag: 'express',
        type: 'isExpress'
      },
      {
        description:
          'Appear completely offline and invisible to everyone on your friends list while the booster is active.',
        title: 'Rogue',
        tag: 'incognito',
        type: 'isIncognito'
      },
      {
        description: 'Allow us to play any champion or role on your account during the service.',
        title: 'Free Roam',
        tag: 'unrestricted',
        type: 'isUnrestricted'
      }
    ]
  },
  roles: [
    {
      title: 'Top',
      image: '/static/images/roles/top.svg'
    },
    {
      title: 'Jungle',
      image: '/static/images/roles/jungle.svg'
    },
    {
      title: 'Middle',
      image: '/static/images/roles/middle.svg'
    },
    {
      title: 'Bottom',
      image: '/static/images/roles/bottom.svg'
    },
    {
      title: 'Support',
      image: '/static/images/roles/support.svg'
    }
  ]
};
