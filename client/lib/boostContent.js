export default {
  solo: {
    description: "SOLO means one of our boosters will log onto your account.",
    subdescription:
      " If you want to play along side the booster, you can select DUO.",
    color: "#4285F4",
    items: [
      {
        name: "Division Boost",
        id: 1,
        description:
          "We play the required amount of games to reach the division you select."
      },
      {
        name: "Placement Games",
        id: 2,
        description: "We play your desired amount of placement matches."
      },
      {
        name: "Net Wins",
        id: 3,
        description:
          "We guarantee a win/loss ratio of 2:1 where each loss would add an additional 2 wins."
      },
      {
        name: "Net Games",
        id: 4,
        description:
          "Low cost, guaranteeing high performance without a specific win rate"
      }
    ]
  },
  duo: {
    description:
      "DUO means you will play along side our booster on your own account.",
    subdescription:
      " if you want the booster to play on your account, you can select SOLO.",
    color: "#e53935",
    items: [
      {
        name: "Division Boost",
        id: 5,
        description: ""
      },
      {
        name: "Net Wins",
        id: 6,
        description: ""
      },

      {
        name: "Placement Games",
        id: 7,
        description: ""
      },
      {
        name: "Net Games",
        id: 8,
        description: ""
      }
    ]
  }
};
