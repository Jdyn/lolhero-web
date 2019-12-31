import React, { useState } from 'react';
import Button from '../Button/Button';
import styles from './styles.module.css';
import Loader from '../Loader';
import { FormTemplate } from './types';

interface Props {
  row?: boolean;
  onSubmit: (type: string, form: object) => void;
  isPending?: boolean;
  template: FormTemplate;
}

const Form = (props: Props): JSX.Element => {
  const { onSubmit, template, row, isPending } = props;

  const [form, setForm] = useState({});

  const submitForm = (event: React.FormEvent): void => {
    event.preventDefault();
    console.log(form);
    onSubmit(template.type, form);
  };

  return (
    <form
      className={styles.form}
      onSubmit={submitForm}
      style={{ flexDirection: row ? 'row' : 'column' }}
    >
      <h3>{template.title}</h3>
      {template.description && <p>{template.description}</p>}
      {template.fields.map(field => (
        <div className={styles.container} key={field.name}>
          <span>{field.name}</span>
          <input
            className={styles.input}
            value={form[field.key || field.name] || ''}
            type={field.type || field.key}
            placeholder={field.placeholder}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
              setForm({ ...form, [field.key || field.name]: event.target.value })
            }
          />
        </div>
      ))}
      <Button margin="5px 0 0 0">
        {isPending ? <Loader width="36px" height="36px" /> : template.submit}
      </Button>
    </form>
  );
};

export default Form;
