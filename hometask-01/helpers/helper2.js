const normalizeGoodPrice = price => Number(price.replace('$', '').replace(',', '.')) * 100;

const getGoodValue = item => {
  const [quant, price] = Object.keys(item).includes('weight') ? ['weight', 'pricePerKilo'] : ['quantity', 'pricePerItem'];

  return (item[quant] * normalizeGoodPrice(item[price])) / 100;
};

const findHighestValueGood = async goods => {
  if (goods === undefined) goods = require('../data.json');

  return goods.sort((a, b) => getGoodValue(b) - getGoodValue(a)).shift()
}

module.exports = findHighestValueGood;
