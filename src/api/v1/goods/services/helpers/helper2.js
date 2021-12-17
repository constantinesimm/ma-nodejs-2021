const {latestUploadedFile} = require(`${process.cwd()}/src/utils`);

const getProductsList = async goods => goods || (await latestUploadedFile());

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
    const products = await getProductsList(goods);

    const mostExpensiveGood = products
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
