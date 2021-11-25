const fs = require('fs');
const {join} = require('path');
const csvParser = require('../libs/csv-parser-stream');

const csvTransform = req => {
  const targetPath = join(__dirname, `../../uploads/${Date.now()}.json`);
  const writeFile = fs.createWriteStream(targetPath);

  csvParser.on('end', () => writeFile.end());

  req.pipe(csvParser, {end: false}).pipe(writeFile);
};

module.exports = {
  csvTransform,
};
