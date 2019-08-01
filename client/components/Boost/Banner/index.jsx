import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import BannerRankList from "./BannerRankList";
import BannerRankSlider from "./BannerRankSlider";

const propTypes = {
  type: PropTypes.oneOf(["slider", "picker"]),
  rank: PropTypes.object,
  isStartRank: PropTypes.bool,
  updateOrder: PropTypes.func.isRequired,
  currentOrder: PropTypes.object.isRequired
};

const Banner = props => {
  const { type, rank, updateOrder, currentOrder, isStartRank } = props;

  const theme = useTheme();
  const classes = useStyles(props);

  const renderContent = {
    slider: (
      <BannerRankSlider
        rank={rank}
        currentOrder={currentOrder}
        updateOrder={updateOrder}
      />
    ),
    picker: (
      <BannerRankList
        rank={rank}
        isStartRank={isStartRank}
        currentOrder={currentOrder}
        updateOrder={updateOrder}
      />
    )
  };

  return (
    <div className={classes.root}>
      <div
        className={classes.container}
        style={{
          backgroundColor: rank.color || theme.secondary,
          borderColor: `${rank.accent || theme.tertiary}`
        }}
      >
        <div className={classes.header}>
          <h1>{rank.title || ""}</h1>
          <h3>{isStartRank ? "current" : "desired"}</h3>
        </div>
        {renderContent[type]}
      </div>

      <div className={classes.footer}>
        <svg
          className={classes.foot}
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          style={{
            fill: rank.color || theme.secondary,
            stroke: rank.accent || theme.tertiary
          }}
        >
          <path d="M0 0 L50 100 L100 0 Z" />
        </svg>
      </div>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    maxHeight: "550px",
    justifyContent: "flex-start",
    width: "235px",
    marginBottom: "15px",
    zIndex: 5
  },
  container: props => ({
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#fefefe",
    padding: "35px 24px",
    borderLeft: `6px solid`,
    borderRight: `6px solid`,
    transitionDuration: ".2s",
    // boxShadow: "0px -15px 15px rgba(0,0,0,.2)",
    "& span": {
      textAlign: "center"
    }
  }),
  amount: {
    fontSize: 67
  },
  header: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    "& h1": {
      margin: "10px 0",
      fontSize: 30,
      height: "36px"
    },
    "& h3": {
      margin: 0,
      color: theme.white,
      fontSize: 16
    }
  },
  footer: props => ({
    width: "100%",
    height: "100px",
    minHeight: "100px",
    backgroundColor: "transparent",
    fill: "transparent",
    position: "relative",
    bottom: 2,
    zIndex: -1,
    // fill: props.rank.color || theme.secondary,
    // stroke: props.rank.accent || theme.tertiary,
    filter: "drop-shadow(0 0px 15px rgba(0,0,0,.35))"
  }),
  foot: {
    transitionDuration: ".2s",
    width: "100%",
    height: "100px",
    position: "relative",
    strokeWidth: 3
  }
}));

Banner.propTypes = propTypes;

export default Banner;
