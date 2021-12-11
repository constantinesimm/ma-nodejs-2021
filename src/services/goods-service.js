const fs = require('fs');
const {join} = require('path');
const {successMessages} = require('../../config');
const {
  filterGoodsByKeyAndValue,
  findGoodWithHighestValue,
  calculateGoodPrice,
} = require('./helpers');
const latestUploadedData = require('../libs/latest-uploaded-data');

const allGoods = async () => await latestUploadedData();

const filterGoods = async (query, goods) => {
  if (goods === undefined) goods = await latestUploadedData();
  let firstKey = false;
  let result = [];

  for (let key of Object.keys(query)) {
    result = filterGoodsByKeyAndValue(firstKey ? result : goods, {
      [key]: query[key],
    });
    firstKey = true;
  }

  return result;
};

const findTopPrice = async goods => {
  if (goods === undefined) goods = await latestUploadedData();

  return findGoodWithHighestValue(goods);
};

const commonPrice = async goods => {
  if (goods === undefined) goods = await latestUploadedData();

  return calculateGoodPrice(goods);
};

const dataService = goods => {
  const writeStream = fs.createWriteStream(
    join(__dirname, '../../uploads/data.json'),
    {
      encoding: 'utf-8',
    },
  );

  try {
    writeStream.write(goods);

    return {status: true, message: successMessages.fileUpdated};
  } catch (error) {
    return {status: false, message: error.message};
  }
};

module.exports = {
  allGoods,
  filterGoods,
  findTopPrice,
  commonPrice,
  dataService,
};
