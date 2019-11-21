import React from 'react';
import { createUseStyles } from 'react-jss';

const Footer = props => {
  const classes = useStyles(props);

  return (
    <footer className={classes.root}>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <p>
            League of Legends is a registered trademark of Riot Games, Inc. We are in no way
            affiliated with, associated with or endorsed by Riot Games, Inc.
          </p>
          <span>© 2019 lolhero.gg | All Rights Reserved</span>
        </div>
        <div className={classes.listWrapper}>
          <ul>
            <li>F.A.Q</li>
            <li>Privacy Policy</li>
            <li>Contact</li>
          </ul>
          <ul>
            <li>Create Order</li>
            <li>Track Order</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    display: 'flex',
    gridArea: 'footer',
    backgroundColor: theme.quartinary,
    bottom: 0,
    color: theme.secondaryWhite
  },
  container: {
    display: 'grid',
    margin: '0 auto',
    maxWidth: '970px',
    padding: '60px 20px 40px 20px',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr 1fr',
    '@media (min-width: 650px)': {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr'
    }
  },
  wrapper: {
    margin: '10px',
    '& p': {
      margin: 0,
      marginBottom: '15px'
    }
  },
  listWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '10px',
    '& ul': {
      listStyle: 'none',
      padding: 0,
      paddingLeft: '30px',
      margin: 0,
      '& li': {
        margin: '10px 0px',
        cursor: 'pointer'
      }
    }
  }
}));

export default Footer;
