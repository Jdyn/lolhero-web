import Link from 'next/link';
import PropTypes from 'prop-types';
import AuthDisplay from './auth/AuthDisplay';
import { createUseStyles } from 'react-jss';

const propTypes = {};

const Header = props => {
  const { handleAuth, session, sessionRequest } = props;
  const classes = useStyles(props);

  return (
    <header className={classes.root}>
      <Link href="/">
        <div className={classes.logo}>LoL Hero</div>
      </Link>
      <input className={classes.orderSearch} aria-label="search" placeholder="Enter Tracking ID" />
      <AuthDisplay handleAuth={handleAuth} session={session} sessionRequest={sessionRequest} />
    </header>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    zIndex: 50,
    display: 'flex',
    position: 'relative',
    backgroundColor: theme.tertiary,
    width: '100%',
    height: '79px',
    borderBottom: `2px solid #999`,
    gridArea: "header",
    padding: '20px 0px 20px 0px',
    '@media (min-width: 650px)': {
      padding: '20px 40px 20px 0px',
    },
    top: 0,
    left: 0,
  },
  logo: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 25px',
    margin: '-20px 0 -20px 0',
    cursor: 'pointer',
    flexGrow: 1,
    maxWidth: "200px",
    transitionDuration: '.2s',
    borderBottom: '2px solid #999',
    color: theme.white,
    bottom: -2,
    fontSize: 28,
    '&:hover': {
      borderColor: `${theme.accent} !important`,
      color: `${theme.accent} !important`
    }
  },
  orderSearch: {
    display: 'none',
    flexGrow: 1,
    maxWidth: '250px',
    marginLeft: 'auto',
    border: 'none',
    outline: 'none',
    borderRadius: 8,
    margin: '0 15px 0 auto',
    padding: '15px',
    color: theme.white,
    backgroundColor: theme.primary,
    '@media (min-width: 650px)': {
      display: 'flex'
    }
  }
}));

Header.propTypes = propTypes;

export default Header;
