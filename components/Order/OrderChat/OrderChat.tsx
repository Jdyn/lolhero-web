import React, { useMemo } from 'react';
import styles from './styles.module.css';
import { Order } from '../../../store/account/types';
import champions from '../../../lib/champions';

interface Props {
  order: Order;
  orderForm: any;
  setOrderForm: (update: object) => void;
}

const OrderChat = (props: Props): JSX.Element => {
  const { orderForm, setOrderForm, order } = props;

  const orderChampions = useMemo(() => {
    const list = [];

    if (order.details.champions) {
      champions.forEach(champ => {
        order.details.champions.forEach(item => {
          if (champ.name === item.name) {
            list.push({
              ...item,
              img: champ.img
            });
          }
        });
      });
    }

    return list;
  }, [order.details.champions]);

  const handleDelete = (index: number): void => {
    const champs = [...orderForm.details.champions].filter((champ, i) => {
      return i !== index;
    });

    setOrderForm({ ...orderForm, details: { ...orderForm.details, champions: champs } });
  };

  return (
    <div className={styles.root}>
      <h3>Selected Champions</h3>
      {order.isEditable ? (
        <div>
          <div className={styles.list}>
            <div className={styles.scroll}>
              <div className={styles.wrapper}>
                <h3>{orderForm.details.primaryRole}</h3>
                {orderForm.details.champions.map((champion, index) =>
                  champion.position === orderForm.details.primaryRole ? (
                    <div className={styles.championItem} key={champion.name}>
                      <img
                        alt="champion-icon"
                        className={styles.championImage}
                        src={champion.img}
                      />
                      <span>{champion.name}</span>
                      <button
                        className={styles.cancel}
                        aria-label="remove-champion"
                        type="button"
                        onClick={(): void => handleDelete(index)}
                      >
                        <img
                          alt="cancel-champion"
                          className={styles.cancelImage}
                          src="/static/images/cancel.svg"
                        />
                      </button>
                    </div>
                  ) : null
                )}
              </div>
              <div className={styles.wrapper}>
                <h3>{orderForm.details.secondaryRole}</h3>
                {orderForm.details.champions.map((champion, index) =>
                  champion.position === orderForm.details.secondaryRole ? (
                    <div className={styles.championItem} key={champion.name}>
                      <img
                        alt="champion-icon"
                        className={styles.championImage}
                        src={champion.img}
                      />
                      <span>{champion.name}</span>
                      <button
                        className={styles.cancel}
                        aria-label="remove-champion"
                        type="button"
                        onClick={(): void => handleDelete(index)}
                      >
                        <img
                          alt="cancel-champion"
                          className={styles.cancelImage}
                          src="/static/images/cancel.svg"
                        />
                      </button>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.list}>
          <div className={styles.scroll}>
            <div className={styles.wrapper}>
              <h3>{order.details.primaryRole}</h3>
              {order.details.champions && order.details.champions.length > 0 ? (
                orderChampions.map((champion, index) =>
                  champion.position === order.details.primaryRole ? (
                    <div className={styles.championItem} key={champion.name}>
                      <img
                        alt="champion-icon"
                        className={styles.championImage}
                        src={champion.img}
                      />
                      <span>{champion.name}</span>
                    </div>
                  ) : null
                )
              ) : (
                <div>None</div>
              )}
            </div>
            <div className={styles.wrapper}>
              <h3>{order.details.secondaryRole}</h3>
              {order.details.champions && order.details.champions.length > 0 ? (
                orderChampions.map((champion, index) =>
                  champion.position === order.details.secondaryRole ? (
                    <div className={styles.championItem} key={champion.name}>
                      <img
                        alt="champion-icon"
                        className={styles.championImage}
                        src={champion.img}
                      />
                      <span>{champion.name}</span>
                    </div>
                  ) : null
                )
              ) : (
                <div>None</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderChat;
