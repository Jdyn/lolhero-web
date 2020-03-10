import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import addons from '../../../lib/content';
import { Order, AccountState } from '../../../store/account/types';
import styles from './styles.module.css';
import { SessionState } from '../../../store/session/types';
import Button from '../../shared/Button';
import Api from '../../../services/api';
import { orderUpdated } from '../../../store/account/reducers';

const fields = [
  { type: 'username', title: 'League Username', text: 'username' },
  { type: 'password', title: 'League Password', text: 'password' }
];

interface Props {
  order?: Order;
  session: SessionState;
  account: AccountState;
  orderForm: any;
  setOrderForm: (update: object) => void;
}

const statuses = ['-', 'completed', 'active', 'open'];

const OrderDetails = (props: Props): JSX.Element => {
  const { order, orderForm, setOrderForm, session, account } = props;
  const dispatch = useDispatch();
  const [revealed, setReveal] = useState(false);

  const [adminUpdate, setAdminUpdate] = useState({});

  const handleAdminUpdate = (event): void => {
    event.preventDefault();

    Api.patch(`/orders/${order.trackingId}`, { ...adminUpdate }).then(response => {
      if (response.ok) {
        dispatch(orderUpdated({ order: response.result.order }));
      }
    });
  };

  const handleRoleUpdate = (payload): void => {
    setOrderForm({
      ...orderForm,
      details: {
        ...orderForm.details,
        ...payload
      }
    });
  };

  const handleFormUpdate = (formUpdate): void => {
    const { primaryRole, secondaryRole, summonerName, note } = formUpdate;

    if (primaryRole || secondaryRole) {
      const { details } = orderForm;
      if (details.primaryRole !== undefined && details.secondaryRole !== undefined) {
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

  return (
    <div className={styles.root}>
      {order && (
        <>
          {session?.user?.role === 'admin' && (
            <div className={styles.wrapper}>
              <h3>Admin Controls</h3>
              <div className={styles.adminContainer}>
                <h3>Change Booster</h3>
                <select className={styles.select}>
                  <option>-</option>
                  {account.boosters &&
                    account.boosters.map(booster => (
                      <option key={booster.username}>{booster.username}</option>
                    ))}
                </select>
                <h3>Change Status</h3>
                <select
                  className={styles.select}
                  onChange={(event): void =>
                    setAdminUpdate({
                      ...adminUpdate,
                      status: event.target.value === '-' ? order.status : event.target.value
                    })
                  }
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <Button margin="15px 0 0 0" width="100%" onClick={handleAdminUpdate}>
                  update
                </Button>
              </div>
            </div>
          )}
          {order.accountDetails && (
            <div className={styles.wrapper}>
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
                  <button
                    className={styles.reveal}
                    type="button"
                    onClick={(): void => setReveal(true)}
                  >
                    click to reveal
                  </button>
                )}
              </div>
            </div>
          )}
          {order.isEditable ? (
            <div className={styles.container}>
              <div className={styles.wrapper}>
                <h3>Order Details</h3>
                {/* <div className={styles.rolesContainer}>
                  <div className={styles.roles}>
                    <RolePicker onClick={(payload): void => handleRoleUpdate(payload)} />
                  </div>
                </div> */}
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
                  onChange={(event): void =>
                    setOrderForm({ ...orderForm, note: event.target.value })
                  }
                  placeholder="Anything we should know?"
                />
              </div>
            </div>
          ) : (
            <div className={styles.wrapper}>
              <h3>Order Details</h3>
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
                    addons.roles.filter(role => role.title === order.details.primaryRole)[0].image
                  }
                />
              </div>
              <div className={styles.content}>
                <span>Secondary Role</span>
                <img
                  alt="role"
                  src={
                    addons.roles.filter(role => role.title === order.details.secondaryRole)[0].image
                  }
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
          )}
        </>
      )}
    </div>
  );
};

export default OrderDetails;
