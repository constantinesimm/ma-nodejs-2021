const latestUploadedData = require('../../libs/latest-uploaded-data');

const normalizeGoodPrice = price =>
  Number(price.replace('$', '').replace(',', '.'));

const getGoodValue = item => {
  const [quant, price] = item?.weight
    ? ['weight', 'pricePerKilo']
    : ['quantity', 'pricePerItem'];

  return item[quant] * normalizeGoodPrice(item[price]);
};

const findGoodWithHighestValue = (goods = latestUploadedData()) => {
  const mostExpensiveGood = goods
    .sort((a, b) => getGoodValue(b) - getGoodValue(a))
    .shift();

  return mostExpensiveGood;
};

module.exports = {
  getGoodValue,
  normalizeGoodPrice,
  findGoodWithHighestValue,
};
