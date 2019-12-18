const ranks = [
  [
    {
      title: 'Iron IV',
      rank: 1,
      color: '#3f5461',
      accent: '#26323A'
    },
    {
      title: 'Iron III',
      rank: 2,
      color: '#3f5461',
      accent: '#26323A'
    },
    {
      title: 'Iron II',
      rank: 3,
      color: '#3f5461',
      accent: '#26323A'
    },
    {
      title: 'Iron I',
      rank: 4,
      color: '#3f5461',
      accent: '#26323A'
    }
  ],
  [
    {
      title: 'Bronze IV',
      rank: 5,
      color: '#863d25',
      accent: '#502516'
    },
    {
      title: 'Bronze III',
      rank: 6,
      color: '#863d25',
      accent: '#502516'
    },
    {
      title: 'Bronze II',
      rank: 7,
      color: '#863d25',
      accent: '#502516'
    },
    {
      title: 'Bronze I',
      rank: 8,
      color: '#863d25',
      accent: '#502516'
    }
  ],
  [
    {
      title: 'Silver IV',
      rank: 9,
      color: '#4d7691',
      accent: '#2E4757'
    },
    {
      title: 'Silver III',
      rank: 10,
      color: '#4d7691',
      accent: '#2E4757'
    },
    {
      title: 'Silver II',
      rank: 11,
      color: '#4d7691',
      accent: '#2E4757'
    },
    {
      title: 'Silver I',
      rank: 12,
      color: '#4d7691',
      accent: '#2E4757'
    }
  ],
  [
    {
      title: 'Gold IV',
      rank: 13,
      color: '#d89926',
      accent: '#825C17'
    },
    {
      title: 'Gold III',
      rank: 14,
      color: '#d89926',
      accent: '#825C17'
    },
    {
      title: 'Gold II',
      rank: 15,
      color: '#d89926',
      accent: '#825C17'
    },
    {
      title: 'Gold I',
      rank: 16,
      color: '#d89926',
      accent: '#825C17'
    }
  ],
  [
    {
      title: 'Platinum IV',
      rank: 17,
      color: '#50b3a4',
      accent: '#306B62'
    },
    {
      title: 'Platinum III',
      rank: 18,
      color: '#50b3a4',
      accent: '#306B62'
    },
    {
      title: 'Platinum II',
      rank: 19,
      color: '#50b3a4',
      accent: '#306B62'
    },
    {
      title: 'Platinum I',
      rank: 20,
      color: '#50b3a4',
      accent: '#306B62'
    }
  ],
  [
    {
      title: 'Diamond IV',
      rank: 21,
      color: '#342e83',
      accent: '#1F1C4F'
    },
    {
      title: 'Diamond III',
      rank: 22,
      color: '#342e83',
      accent: '#1F1C4F'
    },
    {
      title: 'Diamond II',
      rank: 23,
      color: '#342e83',
      accent: '#1F1C4F'
    },
    {
      title: 'Diamond I',
      rank: 24,
      color: '#342e83',
      accent: '#1F1C4F'
    }
  ]
];

export const flatRanks = () => ranks.concat.apply([], ranks);

export default ranks;
