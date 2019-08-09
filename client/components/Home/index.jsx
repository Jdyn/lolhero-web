import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from 'react-jss';
import Button from '../Shared/Button';
import Link from 'next/link';
import HomeCard from './HomeCard';

const propTypes = {};

const cards = [
  {
    title: 'card1'
  },
  {
    title: 'card2'
  },
  {
    title: 'card3'
  }
];

const Home = props => {
  const classes = useStyles(props);
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h1>LoL Hero</h1>
        <h2>League of Legends</h2>
        <input placeholder="Enter tracking ID" aria-label="search" className={classes.search} />
      </div>
      <div className={classes.wrapper}>
        <Link href="/order/boost">
          <button className={classes.button} style={{ backgroundColor: theme.accent }}>
            custom order
          </button>
        </Link>
      </div>
      {/* <div className={classes.content}>
        {cards.map((item, index) => (
          <HomeCard card={item} key={index} />
        ))}
      </div> */}
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },
  container: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    padding: '60px 0',
    backgroundColor: theme.secondary,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    '& h1': {
      fontSize: 45,
      margin: 0,
      color: theme.white
    },
    '& h2': {
      color: theme.white,
      margin: '0 0 25px 0',
      fontSize: 32
    }
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    '@media (min-width: 650px)': {
      flexDirection: 'row'
    }
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '-145px',
    '@media (min-width: 650px)': {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    backgroundColor: theme.quartinary
  },
  search: {
    color: theme.white,
    margin: '0 10px',
    border: 'none',
    height: '55px',
    outline: 'none',
    display: 'flex',
    padding: '10px 16px',
    flexGrow: 1,
    maxWidth: '380px',
    fontSize: 16,
    borderRadius: '8px',
    backgroundColor: theme.quartinary
  },
  button: {
    display: 'flex',
    outline: 'none',
    border: 'none',
    borderRadius: 8,
    fontWeight: 600,
    boxShadow: '0px 4px 6px 0px rgba(0,0,0,.2)',
    color: theme.white,
    maxWidth: '200px',
    flexGrow: 1,
    justifyContent: 'center',
    textTransform: 'uppercase',
    margin: '10px',
    padding: '15px 35px',
    cursor: 'pointer',
    transitionDuration: '.2s',
    '&:hover': {
      transform: 'translateY(2px)',
      boxShadow: 'none' //'0px 2px 6px 0px rgba(0,0,0,.2)',
    },
    '&:active': {
      transform: 'translateY(2)',
      boxShadow: 'none' //'0px 2px 6px 0px rgba(0,0,0,.2)',
    }
  }
}));

Home.propTypes = propTypes;

export default Home;
