const jsonData = require('../data.json');

const normalizeGoodPrice = price =>
  Number(price.replace('$', '').replace(',', '.'));

const getGoodValue = item => {
  const [quant, price] = item?.weight
    ? ['weight', 'pricePerKilo']
    : ['quantity', 'pricePerItem'];

  return item[quant] * normalizeGoodPrice(item[price]);
};

const findGoodWithHighestValue = (goods = jsonData) => {
  const mostExpensiveGood = goods
    .sort((a, b) => getGoodValue(b) - getGoodValue(a))
    .shift();

  return mostExpensiveGood;
};

module.exports = {
  getGoodValue,
  findGoodWithHighestValue,
};
