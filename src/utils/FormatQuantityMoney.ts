const formatQuantityMoney = (quantity: number): string => {
  let quantityFormatted = 'No data';

  if (quantity > 1) {
    if (quantity < 1e3) {
      quantityFormatted = `${Number(quantity.toFixed(1))}`;
    } else if (quantity < 1e6) {
      quantityFormatted = `${Number((quantity / 1e3).toFixed(1))} K`;
    } else if (quantity < 1e9) {
      quantityFormatted = `${Number((quantity / 1e6).toFixed(1))} M`;
    } else {
      quantityFormatted = `${Number((quantity / 1e9).toFixed(1))} B`;
    }
  }

  return quantityFormatted;
};

export default formatQuantityMoney;
