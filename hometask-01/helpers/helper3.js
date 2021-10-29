const { getGoodValue } = require('./helper2');

module.exports = goods => {
  return goods.map(item => {
    const price = `$${ getGoodValue(item) }`;

    return { ...item, price };
  })
}
