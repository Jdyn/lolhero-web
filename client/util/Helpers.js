export const formatLP = lp => {
  switch (lp) {
    case 20:
      return "0-20";
    case 40:
      return "21-40";
    case 60:
      return "41-60";
    case 80:
      return "61-80";
    case 99:
      return "81-99";
    case 100:
      return "100";
    default:
      return "0";
  }
};
