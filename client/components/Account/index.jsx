import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const propTypes = {};

const Account = props => {
  const { session } = props;
  const classes = useStyes();

  return (
    <>
      <div className={classes.wrapper}>hello</div>
    </>
  );
};

const useStyes = createUseStyles(theme => ({}));

Account.propTypes = propTypes;

export default Account;
