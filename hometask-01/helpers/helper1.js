const filterGoodsByKeyAndValue = (goods, key, value) => {
  return goods.filter(item => Object.keys(item).includes(key) && item[key] === value);
};

module.exports = filterGoodsByKeyAndValue;
