import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import Filter from '../../Shared/Filter';

const propTypes = {};

let useStyles;

const DashboardHeader = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.portrait}>
        <div />
      </div>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div>username</div>
        </div>
      </div>
    </div>
  );
};

useStyles = createUseStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.secondary,
    padding: '80px 0 0px 0'
  },
  container: {
    display: 'flex',
    backgroundColor: theme.quartinary,
    // flex: 1,
    padding: '24px 0',
    borderBottom: `2px solid ${theme.grey}`,
    height: '100px',
    width: '100%'
  },
  content: {
    margin: '0 auto',
    padding: 0,
    // padding: '0 15px',
    bottom: -1,
    '& div': {
      display: 'flex',
      padding: 0,
      alignItems: 'flex-end',
      justifyContent: 'center'
    }
  },
  wrapper: {
    display: 'flex',
    position: 'relative',
    flexGrow: 1,
    '@media (min-width: 650px)': {
      paddingLeft: '250px',
    }
  },
  portrait: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    padding: '0 100px',
    '@media (min-width: 650px)': {
      justifyContent: 'flex-start'
    },
    '& div': {
      display: 'flex',
      width: '150px',
      height: '150px',
      backgroundColor: theme.tertiary,
      marginBottom: '-24px',
      borderRadius: '50%',
      border: `2px solid ${theme.grey}`
    }
  }
}));

DashboardHeader.propTypes = propTypes;

export default DashboardHeader;
