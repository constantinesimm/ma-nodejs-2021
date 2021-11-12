const fs = require('fs');
const { join } = require('path');

const data = require('../data.json');
const {
  filterGoodsByKeyAndValue,
  findGoodWithHighestValue,
  calculateGoodPrice
} = require('./helpers');

const allGoods = () => data;

const filterGoods = (query, goods = data) => {
  let firstKey = false;
  let result = [];

  for (let key of Object.keys(query)) {
    result = filterGoodsByKeyAndValue(firstKey ? result : goods, { [key]: query[key] });
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

const dataService = (goods) => {
  const writeStream = fs.createWriteStream(join(__dirname, '../data.json'), { encoding: 'utf-8' });

  try {
    writeStream
      .write(goods);

    return { status: true, message: 'File successful written' };
  } catch (error) {
    return { status: false, message: error.message }
  }
}

module.exports = {
  allGoods,
  filterGoods,
  findTopPrice,
  commonPrice,
  dataService
}
