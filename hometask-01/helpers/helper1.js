module.exports = (goods, query) => {
  const queryKeys = Object.keys(query);

  return goods.filter(item =>
    queryKeys.every(key => item[key].toString() === query[key].toString())
  );
};
