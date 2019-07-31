export default {
  solo: {
    name: "Solo Boost",
    description: "SOLO means one of our boosters will log onto your account.",
    subdescription:
      " If you want to play alongside the booster, you can select DUO.",
    color: "#4285F4",
    items: [
      {
        title: "Division Boost",
        tag: "solo",
        id: 1,
        description:
          "We play the required amount of games to reach the division you select."
      },
      {
        title: "Placement Games",
        tag: "solo",
        id: 2,
        description: "We play your desired amount of placement matches."
      },
      {
        title: "Net Wins",
        tag: "solo",
        id: 15,
        description:
          "We guarantee a win/loss ratio of 2:1 where each loss would add an additional 2 wins."
      },
      {
        title: "Net Games",
        tag: "solo",
        id: 4,
        description:
          "Low cost, guaranteeing high performance without a specific win rate"
      }
    ]
  },
  duo: {
    name: "Duo Boost",
    description:
      "DUO means you will play alongside our booster on your own account.",
    subdescription:
      " if you don't want to play, you can select SOLO.",
    color: "#e53935",
    items: [
      {
        title: "Division Boost",
        tag: "duo",
        id: 5,
        description:
          "We play the required amount of games to reach the division you select."
      },
      {
        title: "Net Wins",
        tag: "duo",
        id: 6,
        description: "We play your desired amount of placement matches."
      },

      {
        title: "Placement Games",
        tag: "duo",
        id: 7,
        description:
          "We guarantee a win/loss ratio of 2:1 where each loss would add an additional 2 wins."
      },
      {
        title: "Net Games",
        tag: "duo",
        id: 8,
        description:
          "Low cost, guaranteeing high performance without a specific win rate"
      }
    ]
  }
};
  