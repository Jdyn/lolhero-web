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
    <form className={classes.form} onSubmit={submitForm}>
      <h3>{template.title}</h3>
      {template.fields.map((field, index) => (
        <React.Fragment key={index}>
          <span>{field}</span>
          <input
            className={classes.input}
            value={form[field] || ''}
            type={field}
            onChange={event => setForm({ ...form, [field]: event.target.value })}
          />
        </React.Fragment>
      ))}
      <Button>{template.submit}</Button>
    </form>
  );
};

const useStyles = createUseStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.white
  },
  input: {
    outline: 'none',
    border: 'none',
    borderRadius: 8,
    height: '30px',
    margin: '10px 0',
    padding: '10px',
    backgroundColor: theme.primary,
    color: theme.white
  }
}));

Form.propTypes = propTypes;

export default Form;
