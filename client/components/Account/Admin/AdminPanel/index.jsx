import React from 'react';
import { createUseStyles } from 'react-jss';

const AdminPanel = props => {
  const classes = useStyles(props);

  return <div>admin panel</div>;
};

const useStyles = createUseStyles(theme => ({
  root: {}
}));

export default AdminPanel;
