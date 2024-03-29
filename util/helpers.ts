export const capitalize = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const formatLP = (lp: number): string => {
  switch (lp) {
    case 20:
      return '0-20';
    case 40:
      return '21-40';
    case 60:
      return '41-60';
    case 80:
      return '61-80';
    case 99:
      return '81-99';
    case 100:
      return '100';
    default:
      return '0';
  }
};

export const formatTime = (date: string): string => {
  const newDate = new Date(date);

  const now = new Date();

  const times = [
    ['second', 1],
    ['minute', 60],
    ['hour', 3600],
    ['day', 86400],
    ['week', 604800],
    ['month', 2592000],
    ['year', 31536000]
  ];

  let diff = Math.round((now.valueOf() - newDate.valueOf()) / 1000) as number;

  for (let t = 0; t < times.length; t += 1) {
    if (diff < times[t][1]) {
      if (t === 0) {
        return 'Just now';
      }

      const time = times[t - 1][1] as number;
      diff = Math.round(diff / time);
      return `${diff}  ${times[t - 1][0]}${diff === 1 ? ' ago' : 's ago'}`;
    }
  }

  return '';
};
