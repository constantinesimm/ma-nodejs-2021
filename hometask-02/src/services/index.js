const data = require('../data.json');
const {
  filterGoodsByKeyAndValue,
  findGoodWithHighestValue,
  calculateGoodPrice
} = require('./helpers');

const allGoods = () => data;

const filterGoods = query => {
  let firstKey = false;
  let result = [];

  for (let key of Object.keys(query)) {
    result = filterGoodsByKeyAndValue(firstKey ? result : data, { [key]: query[key] });
    firstKey = true;
  }

  return result;
};

const badRequest = () => {
  return {
    code: 404,
    message: 'Bad request'
  }
};
const notFound = () => {
  return {
    code: 404,
    message: 'Page not found'
  }
};


module.exports = {
  allGoods,
  filterGoods,
  badRequest,
  notFound
}
