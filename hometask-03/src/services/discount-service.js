const util = require('util');
const goodsData = require('../data.json');
const discount = require('../libs/discount');
const { getGoodValue } = require('../services/helpers/helper2');

const checkCoupleDiscounts = type => type === 'Red Spanish' ? 3 : type === 'Tangerine' ? 2 : 1;

const calcDiscountPrice = (goodPrice, discount, discountQuant = 1) => {
  let discountPrice = goodPrice - (goodPrice * (discount / 100));
  --discountQuant;

  if (discountQuant !== 0) {
    discountPrice = calcDiscountPrice(discountPrice, discount, discountQuant);
  }

  return discountPrice;
}

const discountPromise = () => new Promise(resolve => {
  discount((...args) => {
    if (args.length === 1) return resolve(discountPromise());

    return resolve(args.pop());
  });
});
const discountPromisify = () => {
  return util
    .promisify(discount)
    .call(discount)
    .then(discount => discount)
    .catch(() => discountPromisify());
};

module.exports = {
  calcDiscountWithPromise(goods = goodsData) {
    return Promise.all(
      goods.map(good =>
        discountPromise()
          .then(discount => {
            let priceWithDiscount = calcDiscountPrice(
              getGoodValue(good), discount, checkCoupleDiscounts(good.type)
            ).toFixed(2);

            priceWithDiscount = `$${ priceWithDiscount }`.replace('.', ',');

            return Object.assign(good, { priceWithDiscount });
          })
      )
    );
  },
  calcDiscountWithPromisify(goods = goodsData) {
    return Promise.all(goods.map(good => {
      return discountPromisify()
        .then(discount => {
          let priceWithDiscount = calcDiscountPrice(
            getGoodValue(good), discount, checkCoupleDiscounts(good.type)
          ).toFixed(2);

          priceWithDiscount = `$${ priceWithDiscount }`.replace('.', ',');

          return Object.assign(good, { priceWithDiscount });
        })
    }))
  },
  async calcDiscountWithAsync(goods = goodsData) {
    for (const good of goods) {
      const discount = await discountPromise();

      let priceWithDiscount = calcDiscountPrice(
        getGoodValue(good), discount, checkCoupleDiscounts(good.type)
      ).toFixed(2);

      priceWithDiscount = `$${ priceWithDiscount }`.replace('.', ',');

      Object.assign(good, { priceWithDiscount });
    }

    return goods;
  },
  calcDiscountWithCallback(goods = goodsData) {

  }
}

