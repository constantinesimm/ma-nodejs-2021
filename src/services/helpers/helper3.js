const { getGoodValue } = require('./helper2');

module.exports = goods => goods.map(item => {
    const price = getGoodValue(item);

    return { ...item, price };
  });
