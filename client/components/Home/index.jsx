import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import Button from "../Shared/Button";
import HomeCards from "./HomeCards";
import Link from "next/link";

const propTypes = {
};

const Home = props => {
  const classes = useStyles(props);
  const theme = useTheme();

  return (
    <>
      <div className={classes.hero}>
        <form className={classes.form}>
          <h1>LoL Hero</h1>
          <h2>League of Legends</h2>
          <input placeholder="Enter tracking ID" aria-label="search" className={classes.search} />
        </form>
        <div className={classes.wrapper}>
          <Link href="/">
            <button className={classes.button} style={{ backgroundColor: theme.green }}>
              prebuilt order
            </button>
          </Link>
          <Link href="/order/boost">
            <button className={classes.button} style={{ backgroundColor: theme.accent }}>
              custom order
            </button>
          </Link>
        </div>
      </div>
      <HomeCards />
    </>
  );
};

const useStyles = createUseStyles(theme => ({
  hero: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "100%",
    maxHeight: "1080px",
    minHeight: "650px",
    padding: "60px 0",
    overflow: "hidden",
    zIndex: 1,
    backgroundColor: theme.secondary
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    margin: "15px 15px 40px 15px",
    "& h1": {
      fontSize: 45,
      margin: "0 0 0 0",
      color: theme.white
    },
    "& h2": {
      fontSize: 32,
      color: theme.white,
      margin: "0 0 25px 0"
    }
  },
  search: {
    border: "none",
    outline: "none",
    padding: "0 16px",
    width: "100%",
    maxWidth: "380px",
    borderRadius: "8px",
    height: "55px",
    color: theme.white,
    fontSize: 16,
    backgroundColor: theme.quartinary
  },
  button: {
    display: "flex",
    outline: "none",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    color: theme.white,
    maxWidth: "200px",
    flexGrow: 1,
    justifyContent: "center",
    textTransform: "uppercase",
    margin: "0px 15px",
    padding: "15px 35px",
    cursor: "pointer"
  }
}));

Home.propTypes = propTypes;

export default Home;
