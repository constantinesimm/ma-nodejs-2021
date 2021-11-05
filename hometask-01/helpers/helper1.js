module.exports = (goods, query) => {
  const data = Object.entries(query);

  return goods.filter(item => item[data.shift()] === data.pop());
};
