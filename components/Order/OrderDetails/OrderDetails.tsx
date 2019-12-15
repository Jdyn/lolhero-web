import React, { useState } from 'react';
import addons from '../../../lib/addonContent';
import Banner from '../../Boost/Banner';
import { flatRanks } from '../../../lib/ranks';
import { Order } from '../../../store/account/types';
import styles from './styles.css';

const ranks = flatRanks();

const fields = [
  { type: 'text', title: 'LoL Username', text: 'username' },
  { type: 'password', title: 'LoL Password', text: 'password' },
  { type: 'text', title: 'Summoner Name', text: 'summonerName' }
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
  initializeOrder: (payload: object, trackingId: string) => void;
}

const OrderEdit = (props: Props): JSX.Element => {
  const { order, initializeOrder } = props;

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

  const UpdateDetails = (): void => {
    initializeOrder(form, order.trackingId);
  };

  const handleFormUpdate = (formUpdate): void => {
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
      <h3>Order Details</h3>
      <div className={styles.wrapper}>
        {/* <div className={styles.content}>
          <span>Price</span>
          <h3>{`$${order.price}`}</h3>
        </div> */}
        {/* <div className={styles.content}>
          <span>Server</span>
          <h3>{order.details.server}</h3>
        </div> */}
        {addons.addons.extras.map(item => (
          <div className={styles.content}>
            <span>{item.title}</span>
            <h3>{order[item.type] === true ? 'Yes' : 'No'}</h3>
          </div>
        ))}
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
          <span>Boost Type</span>
          <h3>{order.details.boostType} Boost</h3>
        </div>
        <div className={styles.content}>
          <span>Queue Type</span>
          <h3>{order.details.queue} Queue</h3>
        </div>
        {order.details.promos && (
          <div className={styles.promotions}>
            <span>Promotions</span>
            <div>
              {order.details.promos.map((promo: string) => (
                <div className={`${styles.promo} ${styles[promo]}`} />
              ))}
            </div>
          </div>
        )}
        <div className={styles.note}>
          <span>Notes</span>
          <p>{order.note}</p>
        </div>
      </div>
    </div>
    // <div className={styles.root}>
    //   {order.isEditable ? (
    //     <div className={styles.container}>
    //       <Banner height="450px" type="default" rank={ranks[order.details.desiredRank] || {}} />
    //       <div className={styles.wrapper}>
    //         <h3>Order Details</h3>
    //         <div className={styles.rolesContainer}>
    //           {content.map(item => (
    //             <div key={item.title} className={styles.rolesWrapper}>
    //               <span>{item.title}</span>
    //               <div className={styles.roles}>
    //                 {item.roles.map(role => (
    //                   <button
    //                     type="button"
    //                     className={` ${styles.role} ${
    //                       form.details[item.text] === role.title ? styles.roleSelected : ''
    //                     }`}
    //                     key={role.title}
    //                     onClick={(): void => handleFormUpdate({ [item.text]: role.title })}
    //                   >
    //                     <img alt="role" src={role.image} />
    //                   </button>
    //                 ))}
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //         <form className={styles.form}>
    //           {fields.map(field => (
    //             <div key={field.title} className={styles.formWrapper}>
    //               <span>{field.title}</span>
    //               <input
    //                 type={field.type}
    //                 value={
    //                   field.text === 'summonerName' ? form[field.text] : form.details[field.text]
    //                 }
    //                 onChange={(event): void =>
    //                   handleFormUpdate({ [field.text]: event.target.value })
    //                 }
    //                 className={styles.formInput}
    //               />
    //             </div>
    //           ))}
    //         </form>
    //         <span>Notes</span>
    //         <textarea
    //           value={form.note || ''}
    //           onChange={(event): void => setForm({ ...form, note: event.target.value })}
    //           className={styles.notes}
    //           placeholder="Please enter your preferred champions here while we work on a better solution."
    //         />
    //         <button onClick={UpdateDetails} className={styles.button} type="submit">
    //           save
    //         </button>
    //       </div>
    //     </div>
    //   ) : (
    //     <div className={styles.container}>
    //       <div className={styles.wrapper}>
    //         <h3>Order Details</h3>
    //         <div className={styles.rolesWrapper}>
    //           <div className={styles.rolesDisplay}>
    //             <span>Primary Role</span>
    //             <img
    //               alt="role"
    //               src={
    //                 addons.roles.filter(role => role.title === order.details.primaryRole)[0].image
    //               }
    //             />
    //           </div>
    //         </div>
    //         <div className={styles.rolesDisplay}>
    //           <span>Secondary Role</span>
    //           <img
    //             alt="role"
    //             src={
    //               addons.roles.filter(role => role.title === order.details.secondaryRole)[0].image
    //             }
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};

export default OrderEdit;
