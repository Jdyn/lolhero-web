import React, { useState, useEffect } from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";

const propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  extended: PropTypes.bool,
  selectedIndex: PropTypes.number
};

const Filter = props => {
  const { classes, theme, filters, selectedIndex, onClick } = props;

  const [state, set] = useState(selectedIndex || 0);

  useEffect(() => {
    if (selectedIndex < filters.length) set(selectedIndex);
  }, [selectedIndex, filters]);

  const handleClick = index => {
    if (typeof onClick === "function") {
      onClick(index);
    }
    set(index);
  };

  return (
    <ul className={classes.container}>
      {filters.map((filter, index) => (
        <li
          key={index}
          className={classes.item}
          onClick={() => handleClick(index)}
          style={{
            borderColor: state === index ? theme.accent : "#999",
            color: state === index ? theme.accent : "#999"
          }}
        >
          {filter}
        </li>
      ))}
    </ul>
  );
};

Filter.propTypes = propTypes;
Filter.defaultProps = {};

const styles = theme => ({
  container: ({ extended }) => ({
    margin: 0,
    padding: "20px 0 0 0",
    display: "flex",
    flexGrow: extended ? 1 : 0,
    position: "relative",
    flexDirection: "row"
  }),
  item: props => ({
    display: "flex",
    position: "relative",
    width: `calc(100% / ${props.filters.length})`,
    marginBottom: "-2px",
    justifyContent: "center",
    textTransform: "uppercase",
    letterSpacing: ".9px",
    alignItems: "center",
    fontSize: 16,
    fontWeight: 700,
    listStyle: "none",
    cursor: "pointer",
    color: theme.secondaryColor,
    borderBottom: "3px solid",
    paddingBottom: "20px",
    "&:hover": {
      borderColor: `${theme.accent} !important`,
      color: `${theme.accent} !important`
    }
  })
});

export default withStyles(styles, { injectTheme: true })(Filter);
