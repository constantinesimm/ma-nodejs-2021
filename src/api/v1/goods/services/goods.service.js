const fs = require('fs');
const {
  filterGoodsByKeyAndValue,
  findGoodWithHighestValue,
  calculateGoodPrice,
} = require('./helpers');

const {
  response: {successMessages},
} = require(`${process.cwd()}/config`);
const {latestUploadedFile} = require(`${process.cwd()}/src/utils`);

const getProductsList = async goods => goods || (await latestUploadedFile());

const allGoodsList = async () => await latestUploadedFile();

const filterGoodsList = async (query, goods) => {
  const products = await getProductsList(goods);

  let firstKey = false;
  let result = [];

  for (const key of Object.keys(query)) {
    result = filterGoodsByKeyAndValue(firstKey ? result : products, {
      [key]: query[key],
    });
    firstKey = true;
  }

  return result;
};

const findTopPrice = async goods => {
  const products = await getProductsList(goods);

  return findGoodWithHighestValue(products);
};

const commonPrice = async goods => {
  const products = await getProductsList(goods);

  return calculateGoodPrice(products);
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
