export default (order, pricing) => {
  const calculateOrder = () => {
    let total = 0;

    total = basePrice(total);
    total = expressOrder(total);
    total = incognitoOrder(total);
    total = unrestrictedOrder(total);
    total = calculateLP(total);

    return Math.round(total * 100) / 100;
  };

  const basePrice = currentPrice => {
    if (typeof currentPrice !== "number") return currentPrice;

    const { collection_id, start_rank, desired_rank, desired_amount } = order;

    if (collection_id == 1 || collection_id == 5) {
      for (var i = start_rank; i < desired_rank; i++) {
        currentPrice += pricing[collection_id][i];
      }
    } else {
      const price = pricing[collection_id][start_rank];
      currentPrice = price * desired_amount;
    }

    return currentPrice;
  };

  const expressOrder = currentPrice => {
    if (typeof currentPrice !== "number") return currentPrice;
    if (!order.is_express) return currentPrice;

    const { express } = pricing.modifiers;

    if (typeof express === "number") {
      return currentPrice * express;
    }

    return null;
  };

  const incognitoOrder = currentPrice => {
    if (typeof currentPrice !== "number") return currentPrice;
    if (!order.is_incognito) return currentPrice;

    const { incognito } = pricing.modifiers;

    if (typeof incognito === "number") {
      return currentPrice * incognito;
    }

    return currentPrice;
  };

  const unrestrictedOrder = currentPrice => {
    if (typeof currentPrice !== "number") return currentPrice;
    if (!order.is_unrestricted) return currentPrice;

    const { unrestricted } = pricing.modifiers;

    if (typeof unrestricted === "number") {
      return currentPrice * unrestricted;
    }

    return currentPrice;
  };

  const calculateLP = currentPrice => {
    if (currentPrice <= 0) return currentPrice;
    if (!pricing["lp"]) return currentPrice;

    const { start_rank, lp, collection_id } = order;
    const lpPrice = pricing["lp"][lp];
    const base = pricing[collection_id][start_rank];

    if (lp === 100) {
      return currentPrice;
    } else {
      const difference = base - base * lpPrice;
      // console.log(currentPrice - Math.round(difference * 100) / 100);
      return currentPrice - Math.round(difference * 100) / 100;
    }
  };

  return calculateOrder();
};
