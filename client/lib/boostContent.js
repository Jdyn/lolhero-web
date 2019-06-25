export default {
  solo: {
    name: "Solo Boost",
    description: "SOLO means one of our boosters will log onto your account.",
    subdescription:
      " If you want to play alongside the booster, you can select DUO.",
    color: "#4285F4",
    items: [
      {
        name: "Division Boost",
        tag: "solo",
        id: 1,
        description:
          "We play the required amount of games to reach the division you select."
      },
      {
        name: "Placement Games",
        tag: "solo",
        id: 2,
        description: "We play your desired amount of placement matches."
      },
      {
        name: "Net Wins",
        tag: "solo",
        id: 3,
        description:
          "We guarantee a win/loss ratio of 2:1 where each loss would add an additional 2 wins."
      },
      {
        name: "Net Games",
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
      " if you don't want to play alongside, you can select SOLO.",
    color: "#e53935",
    items: [
      {
        name: "Division Boost",
        tag: "duo",
        id: 5,
        description: ""
      },
      {
        name: "Net Wins",
        tag: "duo",
        id: 6,
        description: ""
      },

      {
        name: "Placement Games",
        tag: "duo",
        id: 7,
        description: ""
      },
      {
        name: "Net Games",
        tag: "duo",
        id: 8,
        description: ""
      }
    ]
  }
};
