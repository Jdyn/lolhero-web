import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import Button from './Button';

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  template: PropTypes.object.isRequired
};

const Form = props => {
  const { onSubmit, template } = props;

  const classes = useStyles(props);
  const [form, setForm] = useState({});

  const submitForm = event => {
    event.preventDefault();
    onSubmit(template.type, form);
  };

  return (
    <form
      className={classes.form}
      onSubmit={submitForm}
      style={{ flexDirection: props.row ? 'row' : 'column' }}
    >
      <h3>{template.title}</h3>
      {template.fields.map((field) => (
        <div className={classes.container} key={field}>
          <span>{field}</span>
          <input
            className={classes.input}
            value={form[field] || ''}
            type={field}
            onChange={event => setForm({ ...form, [field]: event.target.value })}
          />
        </div>
      ))}
      <Button margin="5px 0 0 0">{template.submit}</Button>
    </form>
  );
};

const useStyles = createUseStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.white
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 0,
    textAlign: 'left',
    '& span': {
      textAlign: 'left !important'
    }
  },
  input: {
    outline: 'none',
    border: 'none',
    borderRadius: 8,
    height: '30px',
    fontSize: 14,
    margin: '10px 0',
    padding: '10px',
    backgroundColor: theme.primary,
    color: theme.white
  }
}));

Form.propTypes = propTypes;

export default Form;
