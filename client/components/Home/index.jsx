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
          <Button grow maxWidth="185px" padding="15px 10px">
            Customize Order
          </Button>
        </Link>
      </div>
      <div className={classes.content}>
        {cards.map((item, index) => (
          <HomeCard card={item} key={index} />
        ))}
      </div>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    padding: '60px 10px 30px 10px',
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
    padding: '30px 0 60px 0px',
    '@media (min-width: 650px)': {
      flexDirection: 'row'
    }
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '80px 0 0 0',
    padding: '10px',
    '@media (min-width: 650px)': {
      flexDirection: 'row'
    },
    backgroundColor: theme.tertiary
  },
  search: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
    maxWidth: '450px',
    color: theme.white,
    margin: '0 10px',
    border: 'none',
    height: '55px',
    outline: 'none',
    padding: '10px 16px',
    fontSize: 16,
    borderRadius: '8px',
    backgroundColor: theme.quartinary
  }
}));

Home.propTypes = propTypes;

export default Home;
