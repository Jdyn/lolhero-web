import React from 'react';
import content from '../../../../lib/content';
import Toggle from '../../../Reusable/Toggle/Toggle';
import { BoostOrderDetails, BoostState } from '../../../../store/boost/types';
import styles from './styles.module.css';

interface Props {
  updateOrder: (boostUpdate: object) => void;
  boost: BoostState;
  currentOrder: BoostOrderDetails;
}

const AddonView = (props: Props): JSX.Element => {
  const { updateOrder, currentOrder, boost } = props;

  const calculatePriceIncrease = (mod: string): string => {
    const { pricing } = boost;
    const { modifiers } = pricing[currentOrder.boostType];

    if (modifiers) {
      const cost = Math.round((modifiers[mod] - 1) * 100);
      return `Costs ${cost}%`;
    }

    return 'Costs 0%';

    // if (modifiers) {
    //   if (typeof boost.price === 'number') {
    //     if (!isSelected) {
    //       const total = modifiers[mod] * price - price;
    //       return `$${Math.round(total * 100) / 100}`;
    //     }
    //     const originalPrice = price / modifiers[mod];
    //     const total = modifiers[mod] * originalPrice - originalPrice;
    //     return `$${Math.round(total * 100) / 100}`;
    //   }
    // }
    // return '$0';
  };

  return (
    <>
      {content.addons.extras.map(extra => (
        <div className={styles.root} key={extra.title}>
          <h2>{extra.title}</h2>
          <span>{calculatePriceIncrease(extra.tag)}</span>
          <p>{extra.description}</p>
          <Toggle
            isSelected={currentOrder[extra.type]}
            onClick={(): void => updateOrder({ [extra.type]: !currentOrder[extra.type] })}
          >
            {currentOrder[extra.type] ? 'Added' : 'Add'}
          </Toggle>
        </div>
      ))}
    </>
  );
};

export default AddonView;
