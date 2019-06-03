import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import HomeCard from "./HomeCard";
import theme from "../../lib/theme";

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
    <div className={classes.container}>
      {cards.map((item, index) => (
        <HomeCard card={item} key={index} />
      ))}
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: "-145px",
    backgroundColor: theme.quartinary
  }
});

HomeCards.propTypes = propTypes;

export default withStyles(styles)(HomeCards);
