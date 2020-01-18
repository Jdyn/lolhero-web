import React, { useState, useEffect } from 'react';
import addons from '../../../lib/content';
import { Order } from '../../../store/account/types';
import styles from './styles.module.css';

const fields = [
  { type: 'username', title: 'LoL Username', text: 'username' },
  { type: 'password', title: 'LoL Password', text: 'password' }
];

const content = [
  {
    title: 'Primary Role',
    text: 'primaryRole',
    roles: addons.roles
  },
  {
    title: 'Secondary Role',
    text: 'secondaryRole',
    roles: addons.roles
  }
];

interface Props {
  order?: Order;
  boosters?: any;
  orderForm: any;
  setOrderForm: (update: object) => void;
}

const OrderDetails = (props: Props): JSX.Element => {
  const { order, orderForm, setOrderForm, boosters } = props;

  const [revealed, setReveal] = useState(false);

  const handleFormUpdate = (formUpdate): void => {
    const { primaryRole, secondaryRole, summonerName, note } = formUpdate;

    if (primaryRole || secondaryRole) {
      const { details } = orderForm;
      if (details.primaryRole !== undefined && details.secondaryRole !== undefined) {
        if (primaryRole === details.secondaryRole || secondaryRole === details.primaryRole) {
          setOrderForm(prev => ({
            ...prev,
            details: {
              ...prev.details,
              secondaryRole: prev.details.primaryRole,
              primaryRole: prev.details.secondaryRole
            }
          }));
          return;
        }

        const champs = orderForm.details.champions.filter(champ => {
          const primRole = primaryRole || orderForm.details.primaryRole;
          const secRole = secondaryRole || orderForm.details.secondaryRole;
          return champ.position === primRole || champ.position === secRole;
        });

        setOrderForm({
          ...orderForm,
          details: {
            ...details,
            ...formUpdate,
            champions: champs
          }
        });
      }

      return;
    }

    if (summonerName || note) {
      setOrderForm(prev => ({
        ...prev,
        details: {
          ...prev.details,
          ...formUpdate
        }
      }));
      return;
    }

    setOrderForm(prev => ({
      ...prev,
      accountDetails: { ...prev.accountDetails, ...formUpdate }
    }));
  };

  return order.isEditable ? (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h3>Order Details</h3>
          <div className={styles.rolesContainer}>
            {content.map(item => (
              <div key={item.text}>
                <span className={styles.title}>{item.title}</span>
                <div className={styles.roles}>
                  {item.roles.map(role => (
                    <button
                      type="button"
                      className={` ${styles.role} ${
                        orderForm.details[item.text] === role.title ? styles.roleSelected : ''
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
          <div>
            <span className={styles.title}>Summoner Name</span>
            <input
              className={styles.formInput}
              type="text"
              value={orderForm.summonerName}
              onChange={(event): void => handleFormUpdate({ summonerName: event.target.value })}
            />
          </div>
          {order.details.boostType !== 'Duo' && (
            <form className={styles.form}>
              {fields.map(field => (
                <div key={field.text}>
                  <span className={styles.title}>{field.title}</span>
                  <input
                    className={styles.formInput}
                    type={field.type}
                    value={orderForm.details[field.text]}
                    onChange={(event): void =>
                      handleFormUpdate({ [field.text]: event.target.value })
                    }
                  />
                </div>
              ))}
            </form>
          )}
          <span className={styles.title}>Notes</span>
          <textarea
            value={orderForm.note || ''}
            className={styles.notes}
            onChange={(event): void => setOrderForm({ ...orderForm, note: event.target.value })}
            placeholder="Anything we should know?"
          />
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.root}>
      {order.accountDetails && (
        <>
          <h3>Admin Controls</h3>
          <div className={styles.adminContainer}>
            <select>
              {boosters && boosters.map(booster => <option>{booster.username}</option>)}
            </select>
          </div>
          <h3>Account Details</h3>
          <div className={styles.adminContainer}>
            {revealed ? (
              <>
                <div>{order.accountDetails.username}</div>
                <div>{order.accountDetails.password}</div>
                <button
                  className={styles.reveal}
                  type="button"
                  onClick={(): void => setReveal(false)}
                >
                  click to hide
                </button>
              </>
            ) : (
              <button className={styles.reveal} type="button" onClick={(): void => setReveal(true)}>
                click to reveal
              </button>
            )}
          </div>
        </>
      )}
      <h3>Order Details</h3>
      <div className={styles.wrapper}>
        {/* <div className={styles.content}>
          <span>Price</span>
          <h3>{`$${order.price}`}</h3>
        </div> */}
        <div className={styles.content}>
          <span>Boost Type</span>
          <h3>{order.details.boostType} Boost</h3>
        </div>
        <div className={styles.content}>
          <span>Queue Type</span>
          <h3>{order.details.queue} Queue</h3>
        </div>
        <div className={styles.content}>
          <span>Primary Role</span>
          <img
            alt="role"
            src={addons.roles.filter(role => role.title === order.details.primaryRole)[0].image}
          />
        </div>
        <div className={styles.content}>
          <span>Secondary Role</span>
          <img
            alt="role"
            src={addons.roles.filter(role => role.title === order.details.secondaryRole)[0].image}
          />
        </div>
        <div className={styles.content}>
          <span>Server</span>
          <h3>{order.details.server}</h3>
        </div>
        {addons.addons.extras.map(item => (
          <div key={item.title} className={styles.content}>
            <span>{item.title}</span>
            <h3>{order[item.type] === true ? 'Yes' : 'No'}</h3>
          </div>
        ))}
        {order.details.promos && (
          <div className={styles.promotions}>
            <span>Promotions</span>
            <div>
              {order.details.promos.map((promo: string) => (
                <div key={promo} className={styles.promo}>
                  {promo}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className={styles.note}>
          <span>Notes</span>
          <p>{`${order.note}`}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
