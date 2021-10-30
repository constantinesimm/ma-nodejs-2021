const dataJson = require('./data.json');
const {
  helper1: filterGoodsByKeyAndValue,
  helper2: findGoodWithHighestValue,
  helper3: calculateGoodPrice
} = require('./helpers');

const boot = goods => {
  const firstAction = calculateGoodPrice(goods);
  console.log('1 ', firstAction);

  const secondAction = filterGoodsByKeyAndValue(
    goods,
    {'item': 'orange', 'weight': '4'}
  );
  console.log('2 ', secondAction);

  const thirdAction = findGoodWithHighestValue(secondAction);
  console.log('3 ', thirdAction);

  const fourthAction = calculateGoodPrice([...secondAction, thirdAction]);
  console.log('4 ', fourthAction);

  const fifthAction = findGoodWithHighestValue();
  console.log('5 ', fifthAction);
};

boot(dataJson);
