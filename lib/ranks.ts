export interface Rank {
  title: string;
  rank: number;
  color: string;
  accent: string;
}

export const unranked: Rank[] = [
  {
    title: 'Unranked',
    rank: 28,
    color: '#1976D2',
    accent: '#0D47A1'
  }
];

const ranks: Rank[][] = [
  [
    {
      title: 'Iron IV',
      rank: 1,
      color: '#424242',
      accent: '#303030'
    },
    {
      title: 'Iron III',
      rank: 2,
      color: '#424242',
      accent: '#303030'
    },
    {
      title: 'Iron II',
      rank: 3,
      color: '#424242',
      accent: '#303030'
    },
    {
      title: 'Iron I',
      rank: 4,
      color: '#424242',
      accent: '#303030'
    }
  ],
  [
    {
      title: 'Bronze IV',
      rank: 5,
      color: '#6D4C41',
      accent: '#4E342E'
    },
    {
      title: 'Bronze III',
      rank: 6,
      color: '#6D4C41',
      accent: '#4E342E'
    },
    {
      title: 'Bronze II',
      rank: 7,
      color: '#6D4C41',
      accent: '#4E342E'
    },
    {
      title: 'Bronze I',
      rank: 8,
      color: '#6D4C41',
      accent: '#4E342E'
    }
  ],
  [
    {
      title: 'Silver IV',
      rank: 9,
      color: '#546E7A',
      accent: '#37474F'
    },
    {
      title: 'Silver III',
      rank: 10,
      color: '#546E7A',
      accent: '#37474F'
    },
    {
      title: 'Silver II',
      rank: 11,
      color: '#546E7A',
      accent: '#37474F'
    },
    {
      title: 'Silver I',
      rank: 12,
      color: '#546E7A',
      accent: '#37474F'
    }
  ],
  [
    {
      title: 'Gold IV',
      rank: 13,
      color: '#FF9100',
      accent: '#FF6D00'
    },
    {
      title: 'Gold III',
      rank: 14,
      color: '#FF9100',
      accent: '#FF6D00'
    },
    {
      title: 'Gold II',
      rank: 15,
      color: '#FF9100',
      accent: '#FF6D00'
    },
    {
      title: 'Gold I',
      rank: 16,
      color: '#FF9100 ',
      accent: '#FF6D00'
    }
  ],
  [
    {
      title: 'Platinum IV',
      rank: 17,
      color: '#00897B',
      accent: '#00695C'
    },
    {
      title: 'Platinum III',
      rank: 18,
      color: '#00897B',
      accent: '#00695C'
    },
    {
      title: 'Platinum II',
      rank: 19,
      color: '#00897B',
      accent: '#00695C'
    },
    {
      title: 'Platinum I',
      rank: 20,
      color: '#00897B',
      accent: '#00695C'
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

export const flatRanks = (options: { unranked: boolean } = { unranked: false }) => {
  const items = options.unranked ? [...unranked, ...ranks] : [...ranks];
  return [].concat.apply([], items).reduce((obj, item) => ((obj[item.rank] = item), obj), {});
};

export default ranks;
