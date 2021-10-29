module.exports = (goods, query) => {
  const queryKeys = Object.keys(query);

  return goods.filter(item => {
    return queryKeys.every(key => item[key].toString() === query[key].toString())
  });
};
