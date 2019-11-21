import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import options from '../../../lib/addonContent';
import Toggle from '../../reusable/Toggle';

const AddonView = props => {
  const { updateOrder, currentOrder, boost } = props;

  const classes = useStyles();

  const calculatePriceIncrease = (modifier, isSelected) => {
    const mod = modifier.toLowerCase();

    const { price, pricing } = boost;
    const { modifiers } = pricing[currentOrder.boostType];

    if (modifiers) {
      if (typeof boost.price === 'number') {
        if (!isSelected) {
          const total = modifiers[mod] * price - price;
          return `$${Math.round(total * 100) / 100}`;
        }
        const originalPrice = price / modifiers[mod];
        const total = modifiers[mod] * originalPrice - originalPrice;
        return `$${Math.round(total * 100) / 100}`;
      }
    }

    return '$0';
  };

  return options.addons.extras.map(extra => (
    <div className={classes.wrapper} key={extra.title}>
      <h2>{extra.title}</h2>
      <p>{extra.description}</p>
      {/* <span>{calculatePriceIncrease(extra.title, currentOrder[extra.type])}</span> */}
      <Toggle
        isSelected={currentOrder[extra.type]}
        onClick={() => updateOrder({ [extra.type]: !currentOrder[extra.type] })}
      >
        {currentOrder[extra.type] ? 'Enabled' : 'Disabled'}
      </Toggle>
    </div>
  ));
};

const useStyles = createUseStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.tertiary,
    borderRadius: 8,
    padding: '25px',
    boxShadow: '0 0 15px 0 rgba(0,0,0,.2)',
    margin: '10px 10px 10px 10px',
    '& p': {
      color: theme.grey,
      margin: 0,
      marginBottom: '10px',
      fontSize: 16
    },
    '& h2': {
      fontSize: 20,
      margin: 0,
      marginBottom: '10px'
    },
    '& span': {
      color: theme.grey,
      marginBottom: '10px'
    }
  }
}));

export default AddonView;
