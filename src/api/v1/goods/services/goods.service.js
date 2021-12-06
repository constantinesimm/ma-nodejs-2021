const fs = require('fs');
const {join} = require('path');

const {
  response: {successMessages},
} = require(`${process.cwd()}/config`);

const {latestUploadedFile} = require(`${process.cwd()}/src/utils`);
const {
  filterGoodsByKeyAndValue,
  findGoodWithHighestValue,
  calculateGoodPrice,
} = require('./helpers');

const allGoodsList = async () => await latestUploadedFile();

const filterGoodsList = async (query, goods) => {
  if (!goods) goods = await latestUploadedFile();

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
  if (!goods) goods = await latestUploadedFile();

  return findGoodWithHighestValue(goods);
};

const commonPrice = async goods => {
  if (!goods) goods = await latestUploadedFile();

  return calculateGoodPrice(goods);
};

const dataService = goods => {
  const writeStream = fs.createWriteStream(
    `${process.cwd()}/uploads/data.json`,
    {encoding: 'utf-8'},
  );

  try {
    writeStream.write(JSON.stringify(goods, null, 4));

    return {status: true, message: successMessages.files.updated};
  } catch (error) {
    return {status: false, message: error.message};
  }
};

module.exports = {
  allGoodsList,
  filterGoodsList,
  findTopPrice,
  commonPrice,
  dataService,
};
