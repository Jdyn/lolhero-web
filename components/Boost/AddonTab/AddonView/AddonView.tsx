import React from 'react';
import content from '../../../../lib/content';
import Toggle from '../../../Reusable/Toggle/Toggle';
import { BoostOrderDetails, BoostState, UpdateOrder } from '../../../../store/boost/types';
import styles from './styles.module.css';
import RolePicker from '../../../Reusable/RolePicker';

interface Props {
  updateOrder: UpdateOrder;
  boost: BoostState;
  currentOrder: BoostOrderDetails;
}

const AddonView = (props: Props): JSX.Element => {
  const { updateOrder, currentOrder, boost } = props;

  const calculatePriceIncrease = (mod: string): string => {
    const { pricing } = boost;

    if (pricing) {
      const { modifiers } = pricing[currentOrder.boostType];

      const cost = Math.round((modifiers[mod] - 1) * 100);
      return `Costs ${cost}%`;
    }

    return 'Costs 0%';
  };

  return (
    <>
      <div className={styles.root}>
        {/* <div className={styles.wrapper}>
          <img alt="role icon" src="/static/images/roles/all.svg" />
        </div> */}
        <h2>Roles</h2>
        <RolePicker size="16px" onClick={roles => updateOrder({ ...roles })} />
      </div>
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
