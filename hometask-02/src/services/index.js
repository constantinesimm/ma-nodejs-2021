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

const findTopPrice = (goods = data) => {
  return findGoodWithHighestValue(goods);
}

const commonPrice = (goods = data) => {
  return calculateGoodPrice(goods);
}


module.exports = {
  allGoods,
  filterGoods,
  findTopPrice,
  commonPrice
}
