import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import HomeCard from "./HomeCard";
import theme from "../../lib/theme";

const propTypes = {};

const cards = [
  {
    title: "card1"
  },
  {
    title: "card2"
  },
  {
    title: "card3"
  }
];

const HomeCards = props => {
  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      {cards.map((item, index) => (
        <HomeCard card={item} key={index} />
      ))}
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: "-145px",
    "@media (min-width: 650px)": {
      flexDirection: "row",
      justifyContent: "center"
    },
    backgroundColor: theme.quartinary
  }
}));

HomeCards.propTypes = propTypes;

export default HomeCards;
