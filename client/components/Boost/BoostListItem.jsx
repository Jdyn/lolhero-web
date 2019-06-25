import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  item: PropTypes.object,
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool.isRequired
};

const BoostListItem = props => {
  const { classes, item, onClick } = props;

  return (
    <div className={classes.container} onClick={onClick}>
      <h2 className={classes.header}>
        <span>{item.tag}</span>
        {` ${item.name}`}
      </h2>
      <p className={classes.content}>{item.description}</p>
    </div>
  );
};

const styles = theme => ({
  container: ({ isSelected }) => ({
    cursor: "pointer",
    margin: "4px 10px",
    display: "flex",
    padding: "25px 35px",
    borderRadius: 8,
    flexDirection: "column",
    backgroundColor: isSelected ? theme.tertiary : theme.primary,
    transitionDuration: ".15s",
    "&:hover": {
      backgroundColor: theme.tertiary
    }
  }),
  header: {
    color: theme.white,
    margin: 0,
    fontSize: 17,
    "& span": {
      color: theme.accent,
      textTransform: "uppercase"
    }
  },
  content: {
    color: theme.grey,
    margin: 0,
    fontSize: 16
  }
});

BoostListItem.propTypes = propTypes;

export default withStyles(styles)(BoostListItem);
