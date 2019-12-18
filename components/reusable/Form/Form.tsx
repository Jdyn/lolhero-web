import React, { useState } from 'react';
import Button from '../Button';
import styles from './styles.css';

interface Props {
  row?: boolean;
  onSubmit: (type: string, form: object) => void;
  template: {
    type: string;
    title: string;
    fields: string[];
    submit: string;
  };
}

const Form = (props: Props): JSX.Element => {
  const { onSubmit, template, row } = props;

  const [form, setForm] = useState({});

  const submitForm = (event: React.FormEvent): void => {
    event.preventDefault();
    onSubmit(template.type, form);
  };

  return (
    <form
      className={styles.form}
      onSubmit={submitForm}
      style={{ flexDirection: row ? 'row' : 'column' }}
    >
      <h3>{template.title}</h3>
      {template.fields.map(field => (
        <div className={styles.container} key={field}>
          <span>{field}</span>
          <input
            className={styles.input}
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

export default Form;
