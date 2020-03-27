import React, { useMemo } from 'react';
import styles from './index.module.css';
import { Order } from '../../../store/account/types';
import champions from '../../../lib/champions';

interface Props {
  order: Order;
  orderForm: any;
  setOrderForm: (update: object) => void;
}

const OrderChampions = (props: Props): JSX.Element => {
  const { orderForm, setOrderForm, order } = props;

  const orderChampions = useMemo(() => {
    const list = [];

    if (order?.details?.champions) {
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
  }, [order]);

  const handleDelete = (index: number): void => {
    const champs = [...orderForm.details.champions].filter((champ, i) => {
      return i !== index;
    });

    setOrderForm({ ...orderForm, details: { ...orderForm.details, champions: champs } });
  };

  return (
    <div className={styles.root}>
      {order && (
        <>
          <h3>Selected Champions</h3>
          {/* <span>Maximum of 8 champions</span> */}
          {order.isEditable ? (
            <>
              <div className={styles.list}>
                <div className={styles.wrapper}>
                  <h3>{order.details.primaryRole}</h3>
                  <div className={styles.scroll}>
                    {orderForm.details.champions.map((champion, index) =>
                      champion.position === order.details.primaryRole ? (
                        <button
                          type="button"
                          aria-label="remove champion"
                          className={styles.championItem}
                          onClick={(): void => handleDelete(index)}
                          style={{ backgroundImage: `url(${champion.img})` }}
                        />
                      ) : null
                    )}
                  </div>
                </div>
                <div className={styles.wrapper}>
                  <h3>{order.details.secondaryRole}</h3>
                  <div className={styles.scroll}>
                    {orderForm.details.champions.map((champion, index) =>
                      champion.position === order.details.secondaryRole ? (
                        <button
                          type="button"
                          aria-label="remove champion"
                          className={styles.championItem}
                          onClick={(): void => handleDelete(index)}
                          style={{ backgroundImage: `url(${champion.img})` }}
                        />
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.list}>
              <div className={styles.wrapper}>
                <h3>{order.details.primaryRole}</h3>
                <div className={styles.scroll}>
                  {order.details.champions && order.details.champions.length > 0 ? (
                    orderChampions
                      .filter(champion => champion.position === order.details.primaryRole)
                      .map((champion, index) => (
                        <div
                          className={styles.championItem}
                          style={{ backgroundImage: `url(${champion.img})` }}
                          key={index}
                        />
                      ))
                  ) : (
                    <div>None</div>
                  )}
                </div>
              </div>
              <div className={styles.wrapper}>
                <h3>{order.details.secondaryRole}</h3>
                <div className={styles.scroll}>
                  {order.details.champions && order.details.champions.length > 0 ? (
                    orderChampions
                      .filter(champion => champion.position === order.details.secondaryRole)
                      .map((champion, index) => (
                        <div
                          className={styles.championItem}
                          style={{ backgroundImage: `url(${champion.img})` }}
                          key={index}
                        />
                      ))
                  ) : (
                    <div>None</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderChampions;
