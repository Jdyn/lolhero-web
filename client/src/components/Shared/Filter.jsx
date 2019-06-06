import React, { useState } from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";

const propTypes = {
  filters: PropTypes.array.isRequired
};

const Filter = props => {
  const [state, set] = useState(0);

  const handleClick = (event, index) => {
    if (typeof props.onClick === "function") {
      props.onClick(index);
    }
    set(index);
  };

  return (
    <ul className={props.classes.container}>
      {props.filters.map((filter, index) => (
        <li
          key={index}
          className={props.classes.item}
          onClick={e => handleClick(e, index)}
          style={{
            borderColor: state === index ? props.theme.accent : "#999",
            color: state === index ? props.theme.accent : "#999"
          }}
        >
          {filter.name}
        </li>
      ))}
    </ul>
  );
};

Filter.propTypes = propTypes;
Filter.defaultProps = {
  fontSize: 16
};

const styles = theme => ({
  container: props => ({
    display: "flex",
    flexDirection: "row",
    position: "relative",
    margin: 0,
    padding: 0,
    // borderBottom: "2px solid #343536",
    paddingTop: props.extended ? "15px" : 0,
    marginLeft: props.extended ? "-20px" : 0,
    backgroundColor: "transparent",
    // width: props.extended ? "calc(100% + 40px)" : "auto"
  }),
  item: props => ({
    display: "flex",
    width: `calc(100% / ${props.filters.length})`,
    marginBottom: "-2px",
    justifyContent: "center",
    textTransform: "uppercase",
    letterSpacing: ".8px",
    fontSize: props.fontSize,
    fontWeight: 700,
    position: "relative",
    listStyle: "none",
    cursor: "pointer",
    color: theme.secondaryColor,
    borderBottom: "2px solid #e5e5e5",
    paddingBottom: "15px",
    "&:hover": {
      borderColor: `${theme.accent} !important`,
      color: `${theme.accent} !important`
    }
  })
});

export default withStyles(styles, { injectTheme: true })(Filter);
