export default (order, pricing) => {
  const basePrice = currentPrice => {
    if (typeof currentPrice !== 'number') return currentPrice;

    const { collectionId, startRank, desiredRank, desiredAmount, collectionName } = order;

    if (!pricing[collectionId]) return currentPrice;
    // if (Object.keys(pricing[collectionId]).length === 0) return currentPrice;

    let total = currentPrice;

    if (collectionName === 'Division Boost') {
      for (let i = startRank; i < desiredRank; i += 1) {
        total += pricing[collectionId][i];
      }
    } else {
      const price = pricing[collectionId][startRank];
      total = price * desiredAmount;
    }

    return total;
  };

  const expressOrder = currentPrice => {
    if (typeof currentPrice !== 'number') return currentPrice;
    if (!order.isExpress) return currentPrice;
    if (!pricing.modifiers) return currentPrice;

    const { express } = pricing.modifiers;

    if (typeof express === 'number') {
      return currentPrice * express;
    }

    return currentPrice;
  };

  const incognitoOrder = currentPrice => {
    if (typeof currentPrice !== 'number') return currentPrice;
    if (!order.isIncognito) return currentPrice;
    if (!pricing.modifiers) return currentPrice;

    const { incognito } = pricing.modifiers;

    if (incognito) {
      return currentPrice * incognito;
    }

    return currentPrice;
  };

  const unrestrictedOrder = currentPrice => {
    if (typeof currentPrice !== 'number') return currentPrice;
    if (!order.isUnrestricted) return currentPrice;
    if (!pricing.modifiers) return currentPrice;

    const { unrestricted } = pricing.modifiers;

    if (typeof unrestricted === 'number') {
      return currentPrice * unrestricted;
    }

    return currentPrice;
  };

  const calculateLP = currentPrice => {
    if (currentPrice <= 0) return currentPrice;
    if (Object.keys(pricing.lp).length === 0) return currentPrice;
    console.log(order.collectionName)
    if (order.collectionName !== 'Division Boost') return currentPrice;

    const { startRank, lp, collectionId } = order;
    const lpPrice = pricing.lp[lp];
    const base = pricing[collectionId][startRank];

    if (lp === 100) {
      if (order.promos) {
        let total = 0;
        order.promos.forEach(promo => {
          switch (promo) {
            case 'W':
              total += 1;
              break;
            case 'L':
              total -= 1;
              break;
            default:
              total += 0;
          }
        });

        const promoPrice = pricing.promotions[total];

        const difference = base - base * promoPrice;
        return currentPrice - Math.round(difference * 100) / 100;
      }
    }

    const difference = base - base * lpPrice;
    return currentPrice - Math.round(difference * 100) / 100;
  };

  const calculateQueues = currentPrice => {
    if (Object.keys(pricing.queues).length === 0) return currentPrice;

    const { queue } = order;

    const queuePrice = pricing.queues[queue];

    if (queuePrice) {
      return currentPrice * queuePrice;
    }

    return currentPrice;
  };

  const calculateOrder = () => {
    let total = 0;

    if (Object.keys(pricing).length === 0) return total;

    total = basePrice(total);
    total = expressOrder(total);
    total = incognitoOrder(total);
    total = unrestrictedOrder(total);
    total = calculateQueues(total);
    total = calculateLP(total);

    return Math.round(total * 100) / 100;
  };

  return calculateOrder();
};
