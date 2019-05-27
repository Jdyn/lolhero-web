import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import HomeCard from "./HomeCard";

const propTypes = {
  classes: PropTypes.object.isRequired
};

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
  const { classes } = props;

  return (
    <>
      <div className={classes.container}>
        <div className={classes.cards}>
          {cards.map((item, index) => (
            <HomeCard card={item} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    margin: "0 auto",
    padding: "15px",
    width: "70%",
  },
  cards: {
    display: "grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: "3%",
    flexDirection: "row",
    marginTop: "-10%",
  }
};

HomeCards.propTypes = propTypes;

export default withStyles(styles)(HomeCards);
