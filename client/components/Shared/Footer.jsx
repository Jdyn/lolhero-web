import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Footer = props => {
  const classes = useStyles(props);

  return <footer className={classes.root}></footer>;
};

const useStyles = createUseStyles(theme => ({
  root: {
    display: 'flex',
    gridArea: 'footer',
    height: '100px',
    backgroundColor: theme.quartinary,
    bottom: 0
  }
}));

Footer.propTypes = propTypes;

export default Footer;
