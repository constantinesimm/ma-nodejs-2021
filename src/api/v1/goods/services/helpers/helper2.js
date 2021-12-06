const {latestUploadedFile} = require(`${process.cwd()}/src/libs`);

const normalizeGoodPrice = price =>
  Number(price.replace('$', '').replace(',', '.'));

const getGoodValue = item => {
  const [quant, price] = item?.weight
    ? ['weight', 'pricePerKilo']
    : ['quantity', 'pricePerItem'];

  return item[quant] * normalizeGoodPrice(item[price]);
};

const findGoodWithHighestValue = async goods => {
  try {
    if (!goods) goods = await latestUploadedFile();

    const mostExpensiveGood = goods
      .sort((a, b) => getGoodValue(b) - getGoodValue(a))
      .shift();

    return mostExpensiveGood;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getGoodValue,
  normalizeGoodPrice,
  findGoodWithHighestValue,
};
