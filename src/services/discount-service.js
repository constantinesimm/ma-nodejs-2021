const util = require('util');
const latestUploadedData = require('../libs/latest-uploaded-data');
const discount = require('../libs/discount');
const {getGoodValue} = require('../services/helpers/helper2');

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
  return util
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
    if (goods === undefined) goods = await latestUploadedData();

    console.log(goods);
    return Promise.all(
      goods.map(good =>
        discountPromise().then(discount => {
          let priceWithDiscount = calcDiscountPrice(
            getGoodValue(good),
            discount,
            checkCoupleDiscounts(good.type),
          ).toFixed(2);

          priceWithDiscount = `$${priceWithDiscount}`.replace('.', ',');

          return Object.assign(good, {priceWithDiscount});
        }),
      ),
    );
  },
  async calcDiscountWithPromisify(goods) {
    if (goods === undefined) goods = await latestUploadedData();

    return Promise.all(
      goods.map(good => {
        return discountPromisify().then(discount => {
          let priceWithDiscount = calcDiscountPrice(
            getGoodValue(good),
            discount,
            checkCoupleDiscounts(good.type),
          ).toFixed(2);

          priceWithDiscount = `$${priceWithDiscount}`.replace('.', ',');

          return Object.assign(good, {priceWithDiscount});
        });
      }),
    );
  },
  async calcDiscountWithAsync(goods) {
    if (goods === undefined) goods = await latestUploadedData();

    for (const good of goods) {
      const discount = await discountPromise();

      let priceWithDiscount = calcDiscountPrice(
        getGoodValue(good),
        discount,
        checkCoupleDiscounts(good.type),
      ).toFixed(2);

      priceWithDiscount = `$${priceWithDiscount}`.replace('.', ',');

      Object.assign(good, {priceWithDiscount});
    }

    return goods;
  },
  async calcDiscountWithCallback(callback, goods) {
    let discounts = [];

    if (goods === undefined) goods = await latestUploadedData();

    for (let good of goods) {
      discountCallback(discountValue => {
        let priceWithDiscount = calcDiscountPrice(
          getGoodValue(good),
          discountValue,
          checkCoupleDiscounts(good.type),
        ).toFixed(2);

        priceWithDiscount = `$${priceWithDiscount}`.replace('.', ',');

        discounts.push(Object.assign(good, {priceWithDiscount}));
      });
    }

    if (discounts.length < goods.length) {
      setTimeout(() => callback(discounts), 1000);
    } else return callback(discounts);
  },
};
