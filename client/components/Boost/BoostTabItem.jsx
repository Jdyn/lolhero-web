import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  item: PropTypes.object,
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool.isRequired
};

const BoostTabItem = props => {
  const { classes, theme, item, onClick, isSelected } = props;

  return (
    <div
      className={classes.container}
      onClick={onClick}
      style={{ backgroundColor: isSelected ? theme.tertiary : theme.primary }}
    >
      <h2 className={classes.header}>
        <span>{item.tag}</span>
        {` ${item.name}`}
      </h2>
      <p className={classes.content}>{item.description}</p>
    </div>
  );
};

const styles = theme => ({
  container: {
    width: "100%",
    cursor: "pointer",
    margin: "4px 10px",
    display: "flex",
    padding: "25px 25px",
    borderRadius: 8,
    flexDirection: "column",
    transitionDuration: ".15s",
    "@media (min-width: 640px)": {
      width: "45%"
    },
    "@media (min-width: 1025px)": {
      width: "auto"
    },
    "&:hover": {
      backgroundColor: `${theme.tertiary} !important`
    }
  },
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

BoostTabItem.propTypes = propTypes;

export default withStyles(styles, { injectTheme: true })(BoostTabItem);
