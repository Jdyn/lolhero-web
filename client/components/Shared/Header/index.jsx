import Link from "next/link";
import PropTypes from "prop-types";
import AuthDisplay from "./AuthDisplay";
import { createUseStyles } from "react-jss";

const propTypes = {};

const Header = props => {
  const { handleAuth, session } = props;
  const classes = useStyles(props);

  return (
    <header className={classes.root}>
      <Link href="/">
        <div className={classes.logo}>LoL Hero</div>
      </Link>
      <input className={classes.orderSearch} placeholder="Enter Tracking ID" />
      <AuthDisplay handleAuth={handleAuth} session={session} />
    </header>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    display: "flex",
    position: "relative",
    backgroundColor: theme.tertiary,
    width: "100%",
    height: "79px",
    borderBottom: `2px solid #999`,
    padding: "20px 100px 20px 0px",
    top: 0,
    left: 0,
    zIndex: 5
  },
  logo: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 45px",
    margin: "-20px 0 -20px 0",
    cursor: "pointer",
    transitionDuration: ".2s",
    borderBottom: "2px solid #999",
    color: theme.white,
    bottom: -2,
    fontSize: 30,
    "&:hover": {
      borderColor: `${theme.accent} !important`,
      color: `${theme.accent} !important`
    }
  },
  orderSearch: {
    display: "flex",
    flexGrow: 1,
    maxWidth: "250px",
    marginLeft: "auto",
    border: "none",
    outline: "none",
    borderRadius: 8,
    margin: "0 15px",
    padding: "15px",
    color: theme.white,
    backgroundColor: theme.primary
  }
}));

Header.propTypes = propTypes;

export default Header;
