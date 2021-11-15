const generateRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

module.exports = (callback) => {
  const randomDelay = generateRandomInteger(0, 1000);
  setTimeout(() => {
    const randomNumber = generateRandomInteger(1, 50);

    if (randomNumber > 35) callback(new Error('Something went wrong'));
    else callback(null, randomNumber);

  }, randomDelay);
};
