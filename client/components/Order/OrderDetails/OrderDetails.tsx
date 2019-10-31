import React, { useState, useMemo } from 'react';
import addons from '../../../lib/addonContent';
import Banner from '../../Boost/Banner';
import ranks from '../../../lib/ranks';
import { Order } from '../../../store/account/types';
import styles from './styles.css';

const fields = [
  { type: 'text', title: 'LoL Username', text: 'username' },
  { type: 'password', title: 'LoL Password', text: 'password' },
  { type: 'text', title: 'Summoner Name', text: 'summonerName' }
];

const content = [
  {
    title: 'Primary Role',
    text: 'primaryRole',
    roles: addons.addons.roles
  },
  {
    title: 'Secondary Role',
    text: 'secondaryRole',
    roles: addons.addons.roles
  }
];

interface Props {
  order?: Order;
}

const OrderDetails = (props: Props): JSX.Element => {
  const { order } = props;

  const ranksObject = useMemo(
    () => [].concat.apply([], [...ranks]).reduce((obj, item) => ((obj[item.rank] = item), obj), {}),
    []
  );

  const [form, setForm] = useState({
    note: '',
    details: {
      primaryRole: null,
      secondaryRole: null,
      summonerName: ''
    },
    accountDetails: {
      username: '',
      password: ''
    }
  });

  const handleOrderUpdate = (): void => {
    const { username, password } = form.accountDetails;
    const { primaryRole, secondaryRole, summonerName } = order.details;

    if (primaryRole && secondaryRole && summonerName && username && password) {
      // updateOrder(form);
    }
  };

  const handleFormUpdate = (formUpdate: Order['details'] | any): void => {
    const { primaryRole, secondaryRole, summonerName, note } = formUpdate;

    if (primaryRole || secondaryRole) {
      const { details } = form;
      if (details.primaryRole !== undefined && details.secondaryRole !== undefined) {
        if (primaryRole === details.secondaryRole || secondaryRole === details.primaryRole) {
          setForm(prev => ({
            ...prev,
            details: {
              ...prev.details,
              secondaryRole: prev.details.primaryRole,
              primaryRole: prev.details.secondaryRole
            }
          }));
          return;
        }
        setForm({
          ...form,
          details: {
            ...details,
            ...formUpdate
          }
        });
      }

      return;
    }

    if (summonerName || note) {
      setForm(prev => ({
        ...prev,
        details: {
          ...prev.details,
          ...formUpdate
        }
      }));
      return;
    }

    setForm(prev => ({
      ...prev,
      accountDetails: { ...prev.accountDetails, ...formUpdate }
    }));
  };

  return (
    <div className={styles.root}>
      {order.isEditable ? (
        <div className={styles.container}>
          <Banner
            height="450px"
            type="default"
            rank={ranksObject[order.details.desiredRank] || {}}
          />
          <div className={styles.wrapper}>
            <h3>Order Details</h3>
            <div className={styles.rolesContainer}>
              {content.map(item => (
                <div key={item.title} className={styles.rolesWrapper}>
                  <span>{item.title}</span>
                  <div className={styles.roles}>
                    {item.roles.map(role => (
                      <button
                        type="button"
                        className={` ${styles.role} ${
                          form.details[item.text] === role.title ? styles.roleSelected : ''
                        }`}
                        key={role.title}
                        onClick={(): void => handleFormUpdate({ [item.text]: role.title })}
                      >
                        <img alt="role" src={role.image} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <form className={styles.form}>
              {fields.map(field => (
                <div key={field.title} className={styles.formWrapper}>
                  <span>{field.title}</span>
                  <input
                    type={field.type}
                    value={
                      field.text === 'summonerName' ? form[field.text] : form.details[field.text]
                    }
                    onChange={(event): void =>
                      handleFormUpdate({ [field.text]: event.target.value })
                    }
                    className={styles.formInput}
                  />
                </div>
              ))}
            </form>
            <span>Notes</span>
            <textarea
              value={form.note || ''}
              onChange={(event): void => setForm({ ...form, note: event.target.value })}
              className={styles.notes}
              placeholder="Please enter your preferred champions here while we work on a better solution."
            />
            {/* <Button onClick={handleOrderUpdate} margin="15px 0px 0px auto">
              save
            </Button> */}
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <Banner
            height="450px"
            type="default"
            rank={ranksObject[order.details.desiredRank] || {}}
          />
          <div className={styles.wrapper}>
            <h3>Order Details</h3>
            <div className={styles.rolesWrapper}>
              <div className={styles.rolesDisplay}>
                <span>Primary Role</span>
                <img
                  alt="role"
                  src={
                    addons.addons.roles.filter(role => role.title === form.details.primaryRole)[0]
                      .image
                  }
                />
              </div>
            </div>
            <div className={styles.rolesDisplay}>
              <span>Secondary Role</span>
              <img
                alt="role"
                src={
                  addons.addons.roles.filter(role => role.title === form.details.secondaryRole)[0]
                    .image
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
