import React from 'react';
import { OrderForm } from '../types';
import addons from '../../../lib/content';
import { Order } from '../../../store/account/types';
import styles from './index.module.css';

const fields = [
  { type: 'username', title: 'League Username', text: 'username' },
  { type: 'password', title: 'League Password', text: 'password' }
];

interface Props {
  order?: Order;
  orderForm: OrderForm;
  isEditable: boolean;
  setOrderForm: React.Dispatch<React.SetStateAction<OrderForm>>;
}

const OrderDetails = (props: Props): JSX.Element => {
  const { order, orderForm, setOrderForm, isEditable } = props;

  const handleFormUpdate = (formUpdate): void => {
    const { primaryRole, secondaryRole, summonerName, note } = formUpdate;

    if (primaryRole || secondaryRole) {
      const { details } = orderForm;
      if (details.primaryRole !== undefined && details.secondaryRole !== undefined) {
        const champs = orderForm.details.champions.filter((champ) => {
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
      setOrderForm((prev) => ({
        ...prev,
        details: {
          ...prev.details,
          ...formUpdate
        }
      }));
      return;
    }

    setOrderForm((prev) => ({
      ...prev,
      accountDetails: { ...prev.accountDetails, ...formUpdate }
    }));
  };

  return (
    <div className={styles.root}>
      {order && (
        <>
          <h3>Order Details</h3>
          {isEditable ? (
            <div className={styles.container}>
              <div className={styles.wrapper}>
                <div>
                  <span className={styles.title}>Summoner Name</span>
                  <input
                    className={styles.formInput}
                    type="text"
                    value={orderForm.summonerName}
                    onChange={(event): void =>
                      handleFormUpdate({ summonerName: event.target.value })
                    }
                  />
                </div>
                {order.details.boostType !== 'Duo' && (
                  <form className={styles.form}>
                    {fields.map((field) => (
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
                  onChange={(event): void =>
                    setOrderForm({ ...orderForm, note: event.target.value })
                  }
                  placeholder="Anything we should know?"
                />
              </div>
            </div>
          ) : (
            <div className={styles.wrapper}>
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
                  src={
                    addons.roles.filter((role) => role.title === order.details.primaryRole)[0].image
                  }
                />
              </div>
              <div className={styles.content}>
                <span>Secondary Role</span>
                <img
                  alt="role"
                  src={
                    addons.roles.filter((role) => role.title === order.details.secondaryRole)[0]
                      .image
                  }
                />
              </div>
              {addons.addons.extras.map((item) => (
                <div key={item.title} className={styles.content}>
                  <span>{item.title}</span>
                  <h3>{order[item.type] === true ? 'Yes' : 'No'}</h3>
                </div>
              ))}
              <div className={styles.content}>
                <span>Server</span>
                <h3>{order.details.server}</h3>
              </div>
              <div className={styles.content}>
                <span>Flash Position</span>
                <h3>{order.details.flashPosition}</h3>
              </div>
              {order.details.promos && (
                <div className={styles.promotions}>
                  <span>Promotions</span>
                  <div>
                    {order.details.promos.map((promo: string, index) => (
                      <div key={index} className={styles.promo}>
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
          )}
        </>
      )}
    </div>
  );
};

export default OrderDetails;
