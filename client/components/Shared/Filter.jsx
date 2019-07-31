import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";

const propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  extended: PropTypes.bool,
  selectedIndex: PropTypes.number
};

const Filter = props => {
  const { filters, selectedIndex, onClick, untargetableIndices } = props;

  const classes = useStyles(props);
  const theme = useTheme();

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
      {Array.isArray(filters) &&
        filters.map((filter, index) => {
          const disabled = untargetableIndices.includes(index);

          return (
            <li
              key={index}
              className={classes.item}
              onClick={() => handleClick(index)}
              style={{
                borderColor: state === index ? theme.accent : "#999",
                color: state === index ? theme.accent : disabled ? "#414141" : "#999",
                pointerEvents: disabled ? "none" : "auto"
              }}
            >
              {filter}
            </li>
          );
        })}
    </ul>
  );
};

Filter.propTypes = propTypes;
Filter.defaultProps = {
  untargetableIndices: []
};

const useStyles = createUseStyles(theme => ({
  container: props => ({
    margin: 0,
    padding: "20px 0 0 0",
    display: "flex",
    flexGrow: props.extended ? 1 : 0,
    position: "relative",
    flexDirection: "row"
  }),
  item: props => ({
    display: "flex",
    position: "relative",
    width: `calc(100% / ${props.filters.length})`,
    marginBottom: "-1px",
    justifyContent: "center",
    textTransform: "uppercase",
    letterSpacing: ".9px",
    alignItems: "center",
    fontSize: 16,
    fontWeight: 700,
    listStyle: "none",
    cursor: "pointer",
    color: theme.secondaryColor,
    borderBottom: "2px solid",
    paddingBottom: "20px",
    transitionDuration: ".15s",
    "&:hover": {
      borderColor: `${theme.accent} !important`,
      color: `${theme.accent} !important`
    }
  })
}));

export default Filter;
