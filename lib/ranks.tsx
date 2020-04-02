export interface Rank {
  title: string;
  rank: number;
  color?: string;
  fill?: string;
  tag?: string;
  accent?: string;
}

export const unranked: Rank[] = [
  {
    title: 'Unranked',
    rank: 28,
    tag: 'unranked',
    color: '#1976D2',
    accent: '#0D47A1'
  }
];

const ranks: Rank[][] = [
  [
    {
      title: 'Iron IV',
      rank: 1,
      tag: 'iron'
    },
    {
      title: 'Iron III',
      rank: 2,
      tag: 'iron'
    },
    {
      title: 'Iron II',
      rank: 3,
      tag: 'iron'
    },
    {
      title: 'Iron I',
      rank: 4,
      tag: 'iron'
    }
  ],
  [
    {
      title: 'Bronze IV',
      rank: 5,
      tag: 'bronze'
    },
    {
      title: 'Bronze III',
      rank: 6,
      tag: 'bronze'
    },
    {
      title: 'Bronze II',
      rank: 7,
      tag: 'bronze'
    },
    {
      title: 'Bronze I',
      rank: 8,
      tag: 'bronze'
    }
  ],
  [
    {
      title: 'Silver IV',
      rank: 9,
      tag: 'silver'
    },
    {
      title: 'Silver III',
      rank: 10,
      tag: 'silver'
    },
    {
      title: 'Silver II',
      rank: 11,
      tag: 'silver'
    },
    {
      title: 'Silver I',
      rank: 12,
      tag: 'silver'
    }
  ],
  [
    {
      title: 'Gold IV',
      rank: 13,
      tag: 'gold'
    },
    {
      title: 'Gold III',
      rank: 14,
      tag: 'gold'
    },
    {
      title: 'Gold II',
      rank: 15,
      tag: 'gold'
    },
    {
      title: 'Gold I',
      rank: 16,
      tag: 'gold'
    }
  ],
  [
    {
      title: 'Platinum IV',
      rank: 17,
      tag: 'platinum'
    },
    {
      title: 'Platinum III',
      rank: 18,
      tag: 'platinum'
    },
    {
      title: 'Platinum II',
      rank: 19,
      tag: 'platinum'
    },
    {
      title: 'Platinum I',
      rank: 20,
      tag: 'platinum'
    }
  ],
  [
    {
      title: 'Diamond IV',
      rank: 21,
      tag: 'diamond'
    },
    {
      title: 'Diamond III',
      rank: 22,
      tag: 'diamond'
    },
    {
      title: 'Diamond II',
      rank: 23,
      tag: 'diamond'
    },
    {
      title: 'Diamond I',
      rank: 24,
      tag: 'diamond'
    }
  ]
];

export const flatRanks = (options: { unranked: boolean } = { unranked: false }): any => {
  const items = options.unranked ? [...unranked, ...ranks] : [...ranks];
  return [].concat.apply([], items).reduce((obj, item) => ((obj[item.rank] = item), obj), {});
};

export default ranks;
