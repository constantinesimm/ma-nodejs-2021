const {
  response: {errorMessages},
} = require('../../config');

const generateRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const discount = callback => {
  const randomDelay = generateRandomInteger(0, 1000);
  setTimeout(() => {
    const randomNumber = generateRandomInteger(1, 50);

    if (randomNumber > 35)
      callback(new Error(errorMessages.unknownServerError));
    else callback(null, randomNumber);
  }, randomDelay);
};

module.exports = discount;
