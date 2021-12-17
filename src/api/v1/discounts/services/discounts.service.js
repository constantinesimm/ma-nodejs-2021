const util = require('util');
const {discount} = require('../../../../utils');
const {getGoodValue} = require('../../goods/services/helpers/helper2');

const {latestUploadedFile} = require(`${process.cwd()}/src/utils`);

const getProductsList = async goods =>
  goods ? goods : await latestUploadedFile();

const formatPriceWithDiscount = price => `$${price}`.replace('.', ',');

const checkCoupleDiscounts = type => {
  const coupleDiscountGoods = {
    'Red Spanish': 3,
    Tangerine: 2,
  };

  return coupleDiscountGoods[type] ? coupleDiscountGoods[type] : 1;
};

const calcDiscountPrice = (goodPrice, discountVal, discountQuant = 1) => {
  let discountPrice = goodPrice - goodPrice * (discountVal / 100);
  --discountQuant;

  if (discountQuant !== 0) {
    discountPrice = calcDiscountPrice(
      discountPrice,
      discountVal,
      discountQuant,
    );
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
  return util
    .promisify(discount)
    .call(discount)
    .then(discountVal => discountVal)
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
        discountPromise().then(discountValue => {
          const priceWithDiscount = calcDiscountPrice(
            getGoodValue(good),
            discountValue,
            checkCoupleDiscounts(good.type),
          ).toFixed(2);

          return Object.assign(good, {
            priceWithDiscount: formatPriceWithDiscount(priceWithDiscount),
          });
        }),
      ),
    );
  },
  async calcDiscountWithPromisify(goods) {
    const products = await getProductsList(goods);

    return Promise.all(
      products.map(good =>
        discountPromisify().then(discountVal => {
          const priceWithDiscount = calcDiscountPrice(
            getGoodValue(good),
            discountVal,
            checkCoupleDiscounts(good.type),
          ).toFixed(2);

          return Object.assign(good, {
            priceWithDiscount: formatPriceWithDiscount(priceWithDiscount),
          });
        }),
      ),
    );
  },
  async calcDiscountWithAsync(goods) {
    try {
      const products = await getProductsList(goods);

      for (const good of products) {
        const discountVal = await discountPromise();

        const priceWithDiscount = calcDiscountPrice(
          getGoodValue(good),
          discountVal,
          checkCoupleDiscounts(good.type),
        ).toFixed(2);

        return Object.assign(good, {
          priceWithDiscount: formatPriceWithDiscount(priceWithDiscount),
        });
      }

      return products;
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

        discounts.push(
          Object.assign(good, {
            priceWithDiscount: formatPriceWithDiscount(priceWithDiscount),
          }),
        );
      });
    }

    if (discounts.length < products.length) {
      setTimeout(() => callback(discounts), 1000);
    } else return callback(discounts);
  },
};
