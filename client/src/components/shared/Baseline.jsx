import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired
};

const defaultProps = {
  children: null
};

const Baseline = props => props.children;

const styles = theme => ({
  "@font-face": {
    fontFamily: "museo-sans",
    src: "url(../../static/fonts/museosansrounded-500.woff2) format(woff2)"
  },
  "@global": {
    html: {
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      boxSizing: "border-box"
    },
    "*, *::before, *::after": {
      boxSizing: "inherit"
    },
    body: {
      margin: 0,
      backgroundColor: theme.secondary,
      fontSize: "100%",
      fontFamily: "Museo Sans Rounded",
      fontWeight: "normal",
      fontStyle: "normal",
      textRendering: "optimizeLegibility"
    },
    "&::-webkit-scrollbar": {
      width: "15px",
      height: "16px",
      backgroundColor: "lightgrey"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,0.2)"
    },
    "&::-webkit-scrollbar-button": {
      width: "0",
      height: "0",
      display: "none"
    }
  }
});

Baseline.propTypes = propTypes;
Baseline.defaultProps = defaultProps;

export default withStyles(styles)(Baseline);
