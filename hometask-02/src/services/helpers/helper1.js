module.exports = (goods, query) => {
  const [key, value] = Object.entries(query).shift();

  return goods.filter(item => `${ item[key] }` === value.toString());
};
