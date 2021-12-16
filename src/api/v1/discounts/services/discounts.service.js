/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-return-await */
/* eslint-disable import/no-dynamic-require */
const util = require('util');
const {discount} = require('../../../../utils');
const {getGoodValue} = require('../../goods/services/helpers/helper2');

const {latestUploadedFile} = require(`${process.cwd()}/src/utils`);

const getProductsList = async goods => goods || await latestUploadedFile();

const formatPriceWithDiscount = price => `$${price}`.replace('.', ',');

const checkCoupleDiscounts = type => {
  const coupleDiscountGoods = {
    'Red Spanish': 3,
    Tangerine: 2,
  };

  return coupleDiscountGoods[type] ? coupleDiscountGoods[type] : 1;
};

const calcDiscountPrice = (goodPrice, discount, discountQuant = 1) => {
  let discountPrice = goodPrice - goodPrice * (discount / 100);
  --discountQuant;

  if (discountQuant !== 0) {
    discountPrice = calcDiscountPrice(discountPrice, discount, discountQuant);
  }

  return discountPrice;
};

const discountPromise = () =>
  new Promise(resolve => {
    discount((err, result) => {
      if (err) return resolve(discountPromise());

      return resolve(result);
    });
  });

const discountPromisify = () => {
  util
    .promisify(discount)
    .call(discount)
    .then(discount => discount)
    .catch(() => discountPromisify());
};

const discountCallback = cb => {
  const callback = (err, result) => {
    if (err) return discountCallback(cb);

    return cb(result);
  };

  return discount(callback);
};

module.exports = {
  async calcDiscountWithPromise(goods) {
    const products = await getProductsList(goods);

    return Promise.all(
      products.map(good =>
        discountPromise().then(discount => {
          const priceWithDiscount = calcDiscountPrice(
            getGoodValue(good),
            discount,
            checkCoupleDiscounts(good.type),
          ).toFixed(2);

          Object.assign(good, {priceWithDiscount: formatPriceWithDiscount(priceWithDiscount)});
        }),
      ),
    );
  },
  async calcDiscountWithPromisify(goods) {
    const products = await getProductsList(goods);

    return Promise.all(
      products.map(good => {
        discountPromisify()
        .then(discount => {
          const priceWithDiscount = calcDiscountPrice(
            getGoodValue(good),
            discount,
            checkCoupleDiscounts(good.type),
          ).toFixed(2);

          Object.assign(good, {priceWithDiscount: formatPriceWithDiscount(priceWithDiscount)});
        });
      }),
    );
  },
  async calcDiscountWithAsync(goods) {
    try {
      const products = await getProductsList(goods);

      for (const good of products) {
        const discount = await discountPromise();

        const priceWithDiscount = calcDiscountPrice(
          getGoodValue(good),
          discount,
          checkCoupleDiscounts(good.type),
        ).toFixed(2);

        Object.assign(good, {priceWithDiscount: formatPriceWithDiscount(priceWithDiscount)});
      }

      return goods;
    } catch (error) {
      return error;
    }
  },
  async calcDiscountWithCallback(callback, goods) {
    const discounts = [];
    const products = await getProductsList(goods);

    for (const good of products) {
      discountCallback(discountValue => {
        const priceWithDiscount = calcDiscountPrice(
          getGoodValue(good),
          discountValue,
          checkCoupleDiscounts(good.type),
        ).toFixed(2);

        discounts.push(Object.assign(good, {priceWithDiscount: formatPriceWithDiscount(priceWithDiscount)}));
      });
    }

    if (discounts.length < goods.length) {
      setTimeout(() => callback(discounts), 1000);
    } else return callback(discounts);
  },
};
